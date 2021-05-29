
//const Employee_credential = require('../../User Managment Module/Models/Employee_credential');
const Wallet = require('../Models/Wallet');
//const wallet_Controller = require('../Controllers/Wallet_controller')
//const Customer = require('../../User Managment Module/Models/Customer');
const bcrypt = require('bcryptjs');
const config = require('../../config/index');
const jwt = require('jsonwebtoken');
const Respond = require('../../helpers/Response');
const Auth = require('../../helpers/authenticator');
const Wallet_controller = require('../Controllers/Wallet_controller');
const wallet_refresh_token = require('../Models/Wallet_refresh_token');
//const Employee_credential = require('../../User Managment Module/Models/Employee_credential');



module.exports = {
    async register_Wallet_Credential (id, body ,req){   
        try{
           // var return_message;
           var wallet_Credential_Object = await this.create_Wallet_Credential_Object(req);
           //console.log(wallet_Credential_Object.User_access_type)
           let wallet= new Wallet(wallet_Credential_Object);   
            wallet.customer = id;
         //   console.log(wallet.user_access_type)
            if(wallet.user_access_type){
                 if(wallet.user_access_type.includes('Both'))
                      wallet.user_access_type = ["Mobile", "Card"];
            
                 if(!wallet.user_access_type.includes('Mobile') ){
                wallet.password = '0000';
                wallet.username =  body.customer_Id;   
                       }
                 else{
                    if(!wallet.password)
                        //console.log(wallet)
                       if(!wallet.username || !wallet.password)  
                       //   {
                            throw new Error(`User name or Password could not be found while creating customer`)
                         // }
                 }
                 let salt = await bcrypt.genSalt(10);
                 let hash = await bcrypt.hash(wallet.password, salt);
                 wallet.password = hash;    
          //   console.log(wallet)         
    var result = await Wallet.create(wallet) 
    //.then(result=>{
        if(result)//{
          return {success: true}; 
                  //}
        else  
        //  {
            throw new Error('Wallet account could not be created')  
              
        
        }
       else //{
    //    {
           throw new Error('User access type could not be found')  
           // }  

       //   }          
    //   })
    //   .catch(async err=>{
    //     Respond.Property_Validator(err)
    //     .then(message=>{ return_message = message})
    //     .catch(err=>{throw err})
      
    //        .catch(err =>{ throw err })    
    //       })
   //   return return_message
        }
        catch(err){
            try{

         //       await Customer.findByIdAndDelete(id);
             //   console.log(c)
                throw err    
            }catch(err){throw err}
          //  throw err
        }
    },
    // async search_For_Wallet_EV (req){
    //     try{
    //         const customer = await Wallet.findOne({customer: req.query._id}).populate('customer')   //.catch(err=>{throw err})  
    //        // const user =  await Employee_credential.findOne({employee: req.user.employee}).populate('role').catch(err=>{throw err}) 
    //        if(customer){
                
    //            if( await Auth.authenticate_Access({customer: customer.type , view: "true" },req.user.employee)){
    //                 return {success: true, message: customer}; 
    //                    }
    //            else{ return {success: false, message: null}; }
                  
    //                   }
    //         else return {success: false, message: null}; 
    //     }catch(err){
    //         throw err
    //     }
    //  },
    // async search_For_Wallet_IV(data , limit = 1 , populate = ){

    // } 
    async reset_Wallet_credential(req,res){
        try{
         var customer = await  Wallet_controller.search_For_Wallet_IV({customer: req.query._id})   //.catch(err=>{throw err});
        // console.log(customer)
         if(customer.success){
            if( await Auth.authenticate_Access({customer: customer.message.customer_type , proccess: true },req.user.employee) ){
            var reset_credential = {};
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash('0000', salt);
            reset_credential.password = hash;
         //   console.log(reset_credential)  
            var result = await Wallet.findByIdAndUpdate(customer.message._id,{$set: reset_credential},{new: true, runValidators: true , context:'query'})
           // .then(result =>{
         //   console.log(result)
            if(result) 
                return await Respond.respond(req, res,{success: true , message: `Username - ${customer.message.username} - credential have been reset`});
            else 
                 return await Respond.respond(req, res,{success: false , message: `Username - ${customer.message.username} - have not been found`});
        //               })
        //   .catch(err=>{
        //     Respond.Property_Validator(err)
        //     .then(message=>{ this.respond(req,res, message) })
        //     .catch(err=>{throw err})
        //             }); 
         }
         else  //{
            return await Respond.respond(req , res,{success: false , message: "attempt to reset a customer credential data with out access"});
             //   }
        }
          else //{
             return await Respond.respond(req, res,{success: false , message: "The Customer does not exist"});
             // }
          }
          catch(err){  throw err   }  
    },
    async login_Customer(req,res){
        try{

        const user = await Wallet.findOne({username:req.body.username}).populate('customer')   //.catch(err=>{throw err}); 
       // console.log(user)
      if(user) {
          if(user.status == 'Activated' ){
              if(user.user_access_type.includes('Mobile')) {
          var isMatch =  await bcrypt.compare(req.body.password, user.password ) //,(err,isMatch)=>{
          //    if(err)  console.log("error on comparing customer wallet");
              if(isMatch) {
             let token = jwt.sign({
                      type: "customer",
                      data: {
                          _id: user._id,
                          customer_Id: user.customer.customer_Id,
                          username:  user.username
                        }
                  }, config.JWT_SECRET,{expiresIn: '2h'} )
             let refresh_token = jwt.sign({
                    type: "customer",
                    data: {
                        _id: user._id,
                        customer_Id: user.customer.customer_Id,
                        username:  user.username
                      }
                }, config.JWT_SECRET_REFRESH,{expiresIn: '1d'} )  
                refresh_Token_Object = {
                  token: refresh_token,
                  wallet: user._id,
                 // timestamp: 
                }
                var result = await wallet_refresh_token.create(refresh_Token_Object); 
               // if(result) { 
                 if(!result)
                     throw new Error('Refresh Token could not be created')
                  let output = {
                      customer_Id: user.customer.customer_Id,
                      username: user.username,
                      token: `jwt ${token}`,
                      refresh_token: refresh_token
                     // expiresIn: 168
                               }
                  return await Respond.respond(req , res , {success: true , messsage: output})
                  }
              else  //{
                   return await Respond.respond(req, res , {success: false , message: 'Password do not match'});
                  }
                  else  //{
                       return await Respond.respond(req, res , {success: false , message: 'Customer does not have access to website'});
                 //  }
           //    }); 
            }
            else  //{
                return await Respond.respond(req, res , {success: false , message: `Your account is ${user.status}`});
           // }
             }
            else  //{
                return await Respond.respond(req, res ,{success: false , message: "Username does not exist"});  
            //}
      }      
    catch(err){ throw err }         
},
async refresh_access_token(req,res){
 //  console.log(req.headers['refresh_token'])
  var token = req.headers['refresh_token'];
   if(token){ 
   var result = await wallet_refresh_token.findOne({token: token })
   if(result) {
    //  result =  result.reduce((ref)=> { return ref})
      var payload =  jwt.verify(token,config.JWT_SECRET_REFRESH);
      console.log(payload);
  
  
   const user = await Wallet_controller.search_For_Wallet_IV({_id: result.wallet},1,'customer')   //.catch(err=>{throw err}); 
  if(user) {
      if(user.message.status == 'Activated'){
    //  var isMatch =  await bcrypt.compare(req.body.password, user.password ) //,(err,isMatch)=>{
      //    if(err)  console.log("error on comparing customer wallet");
    //      if(isMatch) {
         let token = jwt.sign({
                  type: "customer",
                  data: {
                      _id: user.message._id,
                      customer_Id: user.message.customer.customer_Id,
                      username:  user.message.username
                    }
              }, config.JWT_SECRET,{expiresIn: '2h'} )
              let output = {
                  customer_Id: user.message.customer.customer_Id,
                  username: user.message.username,
                  token: `jwt ${token}`,
                //  expiresIn: 168
                           }
              return await Respond.respond(req , res , {success: true , messsage: output})
                          }
              else  //{
                return await Respond.respond(req, res , {success: false , message: `Your account is ${user.message.status}`});
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
async change_Wallet_Credential(req,res){
    try{
         var wallet_Credential_Object = await this.create_Wallet_Credential_Object(req);
       if(wallet_Credential_Object.old_Password){
        const user = await Wallet_controller.search_For_Wallet_IV({customer:req.user.customer})  //.catch(err=>{throw err});
        if(user.success) {       
        var isMatch = await bcrypt.compare(wallet_Credential_Object.old_Password, user.message.password)
            //.then(result=>{
              if(isMatch){
              customer_credential = {};
              if(wallet_Credential_Object.username)
                  customer_credential.username = wallet_Credential_Object.username;
             // customer_credential.password = wallet_Credential_Object.password;
              if(wallet_Credential_Object.password)  
              {
                 let salt = await bcrypt.genSalt(10);
                 let hash = await bcrypt.hash(wallet_Credential_Object.password, salt);
                 customer_credential.password = hash;
              }
              var customer = await Wallet.findByIdAndUpdate(user.message._id,{$set: customer_credential},{new:true , runValidators:true, context:'query'})
               // .then(customer =>{
              // console.log(customer_credential)   
               if(customer)    return await Respond.respond(req , res , {success: true, message:`Credential have been changed`});
                    else   return await Respond.respond(req, res , {success:false , message:'Credential have not been found'});
                //                             })
                // .catch(async err=>{
                //      Respond.Property_Validator(err)
                //     .then(message=>{ this.respond(req,res, message) })
                //     .catch(err=>{throw err})
                //                  })
                        }
                else//{
                    return await Respond.respond(req, res, {success: false , message: 'Old password is incorrect'});
                   // }
                    //       })
                    //  .catch(err=>{ throw err}) 
                    }
                    else//{
                        return await Respond.respond(req, res , {success: false , message:'Credential are not found'});
                  //  }
                  }else//{
                    return await Respond.respond(req , res , {success: false , message:'Old password is not detected'});
                    //}
                }catch(err){   throw err}
 },
 async Activate_Wallet(req,res){
    try{
        var customer = await Wallet_controller.search_For_Wallet_IV({customer: req.query._id},1,'customer')  //.catch(err=>{throw err});
         if(customer.success){
            if( await Auth.authenticate_Access({customer: customer.message.customer_type , proccess: true },req.user.employee)){
        let wallet = {
            status: 'Activated'
        }
       var result = await Wallet.findByIdAndUpdate(customer.message._id,{$set: wallet},{new: true, runValidators: true, context:'query'})
      // .then(result=>{
         if(result.length !== 0)
           return await Respond.respond(req , res , {success:true, message: `Customer - ${customer.message.customer.customer_Id}  Credential Activated`});
         else 
           return await Respond.respond(req , res , {success: false, message: 'Customer Credential not found'});     
    //                   })
    //    .catch(err=>{throw err})
                            }
              else//{
                  return await Respond.respond(req, res , {success: false , message: "attempt to activate Customer credentials with out access"});
             // }
        }
         else //{
                return await Respond.respond(req, res , {success: false, message: 'Customer is not found'});
              //}
         }  catch(err){ throw err }
               },
 async Suspend_Wallet(req,res){
     try{
        var customer = await Wallet_controller.search_For_Wallet_IV({customer: req.query._id},1,'customer')//.catch(err=>{throw err});
        if(customer.success){
       let wallet = {
           status: 'Suspended'
       }
      var result = await Wallet.findByIdAndUpdate(customer.message._id,{$set: wallet},{new: true, runValidators: true, context:'query'})
    //  .then(result=>{
       if(result.length !== 0)
           return await Respond.respond(req , res , {success:true, message: `Customer Id - ${customer.message.customer.customer_Id}  Credential Suspended`});
         else 
          return await Respond.respond(req , res , {success: false, message: 'Customer Credential not found'});     
    //                  })
    //   .catch(err=>{throw err})
                           }
        else //{
               return await Respond.respond(req, res , {success: false, message: 'Customer is not found'});
             //}
        }  catch(err){ throw err }
  },
  async Deactivate_Wallet(req,res){
     try{
        var customer =await  Wallet_controller.search_For_Wallet_IV({customer: req.query._id},1,'customer')//.catch(err=>{throw err});
        if(customer.success){
           if( await Auth.authenticate_Access({customer: customer.message.customer_type , proccess: true },   req.user.employee)){
       let wallet = {
           status: 'Deactivated'
       }
      var result = await Wallet.findByIdAndUpdate(customer.message._id,{$set: wallet},{new: true, runValidators: true, context:'query'})
     // .then(result=>{
      //   console.log(customer)
       if(result.length !== 0)
       return await Respond.respond(req , res , {success: true, message: `Customer Id - ${customer.message.customer.customer_Id}  Credential Deactivated`});
       else 
       return await Respond.respond(req , res , {success: false, message: 'Customer Credential is not found'});     
    //                  })
    //   .catch(err=>{throw err})
                           }
             else  //{
                return  Respond.respond(req, res , {success: false , message: "attempt to deactivate Customer credentials with out access"});
         //    }
              }
        else //{
               return await Respond.respond(req, res , {success: false, message: 'Customer is not found'});
            // }
        }  catch(err){ throw err }
  },
//   async find_Wallet (req, res , limit = 1){   
//     try{
//   //     const customer = await Wallet.search_For_Wallet_IV({customer: req.query._id}, 1 , 'customer')  //.catch(err=>{throw err});  
//   //    // const user =  await Employee_credential.findOne({employee: req.user.employee}).populate('role').catch(err=>{throw err}) 
//   //    if(customer){
          
//   //        if( await Auth.authenticate_Access({customer: customer.type , view: "true" },req.user.employee)){
//   //             return {success: true, message: customer}; 
//   //                }
//   //        else{ return {success: false, message: null}; }
            
//   //               }
//   //     else return {success: false, message: null}; 
// //   try {

//   var wallet = await this.search_For_Wallet_EV(req,  req.query , limit )
//   //   .then(route=>{  
//         return await Respond.respond(req,res , wallet )       
//      //               })     
//            //               })
//            // .catch(err=>{throw err})
//    //    }
//   // catch (error) {  throw err}
//   }catch(err){ throw err }
// },
// async search_For_Wallet_EV(req, data , limit = 1 ){
//     try{
//         var wallet = await this.search_For_Wallet_Iv(data, limit)   //.catch(err=>{throw err});  
//        // const user =  await Employee_credential.findOne({employee: req.user.employee}).populate('role').catch(err=>{throw err}) 
//        if(wallet.success){
//         wallet = JSON.stringify(wallet);
//         wallet = JSON.parse(wallet);
//         if(!Array.isArray(wallet.message)) {
//             wallet.message = [wallet.message]
//         }
//             wallet.message = await wallet.message.filter(async element=> 
//             { if( await Auth.authenticate_Access({customer: element.customer_type , view: "true" },req.user.employee))
//                          return element
//             })
            
//             if(limit == 1 && wallet.message.length == 1 )
//             {
//                 wallet.message = await wallet.message.reduce((cus)=> {return cus})  
//                 return wallet
//             }
//        else if( wallet.message.length > 0) 
//                 return wallet;    
//        else 
//               return {success: false, message: 'Customer viewing is out of access'}
//         //    return customer     
//         // if( await Auth.authenticate_Access({customer: customer.type , view: "true" },req.user.employee))
//         //          return await Respond.response(req, res , {success: true , message: result });
//         }
//   //  return  this.response(req, res , {success: true , message: result });
//         else
//              return  {success: false, message: 'Customer is not found'};        
//     //    if( await Auth.authenticate_Access({customer: customer.type , view: "true" },req.user.employee)){
//     //             return {success: true, message: customer}; 
//     //            }
//     //        else
//     //          { return {success: false, message: null}; }
              
//     //              }
//     //   else return {success: false, message: null}; 
//     }catch(err){ throw err }
// },
// async search_For_Wallet_Iv( data , limit = 1 ){
//     try{
//         const query_Object = {};
//     //    if(Object.keys(req.query).length !== 0){
//             if(data.customer)
//                 query_Object.customer = data.customer;
//             if(data.balance)
//                 query_Object.balance = data.balance; 
//             if(data.username)
//                  query_Object.username = data.username;
//             if(data.customer_type)
//                  query_Object.customer_type = data.customer_type;
//             if(data.user_access_type)
//                  query_Object.user_access_type = data.user_access_type; 
//             if(data.status)
//                   query_Object.status = data.status;     
//             // if(data.organization)
//             //  query_Object.username = data.username; 
//             // if(data._id)
//             //      query_Object._id = data._id 
//            if(data._id)
//                 query_Object._id = data._id     
//          //    console.log(query_Object ) 
//          var result = await Wallet.find(query_Object)
//       //    .select('username status balance type customer')
//       //    .populate('customer')
//           .limit(limit)
//         //   .catch(err=>{
//         //         throw err
//         //                  })                                                                                                                                                                                                      
//            // }
//          //  console.log(result)
//            if(result.length == 1) {
//             result = result.reduce((wal)=> {return wal})
          
//             return {success:true, message: result};
//           }
//       //   .then(result=>{
//       else if(result.length > 1 )   
//             return {success:true, message: result};
//       else
//             return {success: false , message: 'Wallet is not found'};
//       //    if(result)  
//                 {
//                     // var customer = await result.filter(async element=> 
//                     //     { if( await Auth.authenticate_Access({customer: element.type , view: "true" },req.user.employee))
//                     //                  return element
//                     //     })
//                     //     return await Respond.respond( req , res , {success: true , message: customer});     
//                     // if( await Auth.authenticate_Access({customer: customer.type , view: "true" },req.user.employee))
//                     //          return await Respond.response(req, res , {success: true , message: result });
//                 }
//               //  return  this.response(req, res , {success: true , message: result });
//         //   else
//         //         return await Respond.respond( req , res , {success: false, message: 'Customer is not found'});      
//     }catch(err){  throw err  }
// },
  async create_Wallet_Credential_Object(req){
    try{
    var  wallet_Credential= {
        username: req.body.username,
        password: req.body.password,
        customer_type: req.body.type || 'normal',
        status: req.body.status,
        user_access_type: req.body.user_access_type,
        old_Password: req.body.old_Password,
        balance: req.body.balance
   //     role: req.body.role
    };
     // wallet_Credential.user_access_type = JSON.parse(wallet_Credential.user_access_type);
    //  if(Array.isArray(wallet_Credential.user_access_type))
    //     {console.log(true)
          
    //     }
   //  console.log(wallet_Credential.user_access_type)
     if(wallet_Credential.user_access_type)
          wallet_Credential.user_access_type = wallet_Credential.user_access_type.split(',')
 //    }
       Object.keys(wallet_Credential).forEach(key=>wallet_Credential[key] === undefined ? delete wallet_Credential[key]: {})      
       return wallet_Credential
      }
      catch(err){throw err}         
},
 /*async activate_Wallet(req,res){
     try{
         var errMessage = {};
     if( await Auth.authenticate_Access({customer: true}, req.user.customer)){  
         await Customer.findOne({customer_Id: req.body.customer_Id})
             .then(async customer=>{
              if(customer){
               await Wallet.findOne({customer: customer._id})
                     .then(async result=>{
                              if(result){
                                 if(result.status == 'Suspended'){
                                  await Wallet.findByIdAndUpdate(result._id,{$set: {status:'activated'}}).catch(err=>{
                                 throw err
                                          })
                                      }else{
                                    errMessage.wallet = 'is not suspended';  
                                         }
                                       }else{
                                     errMessage.wallet = 'is not found'; 
                                       } })
                     .catch(err=>{
                                   throw err
                                       })
                            }
                             else{
                                  errMessage.customer = 'is not found';
                                   }
                                   })
             .catch(err=>{
                           throw err
                             })   
                                   }
            if(errMessage)   return res.json({success: false , message: errMessage});
            else           return res.json({success:true, message:'Customer Wallet have been successfully activated'});
 }catch(err){
       throw err
}
// }*/
//    async respond (req, res,response_message){
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