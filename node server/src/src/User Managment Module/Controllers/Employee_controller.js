

const Employee = require('../Models/Employee');
//const Employee_credential =require('../Models/Employee_credential');
const Employee_credential = require('./Employee_credential_controller');
//const Authentication = require('./Employee_credential_controller');
const Respond = require('../../helpers/Response');
const Auth = require('../../helpers/authenticator');
const utility = require('../../helpers/utility')
const Role = require('./Role_Controller');
//const Organization = require('../../Organization Module/Models/Organization');
const Organization = require('../../Organization Module/Controllers/Organization_controller');
//const Branch = require('../../Organization Module/Models/Branch');
const Branch = require('../../Organization Module/Controllers/Branch_controller');

const logger = require('../../config/logger');
const { populate } = require('../Models/Employee');
const { query } = require('express');
const { authenticate } = require('passport');
const { search } = require('../../Routers/Bus_Router');
//const { populate } = require('../Models/Employee');
module.exports = {
    async register_Employee (req,res){
    try{
     var Employee_Object = await this.create_Employee_Object(req)   //.catch(err=>{throw err});
  //   var rol;
     if(Employee_Object.role_Name){
     var role =  await  Role.search_For_Role_IV({role_Name: Employee_Object.role_Name})
       // if(role.messege == 'Administrator') 
      //  console.log(role.message.role_Type)
   //  .then(result=>{
        // if(role){
        //   //  rol = result;
        //     Employee_Object.role = role._id;     
        //           }
        // }).catch(err=>{
        // throw err
        //  })
    //    console.log(req.body);
      if(role.success)
                 {
       Employee_Object.role = role.message._id;              
      if(await Auth.authenticate_Access({employee: role.message.role_Id, proccess: true},req.user.employee)){
          var message = {}; 
     //     var org ;
        //  var errMessage;
             if(Employee_Object.organization_Name)
            var org =  await  Organization.Search_For_Organization_IV({organization_Name: Employee_Object.organization_Name})
     //    .then(result =>{
            
            if(org.success){
                //     org = result.message ;
                //     Employee_Object.organization = org.message._id; 
                // }else{
                   // message.organization =org.message;
                 //    }
        //   }).catch(err =>{
        //         throw err; 
        //   })
       //   if(!Employee_Object.profile_Picture)   message.profile_Picture = 'profile Picture could not be found'
          if(Employee_Object.profile_Picture){ 
                 Employee_Object.organization = org.message._id;    
                var user = await Employee.findOne(req.user.employee).populate('organization')   //.catch(err=>{throw err})  
                var employee = new Employee(Employee_Object);  
                  //console.log(role.message.organization_Type+ ' ' + org.message.organization_Type);
                  if(role.message.organization_Type != org.message.organization_Type )    
                       throw new Error(`${user.name.first_Name+' ' + user.name.last_Name+' ' + user.name.grand_Father_Name+ ' : '} Organization and role mismatch`)
                
                  if((role.message.organization_Type == 'Service_Provider' || role.message.organization_Type == 'Government') && role.message.role_Type != 'Administrator' ){
                       employee.organization = user.organization;
                       if(employee.branch_Name)  delete employee.branch_Name;   
                 }
                 if(org.message.organization_Type == 'Platform_Provider' && role.message.role_Name!= 'Super_Administrator'){ 
                       role = JSON.stringify(role);
                       role = JSON.parse(role);
                     if(role.message.role_Type == 'Administrator'){  
                           if(Employee_Object.branch_Name) {
                        var branch = await Branch.search_For_Branch_IV({branch_Name: Employee_Object.branch_Name})
                          //     .then(result=>{
                                    if(branch.success)    employee.branch = branch.message._id;
                                    else 
                                        throw new Error(`Branch provided for - ${user.name.first_Name+' ' + user.name.last_Name+' ' + user.name.grand_Father_Name+ ' : '} - does not exist`); 
                                     //   return await Respond.respond(req , res, branch);
                                 //   }
                                  }
                            //         })
                            //    .catch(err=>{throw err})
                        }
                     else
                             {  employee.branch = user.branch;   }                                       
                     if(!employee.branch)  //{
                             //  this.respond(req , res,{success: false , message: {'Branch': 'Branch was not aquired'}});
                               throw new Error(`${user.name.first_Name+' ' + user.name.last_Name+' ' + user.name.grand_Father_Name+ ' : '} Branch was not available`);      
                                         //  }
                            }                                                
         var result = await Employee.create(employee)
           //  .then(result=>{ 
                       if(result) {
                          var message = await Employee_credential.register_Employee_Credential(result._id,Employee_Object.role,req)
                            // .then(message=>{
                                  if(message.success == true)
                                          message.message = `Employee Id - ${employee.employee_Id} - registered`;
                                  else {
                                          await Employee.findByIdAndDelete(result._id)  //.catch(err =>{throw err})
                                          throw new Error('Wallet could not be created - Internal Error');
                                          // if(req.file)
                                          // await utility.delete_file(req.file.path)
                                  }
                                return await Respond.respond(req,res, message)    
                           }
                         else //{
                                return await Respond.respond(req,res, {success: false , message: 'Employee could not be created due to internal error'}) 
                      //   }           
                            //            })
                            //    .catch(err=>{ throw err  })
            //              })
            //   .catch(err=>{
            //          Respond.Property_Validator(err)
            //          .then(message=>{ this.respond(req,res, message) })
            //          .catch(err=>{throw err})  
            //              })                         
            }  
             else
               return await Respond.respond(req, res,{success: false , message: 'Profile picture could not be found'});
            }
            else  //{
                return await Respond.respond(req, res,org);
               // }
            }  else  //{
                return await Respond.respond(req, res,{success: false , message:"attempt to create an employee with out access"});
                   //   }
            }   else
                //{
                    return await Respond.respond(req, res,{success: false, message:'Role could not be found on database' }) ; 
          } else
                    return await Respond.respond(req, res,{success: false, message:'Role Info is not submitted' }) ;       
               //}
        }catch(err){ 
          var created_employee = await Employee.find(Employee_Object); 
           if(created_employee.length == 0 && req.file)
                  await utility.delete_file(req.file.path)  
          throw err} 
    },
   async view_Employee_Failed (req, data , limit=1 , populate=''){
       var credential = await  Employee_credential.search_For_Employee_Credential_IV({employee: req.user.employee}, 1 , 'role')
          
       var x = await Auth.authenticate_Access_deeper(credential.message.role._id , 'employee' , 'view')
      //  console.log(x)
       const query_Object = {};
      
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

             populate = [{
               path:'role',
               match: {
                role_Id: {$in: x},  
                     }
                         },
             {
              path:'employee',
              match: {
               query_Object  
                    }
            },    
              ]  

           var result = await Employee_credential.search_For_Employee_Credential_IV({},limit,populate)
         // console.log(result.message.length)
                   return result     
   } ,
   async view_Employee(req, data , limit=1 , populate=''){
     try{
       
    var credential = await  Employee_credential.search_For_Employee_Credential_IV({employee: req.user.employee}, 1 , 'role')
       
    var access_for = await Auth.authenticate_Access_deeper(credential.message.role._id , 'employee' , 'view')
   //  console.log(x)
      if(access_for) {
    var query_Object = {};
       //     query_Object.name["first_Name"] =  "CBFSE-16678LKf"
        if(data.name){    
        var name =  data.name.split(' ');
          if(name[0]) //{  //console.log(name[0])
                 query_Object['name.first_Name'] = { "$regex": name[0], "$options": "i" }
          if(name[1])
              query_Object['name.first_Name'] = { "$regex": name[1], "$options": "i" } 
                                            // }
         if(name[2])
             query_Object['name.first_Name'] = { "$regex": name[2], "$options": "i" }
                                   //}
            }
             if(access_for.length >= 1){
                   query_Object['Role.role_Id'] = {$in: access_for}
             }
             var project = {
                  '_id':1,
                  'name':1,
                  'email': 1,
                  'phone_Number': 1,
                  'address': 1,
                  'employee_Id': 1,
                  'profile_Picture': 1,
                  'organization_Name': '$Organization.organization_Name',
                  'organization_Id': '$Organization.organization_Id',
                  'branch_Name': '$Branch.branch_Name',
                  'branch_Id': '$Branch.branch_Id',
                  'username': '$Employee_credential.username',
                  'role_Name':'$Role.role_Name',
                  'role_Id':'$Role.role_Id',
             }
            var aggrigate= {
               lookup: 'Credential',
               lookup_role: 'Role',
               lookup_organization: "Organization",
               lookup_branch: "Branch",
               match: query_Object,
               limit: limit ,  
               project: project          
                     }
        //   populate = [{
        //     path:'role',
        //     match: {
        //      role_Id: {$in: x},  
        //           }
        //               },
        //   {
        //    path:'employee',
        //    match: {
        //     query_Object  
        //          }
        //  },    
        //    ]  
     //   console.log(aggrigate.match)
        var result = await this.Employee_Aggregate(aggrigate)
      // console.log(result.message.length)
                return result 
          }
       else
           return Respond.respond(req ,res , {success: false , message: 'Not allowed to view any employee'})  
    } 
    catch(err) {throw err}     
} , 
  async search_For_Employee_EV (req, data , limit=1, populate = 'organization branch'){
        try{
          // var credential = await  Employee_credential.search_For_Employee_Credential_IV({employee: req.user.employee}, 1 , 'role')
          
          // var x = await Auth.authenticate_Access_deeper(credential.message.role._id , 'employee' , 'view')
          // console.log(x)
          //  other = '$or: [{}]'

          // return x
          var result = await this.search_for_Employee_IV(data,limit,populate);
        // console.log(result)
          if(result.success){
            result = JSON.stringify(result);
            result = JSON.parse(result);
            if(!Array.isArray(result.message)) {
                result.message = [result.message]
            }
           //  console.log(result)
        var promises = await result.message.map(element => {
             return new Promise(async function (resolve,reject){
               var employee_populate =  [
                      {path:'employee' , populate: {path: 'organization'}},
                      {path:'role'}
                      ]
               var credential = await  Employee_credential.search_For_Employee_Credential_IV({employee: element._id}, 1 , employee_populate)
               //  .then(credential=>{
             //   console.log(credential)
               if(credential.success) {
               //  console.log(element)
               var available =  await  Auth.authenticate_Access({employee: credential.message.role.role_Id, view: true},req.user.employee)
               const user =  await Employee_credential.search_For_Employee_Credential_IV({employee: req.user.employee}, limit , employee_populate) 
              //  .then(available =>{
                      if(available == true){

                       // console.log(user);
                       // console.log(credential);
                       // result.map(element => {roles: credential.role.role_Name});
                      // console.log(credential.role.role_Id);  
                      if(credential.message.role.organization_Type == 'Platform_Provider' && user.message.employee.branch) 
                      {
                          //    console.log('in')
                          if(credential.message.employee.branch != user.message.employee.branch) 
                             resolve(null)
                      }
                      if(user.message.role.organization_Type !== 'Platform_Provider') 
                      {
                        //console.log(credential.message)
                        //console.log(user.message)
                          if(credential.message.employee.organization.organization_Name !== user.message.employee.organization.organization_Name ) 
                             resolve(null)
                      }
                    // return {success: true, message: employee};
                      element.role = credential.message.role.role_Name;
                      element.organization = element.organization.organization_Name
                     
                     // delete element.organization ;
                     // element.organization = organization
                    // console.log(credential.role.role_Name);
                     // console.log(element.organization);
                     if(element.branch)
                             element.branch = element.branch.branch_Name
                           //  console.log(element.organization)
                       resolve(element);
                       return element
                        }
                      else{ 
                       resolve(null)
                     }
                    }
                     //}).catch(err=>{throw err})
                     //  console.log(element.name +  element.roles);
               //        }).catch(err=>{ throw err})
               //   }).catch(err=>{throw err})
                      // console.log(credential)
                   //    console.log(credential.role.role_Name +'    '+ credential.username);  
             })
           });    
                 var data = await Promise.all(promises)  //.then(data =>{ 
                 data = await data.filter(Boolean);  
                 //console.log(data.length == 1)   
                 if(limit == 1 && data.length == 1 )
                      {
                          data = await data.reduce((emp)=> {return emp})  
                          return {success:true,  message: data};
                      }
                 else if( data.length > 0) 
                          return {success:true,  message: data};    
                 else 
                        return {success: false, message: 'Employee viewing is out of access'}                
             //  }).catch(err=>{ throw err})
                       
            /* for(employee in result) {
                       var credential =  await Employee_credential.findOne({employee: element._id}).populate('role').catch(err=>{throw err})
                 if(await Auth.authenticate_Access({employee: credential.role.role_Id, view: true},req.user.employee))
                 {
                 element.role = credential.role.role_Name;
                 console.log(credential.role.role_Name);
                 }
                 console.log(element.role);       
                                    }   */  
                 }
                 else
                    return {success:false ,  message: 'No Employee have been found'};
         
         
         
         
      //     const employee = await Employee_credential.Search_For_Employee_Credential_IV(req,data,limit,populate)   //.catch(err=>{throw err}); 
      //       const user =  await this.Search_For_Employee_Credential_IV({employee: req.user.employee}, limit,populate)       //.catch(err=>{throw err});     
      // //  const employee = await Employee_credential.findOne({employee: req.query._id}).populate('employee role').catch(err=>{throw err})  
      //  // const user =  await Employee_credential.findOne({employee: req.user.employee}).populate('role').catch(err=>{throw err}) 
      //  if(employee.success){
      //   if(Auth.authenticate_Access({employee: employee.message.role.role_Id, view: true}, req.user.employee)){ 
      //     if(employee.message.role.organization_Type == 'Platform_Provider' && user.message.role.role_Name != 'Super_Administrator') 
      //         {
      //             if(employee.message.employee.branch != user.message.employee.branch) 
      //                 return {success: false, message: null};
      //         }
      //        return {success: true, message: employee};
      //   }
      //   else{
      //       return {success: false, message: null};
      //   }
      //  } 
      //  else 
      //       return {success: false, message: null};

       }catch(err){throw err}
  },
  async update_Employee (req,res){
    try{
        employee = await Employee_credential.search_For_Employee_Credential_IV({employee: req.query._id},1,'employee role')   //.catch(err=>{ throw err });
        //console.log(employee.message)
        if(employee.success){
        if( await Auth.authenticate_Access({employee: employee.message.role.role_Id, proccess: true},req.user.employee)){ 
            var Employee_Object = await this.create_Employee_Object(req);
            if(Employee_Object.organization) delete Employee_Object.organization;
            if(Employee_Object.employee_Id)  delete Employee_Object.employee_Id;
            if(Employee_Object.branch_Name) delete Employee_Object.branch_Name;
         //   if(Employee_Object.first_Name)     req.body['name.first_Name']= Employee_Object.first_Name;
         //   if(Employee_Object.last_Name)    req.body['name.last_Name'] = Employee_Object.last_Name;
         //   if(Employee_Object.grand_Father_Name)    req.body['name.grand_Father_Name'] = Employee_Object.grand_Father_Name;
            // if(Employee_Object.role) {
            //        role   =  await  Role.search_For_Role_IV({role_Name: Employee_Object.role})
            //     //    if(role.success) 
            //     //          Employee_Object.role = role.message.role_Id 
            //                                         //   .catch(err=>{
            //                                         //              throw err
            //                                         //                }) 
            //    if(role.success)     return this.respond(req, res,{success:false, message:'role does not exist'});
            //  if(await Auth.authenticate_Access({employee: role.message.role_Id, proccess: true},req.user.employee))
            //         Employee_Object.role = Employee_Object.role._id;   
            //  else 
            //          return this.respond(req, res,{success:false, message:'User do not have access to the role to update'});                                                              
            // }    
             
          //  console.log(Employee_Object)   
          var result = await Employee.findByIdAndUpdate(employee.message.employee,{$set: Employee_Object},{new: true, runValidators: true, context:'query'})
          //  .then(result=>{
               if(result) 
                   return await Respond.respond(req, res,{success: true , message: `Employee Id - ${employee.message.employee.employee_Id} - updated`});
               else 
                   return await Respond.respond(req, res,{success: false , message: `Employee Id - ${employee.message.employee.employee_Id} - have not been found`});
            //              })
            //  .catch( err=>{  
            //     Respond.Property_Validator(err)
            //     .then(message=>{ this.respond(req,res, message) })
            //     .catch(err=>{throw err})
            //             })     
              }
          else  
               return await Respond.respond(req , res,{success: false , message: "attempt to update an employee data with out access"});
           }  
          else 
              return await Respond.response(req , res,{success: false , message: "The employee provided does not exist"});
    }catch(err){
      if(!result && req.file)
      //{
        await utility.delete_file(req.file.path)
      throw err   }
},
async delete_Employee_EV(req,res){
    try{        
        employee = await this.search_For_Employee_EV(req, {employee: req.query._id}); 
        if(employee.success){ 
        if( await Auth.authenticate_Access({employee: employee.message.role.role_Id, remove: true},req.user.employee)){
        //  var result = await Employee.findByIdAndDelete(req.query.id)   //.then(result =>{
        //    if(result)
          //      {     
                  var credential = await Employee_credential.delete_Employee_Credential(employee._id) //.then(credential=>{
                      if(credential)
                         {
                              var result = this.delete_Employee_IV({employee: req.query._id}) 
                              if(result.success)
                                 return await Respond.respond(req , res,{success: true, message:'Employee have been successfully deleted'})
                              else
                                 throw new Error('Employee Credential has been deleted but the Employee Information could not be deleted');
                         } 
                      else 
                          return await Respond.respond(req , res,{success: false, message:'Employee credential have not been found'});   
                //  }).catch(err=> {throw err})
                // }
                // else{
                //     return await Respond.respond(req , res,{success: false, message:'Employee is not found'});
                // }
        // }).catch(err=>{
        //     throw err
        // })
     }
    else 
         return await Respond.respond(req , res,{success: false , message: "attempt to delete an employee with out access"});
     }
    else
         return await Respond.respond(req , res,{success: false , message: "The employee does not exist"}); 
    }catch(err){  throw err }
},


async find_Employee(req, res , limit = 1 , type){
   try {
        var employee  //= await this.search_For_Employee_EV(req , req.query , limit , populate) 
          if(type == 1)
                   employee = await this.view_Employee(req , req.query , limit)
          else
                   employee = await this.search_For_Employee_EV(req , req.query , limit)
         //      .then(employee=>{  
                return await Respond.respond(req,res , employee)       
            //                  })
            //    .catch(err=>{throw err})
   } 
   catch (error) {  throw error}
},
// async search_for_Employee_IV_d(data, limit,populate){
//     try{
//     var x = await Employee.find(data).limit(limit).populate(populate)//.select('name phone_Number address employee_Id ')  
//     return {success: true , message: x}
//     }catch(err){throw err}
// },
async search_for_Employee_IV(data , limit = 1 , populate = 'organization'){
    try{
     const query_Object = {};
    // var result;
  //   const user = await Employee.findById(req.user.employee).populate('organization').catch(err=>{throw err})
     //  req.query = JSON.stringify(req.query);
     //  req.query = JSON.parse(req.query);

    // console.log(Object.keys(req.query).length !== 0);
    // if(data){
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
     if(data.organization) 
       {
          var organization = await Organization.Search_For_Organization_IV({_id: data.organization}) //.catch(err=>{
        //        throw err;
        //   })
           if(organization.success)       
                   query_Object.organization = organization.message._id;
       } 
     if(data.branch){
         var branch = await Branch.search_For_Branch_IV({_id: data.branch})  //.catch(err =>{throw err})
         if (branch.success)  query_Object.branch = branch.message._id;
       }  
    //  if(data.role_Id){
    //     var role = await Role.search_For_Role_IV({role_Id: data.role_Id})
    //           // .catch(err=>{  throw err  })     
    //     if(role.success)
    //         query_Object.role = role.message._id;
    //      } 
     if(data.employee_Id)
          query_Object.employee_Id = data.employee_Id;  
     if(data._id)
          query_Object._id = data._id                  
       //  query_Object.role = '5e5ce6e026edff8f28901877'   
       //  console.log(query_Object)      
     var result = await Employee.find(
        query_Object
     ,null ,
      {sort:{
           'name.first_Name': 1,
           'name.last_Name': 1,
           'name.grand_Father_Name': 1
      }})
      .populate(populate)
      .limit(limit)
      .select('-createdAt -status -updatedAt -__v')
    //  .catch(err=>{
      //      throw err
       //              })    
    //                 console.log(query_Object);
          
     //  }
   // console.log(result)
   //   console.log(result.organization) 
     if(result.length == 1) {
      result = result.reduce((emp)=> {return emp})
    
      return {success:true, message: result};
    }
//   .then(result=>{
else if(result.length > 1 )   
      return {success:true, message: result};
else
      return {success: false , message: 'Employee is not found'};
    // else {
    //          result = await Employee.find({}).populate(populate).select('name phone_Number address employee_Id ').catch(err=>{ throw err })
    //      }
    //      if(result){
    //      result = JSON.stringify(result);
    //      result = JSON.parse(result);
    //  var promises = await result.map(element => {
    //       return new Promise(async function (resolve,reject){
    //         var credential = await  Employee_credential.Search_For_Employee_Credential_IV({employee: element._id}, 1 , 'role')
    //         //  .then(credential=>{
    //         var available =  await  Auth.authenticate_Access({employee: credential.message.role.role_Id, view: true},req.user.employee)
    //        //  .then(available =>{
    //                if(available == 'true'){
    //                  // console.log(credential);
    //                 // result.map(element => {roles: credential.role.role_Name});
    //                // console.log(credential.role.role_Id);  
    //                element.roles = credential.message.role.role_Name;
    //                element.organization = element.organization.organization_Name
                  
    //               // delete element.organization ;
    //               // element.organization = organization
    //              // console.log(credential.role.role_Name);
    //               // console.log(element.organization);
    //               if(element.branch)
    //                       element.branch = element.branch.branch_Name
    //                     //  console.log(element.organization)
    //                 resolve(element);
    //                 return element
    //                  }else{ 
    //                 resolve(null)
    //               }
    //               //}).catch(err=>{throw err})
    //               //  console.log(element.name +  element.roles);
    //         //        }).catch(err=>{ throw err})
    //         //   }).catch(err=>{throw err})
    //                // console.log(credential)
    //             //    console.log(credential.role.role_Name +'    '+ credential.username);  
    //       })
    //     });    
    //           var data = await Promise.all(promises)  //.then(data =>{ 
    //           data = await data.filter(Boolean);       
    //           return {success:true,  message: data};
    //       //  }).catch(err=>{ throw err})
                    
    //      /* for(employee in result) {
    //                 var credential =  await Employee_credential.findOne({employee: element._id}).populate('role').catch(err=>{throw err})
    //           if(await Auth.authenticate_Access({employee: credential.role.role_Id, view: true},req.user.employee))
    //           {
    //           element.role = credential.role.role_Name;
    //           console.log(credential.role.role_Name);
    //           }
    //           console.log(element.role);       
    //                              }   */  
    //           }
    //           else
    //              return {success:false ,  message: 'No Employee have been found'};
   }
     catch(err){ throw err }
},
async Employee_Aggregate(data){
  try{
     var group_Id = {} , sort_Id = {} , lookup = {}, lookup_role = {}, lookup_organization={}, lookup_branch ={}  , group = {} , sort = {} ,match = {} , limit = {} , project ={}
     var   unwind_lookup = {} ,   unwind_lookup_role = {} , unwind_lookup_organization = {},     unwind_lookup_branch= {}
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
     if(data.lookup && data.lookup == "Credential") 
           { lookup =   {"$lookup" : { "from" : "Employee Access Information" , "localField" : "_id" , "foreignField" : "employee" , "as": "Employee_credential"}},
             unwind_lookup  =   {$unwind : "$Employee_credential"}
           }
     if(data.lookup_role && data.lookup_role == "Role") 
         {  lookup_role =            {"$lookup" : { "from" : "Role" , "localField" : "Employee_credential.role" , "foreignField" : "_id" , "as": "Role"}},
            unwind_lookup_role =                {$unwind : "$Role"}
          }               
     if(data.lookup_organization && data.lookup_organization == "Organization") 
             {    lookup_organization =   {"$lookup" : { "from" : "Organization" , "localField" : "organization" , "foreignField" : "_id" , "as": "Organization"}},
                  unwind_lookup_organization   =        {$unwind : "$Organization"}
                         }
     if(data.lookup_branch && data.lookup_branch == "Branch") 
       {      lookup_branch =    {"$lookup" : { "from" : "Branch" , "localField" : "branch" , "foreignField" : "_id" , "as": "Branch"}}, 
              unwind_lookup_branch =    {$unwind : "$Branch"}
          }    
       if(data.match)
        var match = {"$match" : data.match }
       if(data.limit)
        var limit = {"$limit" : data.limit } 
        if(data.project)
        var limit = {"$project" : data.project }     
   var  query =  [     
      lookup,
      unwind_lookup,
      lookup_role,
      unwind_lookup_role,
      lookup_organization,
      unwind_lookup_organization,
      lookup_branch,
     // unwind_lookup_branch,
      match,
      group,        
      sort, 
      limit, 
      project      
               ]
    var filtered_query =  query.filter(element => {
      return Object.keys(element).length > 0 
  })       
                 
  //  console.log(filtered_query)       
    var result =  await Employee.aggregate(filtered_query)    

    if(data.total) 
          {
              var total = 0;
              for(i=0 ; i<result.length ; i++)
                   total += result[i].count
              result.push({"_id": "total" , "count": total})     
          }
      return {success:true, message: result};
    }catch(err){throw err}
},
async delete_Employee_IV(data){
  try{        
      employee = await this.search_for_Employee_IV(req, data); 
      if(employee.success){ 
    //  if( await Auth.authenticate_Access({employee: employee.message.role.role_Id, remove: true},req.user.employee)){
        var result = await Employee.findByIdAndDelete(req.query.id)   //.then(result =>{
          if(result)
                   return {success: true , message: result}
              else{
                  return {success: false, message:'Employee is not found'};
              }
      // }).catch(err=>{
      //     throw err
      // })
 // }
  // else 
  //      return await Respond.respond(req , res,{success: false , message: "attempt to delete an employee with out access"});
  }
  else
       return {success: false , message: "The employee does not exist"}; 
  }catch(err){  throw err }
},
async create_Employee_Object(req){
    try{
       // console.log(req.body);
    var employee= {
        name:{
            first_Name: req.body.first_Name,
            last_Name: req.body.last_Name,
            grand_Father_Name: req.body.grand_Father_Name}, 
        email: req.body.email,   
        phone_Number: req.body.phone_Number,
        address: req.body.address,
        employee_Id: req.body.employee_Id,
        organization_Name: req.body.organization_Name, 
        role_Name: req.body.role_Name,
        branch_Name: req.body.branch_Name
               };
       if(req.file){
        employee.profile_Picture =  req.file.path   
       } 
       Object.keys(employee).forEach(key=>employee[key] === undefined ? delete employee[key]: {})   
   //   console.log('oooooooooooo')
    //  console.log(employee)     
        console.log(req.file)    
    return {}
       return employee
      }
      catch(err){throw err}         
},
// async respond (req,res,response_message){
//   res.json(response_message)
//   Respond.logparams(req,res)
//   .then(message=>{
//          message.success = response_message.success
//          message.message = response_message.message
//          logger.info(message);
//                  })
//   .catch(err=>{ throw err})
//        return 
// },
}
   