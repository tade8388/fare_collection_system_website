
const Branch = require('../Models/Branch');
const Auth = require('../../helpers/authenticator');
const Respond = require('../../helpers/Response');
module.exports = {
    async register_Branch(req,res){
        try{
            if(await Auth.authenticate_Access({branch: {proccess:true}},req.user.employee)){
             var Branch_Object = await this.create_Branch_Object(req);
             var branch = new Branch(Branch_Object);
             var result =  await Branch.create(branch)
           // .then(result =>{
                if(result) 
                return await Respond.respond(req, res,{success: true , message: `Branch Id - ${branch.branch_Id} - registered`});
                else 
                return await Respond.respond(req, res,{success: false , message: `Branch is not registered`});    
            // })
            // .catch(err=>{
            //     Respond.Property_Validator(err)
            //     .then(message=>{ this.respond(req,res,{success: false , message: message}) })
            //     .catch(err=>{throw err})
            //        })       
            }
            else{
                return  await Respond.respond(req , res,{success: false , message: "attempt to register a branch with out access"});
                }
        }catch(err){
           throw err
        }
    },
    async search_For_Branch_EV (req, data , limit = 1){
        try{
          //  var branch;
         //   var query_Object={};
          // console.log(req.user)
            if(await Auth.authenticate_Access({branch: {view: true}},req.user.employee)){
            //  console.log('iiiiiiii' + limit)
                var result = await this.search_For_Branch_IV(data , limit)
                  return result
              
                // .then(result=>{return result})
                // .catch(err=>{throw err}); 
            //if(Object.keys(req.query).length !== 0){ 
            // if(req.query.id)
            //      query_Object._id = req.query.id;
            // else if(req.query.name)
            //      query_Object.branch_Name = {
            //         $regex : new RegExp(req.query.name,'ig')
            //                                }  

            // await Branch.find(query_Object).catch(err=>{throw err})
            // .then(result=>{
            //     if(result)   
            //           return {success:true, message: result};
            //     else
            //           return {success: false , message: 'Branch is not found'};
            //   }) 
            //   .catch(err=> {throw err})
                }
                //  else{
                //   branch = await Branch.find({}).catch(err=>{throw err});  
                //             }
                else{
                        return {success: false, message: "attempt to find a branch with out access"}; 
                   }
        }
        catch(err){    throw err   }
      },
      async find_Branch(req , res , limit = 1){
        try {
             var branch =  await this.search_For_Branch_EV(req, req.query , limit)
            // console.log(limit);
                return await Respond.respond(req,res, branch)
                // .then(route=>{  
                //               this.respond(req,res , route)       
                //               })
                // .catch(err=>{throw err})
            } 
    catch (error) {  throw err}
      },
      async search_For_Branch_IV(data , limit = 1){
        try{
            var query_Object = {};  
            if(data.branch_Id)
                 query_Object.branch_Id = data.branch_Id;
            if(data.branch_Name){
             query_Object.branch_Name = {
                        $regex : new RegExp(data.branch_Name,'ig')
                                         }  
                               }
            if(data._id)
                 query_Object._id = data._id                        
             console.log(query_Object) 
           var result = await Branch.find(query_Object)      //.catch(err=>{throw err})
              //.populate(populate)
             // .limit(limit)
              .select('-createdAt -status -updatedAt -__v')
           //   .then(result=>{
             console.log(result.length)
            if(result.length == 1) {
                result = result.reduce((rol)=> {return rol})
                return {success:true, message: result};
              }
       //   .then(result=>{
       else if(result.length > 1 )   
                return {success:true, message: result};
       else
                return {success: false , message: 'Branch is not found'};
                //elements: Object.keys(result).length
         //     }) 
          //    .catch(err=> {throw err})                         
        }catch(err){throw err}
      },
      async update_Branch (req,res){
        try{
            var branch = await this.search_For_Branch_EV(req,{_id: req.query._id})  //.catch(err=>{ throw err });
            if(branch.success){
            if(await Auth.authenticate_Access({branch: {proccess: true}},req.user.employee)){
                var Branch_Object = await this.create_Branch_Object(req);
                if(Branch_Object.branch_Id)  delete Branch_Object.branch_Id;
               // if(req.body._id) delete req.body._id;    
                var result = await Branch.findByIdAndUpdate(branch.message._id,{$set: Branch_Object},{new:true, runValidators:true, context:'query'})
          //   .then(result=>{
                if(result)  
                return await Respond.respond(req , res , {success: true, message: `Branch Id - ${branch.message.branch_Id} have been updated`});
                 else
                return await Respond.respond(req , res , {success: false, message: `Branch is not found`});
               //   })
            //  .catch(err=>{
            //     Respond.Property_Validator(err)
            //     .then(message=>{ this.respond(req,res,{status: false , message: message}) })
            //     .catch(err=>{throw err}) 
            //     })
                }
            else  
                  return await Respond.respond(req, res , {success: false, message: "attempt to update branch with out access"});
             }
            else
                return await Respond.respond(req , res , {success: false , message: ' Branch is not found'});  
        }catch(err){ throw err  }
    },
    async delete_Branch (req,res){
        try{  
            var branch = await this.search_For_Branch_EV(req)   //.catch(err=>{throw err });
            if(branch.success) {          
            if(await Auth.authenticate_Access({branch: {remove: true}},req.user.employee)){
            var result = await Branch.findByIdAndDelete(branch.message._id)
           // .then(result=>{
                if(result)  
                return await Respond.respond(req , res , {success: true, message: `Branch Id - ${branch.message.branch_Id} have been deleted`});
                else 
                return await Respond.respond(req , res , {success: false, message: `Branch is not found on database`});
            // })
            // .catch(err=>{throw err});
             }  
            else
                return await Respond.respond(req, res , {success: false , message: "attempt to delete a branch with out access"});
                                 }
        else
               return await Respond.respond(req , res , {success: false , message: 'Branch is not found'});
        }catch(err){  throw err }
    },
    async activate_Branch(req,res){
      try{
          var branch = await this.search_For_Branch_IV({_id: req.query._id})  //.catch(err=>{throw err});
           if(branch.success){
                 if(await Auth.authenticate_Access({branch: {proccess: true}},req.user.employee)){
          let branch_Object = {
              status: 'Activated'
          }
         var result = await Branch.findByIdAndUpdate(branch.message._id,{$set: branch_Object},{new: true, runValidators: true, context:'query'})
        // .then(result=>{
           if(result.length !== 0)
             return await Respond.respond(req , res , {success:true, message: `Branch - ${branch.message.branch_Name} is Activated`});
           else 
             return await Respond.respond(req , res , {success: false, message: 'Branch could not  be found'});     
      //                   })
      //    .catch(err=>{throw err})
                              }
                else//{
                    return await Respond.respond(req, res , {success: false , message: "attempt to activate a branch with out access"});
               // }
          }
           else //{
                  return await Respond.respond(req, res , {success: false, message: 'Branch is not found'});
                //}
           }  catch(err){ throw err }
                 },
    async deactivate_Branch(req,res){
       try{
        var branch = await this.search_For_Branch_IV({_id: req.query._id})
        if(branch.success){
          if(await Auth.authenticate_Access({branch: {proccess: true}},req.user.employee)){
   let branch_Object = {
       status: 'Deactivated'
   }
         var result = await Branch.findByIdAndUpdate(branch.message._id,{$set: branch_Object},{new: true, runValidators: true, context:'query'})
        // .then(result=>{
           if(result.length !== 0)
             return await Respond.respond(req , res , {success: true, message: `Branch - ${branch.message.branch_Name} is Deactivated`});
           else 
             return await Respond.respond(req , res , {success: false, message: 'Branch could not  be found'});     
      //                   })
      //    .catch(err=>{throw err})
                              }
                else//{
                    return await Respond.respond(req, res , {success: false , message: "attempt to deactivate a branch with out access"});
               // }
          }
           else //{
                  return await Respond.respond(req, res , {success: false, message: 'Branch is not found'});
              // }
          }  catch(err){ throw err }
    },
    async create_Branch_Object(req){
        try{
           // console.log(req.body);
           var branch = {
            branch_Id: req.body.branch_Id,
            branch_Name: req.body.branch_Name,
            address: req.body.address,
            phone_Number: req.body.phone_Number,
            status: req.body.status  
                   }
           Object.keys(branch).forEach(key=>branch[key] === undefined ? delete branch[key]: {})        
           return branch
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