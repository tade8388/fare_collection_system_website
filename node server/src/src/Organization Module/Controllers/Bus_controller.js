
const Bus = require('../Models/Bus');
//const Route = require('../models/Route');
const Route = require('../Controllers/Route_controller');
//const Employee = require('../../User Managment Module/Models/Employee');
const Employee = require('../../User Managment Module/Controllers/Employee_controller');
const Machine = require('./Machine_controller');
const Respond = require('../../helpers/Response');
const Auth = require('../../helpers/authenticator');
const fs = require('fs');
module.exports = {
    async register_Bus(req,res){
        try{
          //  var bus_Driver;
           // var message={};
            if(await Auth.authenticate_Access({bus:{proccess: true}},req.user.employee)){
              var Bus_Object = await this.create_Bus_Object(req);    
              var user = await Employee.search_for_Employee_IV({_id: req.user.employee})
        //      .then(employee=>{
                 if(user.success) {
                    if(Bus_Object.bus_Driver) {
                            var employee = await Employee.search_for_Employee_IV({employee_Id: Bus_Object.bus_Driver})
                               if(employee.success ){
                                 //   console.log(employee.message.organization.organization_Id + ' ' + user.message.organization.organization_Id )
                                    if(employee.message.organization.organization_Id === user.message.organization.organization_Id) 
                                          Bus_Object.bus_Driver = employee.message._id;
                                    else 
                                       return await Respond.respond(req, res,{success: false , message: `Organization mismatch between Bus Driver and user`})       
                                 }
                                else
                                    return await Respond.respond(req, res,{success: false , message: `Bus Driver data is not found`})    
                                              }
                     if(Bus_Object.transaction_Machine) {
                        var transaction_Machine = await Machine.search_For_Machine_Iv({machine_Id: Bus_Object.transaction_Machine ,machine_Type: 'Transaction'});
                       //   console.log(transaction_Machine)
                        if(transaction_Machine.success)   Bus_Object.transaction_Machine =  transaction_Machine.message._id;
                         else            return await Respond.respond(req, res,{success: false , message: 'Transaction_Machine is not found '});
                     }    
                     else
                        throw new Error('Transaction_Machine could not be found');
                     //console.log(Bus_Object.transaction_Machine)
                     if(Bus_Object.ticket_Machine)
                                  {
                                      //  console.log('lkkkkkkkk')
                                        var ticket_Machine = await Machine.search_For_Machine_Iv({machine_Id: Bus_Object.ticket_Machine , machine_Type: 'Ticket'});
                                       // console.log('kkkkkkkkkkk')
                                        if(ticket_Machine.success)   Bus_Object.ticket_Machine =  ticket_Machine.message._id
                                        else            return await Respond.respond(req, res,{success: false , message: 'Ticket Machine is not found '});
                                  }     
                                                
                            Bus_Object.organization = user.message.organization._id; 
                              var bus = await new Bus(Bus_Object);  
                             // console.log(Bus_Object)   
                            // console.log(Bus_Object)    
                          //   console.log(bus) 
                                var result = await Bus.create(bus)
                               // .then(result2=>{
                             //   console.log('kkkkkkkkkkk')
                                    if(result) 
                                    return await Respond.respond(req, res,{success: true , message: `Bus Id - ${result.bus_Id} - registered`});
                                    else 
                                    return await Respond.respond(req, res,{success: false , message: `Bus is not registered`}); 
                                               //   })
                                // .catch(err=>{
                                //     Respond.Property_Validator(err)
                                //     .then(message=>{ this.respond(req,res,{success: false , message: message}) })
                                //     .catch(err=>{throw err})
                                //              })
                              //  }
                    //   else
                    //       return await Respond.respond(req, res,{success: false , message: `Bus Driver data is not found`}) 
                //        })                         
                //   .catch(err=>{ throw err })
                      }
                  else 
                      return await Respond.respond(req, res,{success: false , message: `user could't be found`}) 
                //     })
                // .catch(err=>{throw err})
        }
        else{
                 return  await Respond.respond(req , res,{success: false , message: "attempt to register a bus with out access"});
            }
        }
        catch(err){     throw err   }
    },
    async find_Bus(req, res , limit = 1){
        try {
         var bus = await this.search_For_Bus_EV(req , req.query , limit)
            //  .then(route=>{  
              return await Respond.respond(req,res , bus)       
                          //  })
           //   .catch(err=>{throw err})
          } 
          catch (err) {  throw err}
      },
    async search_For_Bus_EV(req, data , limit = 1 , populate = 'organization'){
        try{
           // var bus;
           var query_Object={};
           // const user =  await Employee.findOne({employee: req.user.employee}).populate('organization').catch(err=>{throw err}) 
                if(await Auth.authenticate_Access({bus: {view: true}},req.user.employee)){
                   query_Object = data; 
          //  if(Object.keys(req.query).length !== 0){
                var user = await Employee.search_for_Employee_IV( {_id: req.user.employee}, limit , populate)
         //    .then(user=>{
             //  console.log(user)
                 if(user && user.success && user.message.organization && user.message.organization.organization_Type == 'Service_Provider')
                                    query_Object.organization = user.message.organization._id;   

                //  if(req.query.id)
                //        query_Object._id = req.query.id;
             //   console.log(query_Object)
           //    populate = [ {path: 'organization' , select: '_id organization_Name organization_Id'} , {path: 'bus_Driver' , select: '_id name employee_Id'}]
                var bus =  await this.search_For_Bus_IV(query_Object, limit) 
                   // .then(bus=> { 
                        return bus 
                    //})
                    // .catch(err=>{throw err})
                    //       }) 
                }
                else
                    return {success: false, message: "attempt to find a bus with out access"};            
        }catch(err){
           throw err
        }
      },
      async search_For_Bus_IV(data, limit = 1 , populate = ''){
        try{
            var query_Object = {};  
            if(data.bus_Id)
                 query_Object.bus_Id = data.bus_Id;
            if(data.organization)
                 query_Object.organization = data.organization 
            if(data._id)
                 query_Object._id = data._id 
            if(data.bus_Driver)
                 query_Object.bus_Driver = data.bus_Driver
            if(data.machine_Id)
                 query_Object.machine_Id = data.machine_Id                                 
            //  console.log(query_Object)
         if(populate == '')
         // {
             populate =[ {path: 'organization' , select: '_id organization_Name organization_Id'} , {path: 'bus_Driver' , select: '_id name employee_Id'}]  
          //} 
         var result =  await Bus.find(query_Object)     //.catch(err=>{throw err})
              .populate(populate)
              .limit(limit)
              .select('-createdAt -status -updatedAt -__v')
         //     .then(result=>{
      
            if(result.length == 1) {
                result = result.reduce((bus)=> {return bus})
                return {success:true, message: result};
              }
          //   .then(result=>{
          else if(result.length > 1 )   
                return {success:true, message: result};
          else
                return {success: false , message:'Bus is not found'};
                //elements: Object.keys(result).length
            //   }) 
            //   .catch(err=> {throw err})                         
        }catch(err){throw err}      
      },

      async sfb(data , limit = 1 , populate = ''){
        try{
          // data = 
          //            [
          //   {  "$match" : { "status" : "Activated" }, },
          //   {  "$group" : {"_id": "$updatedAt" , "count": {"$sum" : 1}} }
          //             ]
                 
        var result =  await Bus.aggregate(data)     //.catch(err=>{throw err})
      //  .populate(populate)
      //  .limit(limit)
     //   .select('-createdAt -status -updatedAt -__v')
   //     .then(result=>{
          console.log(result)
      if(result.length == 1) {
          result = result.reduce((bus)=> {return bus})
          return {success:true, message: result};
        }
    //   .then(result=>{
    else if(result.length > 1 )   
          return {success:true, message: result};
    else
          return {success: false , message:'Bus is not found'};
        }catch(err){throw err}
        },





      async update_Bus (req,res){
        try{
            bus = await this.search_For_Bus_EV(req , req.query)   // .catch(err=>{throw err});
            if(bus.success){
            if(await Auth.authenticate_Access({bus: {proccess: true}},req.user.employee)){  
            var Bus_Object = await this.create_Bus_Object(req); 
           // console.log(req.body)
            if(Bus_Object.bus_Id) delete Bus_Object.bus_Id;
            if(Bus_Object.organization) delete Bus_Object.organization;
             //if(req.body.organization) delete req.body.organization;   
            //if(req.body._id) delete req.body._id;     
            if(Bus_Object.bus_Driver) { 
               var bus_Driver =  await  Employee.search_For_Employee_EV(req,{employee_Id:Bus_Object.bus_Driver})
            //   .then(result=>{
                // console.log(bus_Driver)
                   if(bus_Driver.success)
                         Bus_Object.bus_Driver = bus_Driver.message._id;
                   else
                        return await Respond.respond(req, res,{ success: false , message: `Bus Driver data is not found`})  
                    //     })
         //      .catch(err=>{ throw err  }) 
                                        }
             if(Bus_Object.transaction_Machine) {
                var transaction_Machine = await Machine.search_For_Machine_Iv({machine_Id: Bus_Object.transaction_Machine ,machine_Type: 'Transaction'});
                //   console.log(transaction_Machine)
                 if(transaction_Machine.success)   Bus_Object.transaction_Machine =  transaction_Machine.message._id;
                  else            return await Respond.respond(req, res,{success: false , message: 'Transaction_Machine is not found '});
                                               }    
             if(Bus_Object.ticket_Machine) {
                var ticket_Machine = await Machine.search_For_Machine_Iv({machine_Id: Bus_Object.ticket_Machine , machine_Type: 'Ticket'});
                // console.log('kkkkkkkkkkk')
                 if(ticket_Machine.success)   Bus_Object.ticket_Machine =  ticket_Machine.message._id
                 else            return await Respond.respond(req, res,{success: false , message: 'Ticket Machine is not found '});
                                          }
          var result = await Bus.findByIdAndUpdate(bus.message._id,{$set:Bus_Object},{new:true,runValidators:true,context:'query'})
        //   .then(result=>{
                  if(result)  
                      return await Respond.respond(req , res , {success: true, message: `Bus Id - ${bus.message.bus_Id} have been updated`});
                  else
                      return await Respond.respond(req , res , {success: false, message: `Bus is not found`}); 
            //        })
            //  .catch(err=>{
            //          Respond.Property_Validator(err)
            //           .then(message=>{ this.respond(req,res,{status: false , message: message}) })
            //           .catch(err=>{throw err})   
            //            })
                 }
         else {
                   return await Respond.respond(req, res , {success: false, message: "attempt to update a bus with out access"});
               }
            }
            else{
                 return await Respond.respond(req , res , {success: false , message: ' Bus is not found'});
                }
          }
        catch(err){  throw err }
    },
    async delete_Bus (req,res){
        try{  
            bus = await this.search_For_Bus_EV(req).catch(err=>{throw err});
            if(bus.success){
            if(await Auth.authenticate_Access({bus: {remove: true}},req.user.employee)){ 
              var employee = await Employee.search_for_Employee_IV({_id:req.user.employee})
                // .then(employee=>{
                    if(employee.success){
                    if(employee.message.organization == bus.message.organization)
                         {  
                           var result =  await Bus.findByIdAndDelete(bus.message._id)
                         //    .then(result=>{
                                      if(result)  
                                           return await Respond.respond(req , res , {success: true, message: `Bus Id - ${bus.message.bus_Id} have been deleted`});
                                      else 
                                           return await Respond.respond(req , res , {success: false, message: `Bus is not found on database`});
                            //            })
                            //  .catch(err=>{throw err});
                        }  
                    else{
                        return await Respond.respond(req , res , {success: false, message: 'Unautorized Access to non organizational bus data '}) 
                    }
                         }
                    else 
                       return await Respond.respond(req , res , {success: false, message: 'User data could not be found'})       
            //     })
            //    .catch(err=>{throw err})
                    }         
            else {
                return await Respond.respond(req, res , {success: false , message: "attempt to delete an bus with out access"});
                }
        }
        else{
               return await Respond.respond(req , res , {success: false , message: 'Bus is not found'});
            }    
        }
        catch(err){  throw err }
    },
    async dispatch_bus(req,res){
        try{  
         if(Auth.authenticate_Access({bus:{proccess: true}},req.user.employee)){
          var  bus = await Bus.search_For_Bus_EV(req)
                  // .then(bus=>{
                                if(bus && bus.success) {
                                    if(bus.message.status){
                               var route = await Route.search_For_Route_IV({_id: req.body.route})
                                  // .then(route=>{
                                      if(route && route.success){
                                               if(route.message.status !== 'Activated'){
                                         var driver = await  Employee.search_for_Employee_IV({_id: req.body.driver})
                                          //     .then(driver=>{
                                                  if(driver && driver.success){
                                                      employee = Employee.search_for_Employee_IV({_id: req.user.employee})
                                                      if(bus.organization == employee.organization && driver.message.organization == employee.message.organization){
                                                    var data = { 'bus_id': req.body.route , 'route_Id': req.body.route , 'starting_date': req.body.starting_Date , 'ending_date': req.body.ending_Date , 'issued_by': req.user.employee , 'purpose': req.body.purpose , 'driver_Id': req.body.driver }
                                                    fs.appendFile(`../../../public/Bus/${bus._id}`, data , 'utf8' , (err)=>{ if(err) throw err}) 
                                                        return await Respond.respond(req,res,{status: true , message: `Bus Id - ${bus.Id} successfully been dispatched`});
                                                                 }
                                                      else           
                                                          return await Respond.respond(req,res,{status: true , message: 'unauthorized access of organization juristiction'});
                                                                        }     
                                                     else 
                                                         return  await Respond.respond(req,res,{status: false , message: 'Requested driver employee is not found'});
                                                          //}         
                                            //            })
                                            //    .catch(err=>{throw err});   
                                                      }
                                                else 
                                                   return await Respond.respond(req,res, {status: false, message: ` Route Name - ${route.message.route_Name} is ${route.message.status}`})       
                                            }
                                          else 
                                              return await Respond.respond(req,res,{status: false , message: 'Requested route is not found'});                           
                                    //                }) 
                                    // .catch(err=>{throw err})
                                             }
                                          else 
                                              return await Respond.respond(req,res, {status: false, message: ` Bus Id - ${ bus.message.bus_Id} is ${bus.message.status}`})         
                                            }
                                else 
                                    return await Respond.respond(req,res,{status: false , message: 'Requested bus is not found'});           
                  }               
       else 
           return await Respond.respond(req,res,{status: false , message: "attempt to dispatch a bus with out access"});      
      }
      catch(err){throw err};
     },
     async activate_Bus(req,res){
      try{
          var bus = await this.search_For_Bus_EV(req , {_id: req.query._id})  //.catch(err=>{throw err});
           if(bus.success){
                 if(await Auth.authenticate_Access({bus: {proccess: true}},req.user.employee)){
                //  var employee = await Employee.search_for_Employee_IV({employee_Id: })
          let bus_Object = {
              status: 'Activated'
          }
         var result = await Bus.findByIdAndUpdate(bus.message._id,{$set: bus_Object},{new: true, runValidators: true, context:'query'})
        // .then(result=>{
           if(result.length !== 0)
             return await Respond.respond(req , res , {success:true, message: `Bus - ${bus.message.bus_Name} is Activated`});
           else 
             return await Respond.respond(req , res , {success: false, message: 'Bus could not  be found'});     
      //                   })
      //    .catch(err=>{throw err})
                              }
                else//{
                    return await Respond.respond(req, res , {success: false , message: "attempt to activate a bus with out access"});
               // }
          }
           else //{
                  return await Respond.respond(req, res , {success: false, message: 'Bus is not found'});
                //}
           }  catch(err){ throw err }
                 },
    async deactivate_Bus(req,res){
       try{
        var bus = await this.search_For_Bus_EV(req , {_id: req.query._id})
        if(bus.success){
          if(await Auth.authenticate_Access({bus: {proccess: true}},req.user.employee)){
   let bus_Object = {
       status: 'Deactivated'
   }
         var result = await Bus.findByIdAndUpdate(bus.message._id,{$set: bus_Object},{new: true, runValidators: true, context:'query'})
        // .then(result=>{
           if(result.length !== 0)
             return await Respond.respond(req , res , {success: true, message: `Bus - ${bus.message.bus_Name} is Deactivated`});
           else 
             return await Respond.respond(req , res , {success: false, message: 'Bus could not  be found'});     
      //                   })
      //    .catch(err=>{throw err})
                              }
                else//{
                    return await Respond.respond(req, res , {success: false , message: "attempt to deactivate a bus with out access"});
               // }
          }
           else //{
                  return await Respond.respond(req, res , {success: false, message: 'Bus is not found'});
              // }
          }  catch(err){ throw err }
    },
    async create_Bus_Object(req){
        try{
         //   console.log(req.body);
           var bus = {
            bus_Id: req.body.bus_Id,
            bus_Driver: req.body.bus_Driver_Id,           //bus_Driver._id,
            ticket_Machine: req.body.ticket_Machine,
            transaction_Machine: req.body.transaction_Machine,
            status: req.body.status  
                   }
           Object.keys(bus).forEach(key=>bus[key] === undefined ? delete bus[key]: {})  
         //  console.log(bus);      

           return bus
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
        //   }, 

    }   