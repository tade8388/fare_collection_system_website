
const Employee_credential = require('../Models/Employee_credential');
const Employee =require('../Models/Employee');
const bcrypt = require('bcryptjs');
const config = require('../../config/index');
const jwt = require('jsonwebtoken');
//const Role = require('./Role_Controller');
const Auth = require('../../helpers/authenticator');
const Respond = require('../../helpers/Response');

module.exports = {
     async register_Employee_Credential (id,role,req){ 
        try{  
         //  var message; 
         //   var return_message;
        //   var rol;
           var Employee_Credential_Object = await this.create_Employee_Credential_Object(req); 
         //  var role = await  Role.search_For_Role_IV({role_Name: Employee_Credential_Object.role})   //.then(result=>{
            // if(!role.success)  //{
            //     return {success: false , message: 'Role is not found'}
                    // } 
          //  else
            //     rol = result;
    //    }).catch(err=>{
    //         throw err
    //          })
          //   else{
                Employee_Credential_Object.employee = id ;
                Employee_Credential_Object.password = '0000';
                Employee_Credential_Object.role = role;
                Employee_Credential_Object.status = 'Activated'; 
            
            //     {
            //     employee: id,
            //     username: req.body.username,
            //     password: '0000',
            //     role: rol._id,
            //     status: 'Activated'
            // });            
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(Employee_Credential_Object.password, salt)   //.catch(err=>{throw err});
             Employee_Credential_Object.password = hash;
           //  console.log(Employee_Credential_Object);
             let employee_credential= new Employee_credential(Employee_Credential_Object)
              var result =  await Employee_credential.create(employee_credential)
            //    .then(result=>{
                   if(result)  //{
                      return {success: true , message: 'Employee credential registered'}
                            // }
                   else  
                        //    {
                      throw new Error('Employee credential account could not be created')  
//}         
                //  })
                //  .catch(async err=>{
                //     help.Property_Validator(err)
                //     .then(message=>{ return_message = message})
                //     .catch(err=>{throw err}) 
                //   await Employee.findByIdAndDelete(employee_credential.employee)
                //       .catch(err =>{throw err})
                //      })
              //   }
                //  else   //{
                //      return_message = {success: false, message: 'Role is not known'}
                   //  }
         //   return return_message
      }
                catch(error){
                    try{
                         await Employee.findByIdAndDelete(Employee_Credential_Object.employee)
                   //  if(!result.success)
                          throw error
                      }catch(err){throw err}
                }
                    //  }    
    },
    async search_For_Employee_Credential_EV (req, data ,  limit = 1 ,populate = 'employee role'){
        try{
        var employee = await this.search_For_Employee_Credential_IV(data,limit,populate)  //.catch(err=>{throw err}); 
        var user =  await this.search_For_Employee_Credential_IV({employee: req.user.employee}, limit,populate)  //.catch(err=>{throw err});
        console.log(employee.message)
      //  const employee = await Employee_credential.findOne({employee: req.query._id}).populate('employee role').catch(err=>{throw err})  
      //  const user =  await Employee_credential.findOne({employee: req.user.employee}).populate('role').catch(err=>{throw err}) 
       if(employee.success){
        if(Auth.authenticate_Access({employee: employee.message.role.role_Id, view: true}, req.user.employee)){ 
          if(employee.message.role.organization_Type == 'Platform_Provider' && user.message.role.role_Name != 'Super Administrator') 
              {

                  if(employee.message.employee.branch != user.message.employee.branch) 
                      return {success: false, message: 'Do not have access to view Employee'};
              }
              //console.log([employee.message].length)
              if([employee.message].length == 1  )   employee.message.password = undefined;
              else for(x in [employee.message])   {[employee.message][x].password = undefined}
              //employee.message = employee.message.reduce((emp)=> { delete emp.password;   return emp})  
             //console.log(employee)
             return employee
        }
        else{
            return {success: false, message: 'attempt to view an employee credential data with out access'};
        }
       } 
       else 
            return {success: false, message: 'Employee could not be found'};

       }catch(err){throw err}
     },
    async search_For_Employee_Credential_IV(data, limit = 1 ,populate = ''){
     try{
        var query_Object = {} 
       if(data.employee)
               query_Object.employee = data.employee;
       if(data.username)
               query_Object.username = data.username        
       if(data._id)
               query_Object._id = data._id
       if(data.status)
            query_Object.status = data.status
            if(populate == '')
              {
                 populate = 'employee role'
              }
       //console.log(query_Object)
       var result = await Employee_credential.find(query_Object)
                            .limit(limit)   
                           .populate(populate) 
                           .select('-createdAt -updatedAt -__v')  
       // console.log(result)        
       if(result.length == 1) {
        result = result.reduce((emp)=> {return emp})
        return {success:true, message: result};
      }
  //   .then(result=>{
  else if(result.length > 1 )   
        return {success:true, message: result};
  else
        return {success: false , message: 'Employee is not found'};                         
       }catch(err){throw err}         
                                           },
    async reset_Employee_Credential(req,res){
        try{
           
            employee = await this.search_For_Employee_Credential_EV(req , {employee: req.query._id})     //.catch(err=>{throw err});
           // console.log(employee)
            if(employee.success){
                if( await Auth.authenticate_Access({employee: employee.message.role.role_Id , proccess: true},req.user.employee)){
                    employee_credential = {};
                    let salt = await bcrypt.genSalt(10);
                    let hash = await bcrypt.hash('0000', salt);
                    employee_credential.password = hash; 
                  // console.log(employee.message.password)
                   var result = await Employee_credential.findByIdAndUpdate(employee.message._id,{$set: employee_credential},{new: true, runValidators: true , context:'query'})
                   // .then(result=>{
                  //   console.log(result.password)
                        if(result) 
                          return await Respond.respond(req, res,{success: true , message: `Employee Id - ${employee.message.employee.employee_Id} - credential have been reset`});
                       else 
                          return await Respond.respond(req, res,{success: false , message: `Employee Id - ${employee.message.employee.employee_Id} - have not been found`});
            //              })
            //  .catch( err=>{  
            //     help.Property_Validator(err)
            //     .then(message=>{ this.respond(req,res, message) })
            //     .catch(err=>{throw err})
            //             })     
                        }
                        else // {
                            return  await Respond.respond(req , res,{success: false , message: "attempt to reset an employee credential data with out access"});
                           // }
                       }  else //{
                                return await Respond.respond(req , res, employee);
                              // }
            }
            catch(err){ throw err; }  
    },
    async login_Employee(req,res){
        try{
            var user = {};
           if(req.body.username)
             user = await  this.search_For_Employee_Credential_IV({username:req.body.username}, 1 , 'role')
           //  .then(user=>{
                     
           //  })
            // const user = await Employee_credential.findOne({username:req.body.username}).populate('employee role').catch(err=>{
            //     throw err
            // });
            
       if(user.success) {
       /*  const role = await Role.findById(user.role).catch(err=>{
             throw err
         });*/
       //  console.log(user);
     //  if(user.status == 'Activated'){
      //  console.log('1') 
      //  console.log(req.body.password + '  ' + user.message.password)
       var isMatch  = await bcrypt.compare(req.body.password, user.message.password) //,(err,isMatch)=>{
            //  if(err)  this.respond( req, res , {success: false , message: "error on comparing employee credentials"})
              if(isMatch) {
                //  console.log('2')
            var result = await this.account_Activation_Checkup(user.message) 
            //   .then( result=>{
                 if(result.success) {         
                let token = await jwt.sign({
                      type: "employee",
                      data: {
                          _id: user.message._id,
                         // employee_Id_: user.employee.employee_Id,
                          username:  user.message.username,
                          role_Id: user.message.role.role_Id
                        }
                  }, config.JWT_SECRET,{ expiresIn: 43200})
                  let credential = {
                     // employee_Id: user.employee.employee_Id,
                      username: user.message.username,
                      role_ID: user.message.role.role_Id,
                      token: `jwt ${token}`,
                      expiresIn: 168
                                 }
                            //  console.log('1' +  credential) 
                           // help  
                        //   var x = await help.logparams(req,res)
                        //   console.log(x)
                         return await Respond.respond(req , res , {success: true , message: credential})
                    }
                    else 
                       return await Respond.respond(req,res, result)            
                     }
              else  //{
                return await Respond.respond(req, res , {success: false , message: 'Password do not match'});
                 //  }
             //  }); 
            }
            else    //{
                return await Respond.respond(req, res , {success: false , message: "Username does not exist"});
           // }
           //  })
            // else{
            //     return this.respond(req, res ,{success: false , message: "Username does not exist"});  
            // } 
        }catch(err){ throw err } 
             },
             async account_Activation_Checkup(user){
                try{  
                  var result = await  Employee.findById({_id: user.employee}).populate('organization branch')
                 //   .then(result=>{
                     //console.log(result.message.organization)
                        if(result)
                           {
                            // console.log(user)
                              if(user.status !== 'Activated')
                                   return {success: false , message: `Your account is ${user.status}`}
                              if (result.organization.status !== 'Activated')
                                   return {success: false , message: `Your Organization account is ${result.organization.status}`}
                              if(result.branch && result.branch.status !== 'Activated')
                                   return {success: false, message: `Your Branch account is ${result.branch.status}` }
                              return {success: true}                       
                           }
                          else 
                             return {success: false , messsage: 'Employee could not be found'} 
                    // })         
                    // .catch(err=>{throw err})
                }catch(err){throw err}   
               },
             async change_Employee_Credential(req,res){
                try{
                  var Employee_Credential_Object =  await this.create_Employee_Credential_Object(req)
                     if(Employee_Credential_Object.old_Password){
                    const user = await this.search_For_Employee_Credential_IV({employee:req.user.employee});
                    if(user.success) {    
                    var result = await bcrypt.compare(Employee_Credential_Object.old_Password, user.message.password)
                  //  .then(result=>{
                          if(result){ 
                            let salt = await bcrypt.genSalt(10);
                            let hash = await bcrypt.hash(Employee_Credential_Object.password, salt)   //.catch(err=>{throw err});
                             Employee_Credential_Object.password = hash;
                        //   .then(Employee_Credential_Object =>{
                           // changed_credentials = {};
                          //  if(Employee_Credential_Object.username !== user.username)  changed_credentials.username = Employee_Credential_Object.username;       
                          // console.log(Employee_Credential_Object) 
                          var employee = await Employee_credential.findByIdAndUpdate(user.message._id,{$set: Employee_Credential_Object},{new: true, runValidators: true, context:'query'})
                         //   .then(employee =>{
                                if(employee)   return await Respond.respond(req , res , {success: true, message:'Credential have been changed'});
                                else  return await Respond.respond(req, res , {success:false , message:'Credential have not been found'});
                                        //    })
                        //     .catch(async err=>{
                        //         help.Property_Validator(err)
                        //         .then(message=>{ this.respond(req,res, message) })
                        //         .catch(err=>{throw err})
                        //                       })
                        //       })
                        //    .catch(err=>{throw err});  
                                     }
                        else  //{
                            return await Respond.respond(req, res, {success: false , message: 'Old password is incorrect'});
                       // }
                    //        })
                    //   .catch(err=>{ throw err}) 
                    }
                    else//{
                        return await Respond.respond(req, res , {success: false , message:'Credential are not found'});
                    //}
                  }else//{
                        return await Respond.respond(req , res , {success: false , message:'Old password is not detected'});
                   // }
                }catch(err){   throw err}
             },
             async activate_Employee_Credential(req,res){
                try{
                    employee = await this.search_For_Employee_Credential_EV(req,{employee: req.query._id})  //.catch(err=>{throw err});
                   if(employee.success){   
                 if( await Auth.authenticate_Access({employee: employee.message.role.role_Id , proccess: true },req.user.employee)){
                    let employee_credential = {
                        status: 'Activated'
                    }
                   var result = await Employee_credential.findByIdAndUpdate(employee.message._id,{$set: employee_credential}, {new: true, runValidators: true, context:'query'})
                 //  .then(result=>{
                         if(result)
                             return await Respond.respond(req , res , {success:true, message: `Employee Id - ${employee.message.employee.employee_Id}  Credential Activated`});
                         else 
                             return await Respond.respond(req , res , {success: false, message: 'Employee Credential not found'});     
                //    })
                //    .catch(err=>{throw err})
                 }
                 else//{
                    return await Respond.respond(req, res , {success: false , message: "attempt to activate credentials with out access"});
               //  }
                }
                else //{
                    return await Respond.respond(req, res , {success: false, message: 'Employee is not found'});
                //}
                }  catch(err){ throw err }
             },
             async deactivate_Employee_Credential(req,res){
                try{
                 // console.log(req.query);
                    employee = await this.search_For_Employee_Credential_EV(req,{employee: req.query._id})  //.catch(err=>{throw err});
                 // console.log(employee)
                    if(employee.success){ 
                    if( await Auth.authenticate_Access({employee: employee.message.role.role_Id , proccess: true },req.user.employee)){ 
                    let employee_credential = {
                        status: 'Deactivated'
                    }
                   var result = await Employee_credential.findByIdAndUpdate(employee.message._id,{$set: employee_credential} , {new: true, runValidators: true, context:'query'})
                   //.then(result=>{
                    if(result)
                        return await Respond.respond(req , res , {success:true, message: `Employee Id - ${employee.message.employee.employee_Id}  Credential Deactivated`});
                    else 
                        return await Respond.respond(req , res , {success: false, message: 'Employee Credential not found'});      
                //    })
                //    .catch(err=>{throw err})
                }
                else//{
                    return await Respond.respond(req, res , {success: false , message: "attempt to deactivate employee credentials with out access"});
              //  }
               }
               else// {
                   return await Respond.respond(req, res , {success: false, message: 'Employee is not found'});
               //}
               }  catch(err){ throw err }
             },
             async delete_Employee_Credential(id){
                 try{ 
                var result = await Employee_credential.findOneAndDelete({employee: id})
               //  .then(result=>{
                    if(result) 
                               return true;
                    else     
                              return false;
            //      })
            //    .catch(err=>{throw err})
                  }catch(err){throw err}
             },
             async create_Employee_Credential_Object(req){
                try{
                var  employee_credential= {
                    username: req.body.username,
                    password: req.body.password,
                    old_Password: req.body.old_Password,
                    role: req.body.role
                };
                   Object.keys(employee_credential).forEach(key=>employee_credential[key] === undefined ? delete employee_credential[key]: {})      
                   return employee_credential
                  }
                  catch(err){throw err}         
            },
            // async respond (req, res,response_message){
            //     res.json(response_message)
            //     var message = await Auth.logparams(req,res)
            //   //  .then(message=>{
            //            message.success = response_message.success
            //            message.message = response_message.message
            //            logger.info(message);
            //                 //   })
            //   //  .catch(err=>{ throw err})
            //          return 
            // }      

      }