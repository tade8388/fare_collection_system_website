
const express = require('express');
//const employee = require('../User Managment Module/controllers/Employee_controller');
const bus = require('../Organization Module/controllers/Bus_controller');
//const station =require('../Organization Module/controllers/Station_controller');
const Respond = require('../helpers/Response');
//const multer = require('multer');
const router = express.Router();


router.post("/register",async (req,res)=>{
    try{
        await bus.register_Bus(req,res)   //.catch(err=>{throw err});
      }catch(err){ await Respond.error_Handler(req,res,err) }  
  });
  router.get("/search",async (req,res)=>{
    try{
        // await  ticket.authenticate_Ticket(req,res);
       //await ticket.generate_Ticket('megenagna' , 'tulu dimtu');
     // console.log(req.user)
      if( req.query && req.query.limit ) 
             {
            limit = parseInt(req.query.limit);
            //await bus.find_Bus( req, res , limit )
            //await bus.sfb(req.body.body, limit);
            await Respond.respond(req,res,await bus.sfb(req.body.body, limit))
              }
      else 
          await Respond.respond(req,res,{success:false , message:'Request query could not be found'});    
    //  Respond.respond(req,res,b)
       }
         catch(err){    await Respond.error_Handler(req,res,err) }
  });
  router.post("/update",async (req,res)=>{
    try{
        if(req.query && req.query._id)
              await bus.update_Bus(req,res)     //.catch(err=>{throw err});
       else 
            await Respond.respond(req,res,{success: false , message: 'Request query could not be found'}) 
      //  .catch(err=>{throw err});
       }catch(err){ Respond.error_Handler(req,res,err) }
  });
  router.delete("/",async (req,res)=>{
    try{
        if(req.query && req.query._id)
              await bus.delete_Bus(req,res)     //.catch(err=>{throw err});
       else 
            await Respond.respond(req,res,{success: false , message: 'Id of the Bus could not be found'}) 
      //  .catch(err=>{throw err});
       }catch(err){ Respond.error_Handler(req,res,err) }
  })
  module.exports = router;