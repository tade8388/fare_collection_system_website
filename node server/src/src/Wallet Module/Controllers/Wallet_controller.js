const Wallet = require('../Models/Wallet');
//const Wallet_Transaction = require('./Wallet_Transaction_Controller');
const Customer = require('../../User Managment Module/Controllers/Customer_controller');
const crypto = require('crypto');
const Respond = require('../../helpers/Response');
const Auth = require('../../helpers/authenticator');
const Wallet_Transaction_Controller = require('./Wallet_Transaction_Controller');
//const { search_for_Employee_IV } = require('../../User Managment Module/Controllers/Employee_controller');
module.exports = {
    async view_Balance(req,res){
        try{  
         if(req.user.username)
            {    
        const customer = await Wallet.findOne({username: req.user.username})   //.catch(err=>{throw err})
        if(customer)
             return await Respond.respond(req, res , {success:true, message:customer.balance}); 
         else
             return await Respond.respond( req , res ,{success:true, message: 'Customer is not found'}); 
            }
         else
              return await Respond.respond( req , res ,{success: true , message: 'User is not found'});
         }
         catch(err)  {throw err}
      },
    async check_Balance(req , amount){
     try{
        //  var customer;
        //  var wallet;
         var query_Object = {};
        // if(req.body.customer_Id) 
        //          customer = await Customer.findOne({customer_Id: req.body.customer_Id}).catch(err=>{throw err});
        // else if(req.user.customer)
        //          customer = await Customer.findById(req.user.customer).catch(err=>{throw err});        
        if(req.user.customer)
                    query_Object._id = req.user.customer;
        else if(req.body && req.body.customer_Id)
                     query_Object.customer_Id = req.body.customer_Id;
       
             //  if(query_Object) console.log(Object.keys(query_Object).length);      
       if(Object.keys(query_Object).length == 1) {                
     //  var customer = await  Customer.search_For_Customer_IV(query_Object)
           //  .then(customer=>{
           //     if(customer.success) {
                  var wallet = await  Wallet.findOne({customer: req.user.customer})
                  //.then(wallet=>{
                    //  console.log(wallet.balance +   " " + amount)
                    if(wallet){
                        if(wallet.status == 'Activated')
                        {
                        if(wallet.balance >= amount)
                                return {success:true, message: wallet.balance};
                        else if (wallet.customer_type == 'Free')  
                                return {success:true, message:  wallet.customer_type};      
                        else 
                                return {success:false, message:'insufficient balance'};   
                        }
                        else 
                                return {success: false , message: `Account is ${wallet.status}` }                
                               }
                       else  
                       return {success:false, message: 'Customer Wallet is not found'};
                                    
                //   })
                //   .catch(err=>{throw err})
                           }
            //    else   
            //        return {success:false, message: 'Customer is not found'};  
            //  }) 
            //  .catch(err=>{throw err});
            //    }
       }catch(err){throw err}
    },
    async deduct_Balance(transaction){
        try{
            wallet = await this.search_For_Wallet_IV({customer: transaction.customer})   //.catch(err=>{throw err})
            if(wallet.success){
                          var balance = parseFloat(wallet.message.balance);
                          var payment = parseFloat(transaction.transaction_Amount)
                          balance = balance - payment ;
                            uniqueid = crypto.randomBytes(7).toString('hex');
                            var wallet_Object = {  balance }
                            
                            var Wallet_Transaction  = {
                                 transaction_Id: uniqueid,
                                 wallet: wallet.message._id,
                                 transaction_Amount: transaction.transaction_Amount,
                                 transaction_Type: 'Deduct',
                                 reason: transaction.reason  
                            }
                          //  console.log(Wallet_Transaction)
                            var transaction = await Wallet_Transaction_Controller.register_Wallet_Transaction(Wallet_Transaction);      //.create(Wallet_Transaction)  //.then(result=>{
                              //  console.log(result)  
                              if(transaction.success){
                                  //console.log('lll')
                                   if(balance < 0)
                                      wallet_Object.status = 'Suspended' 
                                   var result = await Wallet.findByIdAndUpdate(wallet.message._id, {$set: wallet_Object} ,{new: true , runValidators:true, context:'query'})
                                   // .then(success =>{
                                    //  console.log(result)
                                        if(result)
                                             return {success:true, message: 'Balance successfully deducted'};
                                        else
                                             return {success: false, message:'Wallet Transaction is not made'}     
                                    // })
                                    // .catch(err=> {throw err})
                                         }
                                   else         
                                    return {success: false, message:'Transaction is not made'}
                            // })
                            // .catch( err=>{
                            //     Respond.Property_Validator(err)
                            //     .then(message=>{ return {success: false , message: message  }})
                            //     .catch(err=>{throw err})       
                            //          })
                                    }
            else{
                return {success:false, message: 'Customer is not found'};
            }     
           }catch(err){
            if(transaction && !result)
                 {
                     // console.log('uuuuuuuuu')
                      Wallet_Transaction_Controller.delete_Wallet_Transaction_IV({transaction_Id: transaction.message}) 
                  }
            throw err} 
    },
   /* async refill_Balance(transaction,req){
        try{
          var errMessage ={};  
          if(req.body._id)  
                   customer = await Wallet.findById(req.body._id).catch(err=>{throw err})
          if(customer){
                      var balance = parseFloat(customer.balance);
                      var refill_amount = parseFloat(amount)
                      balance = balance + refill_amount ;
                      await Wallet.findByIdandUpdate(customer._id,{$set: {balance: balance.toString()}},{runValidators:true, context:'query'}).catch(err=> {throw err})
                            uniqueid = crypto.randombytes(7).toString('hex');
                            var Wallet_Transaction  = new Wallet_Transaction({
                                 transaction_Id: uniqueid,
                                 wallet: customer._id,
                                 transaction_Amount: transaction.amount,
                                 transaction_Type: 'Refill',
                                 transaction_Made_By: req.user.username
                            })
                            await Wallet_Transaction.create(Wallet_Transaction).then(result=>{
                                if(!result){
                                    return {success:true,message:'Transaction not made'}
                                           }
                            }).catch(async err=>{
                                 errMessage = await Respond.Property_Validator(err);
                                 if(errMessage == {}) throw err        
                                     })
                          if(errMessage)
                                return {success: false , message: errMessage}  
                          else      
                                return {success:true, message: 'Balance successfully refilled'};
                        }          
        else{
            return {success:false, message: 'Customer not found'};
        }     
       }catch(err){throw err} 
    },*/
    // async find_Customer (req){
    //     try{
    //         const customer = await Wallet.findOne({customer: req.query._id}).populate('customer').catch(err=>{throw err})  
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
     async find_Wallet(req , res , limit = 1){
        try {
           if(req.user.customer) 
             {
                var wallet = await this.search_For_Wallet_IV({customer: req.user.customer},1,'','-createdAt -updatedAt -customer -password -customer_type -user_access_type -__v')
                //.then(wallet=>{  
                    return await Respond.respond(req , res , wallet) 
             }
           else {  
            var wallet = await this.search_For_Wallet_EV(req , req.query , limit)
                //.then(wallet=>{  
                    return await Respond.respond(req , res , wallet)       
                //               })
                // .catch(err=>{throw err})
                }
            }
        catch (err) {  throw err}        
      },  
    async search_For_Wallet_EV(req , data , limit = 1 , populate = ''){
        try{
            var wallet = await this.search_For_Wallet_IV(data, limit , populate)   //.catch(err=>{throw err})  
           // const user =  await Employee_credential.findOne({employee: req.user.employee}).populate('role').catch(err=>{throw err}) 
           if(wallet.success){
            wallet = JSON.stringify(wallet);
            wallet = JSON.parse(wallet);
            if(!Array.isArray(wallet.message)) {
                wallet.message = [wallet.message]
            }
                wallet.message = await wallet.message.filter(async element=> 
                {    
                  //  var wallet = await Wallet_Credential.search_For_Wallet_Iv({customer: element._id},limit); 
                 //  if(wallet.success)
                   //{ 
                       
                        if( await Auth.authenticate_Access({customer: wallet.message.customer_type , view: "true" },req.user.employee))
                         //    {  
                                 return element
                           //  }
                           //  console.log(wallet.message.customer_type) 
                   // }
                 //     else
                   //            throw new Error ('Customer with out Wallet has been found');            
                })
                
                if(limit == 1 && wallet.message.length == 1 )
                {
                    wallet.message = await wallet.message.reduce((cus)=> {return cus})  
                    return {success:true,  message: wallet.message};
                }
           else if( wallet.message.length > 0) 
                    return wallet;    
           else 
                  return {success: false, message: 'Wallet viewing is out of access'}
            //    if( await Auth.authenticate_Access({customer: customer.message.type , view: "true" },req.user.employee)){
            //         return {success: true, message: customer.message}; 
            //            }
            //    else{ return {success: false, message: null}; }
                  
                      }
            else return {success: false, message: 'Wallet could not be found'}; 
        }catch(err){
            throw err
        }
    }, 
    async search_For_Wallet_IV(data , limit = 1 , populate = '', select='-__v'){
        try{
            var query_Object = {};  
            if(data.customer)
                 query_Object.customer = data.customer;
            if(data.username)
             query_Object.username = data.username; 
            if(data.customer_type)
              query_Object.customer_type = data.customer_type; 
            if(data.user_access_type) 
              query_Object.user_access_type = data.user_access_type; 
            if(data._id)
                 query_Object._id = data._id 
            console.log(populate)                                 
         var result = await Wallet.find(query_Object)    //.catch(err=>{throw err})
              .populate(populate)
              .limit(limit)
              .select(select)
              //.then(result=>{
                if(result.length == 1) {
                    result = result.reduce((wallet)=> {return wallet})
                    return {success:true, message: result};
                  }
              //   .then(result=>{
              else if(result.length > 1 )   
                    return {success:true, message: result};
              else
                    return {success: false , message: 'Wallet is not found'};
                //elements: Object.keys(result).length
            //   }) 
            //   .catch(err=> {throw err})                         
        }catch(err){throw err}      
    }, 
    async refill_Balance(req,res){
        try{
            var customer = await this.search_For_Wallet_IV({_id: req.query._id},1,'customer')    //.catch(err=>{throw err});
          //  console.log(customer)
            if(customer.success){
               if( await Auth.authenticate_Access({customer: customer.message.customer_type , proccess: true },req.user.employee)){
                //console.log(req.body)
                if(req.body.transaction_Amount){
                  //   console.log(typeof customer.message.balance)
                    var old_Balance = parseFloat(customer.message.balance);
                    var refill_amount = parseFloat(req.body.transaction_Amount);
                    var status;
                 //   console.log(req.body.transaction_Amount)
                 //   console.log(typeof req.body.transaction_Amount)
                if(typeof req.body.transaction_Amount === "number") {
                      var new_Balance =  old_Balance + refill_amount ;
                      if(customer.message.status == 'Suspended'){
                          if(old_Balance < 0 &&  new_Balance > 0)  
                            status = 'Activated' 
                                             }
                            uniqueid = crypto.randomBytes(7).toString('hex');
                            var Wallet_Transaction  =  {
                                 transaction_Id: uniqueid,
                                 wallet: customer.message._id,
                                 transaction_Amount: req.body.transaction_Amount,
                                 transaction_Type: 'Refill',
                                 transaction_Made_By: req.user.username,
                                 reason: 'refilling balance at Core'
                               }
                            var result = await Wallet_Transaction_Controller.register_Wallet_Transaction(Wallet_Transaction)             //.create(Wallet_Transaction)
                           // .then(async result=>{
                              var wallet_Object = await this.create_Wallet_Object({balance: new_Balance.toString(), status })
                             // console.log(wallet_Object)
                                 if(result.success) {
                                    var success = await Wallet.findByIdAndUpdate(customer.message._id,{$set:wallet_Object },{new: true , runValidators:true, context:'query'})
                                    //.then(success=>{
                                      //  console.log(customer)
                                        if(success)
                                            return await Respond.respond(req,res,{success: true , message: `Customer Id - ${customer.message.customer.customer_Id} balance has been successfully refilled`})
                                        else 
                                            return await Respond.respond(req,res,{success: false , message: 'Refill account is unsuccessful'})   
                                    // })
                                    // .catch(err=> {throw err})   
                                          }
                                else {
                                    return await Respond.respond(req,res,{success: false , message: 'wallet transaction for Refill account was unsuccessful'})  
                                           }
                            // })
                            // .catch(err=>{
                            //     Respond.Property_Validator(err)
                            //     .then(message=>{ return  this.respond(req,res,{success: false , message: message}) })
                            //     .catch(err=>{throw err})          
                            //          })
                                        }
                             else 
                                 return await Respond.respond(req , res,{success: false , message: "refill balance amount is not a number"});     
                               }           
                    else                      
                             return await Respond.respond(req , res,{success: false , message: "refill balance amount could not be found"});
                        }          
        else   
                 return await Respond.respond(req , res,{success: false , message: "attempt to refill a customer credential data with out access"}); 
            } 
        else 
                    return await Respond.respond(req, res,{success: false , message: "The Customer does not exist"});
       }catch(err){throw err} 
    },
    async create_Wallet_Object(object){
        try{
        var  wallet_Credential= {
         //   username: req.body.username,
         //   password: req.body.password,
        //    customer_type: req.body.type || 'normal',
            status: object.status,
         //   user_access_type: req.body.user_access_type,
         //   old_Password: req.body.old_Password,
            balance: object.balance
       //     role: req.body.role
        };
         // wallet_Credential.user_access_type = JSON.parse(wallet_Credential.user_access_type);
        //  if(Array.isArray(wallet_Credential.user_access_type))
        //     {console.log(true)
              
        //     }
       //  console.log(wallet_Credential.user_access_type)
        // if(wallet_Credential.user_access_type)
        //      wallet_Credential.user_access_type = wallet_Credential.user_access_type.split(',')
     //    }
           Object.keys(wallet_Credential).forEach(key=>wallet_Credential[key] === undefined ? delete wallet_Credential[key]: {})      
           return wallet_Credential
          }
          catch(err){throw err}         
    },
    // async view_Wallet_Transaction(req,res ,limit = 5){
    //     try{
    //         if(req.user && req.user.customer)   data = req.user.customer
    //         else if(req.query && req.query._id)   data = req.query._id
    //         if(data){
    //         var customer = await Wallet.search_For_Customer_IV({customer: data}).select('username balance type status')
    //       //  .then(async customer=>{
    //             if(req.user.employee && customer.success && await Auth.authenticate_Access({customer: customer.type , process: true },req.user.employee) || req.user.customer){
    //                  var customer_Transaction =  await Wallet_Transaction.find({wallet: customer._id}).limit(limit)//.catch(err=>{throw err});   
    //                     if(customer_Transaction)
    //                          return await Respond.respond( req , res ,{success:true, message: customer_Transaction});
    //                     else 
    //                          return await Respond.respond( req , res ,{success:true, message: 'No Transcation Found'}); 
    //                 }
    //            else if(customer.success && req.user.customer){
    //                     return await Respond.respond( req , res ,{success:false, message: 'No Transaction Found'});
    //                     } 
    //                 }
    //            else   
    //             return await Respond.respond(req,res, {success: false , message: 'customer input data error has occured'})           
                            
    //         //   } })
    //         // .catch(err=>{throw err});
    //         // if(req.user.customer)
    //         //       customer = await Wallet.findOne({customer: req.user.customer}).select('username balance type status').catch(err=>{throw err});
    //         // if(req.user.employee)  
    //         //        {
    //         //         if( await Auth.authenticate_Access({customer: "true" },req.user.employee))
    //         //              customer =  await Wallet.findById(req.body._id).select('username balance type status').catch(err=>{throw err}); 
    //         //        }
    //         // if(customer){
    //         //       const customer_Transaction = await Wallet_Transaction.find({wallet: customer._id}).catch(err=>{throw err});   
    //         //               var message = {};
    //         //               message.wallet = customer;
    //         //               message.Transaction = customer_Transaction ;
    //         //               return this.respond( req , res ,{success:true, message: message});
    //         //             }          
               
    //        }catch(err){throw err} 
   // },
    // async Activate_Wallet(req,res){
    //    try{
    //     if( await Auth.authenticate_Access({customer: },req.user.employee)){
    //        let wallet = {
    //            status: 'Activated'
    //        }
    //       await Wallet.findByIdandUpdate(req.body._id, wallet,)
    //       .then(result=>{
    //             if(result)
    //                 return res.json({success:true, message: 'Wallet Activated'});
    //             else 
    //                return res.json({success: false, message: 'Customer wallet not found'});     
    //       })
    //       .catch(err=>{throw err})
    //     }else{
    //         return  res.json({success: false , message: "attempt to register customer with out access"});
    //     }
    //    }  catch(err){ throw err }
    // },
    // async Suspend_Wallet(id,res){
    //     try{
    //         let wallet = {
    //             status: 'Suspended'
    //         }
    //        await Wallet.findByIdandUpdate(id, wallet)
    //        .then(result=>{
    //              if(result)
    //                  return res.json({success:true, message: 'Wallet Suspended'});
    //              else 
    //                 return res.json({success: false, message: 'Customer wallet not found'});     
    //        })
    //        .catch(err=>{throw err})
       
    //     }  catch(err){ throw err }
    //  },
    //  async Deactivate_Wallet(req,res){
    //     try{
    //         if( await Auth.authenticate_Access({customer: "true" },req.user.employee)){ 
    //         let wallet = {
    //             status: 'Deactivated'
    //         }
    //        await Wallet.findByIdandUpdate(req.body._id, wallet)
    //        .then(result=>{
    //              if(result)
    //                  return res.json({success:true, message: 'Wallet Deactivated'});
    //              else 
    //                 return res.json({success: false, message: 'Customer wallet not found'});     
    //        })
    //        .catch(err=>{throw err})
    //     }else{
    //         return  res.json({success: false , message: "attempt to register customer with out access"});
    //     }
    //     }  catch(err){ throw err }
    //  },
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
    //   },
}