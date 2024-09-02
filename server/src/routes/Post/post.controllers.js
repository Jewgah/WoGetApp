import { Auth } from "../Auth/auth.model.js";
import { Post } from "./post.model.js";
import {getAverage, getDaysArray, sortByRate} from "../../Utils/utils.js";
import { sendMail } from "../../config/Email/emailConfig.js";
import { Booked } from "../Booked/booked.model.js";
export class postController {
    constructor() {
    }
    async new(req, res) {
        try {
            const { description, maximumperson, minimumperson, pricebyday,  title, pictures ,address,tags } = req.body;
            const thisUser = req.user;
            const thisUserEmail = req.email;
            const thisUserName = req.name;

            const post = new Post({
                description,
                maximumperson,
                minimumperson,
                pricebyday,
                title,
                address,
                pictures,
                user_post: thisUser,
                tags
            })
            
            try{
                await post.save();
                sendMail(thisUserEmail,"New Post",thisUserName,`Your post: ** ${title} **  has been created successfully.`)
                 res.status(200).send({ status:200, post: post, message: "success post created" });
            }catch(error){
                 res.status(500).send({
                    status: 500,
                    message: error.message,
                    type: 'TypeError.AnthError'
                })
            }

        } catch (error) {
            console.log(error);
             res.status(500).send({ status:500,message: "Internal Server Error" });
        }
    }
    async getAllPosts(req, res) {
      try{
          Post.find({})
              .sort({ createdDate: -1 })
              .then(function (posts) {
            res.send(posts);
        });
        } catch (error) {
            console.log(error);
             res.status(500).send({ status:500,message: "Internal Server Error" });
        }
    }


    async getById(req, res) {
      try{
        const { id } = req.body
        Post.findOne({_id : id})
            .then(function (posts) {
                Auth.findOne({ _id: posts.user_post })
                .then(function (user){
                    const {firstname, lastname, phone, email} = user
                 
                    Post.find({ user_post: posts.user_post }).then(function (postsUser) { 
                        const averageRateTemp = []
                        postsUser.map(post => averageRateTemp.push(...post?.rate))
                        const averageRate = getAverage(averageRateTemp)
                        const valueUser = { firstname, lastname, phone, email, averageRate }
                        Booked.find({ post_id: posts._id }).then(function (bookedPosts) {
                            const bookedPostsFilter = []
                            bookedPosts.map(book => 
                                bookedPostsFilter.push(...getDaysArray(book.from, book.to))
                            )
                            res.send({ ...posts._doc, 'postUser': valueUser, bookedPostsFilter: bookedPostsFilter })
                        }).catch(e => { 
                            console.log(e)
                            res.status(404).send({ status: 404, message: "Post not Found" });
                        })
                    })
                })
                
            }).catch((e)=>{
                res.status(404).send({ status:404,message: "Post not Found" });
            })
        } catch (error) {
            console.log(error);
             res.status(500).send({ status:500,message: "Internal Server Error" });
        }
    }


    async search(req, res) {
        try {
            let { city, endDate, startDate, guest } = req.body;
            city = city?.replaceAll(' ', '-');
            let query = {};
            if (guest != "" && guest != undefined) {
                guest = parseInt(guest);
                query = {
                    ...query,
                    $and: [{
                        maximumperson: { $gte: guest },
                        minimumperson: { $lte: guest }
                    }]
                }
            }
            if (city != "" && city != undefined) {
                query = {
                    ...query,
                    "address.label": { $regex: city } 
                }
            }
            Post.find(query).then(async function (posts) {
                if (posts.length > 0) { 
                    if (startDate != "" && endDate != "") {
                        const id = posts.map(post => post._id)
                        const start = new Date(startDate);
                        const end = new Date(endDate);
                        const bookedPosts = await Booked.find({ post_id: { $in: id } })
                        const bookedPostsFilter = bookedPosts.filter((book) => 
                            (start <= new Date(book.from) && end >= new Date(book.from) )|| 
                                (start >= new Date(book.from) && start <= new Date(book.to))
                        )
                        const bookedPostsFilterId = posts.filter(post => !bookedPostsFilter.some(book => book.post_id == post._id))
                        res.send(sortByRate(bookedPostsFilterId))
                    } else {
                        res.send(sortByRate(posts))
                    }
                } else {
                    res.status(404).send({ status: 404, message: "Post not Found" });
                }
            }).catch((e) => {
                res.status(404).send({ status: 404, message: "Post not Found" });
            })
                
        } catch (error) { 
            console.log(error);
             res.status(500).send({ status:500,message: "Internal Server Error" });
        }
        }
    async getMyPost(req, res) { 
        try{
            Post.find({user_post: req.user})
            .then(function (posts) {
                res.send(posts);
            })
            } catch (error) {
                console.log(error);
                 res.status(500).send({ status:500,message: "Internal Server Error" });
            }
    }
    async deleteById(req, res) { 
        try{
            const { id } = req.body;
            Post.findOneAndDelete({_id : id,user_post: req.user})   
                .then(function (posts) {
                    if (posts) {
                        sendMail(req.email,"Delete Post",req.name,`Your post: ** ${posts.title} **  has been deleted successfully.`)
                        res.status(200).send({ status:200,message: "success post deleted" });
                    } else {
                        res.status(404).send({ status: 404, message: "Post not Found or not permition to delete" });
                    }
            })
            } catch (error) {
                console.log(error);
                 res.status(500).send({ status:500,message: "Internal Server Error" });
            }
    }
}
