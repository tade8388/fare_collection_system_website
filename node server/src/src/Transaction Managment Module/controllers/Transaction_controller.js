
const Transaction = require('../Models/Transaction');
const Wallet = require('../../Wallet Module/Controllers/Wallet_controller');
//const Station = require('../../Organization Module/models/Station')
const Station = require('../../Organization Module/Controllers/Station_controller');
const Bus = require('../../Organization Module/Controllers/Bus_controller');
const Fare = require('./Fare_Controller');
const Respond = require('../../helpers/Response');
const Auth = require('../../helpers/authenticator');
const Ticket_Controller = require('./Ticket_Controller');
const crypto = require('crypto');
const Route = require('../../Organization Module/Controllers/Route_controller');
module.exports = {
    async register_travel_transaction(req,res){
       try{
            // var errMessage;
            // var station = false ;
             var  Transaction_Object = await this.create_Transaction_Object(req);  
             Transaction_Object.transaction_Id =  await crypto.randomBytes(16).toString('hex');     
           //  await Station.findOne( { station_Name:Transaction_Object.entry_Station } )
             var station =  await Station.search_For_Station_IV( { station_Name:Transaction_Object.entry_Station })
        //     .then(station=>{
             var station2 = await Station.search_For_Station_IV({station_Name: Transaction_Object.exit_Station})
             var route = await Route.search_For_Route_IV({route_Name: Transaction_Object.route});
                    //   .then(station2=>{ 
                    //  console.log(station)
                   //   console.log(station2)  
       if(route.success && route.message.status == 'Activated')  {

       if(station.success && station.message.status == 'Activated' && station2.success && station2.message.status == 'Activated') 
                             {
                    
                               Transaction_Object.entry_Station = station.message._id;
                               Transaction_Object.exit_Station = station2.message._id;
                               Transaction_Object.route = route.message._id;
                   var bus = await Bus.search_For_Bus_IV({transaction_Machine: req.user._id})
                            //    .then(bus=>{
                            //    console.log(bus)
                            
                                    if(bus.success == true){
                                       // console.log('llllll')
                                       Transaction_Object.bus = bus.message._id;
                                       Transaction_Object.machine = req.user._id;
                                        if(Transaction_Object.ticket_Type == 'Ticket') {
                                             
                                                var auth_ticket  = await Ticket_Controller.authenticate_Ticket(req)  
                                              //  console.log('ooooooooo')
                                                if(auth_ticket.success)
                                                  {
                                                  //  console.log(auth_ticket)
                                                    Transaction_Object.ticket = auth_ticket.message.ticket._id;
                                                    Transaction_Object.transaction_Amount = auth_ticket.message.ticket.ticket_Amount;
                                                  }
                                                  else  
                                                     return await Respond.respond(req, res , {success: false , message: auth_ticket.message});  

                                                                      }
                                        else if(Transaction_Object.ticket_Type == 'customer_Id'){
                                              
                                            var fare= await Fare.search_For_Fare_IV({},1,'',{createdAt: -1}) ;  
                                            
                                            Transaction_Object.transaction_Amount = Transaction_Object.transport_length * fare.message.fare_Amount
                                            
                                            var result =  await Wallet.check_Balance(req ,  Transaction_Object.transaction_Amount)  //.then(result=>{
                                                
                                              if(result.success) {
                                                if(Transaction_Object.customer){
                                                    
                                                     var wallet = {
                                                      customer: Transaction_Object.customer,
                                                      reason: "Bus Tranaction Txn: " + Transaction_Object.transaction_Id,
                                                      amount: Transaction_Object.transport_length * fare.message.fare_Amount
                                                                }
                                                 var wallet =   await Wallet.deduct_Balance(wallet,req);
                                                  if(!wallet.success)
                                                          return await Respond.respond(req,res, wallet)
                                                               }
                                                 else 
                                                     return await Respond.respond(req, res , {success: false , message: 'Customer Id has not been found'});                 
                                                 // Transaction_Object.customer = req.body.customer;
                                                               }
                                                   else
                                                        return await Respond.respond(req, res , {success: false , message: result.message});        
                                             //  })     
                                           }
                                          else 
                                               return await Respond.respond(req,res, {success:false , message: 'ticket type has not been defined'}) 
                                       //    console.log(Transaction_Object.ticket)
                                       //    console.log(Transaction_Object.customer)
                                    // if(Transaction_Object.ticket || Transaction_Object.customer) {
                                       //console.log(Transaction_Object)
                         var transaction = new Transaction(Transaction_Object);           
                         var result =   await Transaction.create(transaction)
                                    //   .then(result=>{
                                           if(result) {
                                                if(Transaction_Object.ticket_Type == 'Ticket')  //{
                                                        await Ticket_Controller.change_Ticket_Status({_id : Transaction_Object.ticket} , 'Used' );
                                               //   console.log(ticket_Status_Change); 
                                              //  }
                                               return await Respond.respond(req, res,{success: true , message: `Transaction Id - ${transaction.transaction_Id} - registered`});
                                                     }
                                           else 
                                               return await Respond.respond(req, res,{success: false , message: `Transaction is not registered`}); 
                                    //    })
                                    //        .catch(async err=>{
                                    //            Respond.Property_Validator(err)
                                    //            .then(message=>{ this.respond(req,res,{success: false , message: message}) })
                                    //            .catch(err=>{throw err})
                                    //                    })
                                        //    }else{
                                        //        return await Respond.json({success:false, message: 'Customer Id or Ticket Id could not be found'});
                                        //    } 
                                    }
                                    else
                                       return await Respond.respond(req ,res , {success: false , message: `Bus Information is incorrect`})
                                // })
                                // .catch(err=>{throw err})
                             } 
                         else 
                              return await Respond.respond(req,res, {success: false , messsage: 'Station Information is incorrect'}) 
                         } 
                         else 
                              return await Respond.respond(req,res, {success: false , messsage: 'Route Information is incorrect'})           
                    //    })
                    //   .catch(err=>{throw err}) 
           //  })
            //  if(station == true){
            //     // Transaction_Object.entry_Station = req.body.entry_Station;
            //     // Transaction_Object.exit_Station = req.body.exit_Station;
            //  if(Transaction_Object.ticket_type == 'ticket')     Transaction_Object.ticket = req.body.ticket;
            //  else if(Transaction_Object.ticket_type == 'customer_Id'){
            //         await Wallet.check_Balance(req).then(result=>{
            //             if(result.success)
            //                  Transaction_Object.customer = req.body.customer;
            //             else
            //                  return this.respond(req, res , {success: false , message: result.message});        
            //         })     
            //     }
            // if(Transaction_Object.ticket || Transaction_Object.customer) {
            // if(Transaction_Object.customer){
            //     var wallet = {
            //       customer: Transaction_Object.customer,
            //       reason: "Bus Tranaction Txn: " + Transaction_Object.transaction_Id,
            //       amount: Transaction_Object.transcation_Amount
            //                 }
            // await Wallet.deduct_Balance(wallet,req);
            //                }  
            //       var transaction = new Transaction(Transaction_Object);           
            // await Transaction.create(transaction)
            // .then(result=>{
            //     if(result) 
            //     return this.respond(req, res,{success: true , message: `Transaction Id - ${$transaction.transaction_Id} - registered`});
            //     else 
            //     return this.respond(req, res,{success: false , message: `Transaction is not registered`}); 
            // })
            //     .catch(async err=>{
            //         Respond.Property_Validator(err)
            //         .then(message=>{ this.respond(req,res,{success: false , message: message}) })
            //         .catch(err=>{throw err})
            //                 })
            //     }else{
            //        return res.json({success:false, message: 'Customer Id or Ticket Id could not be found'});
            //     }
            // }else{
            //     return res.json({success: false , message: 'Wrong station combination'}); 
            // }   
          } catch(err){
           throw err
                      }
    },
    async Transaction_aggregate(data){
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
        if(data.lookup && data.lookup == "customer") 
              lookup ={"$lookup" : { "from" : "Customer" , "localField" : "customer" , "foreignField" : "_id" , "as": "customer_Info"}}
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
       var result =  await Transaction.aggregate(filtered_query)    
 
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
    async view_Transaction(req,res, limit = 5 , select = 'transaction_Id transaction_Amount entry_Station exit_Station'){
       try{
            if(req.user.customer){
               var result = await Transaction.find({customer: req.user.customer}).limit(limit).select(select)
              //  .then(result=>{
                    if(result)
                         return await Respond.respond(req, res , {success: true , message: result})
                    else
                         return await Respond.respond(req, res , {success: false , message: 'No transaction could be found'})
                // })
                // .catch(err=>{throw err})                      
            }
            else if(req.user.employee){
                var customer = await Wallet.search_For_Wallet_EV(req, {customer: req.query._id})  
                if(await Auth.authenticate_Access({customer: customer.message.customer_type, view: true},req.user.employee)){
                   if(req.query._id){
                     
                      var result = await this.search_for_Transaction_IV({customer: req.query._id}, limit)
                      console.log(result)
                   //   .then(result=>{
                        if(result)
                           return await Respond.respond(req, res , result)
                        else
                          return await Respond.respond(req, res , {success: false , message: 'No Customer or No transaction could be found'})
                    // })
                    //   .catch(err=>{throw err})                      
                                     }
                      else
                         return await Respond.respond(req, res , {success: false , message: 'search parameter not found'})         
                             }
                 else   
                      return await Respond.respond(req,res,{success: false , message: "attempt to view customer transaction with out access"});              
                                    }
             else {
                   return await Respond.respond(req,res,{success: false , message: 'System could not verify the type of user'})
             }                       
          }
          catch(err){throw err}
    },
    async search_for_Transaction_IV(data , limit = 1 , populate = ''){
        try{
            // var query_Object = {};  
            // if(data.transaction_Id)
            //      query_Object.transaction_Id = data.transaction_Id;
            // if(data._id)
            //      query_Object._id = data._id                        
              
         var result = await Transaction.find(data)  //.catch(err=>{throw err})
              .populate(populate)
              .limit(limit)
              .populate('customer ticket entry_Station exit_Station route bus machine')
            //  .then(result=>{
                if(result)   
                   return {success:true, message: result};
                else
                     return {success: false , message: 'Branch is not found'};
                //elements: Object.keys(result).length
            //   }) 
            //   .catch(err=> {throw err})                         
        }catch(err){throw err}
    },
    async create_Transaction_Object(req){
        try{
           var transaction = {
         //   transaction_Id: req.body.transaction_Id,
            ticket_Type: req.body.ticket_Type,
            customer: req.body.customer,
            ticket: req.body.ticket,
        //    transaction_Amount: req.body.transaction_Amount,
            transport_length: req.body.transport_length,
            entry_Station : req.body.entry_Station,
            exit_Station : req.body.exit_Station,
            route: req.body.route
           // bus_Id: req.body.bus_Id,
          //  machine_Id: req.body.machine_Id
                            } 
           Object.keys(transaction).forEach(key=> transaction[key] === undefined ? delete transaction[key]: {})        
           return transaction
          }
          catch(err){throw err}         
         },
    //    async respond (req,res,response_message){
    //         res.json(response_message)
    //         Respond.logparams(req,res)
    //         .then(message=>{
    //                message.success = response_message.success
    //                message.message = response_message.message
    //                logger.info(message);
    //                        })
    //         .catch(err=>{ throw err})
    //              return 
    //       }           
}
