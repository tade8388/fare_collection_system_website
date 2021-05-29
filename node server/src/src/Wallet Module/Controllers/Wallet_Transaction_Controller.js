
const Wallet_Transaction = require('../Models/Wallet_Transaction');
const Wallet = require('../Models/Wallet')
const Respond = require('../../helpers/Response');
const Auth = require('../../helpers/authenticator');
module.exports = {
    async register_Wallet_Transaction( transaction_Object){
        try{
          //  if(await Auth.authenticate_Access({customer: {proccess:true}},req.user.employee)){
             var Transaction_Object = await this.create_Wallet_Transaction_Object(transaction_Object);
             var Transaction = new Wallet_Transaction(Transaction_Object);
         //    console.log(transaction_Object)
             var result =  await Wallet_Transaction.create(Transaction)
           // .then(result =>{
                if(result) 
                return {success: true , message: result.transaction_Id};
                else 
                return {success: false , message: `Transaction is not registered`};    
            // })
            // .catch(err=>{
            //     Respond.Property_Validator(err)
            //     .then(message=>{ this.respond(req,res,{success: false , message: message}) })
            //     .catch(err=>{throw err})
            //        })       
           // }
         //   else{
           //     return  await Respond.respond(req , res,{success: false , message: "attempt to register a branch with out access"});
          //      }
        }catch(err){ throw err  }
    },
    async search_For_Wallet_Transaction_EV (req, data , limit = 1){
        try{
          //  var branch;
         //   var query_Object={};
          // console.log(req.user)
            if(await Auth.authenticate_Access({customer: {view: true}},req.user.employee)){
                var result = await this.search_For_Wallet_Transaction_IV(data , limit)
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
                        return {success: false, message: "attempt to find a wallet transaction with out access"}; 
                   }
        }
        catch(err){    throw err   }
      },
      async find_Wallet_Transaction(req , res , limit = 1){
        try {
             var route =  await this.search_For_Wallet_Transaction_EV(req, req.query , limit)
                return await Respond.respond(req,res, route)
                // .then(route=>{  
                //               this.respond(req,res , route)       
                //               })
                // .catch(err=>{throw err})
            } 
    catch (error) {  throw err}
      },
      async search_For_Wallet_Transaction_IV(data , limit = 1){
        try{
            var query_Object = {};  
            if(data.transaction_Id)
                 query_Object.transaction_Id = data.transaction_Id;
            if(data.wallet)
                 query_Object.wallet =  data.wallet;
            if(data._id)
                 query_Object._id = data._id                        
              
           var result = await Wallet_Transaction.find(query_Object)      //.catch(err=>{throw err})
              //.populate(populate)
              .limit(limit)
           //   .then(result=>{
            if(result.length == 1) {
              result = result.reduce((wal)=> {return wal})
              return {success:true, message: result};
            }
     //   .then(result=>{
     else if(result.length > 1 )   
              return {success:true, message: result};
     else
              return {success: false , message: 'Wallet transaction is not found'};
                //elements: Object.keys(result).length
         //     }) 
          //    .catch(err=> {throw err})                         
        }catch(err){throw err}
      },
      async Wallet_Transaction_aggregate(data){
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
                 lookup ={"$lookup" : { "from" : "Wallet" , "localField" : "wallet" , "foreignField" : "_id" , "as": "wallet_info"}}
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
                       
          //  console.log(filtered_query)       
          var result =  await Wallet_Transaction.aggregate(filtered_query)    
    
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
    //   async update_Branch (req,res){
    //     try{
    //         var branch = await this.search_For_Branch_EV(req,{_id: req.query._id})  //.catch(err=>{ throw err });
    //         if(branch.success){
    //         if(await Auth.authenticate_Access({branch: {proccess: true}},req.user.employee)){
    //             var Branch_Object = await this.create_Branch_Object(req);
    //             if(Branch_Object.branch_Id)  delete Branch_Object.branch_Id;
    //            // if(req.body._id) delete req.body._id;    
    //             var result = await Branch.findByIdAndUpdate(branch.message._id,{$set: Branch_Object},{new:true, runValidators:true, context:'query'})
    //       //   .then(result=>{
    //             if(result)  
    //             return await Respond.respond(req , res , {success: true, message: `Branch Id - ${branch.message.branch_Id} have been updated`});
    //              else
    //             return await Respond.respond(req , res , {success: false, message: `Branch is not found`});
    //            //   })
    //         //  .catch(err=>{
    //         //     Respond.Property_Validator(err)
    //         //     .then(message=>{ this.respond(req,res,{status: false , message: message}) })
    //         //     .catch(err=>{throw err}) 
    //         //     })
    //             }
    //         else  
    //               return await Respond.respond(req, res , {success: false, message: "attempt to update branch with out access"});
    //          }
    //         else
    //             return await Respond.respond(req , res , {success: false , message: ' Branch is not found'});  
    //     }catch(err){ throw err  }
    // },
    async delete_Wallet_Transaction_IV (data){
        try{  
            var wallet_Transaction = await this.search_For_Wallet_Transaction_IV(data)   //.catch(err=>{throw err });
            if(wallet_Transaction.success) {          
         //   if(await Auth.authenticate_Access({customer: {remove: true}},req.user.employee)){
            var result = await Wallet_Transaction.findByIdAndDelete(wallet_Transaction.message._id)
           // .then(result=>{
              // console.log(result)
              if(result)  
            //    return await Respond.respond(req , res ,
                  return {success: true, message: `wallet Transaction Id - ${wallet_Transaction.message.transaction_Id} have been deleted`};
                else 
                  return {success: false, message: `Wallet Transation is not found on database`};
            // })
            // .catch(err=>{throw err});
            //  }  
            // else
            //     return await Respond.respond(req, res , {success: false , message: "attempt to delete a wallet Transaction with out access"});
                                 }
        else
               return {success: false , message: 'wallet Transaction is not found'};
        }catch(err){  throw err }
    },
    async view_Wallet_Transaction(req,res ,limit = 5){
      try{
          var data;
          if(req.user && req.user.customer)   data = req.user.customer
          else if(req.user && req.user.employee && req.query && req.query._id)   data = req.query._id
          if(data){
           // console.log({customer: data})
          var customer = await Wallet.find({customer: data}).limit(1);   //.select('-username -balance type status')
        //  .then(async customer=>{
                 //console.log(customer)
                 customer = customer.reduce(cus=>{return cus});
               if(customer.length !== 0){
                
           //      console.log('llllllllll')
          //  if( await Auth.authenticate_Access({customer: customer.customer_type , view: true },req.user.employee)){
          //              console.log(00000000)
          //      }
              // if(true || false && false)
              //      console.log('0000');
              // if(false || true && true)
              //            console.log('0000') ; 
              if(  req.user.customer || req.user.employee && await Auth.authenticate_Access({customer: customer.customer_type , view: true },req.user.employee)){
             //   console.log('kkkkkkk')
                   var customer_Transaction =  await Wallet_Transaction.find({wallet: customer._id}).limit(limit)//.catch(err=>{throw err});   
                      if(customer_Transaction.length !== 0 )
                           return await Respond.respond( req , res ,{success:true, message: customer_Transaction});
                      else 
                           return await Respond.respond( req , res ,{success:true, message: 'No Transcation Found'}); 
                  }
                 else 
                      return await Respond.respond( req , res ,{success:false, message: 'Attempt to view Wallet transaction with out authorization'}); 
               // }
            //  else if(req.user.customer){
            //           return await Respond.respond( req , res ,{success:false, message: 'No Transaction Found'});
            //           } 
            //  else 
            //        new Error('Not authorized ');        
                    }
             else 
                  throw new Error('The customers Wallet could not be found');
               
                  }
             else   
              return await Respond.respond(req,res, {success: false , message: 'customer input data error has occured'})           
                          
          //   } })
          // .catch(err=>{throw err});
          // if(req.user.customer)
          //       customer = await Wallet.findOne({customer: req.user.customer}).select('username balance type status').catch(err=>{throw err});
          // if(req.user.employee)  
          //        {
          //         if( await Auth.authenticate_Access({customer: "true" },req.user.employee))
          //              customer =  await Wallet.findById(req.body._id).select('username balance type status').catch(err=>{throw err}); 
          //        }
          // if(customer){
          //       const customer_Transaction = await Wallet_Transaction.find({wallet: customer._id}).catch(err=>{throw err});   
          //               var message = {};
          //               message.wallet = customer;
          //               message.Transaction = customer_Transaction ;
          //               return this.respond( req , res ,{success:true, message: message});
          //             }          
             
         }catch(err){throw err} 
        },
    async create_Wallet_Transaction_Object(Transaction_Info){
        try{
           // console.log(req.body);
           var wallet_Transaction = {
            transaction_Id: Transaction_Info.transaction_Id,
            wallet: Transaction_Info.wallet,
            transaction_Type: Transaction_Info.transaction_Type,
            transaction_Amount: Transaction_Info.transaction_Amount,
            reason: Transaction_Info.reason,
            transaction_Made_By: Transaction_Info.transaction_Made_By  
                   }
           Object.keys(wallet_Transaction).forEach(key=>wallet_Transaction[key] === undefined ? delete wallet_Transaction[key]: {})        
           return wallet_Transaction
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