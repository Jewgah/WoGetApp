import express from "express";
import { check } from 'express-validator';
import { checkExpressValidor } from "../../middleware/express-validator.middleware.js";
import { auth } from "../Auth/auth.middleware.js";
import { bookedController } from "./booked.controllers.js";

export class bookedRoute {
    router = express.Router();
     controller = new bookedController();
    constructor() {
      this.initializeRoutes()
    }
    
    initializeRoutes() {        
      this.router.post("/new",[
        check("n_host", "Please enter the number of host").isNumeric(),
        check("from", "Please enter a date").notEmpty(),
        check("to", "Please enter a date").notEmpty(),
        checkExpressValidor,
        auth
      ],(req,res)=>this.controller.new(req,res));  


      this.router.get("/getAllBooked", [auth], (req, res) => this.controller.getAllBooked(req, res));  
      
      this.router.get("/getMyBooked", [auth], (req, res) => this.controller.getMyBooked(req, res));
   
      this.router.post('/updateRate', [auth,
        check("rate", "Please enter a rate").notEmpty(),
        check("post_id", "Please enter a post_id").notEmpty(),
        checkExpressValidor,
      ], (req, res) => this.controller.updateRate(req, res));
    }
  
  }
  