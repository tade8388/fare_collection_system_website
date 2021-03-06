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
const machine = require('../Organization Module/Controllers/Machine_controller');
const customer = require('../User Managment Module/Controllers/Customer_controller');
const transaction = require('../Transaction Managment Module/controllers/Transaction_controller');
const employee = require('../User Managment Module/Controllers/Employee_controller');
const bus = require('../Organization Module/Controllers/Bus_controller');
const role = require('../User Managment Module/Controllers/Role_Controller')
const notification = require('../Notification And Help Module/Controller/Notification Controller')
//const machine = require('../Organization Module/Controllers/Machine_controller');
//const { machine_aggregation } = require('../Organization Module/Controllers/Machine_controller');
//const Customer = require('../User Managment Module/Models/Customer');
const storage = require('../helpers/utility')
const multer=require('multer');
const path = require('path');
const util = require('util')


const upload_File = multer({
    storage: storage.storage,
    filefilter: 
          function(req,file,callback){
            const filetype = /pdf|doc|docx|ppt/ ;
            const extname = filetype.test(path.extname(file.originalname).toLowerCase());
            const mimetype = filetype.test(file.mimetype);
            if(extname && mimetype){
                 callback(null,true);
            }
            else {
                 callback('document only are allowed', true);
            }
    }
    }).single('Notification_File');
const upload  =  util.promisify(upload_File);

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
        ///    console.log(req.headers['refresh_token'])
            await wallet.refresh_access_token(req,res);      
          }catch(err) { Respond.error_Handler(req,res,err);   } 
     }) 
 router.post("/Machine/login" , async (req,res)=>{
          try{
               await machine.login_Machine(req,res);      
             }catch(err) { Respond.error_Handler(req,res,err);   } 
        }) 
    router.post("/Machine/refresh_Token" , async (req,res)=>{
          try{
               await machine.refresh_access_token(req,res);     
             }catch(err) { Respond.error_Handler(req,res,err);   } 
        })
    router.post ("/notification", async (req , res)=>{
     try
     {
          await upload(req,res) 
          await notification.register_Notification(req,res);     
        }catch(err) { Respond.error_Handler(req,res,err);   }    
    })     
        router.post("/transaction" , async (req,res)=>{
          try{

               await transaction.aggregate_worker(req,res);     
             }catch(err) { Respond.error_Handler(req,res,err);   } 
        })  
        router.post("/customer" , async (req,res)=>{
          try{

               await customer.aggregate_worker(req,res);     
             }catch(err) { Respond.error_Handler(req,res,err);   } 
        })  
        router.post("/machine" , async (req,res)=>{
          try{

               await machine.aggregate_worker(req,res);     
             }catch(err) { Respond.error_Handler(req,res,err);   } 
        })  
        router.post("/bus" , async (req,res)=>{
          try{

               await bus.aggregate_worker(req,res);     
             }catch(err) { Respond.error_Handler(req,res,err);   } 
        })  
        router.post("/employee" , async (req,res)=>{
          try{

               await employee.aggregate_worker(req,res);     
             }catch(err) { Respond.error_Handler(req,res,err);   } 
        })  
        router.get('/ll',async (req,res)=>{
             console.log('yeeeess')
             res.send('yessss')
        })
 module.exports = router;