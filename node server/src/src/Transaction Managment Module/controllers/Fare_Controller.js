
const Fare = require('../Models/Fare');
const Respond = require('../../helpers/Response');
const Auth = require('../../helpers/authenticator');
//const Employee = require('../../User Managment Module/Models/Employee');
//const crypto = require('crypto');
module.exports = {
    async register_New_Fare(req,res){
        try{
            if(await Auth.authenticate_Access({fare: {proccess:true}},req.user.employee)){
               var Fare_Object = await this.create_Fare_Object(req);       
            // Fare_Object.fare_Id  = crypto.randomBytes(16).toString('hex');
             var fare = new Fare(Fare_Object);
            var result = await Fare.create(fare)
         //   .then(result =>{
                if(result)
                  return await Respond.respond(req , res , {success: true, message: `Fare Id - ${fare.fare_Id} have been registered`});
                else
                  return await Respond.respond(req , res , {success: false, message: `Fare is not registered`});   
          //  })
            // .catch(err=>{
            //     Respond.Property_Validator(err)
            //     .then(message=>{ return  this.respond(req,res,{success: false , message: message}) })
            //     .catch(err=>{throw err})
            //        })       
                }
                else
                    return await Respond.respond(req,res,{success: false , message: "attempt to register fare with out access"});            
        }catch(err){ throw err }
    },
    // async find_fare (req){
    //     try{
    //         var query_Object={};
    //         if(await Auth.authenticate_Access({fare: {view: true}},req.user.employee)){
    //        // if(Object.keys(req.query).length !== 0){ 
    //         if(req.query.id)
    //              query_Object._id = req.query.id;
    //         else if(req.query.date)
    //              query_Object.createdAt = Date(req.body.date).getTime(); 

    //              fare =  await fare.find(query_Object).catch(err=>{throw err})
    //              .then(result=>{
    //                 if(result)   
    //                 return {success:true, message: result};
    //                 else
    //                 return {success: false , message: 'Fare is not found'};
    //               }) 
    //               .catch(err=> {throw err})
    //              }                         
    //            // }
    //             else{
    //                 return {success: false, message: "attempt to find a fare with out access"};  
    //             }
    //         }catch(err){throw err}
    //   },
      async find_Fare(req , res , limit = 1 , populate = 'issued_By'){
        try {
           var route = await this.search_For_Fare_EV(req, req.query , limit , populate)
            //    .then(route=>{            
                return await Respond.respond(req,res , route)       
                //               })
                // .catch(err=>{throw err})
            }
              catch (err) {  throw err}        
      },
      async search_For_Fare_EV(req , data , limit = 1 , populate = ''){
        try{
          if(await Auth.authenticate_Access({fare: {view: true}},req.user.employee)){
                     var result = await this.search_For_Fare_IV( data , limit , populate)
                                //   .then(result=>{
                                       return result
                                    //})
                              //     .catch(err=>{throw err}); 
                          }
            else
                  return {success: false, message: "attempt to search for a fare with out access"};                                    
            }catch(err){throw err} 
      },
      async search_For_Fare_IV(data , limit =1 , populate = '' , sort=''){
        try{
            var query_Object = {};  
            if(data.fare_Id)
                 query_Object.fare_Id = data.fare_Id;
            if(data.issued_By)   
                 query_Object.issued_By = data.issued_By; 
            if(data.fare_Amount)
                 query_Object.fare_Amount = data.fare_Amount      
            if(data._id)
                 query_Object._id = data._id                        
              
         var result = await Fare.find(query_Object)    //.catch(err=>{throw err})
              .populate(populate)
              .sort(sort)
              .limit(limit)
         //     .then(result=>{
          if(result.length == 1) {
            result = result.reduce((fare)=> {return fare})
            return {success:true, message: result};
          }
   //   .then(result=>{
   else if(result.length > 1 )   
            return {success:true, message: result};
   else
            return {success: false , message: 'Fare is not found'};
                //elements: Object.keys(result).length
            //   }) 
            //   .catch(err=> {throw err})                         
        }catch(err){throw err}
      },
      async update_Fare (req,res){
        try{
            var fare = await this.search_For_Fare_EV(req , req.query)  //.catch(err=>{ throw err });
            if(fare.success){
            if(await Auth.authenticate_Access({fare: {proccess: true}},req.user.employee)){
                var Fare_Object =  await  this.create_Fare_Object(req);    
                  if(Fare_Object.fare_Id)  delete Fare_Object.fare_Id; 
               var result = await Fare.findByIdAndUpdate(fare.message._id,{$set: Fare_Object},{new:true, runValidators:true, context:'query'})
           //  .then(result=>{
                if(result)  
                   return await Respond.respond(req , res , {success: true, message: `Fare Id - ${result.fare_Id} have been updated`});
                else
                   return await Respond.respond(req , res , {success: false, message: `Fare is not found`});
            //       })
            //  .catch(err=>{
            //     Respond.Property_Validator(err)
            //     .then(message=>{ this.respond(req,res,{status: false , message: message}) })
            //     .catch(err=>{throw err}) 
            //     })
            }
            else
                return await Respond.respond(req, res , {success: false, message: "attempt to update fare with out access"});
            }
            else
                return await Respond.respond(req , res , {success: false , message: ' Fare is not found'});
                  
        }catch(err){throw err}
    },
    async delete_Fare (req,res){
        try{  
            var fare = await this.find_fare(req).catch(err=>{ throw err });
            if(fare.success){
            if(await Auth.authenticate_Access({fare: {remove: true}},req.user.employee)){
           var result = await Fare.findByIdAndDelete(fare.message._id)
           // .then(result=>{
                if(result)  
                  return await Respond.respond(req , res , {success: true, message: `Fare Id - ${result.message.fare_Id} have been deleted`});
                else 
                  return await Respond.respond(req , res , {success: false, message: `Fare is not found on database`});
            // })
            // .catch(err=>{throw err});
                           }  
            else
                 return await Respond.respond(req, res , {success: false , message: "attempt to delete fare with out access"});
            }
        else
                return await Respond.respond(req , res , {success: false , message: 'Fare is not found'});
        }catch(err){  throw err }
    },
    async create_Fare_Object(req){
        try{
           var fare = {
            fare_Id: req.body.fare_Id,   
            fare_Amount: req.body.fare_Amount,
            issued_By: req.user.employee
                           }  
           Object.keys(fare).forEach(key=> fare[key] === undefined ? delete fare[key]: {})        
           return fare
          }
          catch(err){throw err}         
         } ,
//  async respond (req,res,response_message){
//             res.json(response_message)
//             Respond.logparams(req,res)
//             .then(message=>{
//                    message.success = response_message.success
//                    message.message = response_message.message
//                    logger.info(message);
//                            })
//             .catch(err=>{ throw err})
//                  return 
//           }      
    }   