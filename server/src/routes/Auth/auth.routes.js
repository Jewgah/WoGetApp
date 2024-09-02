import express from "express";
import { check } from 'express-validator';
import { checkExpressValidor } from "../../middleware/express-validator.middleware.js";
import { authController } from "./auth.controllers.js";
import { auth } from "./auth.middleware.js";

export class authRoute {
    router = express.Router();
     controller = new authController();
    constructor() {
      this.initializeRoutes()
    }
    
    initializeRoutes() {        
      this.router.post("/login",[
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({min: 6}),
        checkExpressValidor,
      ],(req,res)=>this.controller.login(req,res));
  
      this.router.post("/signup",[
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({min: 6}),
        check("firstname", "Please enter a firstname").not().isEmpty(),
        check("lastname", "Please enter a lastname").not().isEmpty(),
        check("phone", "Please enter a phone").not().isEmpty().isLength({min: 10}),
        checkExpressValidor,
      ],(req,res)=>this.controller.signup(req,res));
  
      this.router.get('/tokenisvalide', [auth], (req, res) => 
      { res.json({ "status": 400, "message": "Token Valide", "type": "succes" }) });

      this.router.get('/me',[auth],(req,res)=>{ this.controller.me(req,res)});
    
    }
  
  }
  