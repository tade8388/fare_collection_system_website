
const Role = require('../Models/Role');
//const help = require('../../helpers');
const Auth = require('../../helpers/authenticator')
const Respond = require('../../helpers/Response')
const Employee_credential= require('./Employee_credential_controller')
module.exports = {
    async register_new_Role (req,res){
        try{ 
          if(await Auth.authenticate_Access({role:{proccess: true }},req.user.employee)){
            var Role_Object = await this.create_Role_Object(req);  
            let role = new Role(Role_Object);             
              var result = await Role.create(role)
          //  .then(result=>{
                if(result) 
                     return await Respond.respond(req, res,{success: true , message: `Role Id - ${role.role_Id} - registered`});
                else 
                      return await Respond.respond(req, res,{success: false , message: `Role is not registered`});  
            // })
            // .catch(err=>{
            //     Respond.Property_Validator(err)
            //     .then(message=>{ this.respond(req,res,{success: false , message: message}) })
            //     .catch(err=>{throw err})
            // })
          }
          else
            return await Respond.respond(req , res,{success: false , message: "attempt to register an role with out access"});
        }catch(err){  throw err }
  },
  async search_For_Role_EV (req, data , limit = 1){
    try{
      var credential = await  Employee_credential.search_For_Employee_Credential_IV({employee: req.user.employee}, 1 , 'role')
          
      var access_list = await Auth.authenticate_Access_deeper(credential.message.role._id , 'employee' , 'view')
    //  console.log(x)
        // if(await Auth.authenticate_Access({role: {view: true}},req.user.employee))
                            var result = await this.search_For_Role_IV(data , limit)

                                    // .then(result=>{
                                  //    console.log(result)
                     var roles =   result.message.filter(element=> access_list.includes(element.role_Id))          
                                            
                //     console.log(y)         
                                 
                                 if(roles)  
                                           return {success: true, message: roles}; 
                                 else 
                                           return {success: false, message: "attempt to find a Role with out access"};                  
                                      //})
                                  //   .catch(err=>{throw err}); 
            //  else
              //      return {success: false, message: "attempt to find a Role with out access"};
    }catch(err) {throw err}
                  },
      async find_Role(req,res, limit = 1){
             try {
                         var role = await  this.search_For_Role_EV(req , req.query, limit)
                        //  .then(route=>{  
                          return await Respond.respond(req,res , role)           
                          //               })
                          // .catch(err=>{throw err})
                 } 
              catch (error) {  throw error}
                  }, 
   async search_For_Role_IV(data, limit = 1){
                    try{
                        var query_Object = {};  
                        if(data.role_Id)
                             query_Object.role_Id = data.role_Id;
                        if(data.role_Name){
                         query_Object.role_Name = {
                                    $regex : new RegExp(data.role_Name,'ig')
                                                     }  
                                           };
                        if(data.organization_Type) 
                             query_Object.organization_Type =  data.organization_Type;                   
                        if(data._id)
                             query_Object._id = data._id                        
                    //   console.log(query_Object)  
                      // console.log(limit)  

                     var result = await Role.find(query_Object)     //.catch(err=>{throw err})
                          .limit(limit)
                          .select('-createdAt -status -updatedAt -__v')
                    //     console.log(result.length)
                       if(result.length == 1) {
                                result = result.reduce((rol)=> {return rol})
                                return {success:true, message: result};
                              }
                       //   .then(result=>{
                       else if(result.length > 1 )   
                                return {success:true, message: result};
                       else
                                return {success: false , message: 'Role is not found'};
                            //elements: Object.keys(result).length
                          // }) 
                          // .catch(err=> {throw err})                         
                    }catch(err){throw err}
                  },                              
  async update_Role (req,res){
    try{
        var role = await this.search_For_Role_EV(req, {_id: req.query._id})  //.catch(err=>{ throw err });
        if(role.success){
        if(await Auth.authenticate_Access({role:{proccess: true}},req.user.employee)){
        var Role_Object = await this.create_Role_Object(req);
        if( Role_Object.role_Id)  delete Role_Object.role_Id; 
        if(Role_Object.organization_Type)  delete Role_Object.organization_Type;   
       // if(req.body._id) delete req.body._id; 
        var result = await Role.findByIdAndUpdate(role.message._id,{$set: Role_Object},{new:true,runValidators:true,context:'query'})
        //.then(result=>{
         if(result)  
                return await Respond.respond(req , res , {success: true, message: `Role Id - ${role.message.role_Id} have been updated`});
         else
                return await Respond.respond(req , res , {success: false, message: `Role is not found`}); 
        //  })
        //  .catch(err=>{
        //         Respond.Property_Validator(err)
        //         .then(message=>{ this.respond(req,res,{status: false , message: message}) })
        //         .catch(err=>{throw err})   
        //          })
                       }
             else
                    return await Respond.respond(req, res , {success: false, message: "attempt to update a role with out access"});
                    }
             else
                      return await Respond.respond(req , res , {success: false , message: ' Role is not found'});   
    }catch(err){
       throw err
    }
},
async delete_Role (req,res){
    try{ 
        var role = await this.search_For_Role_EV(req)   //.catch(err=>{throw err });
        if(role.success) {        
           if(await Auth.authenticate_Access({role:{remove: true}},req.user.employee)){     
       var result = await Remove.findByIdAndDelete(role.message._id)
        // .then(result=>{
            if(result)  
                  return await Respond.respond(req , res , {success: true, message: `Role Id - ${role.message.role_Id} have been deleted`});
            else 
                  return await Respond.respond(req , res , {success: false, message: `Role is not found on database`});
            // })
            // .catch(err=>{throw err});
             }  
            else
                 return await Respond.respond(req, res , {success: false , message: "attempt to delete a role with out access"});
        }
        else
                return await Respond.respond(req , res , {success: false , message: 'Role is not found'});
    }catch(err){  throw err  }
},
async activate_Role(req,res){
  try{
      var role = await this.search_For_Role_IV({_id: req.query._id})  //.catch(err=>{throw err});
       if(role.success){
             if(await Auth.authenticate_Access({role: {proccess: true}},req.user.employee)){
      let role_Object = {
          status: 'Activated'
      }
     var result = await Role.findByIdAndUpdate(role.message._id,{$set: role_Object},{new: true, runValidators: true, context:'query'})
    // .then(result=>{
       if(result.length !== 0)
         return await Respond.respond(req , res , {success:true, message: `Role - ${role.message.role_Name} is Activated`});
       else 
         return await Respond.respond(req , res , {success: false, message: 'Role could not  be found'});     
  //                   })
  //    .catch(err=>{throw err})
                          }
            else//{
                return await Respond.respond(req, res , {success: false , message: "attempt to activate a role with out access"});
           // }
      }
       else //{
              return await Respond.respond(req, res , {success: false, message: 'Role is not found'});
            //}
       }  catch(err){ throw err }
             },
async deactivate_Role(req,res){
   try{
    var role = await this.search_For_Role_IV({_id: req.query._id})
    if(role.success){
      if(await Auth.authenticate_Access({role: {proccess: true}},req.user.employee)){
let role_Object = {
   status: 'Deactivated'
}
     var result = await Role.findByIdAndUpdate(role.message._id,{$set: role_Object},{new: true, runValidators: true, context:'query'})
    // .then(result=>{
       if(result.length !== 0)
         return await Respond.respond(req , res , {success: true, message: `Role - ${role.message.role_Name} is Deactivated`});
       else 
         return await Respond.respond(req , res , {success: false, message: 'Role could not  be found'});     
  //                   })
  //    .catch(err=>{throw err})
                          }
            else//{
                return await Respond.respond(req, res , {success: false , message: "attempt to deactivate a role with out access"});
           // }
      }
       else //{
              return await Respond.respond(req, res , {success: false, message: 'Role is not found'});
          // }
      }  catch(err){ throw err }
},
async create_Role_Object(req){
    try{
       var role= {
        role_Id: req.body.role_Id,
        role_Name: req.body.role_Name,
        organization_Type: req.body.organization_Type,
        role_Type: req.body.role_Type,
        status: req.body.status,
        access: req.body.access
                        };
   //  if(req.file)    organization.profile_Picture = req.file.path;
      role_entity = ['organization', 'branch', 'customer' , 'free_customer', 'role', 'bus' , 'route' , 'station' , 'fare', 'ticket' , 'transaction'];
      if(role.access){
               for(entity in role.access){
                     // console.log(entity)
                      if(Object.keys(entity)){
                          //console.log(entity)
                                if(entity == 'employee'){
                                     for(type in role.access[entity]){
                                          // console.log(type)
                                           var employee_role_Id = await Role.find({role_Id: type})
                                            if(employee_role_Id) {
                                                 for(access_of in role.access[entity][type]){
                                                    // console.log(access_of)
                                                    if(access_of == "view" || access_of == "proccess" || access_of == "remove") 
                                                    {
                                                   //  console.log( access_of + ' '+  role.access[entity][type][access_of])
                                                    if(role.access[entity][type][access_of] == true)          
                                                        continue;
                                                    else
                                                         throw new Error('Role access fields have been tempered or are written wrong - access type not valued to true')
                                                    }
                                                    else
                                                        throw new Error('Role access fields have been tempered or are written wrong - access type is not available') 
                                                //}           
                                                               }    
                                                        }
                                             else
                                                      throw new Error('Role access fields have been tempered or are written wrong - employee role id not found')          
                                     }
                                }
                                else if(role_entity.includes(entity))
                                {
                                      for(type in role.access[entity])
                                      {
                                       // console.log(type)
                                        if(type == "view" || type == "proccess" || type == "remove") 
                                        {
                                        if(role.access[entity][type] == true)          
                                            continue;
                                        else
                                             throw new Error('Role access fields have been tempered or are written wrong - access type not valued to true')
                                        }
                                        else
                                            throw new Error('Role access fields have been tempered or are written wrong - access type is not available') 
                                    }      
                            }
                            else 
                                throw new Error('Role access fields have been tempered or are written wrong - role entity does not exist') 
                        }
                      else  
                         throw new Error('Role access fields have been tempered or are written wrong - role entity is not object')       
                                        }   
                     }
        Object.keys(role).forEach(key=>role[key] === undefined ? delete role[key]: {})   
     // await console.log(role.access);
       return role
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

