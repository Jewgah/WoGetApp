import express from "express";
import { check } from 'express-validator';
import { checkExpressValidor } from "../../middleware/express-validator.middleware.js";
import { auth } from "../Auth/auth.middleware.js";
import { postController } from "./post.controllers.js";

export class postRoute {
    router = express.Router();
     controller = new postController();
    constructor() {
      this.initializeRoutes()
    }
    
    initializeRoutes() {        
      this.router.post("/new",[
        check("description", "Please enter a valid description").notEmpty(),
        check("maximumperson", "Please enter a maximumperson").isNumeric(),
        check("minimumperson", "Please enter a minimumperson").isNumeric(),
        check("pricebyday", "Please enter a pricebyday").isNumeric(),
        check("address", "Please enter an address").notEmpty(),
        check("title", "Please enter a valid title").isString(),
        checkExpressValidor,
        auth
      ],(req,res)=>this.controller.new(req,res));  

      this.router.post("/search",[
        // check("city", "Please enter a valid description").notEmpty(),
        // check("dateStart", "Please enter a dateStart").notEmpty(),
        // check("dateEnd", "Please enter a dateEnd").notEmpty(),
        // check("guest", "Please enter a guest").notEmpty(),
        checkExpressValidor,
        auth
      ],(req,res)=>this.controller.search(req,res));    

      this.router.get("/getAllPosts", [auth] ,(req,res) => this.controller.getAllPosts(req,res) );  
        
      this.router.post("/getByID", [
        check("id", "Please enter a valid id").notEmpty(),
        checkExpressValidor,
        auth
      ] ,(req,res) => this.controller.getById(req,res) );   

      this.router.post("/getUserByID", [
        check("id", "Please enter a valid id").notEmpty(),
        checkExpressValidor,
        auth
      ] ,(req,res) => this.controller.getUserById(req,res) );   
        
      this.router.get("/getMyPost", [
        auth
      ] ,(req,res) => this.controller.getMyPost(req,res) );   


      this.router.delete("/deleteById", [auth,
        check("id", "Please enter a valid id").notEmpty(),
        checkExpressValidor
      ], (req, res) => this.controller.deleteById(req, res));    
    
    }
  
  }
  