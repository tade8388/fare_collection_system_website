const express = require('express');
const ticket = require('../Transaction Managment Module/controllers/Ticket_Controller')
const transaction =require('../Transaction Managment Module/controllers/Transaction_controller');
const Respond = require('../helpers/Response');
//const multer=require('multer');
//const path = require('path');
const router = express.Router();

router.get("/find_Ticket", async (req,res)=>{
    try{
        // await  ticket.authenticate_Ticket(req,res);
       //await ticket.generate_Ticket('megenagna' , 'tulu dimtu');
     // console.log(req.user)
      if(req.query && req.query.limit) 
          await ticket.find_Ticket(req,res, req.query.limit)
      else 
          await Respond.respond(req,res,{success:false , message:'Request query could not be found'});    
    //  Respond.respond(req,res,b)
 }catch(err){    await Respond.error_Handler(req,res,err) }
 // }    
  });

router.get("/find_Transaction", async (req,res)=>{
    try{
        // await  ticket.authenticate_Ticket(req,res);
       //await ticket.generate_Ticket('megenagna' , 'tulu dimtu');
     // console.log(req.user)
      if(req.query && req.query.limit ) {
           limit = parseInt(req.query.limit);
          await transaction.view_Transaction(req,res, req.query.limit)
      }
      else 
          await Respond.respond(req,res,{success:false , message:'Request query could not be found'});    
    //  Respond.respond(req,res,b)
 }catch(err){    await Respond.error_Handler(req,res,err) }
 // }    
  });


  module.exports = router;