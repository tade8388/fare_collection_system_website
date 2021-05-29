const Ticket = require('../Models/Ticket');
const Respond = require('../../helpers/Response');
const Auth = require('../../helpers/authenticator')
//const Station = require('../../Organization Module/Models/Station');
const Station = require('../../Organization Module/Controllers/Station_controller')
//const Route = require('../../Organization Module/models/Route');
const Route = require('../../Organization Module/Controllers/Route_controller');
const Fare = require('./Fare_Controller');
const Machine = require('../../Organization Module/Controllers/Machine_controller')
const Wallet = require('../../Wallet Module/Controllers/Wallet_controller');
const crypto = require('crypto'); 
const config = require('../../config/index');
//const Wallet_refresh_token = require('../../Wallet Module/Models/Wallet_refresh_token');
module.exports = {
    async generate_Ticket(entry_Station , exit_Station , route){
        try{
         uniqueid  = await crypto.randomBytes(16).toString('hex'); 
         ticket = uniqueid +"cbfcs"+ Date.now()+"cbfcs"+ route +"cbfcs" +entry_Station + "-" + exit_Station;
        const key = await crypto.scryptSync(config.CRYPTO_PASSWORD, 'salt', 32);
        const iv = await crypto.randomBytes(16);   
        const cipher = await crypto.createCipheriv(config.CRYPTO_ALGORITHM, key, iv);
        let encrypted_Ticket =await cipher.update(ticket,'utf8','hex');
        encrypted_Ticket += cipher.final('hex');
        encrypted_Ticket += ":" + Buffer.from(iv).toString('hex');
          // const cipher = crypto.createCipher(config.CRYPTO_ALGORITHM,config.CRYPTO_PASSWORD);
          // Use `crypto.randomBytes` to generate a random iv instead of the static iv
          //const iv = Buffer.alloc(16, 0); // Initialization vector.
      //  console.log(Buffer.from(iv).toString('hex'));
        // console.log(Buffer.byteLength(uniqueid,'utf8'));
        // console.log(Buffer.byteLength(ticket,'utf8'));
        // console.log(Buffer.byteLength(encrypted_Ticket,'utf8'));
        // console.log(uniqueid);
        // console.log(ticket);
        // console.log(encrypted_Ticket);
        return {ticket: encrypted_Ticket, ticket_Id: uniqueid};
        }catch(err)   {throw err}
    },
    async buy_Ticket(req,res){
        try{
        var wallet_transaction; //, result;
        var Ticket_Object = await this.create_Ticket_Object(req);
     //   route = await Route.findOne({route_Name: Ticket_Object.route}).catch(err=>{throw err});
        var route = await Route.search_For_Route_IV({route_Name: Ticket_Object.route})   //.catch(err=>{throw err});
      //  entry_Station = await Station.findOne({station_Name: Ticket_Object.entry_Station}).catch(err=>{throw err})
        entry_Station = await Station.search_For_Station_IV({station_Name: Ticket_Object.entry_Station})   //.catch(err=>{throw err})
   //  mid =  await Station.search_For_Station_IV({station_Name: req.body.mid_Station})
        exit_Station = await Station.search_For_Station_IV({station_Name: Ticket_Object.exit_Station})   //.catch(err=>{throw err})
       //   exit_Station = await Station.findOne({station_Name: Ticket_Object.exit_Station}).catch(err=>{throw err})
        if(entry_Station.success && exit_Station.success && exit_Station.message.status == 'Activated' && entry_Station.message.status == 'Activated'){
            if(route.success && route.message.status == 'Activated'){
          const generated_Ticket = await this.generate_Ticket(entry_Station.message.station_Name,exit_Station.message.station_Name, route.message.route_Name)
          Ticket_Object.ticket = generated_Ticket.ticket_Id;
          Ticket_Object.route = route.message._id;
          Ticket_Object.entry_Station = entry_Station.message._id;
        //  Ticket_Object.mid =  mid.message._id;
          Ticket_Object.exit_Station = exit_Station.message._id; 
          Ticket_Object.issued_Date = Date.now();
          
          var route_Stations = [  Ticket_Object.entry_Station , Ticket_Object.exit_Station] ;
        //  route_Stations.forEach
          var route_Length;
        //   console.log( route_Stations)
          // console.log(typeof route.message.stations[0].toString())
          // console.log( route_Stations.toString() == route.message.stations.toString())
          // console.log(typeof route.message.stations[0])
        //  console.log(route.message.stations.includes(route_Stations))
                  //     {
                  //        match = false; 
                  //     }
                  // else
                  //    {
                  //        console.log(route.message.stations.includes(route_Stations[i]))
                  //    }  
          // if(route.message.stations.length == route_Stations.length )
          //   {
              //    match = true;
                  
                // for(i=0;i<route_Stations.length;i++){
           //       if(route.message.stations.includes(route_Stations[0]) && route.message.stations.includes(route_Stations[1]) && route.message.stations.includes(route_Stations[2]))
             //               route_Length = '10';
                  //     {
                  //        match = false; 
                  //     }
                  // else
                  //    {
                  //        console.log(route.message.stations.includes(route_Stations[i]))
                  //    }     
                  // if(route.message.stations[i] != route_Stations[i])
                  //      {
                  //       console.log(route.message.stations[i])
                  //       console.log(route_Stations[i]) 
                  //       match = false}  
              //   }
                // console.log(match)
              //    if(match == true) //{
              //        console.log(true)
              //  //  }
              //    else
              //       console.log(false)
                //  if(route.message.stations.includes())
                //     console.log(true)
                //  else  console.log(false)   
                 
                 //console.log('lllllllll')
         //   }
            // else
               
          
          route.message.route_segments.forEach(element=>{
          //   console.log(element) 
      //    match = true;
                  
       //   for(i=0;i<2;i++){
           if(element.sub_route.includes(route_Stations[0]) && element.sub_route.includes(route_Stations[1]) )
             Ticket_Object.ticket_Length = element.sub_route_length;
            //   {
         //         match = false; 
              // }
          //  else
          //     {
          //         console.log(route.message.stations.includes(route_Stations[i]))
          //     }     
           // if(route.message.stations[i] != route_Stations[i])
           //      {
           //       console.log(route.message.stations[i])
           //       console.log(route_Stations[i]) 
           //       match = false}  
         // }
         // console.log(match)
       //   if(match == true) //{
          //    {
         //       route_Length = element.sub_route_length  
         //       return;
             //   console.log(true)
          //    }
        //  }
        //  else
         //    console.log(false)
             //if(element.sub_route == route_Stations)
                //   route_Length = element.sub_route_length ;
          })
         // console.log(route)
          if(!Ticket_Object.ticket_Length)
             Ticket_Object.ticket_Length = route.message.route_length;

          var fare= await Fare.search_For_Fare_IV({},1,'',{createdAt: -1}) ; 
          Ticket_Object.ticket_Amount = Ticket_Object.ticket_Length *  fare.message.fare_Amount;
        //  console.log(fare);
        //  console.log(Ticket_Object.ticket_Amount); 
        //  return
          
           // else 
          //    console.log('yes')
            
          //    console.log(route_Length)

          // else 
          //    console.log('oooooooo')   
          
        //  console.log(route_Length);
        //  return ;
         // let ticket = new Ticket(Ticket_Object);
        if(req.user.customer)
           {
            var balance = await  Wallet.check_Balance(req , Ticket_Object.ticket_Length )  
            // .then(result=>{
                if(balance.success)
                     {
                      Ticket_Object.customer = req.user.customer;
                      Ticket_Object.ticket_type = 'Mobile';   
                     }
                else if(!balance.success)
                    return await Respond.respond(req,res, balance); 
                else 
                    return await Respond.respond(req,res, {success: false , message:'Customer not found'})          
            // })
            // Wallet.findOne({customer: req.user.customer})
            //   .then(result=>{
            //     if(result)
            //       {  
            //     if(Ticket_Object.ticket_amount < result.balance){
            //       Ticket_Object.customer = req.user.customer;
            //       Ticket_Object.ticket_type = 'Mobile';   
            //     }else{
            //         res.json({success: false , message: 'Insuffecient balance for the route'});
            //     }
            //       }else{
            //           res.json({success: false , message: 'Customer not found'});
            //       } 
  
            //   })
            //  .catch(err=>{throw err});
           }
          else 
             {  
                   Ticket_Object.ticket_type = 'Temporary';
                  if(Ticket_Object.machine) {
                         var customer = await Wallet.search_For_Wallet_IV({customer: Ticket_Object.customer }) 
                         var machine = await Machine.search_For_Machine_Iv({machine_Id: Ticket_Object.machine})
                       //  console.log(customer)
                         if(machine.success && machine.message.machine_Type == 'Ticket') {
                              if(customer.success)
                                   Ticket_Object.machine = machine.message._id;
                              else 
                                  throw new Error('Customer could not be found')      
                                             }
                          else
                              throw new Error('Machine could not be found or is not Ticket machine')      
                  }   
             }
        let ticket = new Ticket(Ticket_Object);  
       // console.log(ticket)
         var  result = await Ticket.create(ticket)
       //  console.log('lllllll')
        if(result) {
              transaction={
                                 customer: ticket.customer,
                                 //wallet: wallet._id,
                                 transaction_Amount: ticket.ticket_Amount,
                               //  transaction_Type: 'Deduct',
                                 reason: 'Ticket'
              }
          //  console.log(transaction)
               wallet_transaction =  await Wallet.deduct_Balance(transaction)
             //  console.log('ppppppppp')
               if(wallet_transaction.success)
                         return await Respond.respond(req, res ,{ticket: generated_Ticket.ticket})
             else {
                      await Ticket.findByIdAndRemove(result._id);
                      return await Respond.respond(req, res , {success: false , message: 'Wallet Transaction Error has Occured'})     
                  }       
           }
        else
        return await Respond.respond(req,res, {success: false , message: 'Ticket is not created'})
        // .catch(err=>{
        //   Respond.Property_Validator(err)
        //   .then(message=>{ this.respond(req,res, message) })
        //   .catch(err=>{throw err})  
        // })
    //     if(errMessage)
    //           res.json({success: true , message: ticket.ticket});
         } 
         else
           return await Respond.respond(req,res,{success: false , message: 'Route could not be found or is not activated'});
        }else
           return await Respond.respond(req,res,{success: false , message: 'Stations could not be found or are not activated'});      
        
       } catch(err){
         //console.log(result)
         if(result && !wallet_transaction){
              await Ticket.findByIdAndRemove(result._id);
         }
        throw err}            
    },
    async authenticate_Ticket(req){
       try{ 
        var Ticket_Object = await this.create_Ticket_Object(req); 
     /*     //const decipher = crypto.createDecipher(config.CRYPTO_ALGORITHM,config.CRYPTO_PASSWORD);
           //const iv = Buffer.alloc(16, 0); // Initialization vector.
     //   const iv = crypto.randomBytes(16);  
      //   console.log(ticket_component);*/
     // console.log(Ticket_Object)
          const key = await crypto.scryptSync(config.CRYPTO_PASSWORD, 'salt', 32);
          const ticket_code = Ticket_Object.ticket.split(':');
          const iv = await Buffer.from(ticket_code[1],'hex');
          const decipher = await crypto.createDecipheriv(config.CRYPTO_ALGORITHM, key,iv);
           let decrypted =await  decipher.update(ticket_code[0],'hex','utf8');
           decrypted += decipher.final('utf8');
           //console.log(decrypted)
           ticket_component = decrypted.split('cbfcs');   
       ticket_Station = ticket_component[3].split('-');
      // console.log(ticket)
      // console.log(ticket_component)
      //  console.log(ticket_Station[1])
        var ticket = await this.search_for_Ticket_IV({ticket: ticket_component[0]},1,'entry_Station exit_Station')  //.catch(err=>{throw err});
    //  if(false == false == true)
    //     console.log(true)
        if(ticket.success)
         {
     //  console.log(ticket.message.entry_Station)
     //  console.log(Ticket_Object.entry_Station)
        if(ticket.message.entry_Station.station_Name == Ticket_Object.entry_Station && ticket.message.entry_Station.station_Name == ticket_Station[0]){
               if(ticket.message.exit_Station.station_Name == Ticket_Object.exit_Station && ticket.message.exit_Station.station_Name == ticket_Station[1]) {
                      if( ticket.message.status == 'New'){
                        //   console.log(ticket.message.issued_Date)
                      //var Dates = Date.now()//.getDate();
                       var new_Date = new Date();
                       new_Date.setDate(new_Date.getDate() - 1)
                      // var diffrence = new_Date - ticket.message.issued_Date
                       // console.log(new_Date);
               
                         if(ticket.message.issued_Date > new_Date)
                            //   console.log(new_Date)  ;
                                 
                     //  console.log(new Date(diffrence))
                    //ticket_Open_date = new Date() - ticket.message.issued_Date;  
                    //  const one_Day = 1000 * 60 * 60 * 24; 
                   //   const date_Differnce = Math.floor(ticket_Open_date/ one_Day);   
                    //console.log(new Date(ticket_Open_date))
                      //   if(false)             //  if (date_Differnce < 1 && date_Differnce > 0)       
                             return { success: true , message:{ticket: ticket.message}}  
                      else 
                             return { success: false , message: ' Ticket has Expired'}       
                                         }
                       else 
                           return {success: false , message: `Ticket has been ${ticket.message.status}`} 
                      }                 
                    else  
                   return {success: false , message: `Ticket unauthenticated - mismatch on exit Station - ${Ticket_Object.exit_Station} `};         
                 }
        else   
             return {success: false , message: `Ticket unauthenticated - mismatch on entry Station - ${Ticket_Object.entry_Station} `};
         } 
         else 
             return {success: false , message: `Ticket unauthenticated - unrecognizaed ticket`};
    }catch(err){ throw err }
},
async find_Ticket(req , res , data , limit = 1 , populate = ''){
  try {
    var ticket;
    if(req.user && req.user.customer)
       ticket = await this.search_for_Ticket_IV( data , limit , populate)
      //   .then(route=>{  
         //   return await Respond.respond(req,res , ticket)      
    
    else 
      ticket = await this.search_for_Ticket_EV( data , limit , populate)
     //   .then(route=>{  
           return await Respond.respond(req,res , ticket)      
            
        //               })
        // .catch(err=>{throw err})
    }
catch (err) {  throw err}
},
async search_For_Ticket_EV (req, data , limit = 1){
  try{
      if(await Auth.authenticate_Access({ticket: {view: true}},req.user.employee)){
          var result = await this.search_for_Ticket_IV(data , limit)
            return result
              }
          else  //{
                  return {success: false, message: "attempt to find a ticket with out access"}; 
            // }
  }
  catch(err){    throw err   }
},
async search_for_Ticket_IV(data , limit = 1, populate = ''){
  try{
    var query_Object = {};  
    if(data.ticket)
         query_Object.ticket = data.ticket;
    if(data.customer)   
         query_Object.customer = data.customer;  
    if(data._id)
         query_Object._id = data._id;
    if(data.machine)
         query_Object.bus = data.machine;
    if(data.ticket_type) 
         query_Object.ticket_type = data.ticket_type;  
    if(data.issued_Date) 
         query_Object.issued_Date = data.issued_Date; 
    if(data.entry_Station)
         query_Object.entry_Station = data.entry_Station;
    if(data.exit_Station) 
         query_Object.exit_Station = data.exit_Station;  
    if(data.status) 
         query_Object.status = data.status;                                       
    //  console.log(query_Object)
 var result = await Ticket.find(query_Object)   //.catch(err=>{throw err})
      .populate(populate)
      .limit(limit)
     // .then(result=>{
      //  console.log('ooooooo')  
      if(result.length == 1) {
        result = result.reduce((tik)=> {return tik})
        return {success:true, message: result};
      }
//   .then(result=>{
else if(result.length > 1 )   
        return {success:true, message: result};
else
        return {success: false , message: 'No Ticket is not found'};
        //elements: Object.keys(result).length
      // }) 
      // .catch(err=> {throw err})                         
}catch(err){throw err}
},
async change_Ticket_Status( data , status){
    try{
      var ticket = await this.search_for_Ticket_IV(data);  //.catch(err=>{throw err});
   //   console.log(ticket);
      if(ticket.success){
         //    if(await Auth.authenticate_Access({organization: {proccess: true}},req.user.employee)){
      // let ticket_Object = {
      //     status: status
      // }
     var result = await Ticket.findByIdAndUpdate(ticket.message._id,{$set: {status: status}},{new: true, runValidators: true, context:'query'})
    // .then(result=>{
       if(result.length !== 0)
         return {success:true};
       else 
         return {success: false , message: 'Ticket could not be found'};     
  //                   })
  //    .catch(err=>{throw err})
          //                 }
          //   else//{
          //       return await Respond.respond(req, res , {success: false , message: "attempt to activate an organization with out access"});
          //  // }
      }
       else //{
              return {success: false, message: 'Ticket is not found'};
            //}
       }  catch(err){ throw err }
},
async create_Ticket_Object(req){
  try{
     var ticket = {
      issued_Date: Date.now(),
      ticket_Amount: req.body.ticket_Amount,
      route: req.body.route,
      entry_Station: req.body.entry_Station,
      exit_Station: req.body.exit_Station,
      status: req.body.status || 'New',
      machine: req.user.machine_Id,
      customer: req.body.customer,
      ticket: req.body.ticket
  };
  // console.log(req.user);
     Object.keys(ticket).forEach(key=> ticket[key] === undefined ? delete ticket[key]: {})        
     return ticket
    }
    catch(err){throw err}         
   }  

}