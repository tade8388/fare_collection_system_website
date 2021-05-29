

const Station = require('../Models/Station');
const Respond = require('../../helpers/Response');
const Auth = require('../../helpers/authenticator');
const geocoder = require('../../config/geocoder');
const ors = require('../../config/openrouteservice');
const { serializeUser } = require('passport');
module.exports = {
    async register_Station(req,res){
        try{
        if(await Auth.authenticate_Access({station: {proccess: true}},req.user.employee)){
               var Station_Object = await this.create_Station_Object(req);
               var station = new Station(Station_Object)
            //  console.log(Station_Object)
            var result = await Station.create(station)
            // .then(result=>{
                   if(result)
                          return await Respond.respond(req , res , {success: true, message: `Station Id - ${station.station_Id} have been registered`});
                   else
                          return await Respond.respond(req , res , {success: false, message: `Station is not registered`});   
            // })
            // .catch( err=>{
            //     Respond.Property_Validator(err)
            //     .then(message=>{ return  this.respond(req,res,{success: false , message: message}) })
            //     .catch(err=>{throw err})
            //        })
            }
        else{
               return await Respond.respond(req,res,{success: false , message: "attempt to register station with out access"});
            }
        }catch(err){ throw err }
    },
    async search_For_Station_EV (req,data ,limit = 1 , populate =''){
        try{
                  if(await Auth.authenticate_Access({station: {view: true} },req.user.employee)) {
                              var result = await  this.search_For_Station_IV(data , limit , populate)
                                        // .then(result=>{
                                     // if(result)        
                                          return result   //})
                                          
                                       //  .catch(err=>{throw err}); 
                          }
                  else
                        return {success: false, message: "attempt to find a station with out access"};                           
        //     var query_Object = {};
        //     if(await Auth.authenticate_Access({station: {view: true} },req.user.employee)){
        //    // if(Object.keys(req.query).length !== 0){     
        //     if(req.query.station_Id){
        //          query_Object.station_Id = req.query.station_Id;
        //     }    
        //     if(req.query.station_Name){
        //      query_Object.station_Name = {
        //                 $regex : new RegExp(req.query.name,'ig')
        //                                 }  
        //                        }
        //       await Station.findOne(query_Object).catch(err=>{throw err})
        //       .then(result=>{
        //         if(result)   
        //         return {success:true, message: result};
        //         else
        //         return {success: false , message: 'Station is not found'};
        //       }) 
        //       .catch(err=> {throw err})
        //      }                         
        //    // }
            
        }catch(err){throw err}
      },
      async find_Station(req, res , limit){
        try {
         var station = await this.search_For_Station_EV(req ,req.query , limit)
            //  .then(route=>{  
              return await Respond.respond(req,res , station)       
                          //  })
           //   .catch(err=>{throw err})
          } 
          catch (error) {  throw error}
      },
      async update_Station (req,res){
        try{
            var station = await this.search_For_Station_EV(req , {_id: req.query._id})   //.catch(err=>{ throw err });
            if(station && station.success){
            if(await Auth.authenticate_Access({station: {proccess: true}},req.user.employee)){
              var Station_Object = await this.create_Station_Object(req);    
            if(Station_Object.station_Id)  delete Station_Object.station_Id; 
            //if(req.body._id) delete req.body._id; 
           var result = await Station.findByIdAndUpdate(station.message._id,{$set: Station_Object},{new:true, runValidators:true, context:'query'})
           //  .then(result=>{
                if(result)  
                     return await Respond.respond(req , res , {success: true, message: `Station Id - ${station.message.station_Id} have been updated`});
                 else
                     return await Respond.respond(req , res , {success: false, message: `Station is not found`});
              //    })
            //  .catch(err=>{
            //     Respond.Property_Validator(err)
            //     .then(message=>{ this.respond(req,res,{status: false , message: message}) })
            //     .catch(err=>{throw err}) 
            //     })
            }
            else
               return await Respond.respond(req, res , {success: false, message: "attempt to update station with out access"});
            }
            else
               return await Respond.respond(req , res , {success: false , message: ' Station is not found'});   
        }catch(err){throw err}
    },
    async delete_Station (req,res){
        try{  
            var station = await this.search_For_Station_EV(req)  //.catch(err=>{ throw err });
            if(station && station.success){
            if(await Auth.authenticate_Access({station: {remove: true}},req.user.employee)){
            var result = Station.findByIdAndDelete(station.message._id)
           // .then(result=>{
                if(result)  
                    return await Respond.respond(req , res , {success: true, message: `Station Id - ${station.message.station_Id} have been deleted`});
                else 
                    return await Respond.respond(req , res , {success: false, message: `Station is not found on database`});
            // })
            // .catch(err=>{throw err});
                     }  
            else
                     return await Respond.respond(req, res , {success: false , message: "attempt to delete a station with out access"});
               }
        else
                     return await Respond.respond(req , res , {success: false , message: 'Station is not found'});
            
        }catch(err){  throw err }
    },
    async get_Geocode(req, res){
         try{
             if(req.query && req.query.address){
                var result = await geocoder.geocode({
                    address: req.query.address,
                    country: 'Ethiopia',
                    })
                // .then(result=>{
                      if(result)
                           return await Respond.respond(req , res , {status: true , message: result});
                      else
                           return await Respond.respond(req , res , {status: false , message: 'location detail not provided by location provider'});        
                // });     
             }  else
                           return await Respond.respond(req , res , {status: false , message: 'No Address query is found'});

         }catch(err){throw err}
    },
    async get_geo_with_locationiq(req,res){
        try{
         ors.get_geocode_locationiq(req,(error,result)=>{
          if(error){
            Respond.respond(req,res,{success: false , message: 'Geocoder error has occured'});
                  }
          if(result){
            Respond.respond(req,res,{success: true , message: result});
          }
               })
        } catch(err) { throw err }
    },
    async get_geo_with_ors(req,res){
        try{
         ors.get_geocode(req,(error,result)=>{
          if(error){
            Respond.respond(req,res,{success: false , message: 'Geocoder error has occured'});
                  }
          if(result){
            Respond.respond(req,res,{success: true , message: result});
          }
               })
        } catch(err) { throw err }
    },
    async search_For_Station_IV (data, limit=1, populate=''){
        try{
            var query_Object = {};  
            if(data.station_Id)
                 query_Object.station_Id = data.station_Id;
            if(data.station_Name){
             query_Object.station_Name = {
                        $regex : new RegExp(data.station_Name,'ig')
                                         }  
                               }
            if(data._id)
                 query_Object._id = data._id                        
             // console.log(query_Object)
         var result = await Station.find(query_Object)    //.catch(err=>{throw err})
              .populate(populate)
              .limit(limit)
           //   console.log(result)
             // .then(result=>{
              if(result.length == 1) {
                result = result.reduce((station)=> {return station})
                return {success:true, message: result};
              }
          //   .then(result=>{
          else if(result.length > 1 )   
                return {success:true, message: result};
          else
                return {success: false , message:'Station is not found'};
                //elements: Object.keys(result).length
              // }) 
              // .catch(err=> {throw err})                         
        }catch(err){throw err}
      },
  //   async ser(data, limit=1, populate=''){
  //     var result = await Station.find(data)    //.catch(err=>{throw err})
  //     .populate(populate)
  //    // .limit(limit)
  //  //   console.log(result)
  //    // .then(result=>{
  //     if(result.length == 1) {
  //       result = result.reduce((station)=> {return station})
  //       return {success:true, message: result};
  //     }
  // //   .then(result=>{
  // else if(result.length > 1 )   
  //       return {success:true, message: result};
  // else
  //       return {success: false , message:'Station is not found'};
  //   },
  async activate_Station(req,res){
    try{
        var station = await this.search_For_Station_IV({_id: req.query._id})  //.catch(err=>{throw err});
         if(station.success){
               if(await Auth.authenticate_Access({station: {proccess: true}},req.user.employee)){
        let station_Object = {
            status: 'Activated'
        }
       var result = await Station.findByIdAndUpdate(station.message._id,{$set: station_Object},{new: true, runValidators: true, context:'query'})
      // .then(result=>{
         if(result.length !== 0)
           return await Respond.respond(req , res , {success:true, message: `Station - ${station.message.station_Name} is Activated`});
         else 
           return await Respond.respond(req , res , {success: false, message: 'Station could not  be found'});     
    //                   })
    //    .catch(err=>{throw err})
                            }
              else//{
                  return await Respond.respond(req, res , {success: false , message: "attempt to activate a station with out access"});
             // }
        }
         else //{
                return await Respond.respond(req, res , {success: false, message: 'Station is not found'});
              //}
         }  catch(err){ throw err }
               },
  async deactivate_Station(req,res){
     try{
      var station = await this.search_For_Station_IV({_id: req.query._id})
      if(station.success){
        if(await Auth.authenticate_Access({station: {proccess: true}},req.user.employee)){
 let station_Object = {
     status: 'Deactivated'
 }
       var result = await Station.findByIdAndUpdate(station.message._id,{$set: station_Object},{new: true, runValidators: true, context:'query'})
      // .then(result=>{
         if(result.length !== 0)
           return await Respond.respond(req , res , {success: true, message: `Station - ${station.message.station_Name} is Deactivated`});
         else 
           return await Respond.respond(req , res , {success: false, message: 'Station could not  be found'});     
    //                   })
    //    .catch(err=>{throw err})
                            }
              else//{
                  return await Respond.respond(req, res , {success: false , message: "attempt to deactivate a station with out access"});
             // }
        }
         else //{
                return await Respond.respond(req, res , {success: false, message: 'Station is not found'});
            // }
        }  catch(err){ throw err }
  },
    async create_Station_Object(req){
        try{
           var station = {
                    station_Id: req.body.station_Id,
                    station_Name: req.body.station_Name,
                    status: req.body.status, 
                    geometry: {type: 'point'},
                    station_Type: req.body.station_Type   
                        }
           if(req.body.location){
                 station.geometry.coordinate = [req.body.location.longitude , req.body.location.latitude] 
           }   
        //   console.log(req)            
           Object.keys(station).forEach(key=>station[key] === undefined ? delete station[key]: {})     
           
           return station
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