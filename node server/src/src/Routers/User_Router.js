const express = require('express');
//const customer =require('../User Managment Module/controllers/Customer_controller');
//const wallet = require('../Wallet Module/Controllers/Wallet_controller');
//const help = require('../helpers/index');
const Respond = require('../helpers/Response');
// const storage = require('../helpers/utility');
// const multer=require('multer');
// const path = require('path');
// const util = require('util');
const router = express.Router();
const credentials = require('../User Managment Module/Controllers/Employee_credential_controller');
const wallet = require('../Wallet Module/Controllers/Wallet_credential_controller');
const machine = require('../Organization Module/Controllers/Machine_controller')

router.post("/Employee/login" , async (req,res)=>{
    try{
       //  console.log('lllllll')
         await credentials.login_Employee(req,res);
              //help.respond(req,res,{success: false , message: 'Id of the Employee does not exist'})       
       }catch(err) { Respond.error_Handler(req,res,err);   } 
  }) 
  router.post("/Customer/login" , async (req,res)=>{
       try{
            await wallet.login_Customer(req,res);
                 //help.respond(req,res,{success: false , message: 'Id of the Employee does not exist'})       
          }catch(err) { Respond.error_Handler(req,res,err);   } 
     }) 
 router.get("/Customer/refresh_Token" , async (req,res)=>{
       try{
            console.log(req.headers['refresh_token'])
            await wallet.refresh_access_token(req,res);
                 //help.respond(req,res,{success: false , message: 'Id of the Employee does not exist'})       
          }catch(err) { Respond.error_Handler(req,res,err);   } 
     }) 
 router.post("/Machine/login" , async (req,res)=>{
          try{
               await machine.login_Machine(req,res);
                    //help.respond(req,res,{success: false , message: 'Id of the Employee does not exist'})       
             }catch(err) { Respond.error_Handler(req,res,err);   } 
        }) 
    router.get("/Machine/refresh_Token" , async (req,res)=>{
          try{
              // console.log(req.headers['refresh_token'])
               await machine.refresh_access_token(req,res);
                    //help.respond(req,res,{success: false , message: 'Id of the Employee does not exist'})       
             }catch(err) { Respond.error_Handler(req,res,err);   } 
        })       



 module.exports = router;