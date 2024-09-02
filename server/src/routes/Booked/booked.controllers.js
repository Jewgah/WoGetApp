import { Auth } from "../Auth/auth.model.js";
import { Booked } from "./booked.model.js";
import { Post } from "../Post/post.model.js";
import { sendMail } from "../../config/Email/emailConfig.js";

export class bookedController {
    constructor() {
    }
    async new(req, res) {
        try {
            const { n_host, post_id,  from, to} = req.body;
            const thisUser = req.user;
            const booked = new Booked({
                customer_id: thisUser,
                n_host, 
                post_id, 
                from, 
                to,
            })
            
            try{
                 await booked.save();
                 await Post.findOne({ _id: post_id }).then(function (post) {
                     Auth.findOne({ _id: post.user_post }).then(function (user) {      
                            sendMail(req.email, "New Booked", req.name, `Your booked : ** ${post.title} **  has been booked successfully.`,`Contact the host : ${user.firstname} ${user.lastname} - ${user.phone} - ${user.email}`)                        
                            setTimeout(() => { 
                                sendMail(user.email, "Yout post are booked", user.fistname, `Your post : ** ${post.title} **  has been booked successfully `,`Contact Client : ${req.name} : ${req.email}.`)
                            }, 1000);
                    })
                 })
                 res.status(200).send({ status:200, booked: booked, message: "success booked created" });
            } catch (error) {
                console.log(error);
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
    async getAllBooked(req, res) {
      try{
          Booked.find({})
              .sort({ createdDate: -1 })
              .then(function (booked) {
            res.send(booked);
        });
        } catch (error) {
            console.log(error);
             res.status(500).send({ status:500,message: "Internal Server Error" });
        }
    }
    async getMyBooked(req, res) { 
        try{
            const thisUser = req.user;
            Booked.find({customer_id: thisUser})
                .sort({ createdDate: -1 })
                .then(function (booked) {
                    const post_id = booked.map(booked => booked.post_id);
                    Post.find({ _id: { $in: post_id } })
                        .sort({ createdDate: -1 })
                        .then(function (booked_all) {
                            const response = booked_all.map(booked_all => { 
                                const booked_this = booked.find(booked => booked.post_id == booked_all._id);
                                return {
                                    ...booked_all._doc,
                                    booked_this
                                }
                            })
                            res.send(response);
                });
         });
        } catch (error) {
            console.log(error);
             res.status(500).send({ status:500,message: "Internal Server Error" });
        }
    }
    async updateRate(req, res) { 
        try{
            const { post_id, rate } = req.body;
            const thisUser = req.user;
            Booked.findOneAndUpdate({post_id: post_id, customer_id: thisUser}, {rate: rate}, {new: true})
                .then(function (booked) {
                    Post.findOneAndUpdate({ _id: post_id }, { $push: { rate: rate.averageRate } }, { new: true }).then(function (post) {
                        Auth.findOne({ _id: post.user_post }).then(function (user) { 
                            sendMail(user.email, "You received a rate from your host.", user.firstname, `Your post : ** ${post.title} **  has been rated successfully `,`Average rate : ${rate.averageRate.toFixed(2)}, Comment : ${rate.comment}`)                        
                            setTimeout(() => { 
                                sendMail(req.email, "You Rate send with success", req.name, `Your rate for : ** ${post.title} **  has been send successfully.`,`Average rate : ${rate.averageRate.toFixed(2)}, Your Comment : ${rate.comment}`)
                            }, 1000);
                        })
                        res.status(200).send({ status: 200, booked: booked, message: "success booked updated" });
                    }).catch(function (error) { 
                        res.status(500).send({ status: 500, message: error.message, type: 'TypeError.AnthError' });
                    })
            })
        } catch (error) {
            console.log(error);
             res.status(500).send({ status:500,message: "Internal Server Error" });
        }
    }
}