import { Auth } from "./auth.model.js";
import * as bcrypt from "bcrypt";
import { sendMail } from "../../config/Email/emailConfig.js";

export class authController {
    constructor() {
    }
    async login(req, res) {
        try {
            const auth = await Auth.findOne({ email: req.body.email });
            if (!auth)
                return res.status(401).send({ message: "Invalid Email or Password" });
    
            const validPassword = await bcrypt.compare(
                req.body.password,
                auth.password
            );
            if (!validPassword)
                return res.status(401).send({ status:401, message: "Invalid Email or Password" });
    
            const token = auth.generateAuthToken();
            res.status(200).send({ status:200, token: token, message: "logged in successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status:500,message: "Internal Server Error" });
        }
    }
    async signup(req, res) {
        try{
            const auth = await Auth.findOne({ email: req.body.email });
            if (auth)
                return res
                    .status(409)
                    .send({ message: "User with given email already Exist!" });

            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            const new_auth = await new Auth({ ...req.body, password: hashPassword }).save();
            sendMail(new_auth.email,"New Account",new_auth.firstname,`Your account has been created successfully.`)
            res.status(201).send({status:201, message: "User created successfully",id:new_auth._id });
        } catch (error) {
            console.error(error);
            res.status(500).send({status:500, message: "Internal Server Error" });
        }
        
    }
    async me(req, res) { 
        try {
            const {firstname, lastname, phone, email,createdDate} = await Auth.findById(req.user);
            const valueUser = { firstname, lastname, phone, email, createdDate }
            
            res.status(200).send({ status:200, message: "User found", data: valueUser });
        } catch (error) {
            console.error(error);
            res.status(500).send({ status:500, message: "Internal Server Error" });
        }
    }
}
