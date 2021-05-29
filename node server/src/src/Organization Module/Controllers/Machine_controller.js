
const jwt = require('jsonwebtoken')
const Machine = require('../Models/Machine');
const Respond = require('../../helpers/Response');
const Auth = require('../../helpers/authenticator');
const utility = require('../../helpers/utility');
const config = require('../../config')
var machine_Refresh_Token = require('../models/Machine_Referesh_Token');
module.exports = {
    async register_Machine (req,res){
        try{ 
          if(await Auth.authenticate_Access({machine:{proccess: true }},req.user.employee)){
            var Machine_Object = await this.create_Machine_Object(req);  
            let machine = new Machine(Machine_Object);             
              var result = await Machine.create(machine)
          //  .then(result=>{
                if(result) 
                     return await Respond.respond(req, res,{success: true , message: `Machine Id - ${machine.machine_Id} - registered`});
                else 
                      return await Respond.respond(req, res,{success: false , message: `Machine is not registered`});  
            // })
            // .catch(err=>{
            //     Respond.Property_Validator(err)
            //     .then(message=>{ this.respond(req,res,{success: false , message: message}) })
            //     .catch(err=>{throw err})
            // })
          }
          else
            return await Respond.respond(req , res,{success: false , message: "attempt to register a machine with out access"});
        }catch(err){
        //   var created_machine = await Machine.find(Machine_Object); 
        //   //  console.log(created_customer)
        //    if(created_machine.length == 0 && req.file)
        //           await utility.delete_file(req.file.path)
          
          throw err }
  },
  async search_For_Machine_Ev(req, data , limit = 1){
    try{
         if(await Auth.authenticate_Access({machine: {view: true}},req.user.employee)){
                            var result = await this.search_For_Machine_Iv(data , limit)
                                    // .then(result=>{
                                   //   console.log(result);
                                  return result      
                                      //})
                                  //   .catch(err=>{throw err}); 
                                }
              else
                    return {success: false, message: "attempt to find a machine with out access"};
    }catch(err) {throw err}
                  },
      async find_Machine(req,res,limit = 1){
             try {
                     //    limit = parseInt(limit);
                         var machine = await  this.search_For_Machine_Ev(req , req.query , limit)
                        //  .then(route=>{  
                          return await Respond.respond(req,res , machine)           
                          //               })
                          // .catch(err=>{throw err})
                 } 
              catch (error) {  throw error}
                  }, 
   async search_For_Machine_Iv(data, limit = 1){
                    try{
                        var query_Object = {};  
                        if(data.machine_Id)
                             query_Object.machine_Id = data.machine_Id;
                        if(data.machine_Type)//{
                         query_Object.machine_Type = data.machine_Type;
                                           //}
                        if(data._id)
                             query_Object._id = data._id                        
                          
                     var result = await Machine.find(query_Object)     //.catch(err=>{throw err})
                                        .limit(limit)
                                        .select('-createdAt -updatedAt -__v')
                       //   .then(result=>{
                        if(result.length == 1) {
                          result = result.reduce((mac)=> {return mac})
                          return {success:true, message: result};
                        }
                 //   .then(result=>{
                 else if(result.length > 1 )   
                          return {success:true, message: result};
                 else
                          return {success: false , message: 'Machine is not found'};
                            //elements: Object.keys(result).length
                          // }) 
                          // .catch(err=> {throw err})                         
                    }catch(err){throw err}
                  },                              
  async update_Machine (req,res){
    try{
        var machine = await this.search_For_Machine_Iv({_id: req.query._id})   //.catch(err=>{ throw err });
        if(machine.success){
        if(await Auth.authenticate_Access({machine:{proccess: true}},req.user.employee)){
        var machine_Object = await this.create_Machine_Object(req);
        if(machine_Object.machine_Id)  delete machine_Object.machine_Id;
        if(machine_Object.machine_Type)  delete machine_Object.machine_Type;        
       // if(req.body._id) delete req.body._id; 
        var result = await Machine.findByIdAndUpdate(machine.message._id,{$set: machine_Object},{new:true,runValidators:true,context:'query'})
        //.then(result=>{
         if(result)  
                return await Respond.respond(req , res , {success: true, message: `Machine Id - ${machine.message.machine_Id} have been updated`});
         else
                return await Respond.respond(req , res , {success: false, message: `Machine is not found`}); 
        //  })
        //  .catch(err=>{
        //         Respond.Property_Validator(err)
        //         .then(message=>{ this.respond(req,res,{status: false , message: message}) })
        //         .catch(err=>{throw err})   
        //          })
                       }
             else
                    return await Respond.respond(req, res , {success: false, message: "attempt to update machine with out access"});
                    }
             else
                      return await Respond.respond(req , res , {success: false , message: ' Machine is not found'});   
    }catch(err){
    //   if(!result && req.file)
    //   //{
    //     await utility.delete_file(req.file.path) 
      throw err
    }
},
async login_Machine(req,res){
  try{

  const machine = await Machine.findOne({machine_Id:req.body.machine_Id})  //.catch(err=>{throw err}); 
 // console.log(user)
if(machine) {
    if(machine.status == 'Activated'){
       // if(machine.machine_Type == 'Transaction') {
   // var isMatch =  await bcrypt.compare(req.body.password, user.password ) //,(err,isMatch)=>{
    //    if(err)  console.log("error on comparing customer wallet");
    //    if(isMatch) {
       let token = jwt.sign({
                type: "machine",
                data: {
                    _id: machine._id,
                    type: machine.machine_Type,
                 //   machine_Id: user.customer.customer_Id,
                 //   username:  user.username
                  }
            }, config.JWT_SECRET,{expiresIn: '2h'} )
       let refresh_token = jwt.sign({
        type: "machine",
        data: {
            _id: machine._id,
            type: machine.machine_Type,
                }
          }, config.JWT_SECRET_REFRESH,{expiresIn: '1d'} )  
          refresh_Token_Object = {
            token: refresh_token,
            machine: machine._id,
           // timestamp: 
          }
          var result = await machine_Refresh_Token.create(refresh_Token_Object); 
         // if(result) { 
           if(!result)
               throw new Error('Refresh Token could not be created')
            let output = {
                machine_Id: machine.machine_Id,
               // username: user.username,
                token: `jwt ${token}`,
                refresh_token: refresh_token
               // expiresIn: 168
                         }
            return await Respond.respond(req , res , {success: true , messsage: output})
        //     }
        // else  //{
        //      return await Respond.respond(req, res , {success: false , message: 'Password do not match'});
        //     // }
            // else  //{
            //      return await Respond.respond(req, res , {success: false , message: 'Customer does not have access to website'});
           //  }
     //    }); 
      }
      else  //{
          return await Respond.respond(req, res , {success: false , message: `Account is ${user.status}`});
     // }
       }
      else  //{
          return await Respond.respond(req, res ,{success: false , message: "Machine Id does not exist"});  
      //}
}      
catch(err){ throw err }         
},
async refresh_access_token(req,res){
//  console.log(req.headers['refresh_token'])
var token = req.headers['refresh_token'];
if(token){ 
var result = await machine_Refresh_Token.findOne({token: token })
if(result) {
//  result =  result.reduce((ref)=> { return ref})
var payload = jwt.verify(token,config.JWT_SECRET_REFRESH);
console.log(payload);


const machine = await this.search_For_Machine_Iv({_id: result.machine})   //.catch(err=>{throw err}); 
console.log(machine)
if(machine) {
if(machine.message.status == 'Activated'){
//  var isMatch =  await bcrypt.compare(req.body.password, user.password ) //,(err,isMatch)=>{
//    if(err)  console.log("error on comparing customer wallet");
//      if(isMatch) {
  let token = jwt.sign({
    type: "machine",
    data: {
        _id: machine.message._id,
        type: machine.message.machine_Type,
     //   machine_Id: user.customer.customer_Id,
     //   username:  user.username
      }
}, config.JWT_SECRET,{expiresIn: '2h'} )
let output = {
  machine_Id: machine.message.machine_Id,
 // username: user.username,
  token: `jwt ${token}`,
 // refresh_token: refresh_token
 // expiresIn: 168
           }
        return await Respond.respond(req , res , {success: true , messsage: output})
                    }
        else  //{
          return await Respond.respond(req, res , {success: false , message: `Your account is ${machine.message.status}`});
     // }
       }
      else  //{
          return await Respond.respond(req, res ,{success: false , message: "Wallet could not been found"});  
  }
  else 
  return await Respond.respond(req, res , {success: false , message: `Refresh Token has not been sent`});
}
else 
  return await Respond.respond(req, res , {success: false , message: `Refresh Token has not been found`});            

},
async delete_Machine (req,res){
    try{ 
        var machine = await this.search_For_Machine_Ev(req)  //.catch(err=>{throw err });
        if(machine.success) {        
           if(await Auth.authenticate_Access({machine:{remove: true}},req.user.employee)){     
       var result = await Machine.findByIdAndDelete(machine.message._id)
        // .then(result=>{
            if(result)  
                  return await Respond.respond(req , res , {success: true, message: `Machine Id - ${machine.message.machine_Id} have been deleted`});
            else 
                  return await Respond.respond(req , res , {success: false, message: `MAchine is not found on database`});
            // })
            // .catch(err=>{throw err});
             }  
            else
                 return await Respond.respond(req, res , {success: false , message: "attempt to delete a machine with out access"});
        }
        else
                return await Respond.respond(req , res , {success: false , message: 'Machine is not found'});
    }catch(err){  throw err  }
},
async activate_Machine(req,res){
  try{
      var machine = await this.search_For_Machine_Iv({_id: req.query._id})  //.catch(err=>{throw err});
       if(machine.success){
             if(await Auth.authenticate_Access({machine: {proccess: true}},req.user.employee)){
      let machine_Object = {
          status: 'Activated'
      }
     var result = await Machine.findByIdAndUpdate(machine.message._id,{$set: machine_Object},{new: true, runValidators: true, context:'query'})
    // .then(result=>{
       if(result.length !== 0)
         return await Respond.respond(req , res , {success:true, message: `Machine - ${machine.message.machine_Name} is Activated`});
       else 
         return await Respond.respond(req , res , {success: false, message: 'Machine could not  be found'});     
  //                   })
  //    .catch(err=>{throw err})
                          }
            else//{
                return await Respond.respond(req, res , {success: false , message: "attempt to activate a machine with out access"});
           // }
      }
       else //{
              return await Respond.respond(req, res , {success: false, message: 'Machine is not found'});
            //}
       }  catch(err){ throw err }
             },
async deactivate_Machine(req,res){
   try{
    var machine = await this.search_For_Machine_Iv({_id: req.query._id})
    if(machine.success){
      if(await Auth.authenticate_Access({machine: {proccess: true}},req.user.employee)){
let machine_Object = {
   status: 'Deactivated'
}
     var result = await Machine.findByIdAndUpdate(machine.message._id,{$set: machine_Object},{new: true, runValidators: true, context:'query'})
    // .then(result=>{
       if(result.length !== 0)
         return await Respond.respond(req , res , {success: true, message: `Machine - ${machine.message.machine_Name} is Deactivated`});
       else 
         return await Respond.respond(req , res , {success: false, message: 'Machine could not  be found'});     
  //                   })
  //    .catch(err=>{throw err})
                          }
            else//{
                return await Respond.respond(req, res , {success: false , message: "attempt to deactivate a machine with out access"});
           // }
      }
       else //{
              return await Respond.respond(req, res , {success: false, message: 'Machine is not found'});
          // }
      }  catch(err){ throw err }
},
async create_Machine_Object(req){
    try{
       var machine= {
        machine_Id: req.body.machine_Id,
        machine_Type: req.body.machine_Type,
        ip_Address: req.body.ip_Address,
        status: req.body.status
    };
    // if(req.file)    organization.profile_Picture = req.file.path;
       Object.keys(machine).forEach(key=>machine[key] === undefined ? delete machine[key]: {})        
       return machine
      }
      catch(err){throw err}         
     },
    //  async respond (req,res,response_message){
    //     res.json(response_message)
    //     Respond.logparams(req,res)
    //     .then(message=>{
    //            message.success = response_message.success
    //            message.message = response_message.message
    //            logger.info(message);
    //                    })
    //     .catch(err=>{ throw err})
    //          return 
    //   }         
} 

