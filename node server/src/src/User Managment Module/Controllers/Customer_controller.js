const Customer = require('../Models/Customer');
const Respond = require('../../helpers/Response');
const Auth = require('../../helpers/authenticator');
//const crypto = require('crypto');
//const fs = require('fs');
const utility = require('../../helpers/utility');
//const config = require('../../config');
const Wallet_Credential = require('../../Wallet Module/Controllers/Wallet_credential_controller');
const Wallet = require('../../Wallet Module/Controllers/Wallet_controller');
const errors = require('http-errors');
const { kk } = require('../../Organization Module/Controllers/Route_controller');
//const { matchedData } = require('express-validator');
//const { query } = require('express');
//const { delete } = require('../../Routers/Bus_Router');
//const wallet = require('../../Wallet Module/Models/Wallet')
module.exports = {
    async register_Customer (req,res){
        try{
        if( await Auth.authenticate_Access({customer: req.body.type || 'normal' , proccess: "true" },req.user.employee)){ 
            // uniqueid  = await crypto.randomBytes(4).toString('hex');
            // console.log(uniqueid);
            var customer_Object = await this.create_Customer_Object(req) //.catch(err=>{throw err});
            let customer = new Customer(customer_Object)  
            var result = await Customer.create(customer)
           // .then(result=>{
              // console.log(result)
               if(result) {
              var message = await  Wallet_Credential.register_Wallet_Credential(result._id, customer,req)
                  //    .then(message=>{
                            if(message.success == true)
                                   message.message = `Customer Id - ${customer.customer_Id} - registered`
                            else 
                                   {   
                                      await Customer.findByIdAndDelete(message._id)  //.catch(err =>{throw err})
                                      throw new Error('Wallet could not be created - Internal Error');
                                    //   const file = `${config.FILE_DIRECTORY}\\${req.file.path}` 
                                    //   fs.unlinkSync(file)
                                   }       
                                        return await Respond.respond(req,res, message)       
                        }
                    else //{
                       return await Respond.respond(req,res, {success: false , message: 'Customer could not be created due to internal error'})                               
                    //               })   
                    //   .catch(err=>{ throw err  })
                    //           })
            // .catch(err=>{
            //     Respond.Property_Validator(err)
            //     .then(message=>{ this.respond(req,res, message) })
            //     .catch(err=>{throw err})    
            //  })        
            }
            else
                  return await Respond.respond(req, res ,{success: false , message: "attempt to register customer with out access"});         
        }catch(err){ 
         //   console.log(`${config.FILE_DIRECTORY}\\${req.file.path}`);
          //  console.log(customer_Object)
            var created_customer = await this.search_For_Customer_IV({phone_Number : customer_Object.phone_Number}); 
           // console.log(customer_Object)
           // console.log(created_customer)
            if(created_customer)
                  {
                      var wallet = Wallet.search_For_Wallet_IV({customer: created_customer.message._id});
                      if(!wallet.success)
                    //   {
                         await Customer.findByIdAndDelete(created_customer.message._id)
                     //  }
                  }
          //  console.log(created_customer)
           if(created_customer.length == 0 && req.file)
                  await utility.delete_file(req.file.path)
            // if(req.file)
            //   {
            //      const file = `${config.FILE_DIRECTORY}\\${req.file.path}` 
            //      fs.unlinkSync(file)
            //   }
            throw err }
    },
 async find_Customer (req, res , limit = 1){   
      try{
    //     const customer = await Wallet.search_For_Wallet_IV({customer: req.query._id}, 1 , 'customer')  //.catch(err=>{throw err});  
    //    // const user =  await Employee_credential.findOne({employee: req.user.employee}).populate('role').catch(err=>{throw err}) 
    //    if(customer){
            
    //        if( await Auth.authenticate_Access({customer: customer.type , view: "true" },req.user.employee)){
    //             return {success: true, message: customer}; 
    //                }
    //        else{ return {success: false, message: null}; }
              
    //               }
    //     else return {success: false, message: null}; 
 //   try {

    var customer = await this.search_For_Customer_EV(req,  req.query , limit )
    //   .then(route=>{  
          return await Respond.respond(req,res , customer )       
       //               })     
             //               })
             // .catch(err=>{throw err})
     //    }
    // catch (error) {  throw err}
    }catch(err){ throw err }
  },
   async update_Customer (req,res){
         try{
          var result ;   
         const customer = await this.search_For_Customer_EV(req, req.query) //.catch(err=>{throw err})
         
         var update = false ; 
        // console.log(customer)
         if(customer.success){
            var wallet =  await Wallet_Credential.search_For_Wallet_Iv({customer:customer.message._id})
          //  console.log(wallet);
            if(req.user.employee) 
              {
                  if( await Auth.authenticate_Access({customer: wallet.message.customer_type , proccess: true },req.user.employee))
                       update = true
                    
              }
            else if(req.user.customer)
                 { if(customer.message._id === req.user.customer)  
                       update = true     
                 }
        //  if(req.user.employee){ 
        //     if(customer.message.type === 'Free'){   
        //         if(Auth.authenticate_Access({free_Customer: {proccess: true}}, req.user.employee)){ 
        //             update = true }
        //                                          }
        //          else{
        //             if(Auth.authenticate_Access({customer: {view: true}}, req.user.employee)){ 
        //                 update = true } 
        //              }
        //                      }
        // else{ 
        //     if(customer.message._id === req.user.customer)   update = false
        //      }
        //   if(update){   
          //  console.log(update)
            if(update == true)   {
          var customer_Object = await  this.create_Customer_Object(req);
         if(customer_Object.customer_Id)   delete customer_Object.customer_Id;      
           
      //  console.log(customer_Object)
       result = await Customer.findByIdAndUpdate(customer.message._id,{$set: customer_Object},{new: true, runValidators: true , context:'query'})
       // .then(result=>{
       // throw new Error('kkkk')     
       if(result) 
                return await Respond.respond(req, res,{success: true , message: `Customer Id - ${customer.message.customer_Id} - updated`});
            else 
                return await Respond.respond(req, res,{success: false , message: `Customer have not been found`});
        //               })
        //   .catch(err=>{
        //     Respond.Property_Validator(err)
        //     .then(message=>{ this.respond(req,res,{success: false , message: message}) })
        //     .catch(err=>{throw err})
        //             }); 
         }
         else  
               return await Respond.respond(req , res,{success: false , message: "attempt to update an customer data with out access"});
           }
          else 
               return await Respond.respond(req, res,{success: false , message: "The Customer does not exist"});
            }
            catch(err){
               // console.log(result)
                if(!result && req.file)
                //{
                  await utility.delete_file(req.file.path)
              //  } 
                throw err}     
},  
/*async delete_Customer (req,res){
    try{          
        await Customer.findByIdAndDelete(req.body._id)
        .then(result =>{
            if(result)
                {
                     
                     
                     return this.respond(res,{success: true, message:'Customer have been successfully deleted'});
                }else{
                    return this.respond(res,{success: false, message:'Customer not found'});
                }
        })
        .catch(err=>{
            throw err
        })
    }catch(err){
       throw err
    }
}, */

async search_For_Customer_EV(req, data , limit = 1 ){
    try{
        var customer = await this.search_For_Customer_IV(data, limit)
           //.catch(err=>{throw err});  
       // const user =  await Employee_credential.findOne({employee: req.user.employee}).populate('role').catch(err=>{throw err}) 
       if(customer.success){
         //  if()
          
           //   if(wallet.success) {
        customer = JSON.stringify(customer);
        customer = JSON.parse(customer);
        if(!Array.isArray(customer.message)) {
            customer.message = [customer.message]
        }
            customer.message = await customer.message.filter(async element=> 
            {    
                var wallet = await  Wallet.search_For_Wallet_IV({customer: element._id},limit); 
               if(wallet.success)
               { 
                   
                    if( await Auth.authenticate_Access({customer: wallet.message.customer_type , view: "true" },req.user.employee))
                         {  
                             return element
                         }
                         console.log(wallet.message.customer_type) 
                }
                  else
                           throw new Error ('Customer with out Wallet has been found');            
            })
            
            if(limit == 1 && customer.message.length == 1 )
            {
                customer.message = await customer.message.reduce((cus)=> {return cus})  
                return {success:true,  message: customer.message};
            }
       else if( customer.message.length > 0) 
                return customer;    
       else 
              return {success: false, message: 'Customer viewing is out of access'}
           // return customer     
        // if( await Auth.authenticate_Access({customer: customer.type , view: "true" },req.user.employee))
        //          return await Respond.response(req, res , {success: true , message: result });
      
    }
  //  return  this.response(req, res , {success: true , message: result });
        else
             return  {success: false, message: 'Customer is not found'};        
    //    if( await Auth.authenticate_Access({customer: customer.type , view: "true" },req.user.employee)){
    //             return {success: true, message: customer}; 
    //            }
    //        else
    //          { return {success: false, message: null}; }
              
    //              }
    //   else return {success: false, message: null}; 
    }catch(err){ throw err }
},
async search_For_Customer_IV( data , limit = 1 ){
    try{
        const query_Object = {};
    //    if(Object.keys(req.query).length !== 0){
            if(data.name){    
                  var name =  data.name.split(' ');
            if(name[0])
              query_Object['name.first_Name'] = {
                       $regex:  new RegExp(name[0],'ig') 
                           }
              if(name[1])
               query_Object['name.last_Name'] = {
                    $regex:  new RegExp(name[1],'ig') 
                                                 }
               if(name[2])
                  query_Object['name.grand_Father_Name'] = {
                  $regex:  new RegExp(name[2],'ig') 
                                       }
                }
            if(data.phone_Number)
                query_Object.phone_Number = data.phone_Number;
            if(data.customer_Id)
                query_Object.customer_Id = data.customer_Id; 
            if(data.identification_Number)
                 query_Object.identification_Number = data.identification_Number;
            // if(data.organization)
            //  query_Object.username = data.username; 
            // if(data._id)
            //      query_Object._id = data._id 
           if(data._id)
                query_Object._id = data._id     
            //    console.log(query_Object ) 
         var result = await Customer.find(
            query_Object
         ,null ,
          {sort:{
               'name.first_Name': 1,
               'name.last_Name': 1,
               'name.grand_Father_Name': 1
          }})
      //    .select('username status balance type customer')
      //    .populate('customer')
          .limit(limit)
        //   .catch(err=>{
        //         throw err
        //                  })                                                                                                                                                                                                      
           // }
           if(result.length == 1) {
            result = result.reduce((cus)=> {return cus})
          
            return {success:true, message: result};
          }
      //   .then(result=>{
      else if(result.length > 1 )   
            return {success:true, message: result};
      else
            return {success: false , message: 'Customer is not found'};
      //    if(result)  
                {
                    // var customer = await result.filter(async element=> 
                    //     { if( await Auth.authenticate_Access({customer: element.type , view: "true" },req.user.employee))
                    //                  return element
                    //     })
                    //     return await Respond.respond( req , res , {success: true , message: customer});     
                    // if( await Auth.authenticate_Access({customer: customer.type , view: "true" },req.user.employee))
                    //          return await Respond.response(req, res , {success: true , message: result });
                }
              //  return  this.response(req, res , {success: true , message: result });
        //   else
        //         return await Respond.respond( req , res , {success: false, message: 'Customer is not found'});      
    }catch(err){  throw err  }
},
async Registered_customer_aggregate(data){
    try{
       var group_Id = {} , sort_Id = {} , lookup = {} , group = {} , sort = {} ,match = {}
        
       switch (data.group) {
           case 'day':
                 group_Id =   { "day": {"$dayOfMonth": "$createdAt"} ,"month":{"$month": "$createdAt"} , "year" : {"$year": "$createdAt"}}               
                 sort_Id = {  "_id.year" : -1, "_id.month" : -1,  "_id.day": -1  } 
                 break;
           case 'month':
                 group_Id =   { "month": { "$month": "$createdAt"} , "year" : {"$year": "$createdAt"}} 
                 sort_Id = {  "_id.year" : -1, "_id.month" : -1 }              
                break;
           case 'year':
                  group_Id =   {  "year" : {"$year": "$createdAt"}} 
                  sort_Id = {  "_id.year" : -1 }                
                    break;       
           default:
               break;
       }     

       if(Object.keys(group_Id).length !== 0)
             group = {  "$group" : {   "_id": group_Id ,   "count": {"$sum" : 1}   }   }; 
       if(Object.keys(sort_Id).length !== 0)    
             sort =  {  "$sort" : sort_Id }    
       if(data.lookup && data.lookup == "wallet") 
             lookup ={"$lookup" : { "from" : "Wallet" , "localField" : "_id" , "foreignField" : "customer" , "as": "wallet"}}
       if(data.match)
       var match = {"$match" : data.match }
     var  query =  [     
        lookup,
        match,
        group,         
        sort       
                 ]
      var filtered_query =  query.filter(element => {
        return Object.keys(element).length > 0 
    })       
    //    var created_error =  new Error('lkjdjdjddbbddhhjddndmdj') 
    //    created_error.code = '403';
    //    throw created_error           
      //  console.log(filtered_query)       
      var result =  await Customer.aggregate(filtered_query)    

      if(data.total) 
            {
                var total = 0;
                for(i=0 ; i<result.length ; i++)
                     total += result[i].count
                result.push({"_id": "total" , "count": total})     
            }
        return {success:true, message: result};
      }catch(err){

        console.log(err);  
        console.log('kk               ll')
        throw err}
},

// async Registered_customer_aggregate(){
//     try{
//        data =  [     
//         //   {"$lookup" : { "form" : "wallet" , "localfield" : "_id" , "foreignField" : "customer" , "as": "wallet"}},
//         { "$group" : {
//                         "_id": { "month": { "$month": "$createdAt"} , "year" : {"$year": "$createdAt"}} ,
//                         "count": {"$sum" : 1}
//                     }  
//         }  ,          
//         {  "$sort" : {  "_id.year" : -1, "_id.month" : -1,    } }         
//                  ]
               
//       var result =  await Customer.aggregate(data)    
//         return {success:true, message: result};
//       }catch(err){throw err}
// },


async create_Customer_Object(req){
    try{
    var customer = {
        name:{
            first_Name: req.body.first_Name,
            last_Name: req.body.last_Name,
            grand_Father_Name: req.body.grand_Father_Name
              },     
        phone_Number: req.body.phone_Number,
        address: req.body.address,
        customer_Id: req.body.customer_Id,
        identification_Number:req.body.identification_Number, 
        gender:req.body.gender,
        age: req.body.age,
            };
       if(req.file){
        customer.profile_Picture =  req.file.path   
       } 
       if(customer.name.first_Name == undefined || customer.name.last_Name == undefined || customer.name.grand_Father_Name == undefined)
          delete customer.name;
       Object.keys(customer).forEach(key=> customer[key] === undefined ? delete customer[key]: {})   
       //console.log(customer)     
       return customer
      }
      catch(err){throw err}         
},
// async respond (req, res,response_message){
//     res.json(response_message)
//     Respond.logparams(req,res)
//     .then(message=>{
//            message.success = response_message.success
//            message.message = response_message.message
//            logger.info(message);
//                    })
//     .catch(err=>{ throw err})
//          return 
// }
} 
