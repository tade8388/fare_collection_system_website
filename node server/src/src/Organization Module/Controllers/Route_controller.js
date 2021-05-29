

const Route = require('../models/Route');
//const Station = require('../Models/Station');
//const stat = require('../models/Station')
const Station = require('../Controllers/Station_controller');

const Respond = require('../../helpers/Response');
const Auth = require('../../helpers/authenticator');
const ors = require('../../config/openrouteservice');
const utility = require('../../helpers/utility')
const logger = require('../../config/logger');
const config = require('../../config')
const fs = require('fs')
//const Employee = require('../../User Managment Module/Controllers/Employee_controller')

module.exports = {
    async register_Route (req,res){
        try{
      if(Auth.authenticate_Access({route: {process: true}},req.user.employee)){
           var route_Object = await this.create_Route_Object(req)  //.catch(err=>{throw err});     
            // for(var station in route_Object.stations){
            //     Stations.exists({station}).
            // }
          //    console.log(route_Object.stations)
              var stations = await Station.search_For_Station_IV({_id:{$in: route_Object.stations}},route_Object.stations.length)
              // .then(stations=>{
                // number of stations and number of route object stations must be equal here
                // Stations is not deactivated 
                //
              //   console.log(stations)
                if(!Array.isArray(stations.message)) 
                        stations.message = [stations.message]
                    //    console.log(stations)
               // console.log(Object.keys(stations.message).length)
                  if(stations.success && Object.keys(stations.message).length === route_Object.stations.length){
                    var length_Object = this.find_Length_And_Segment(route_Object.route_File);
                    var segment = []; 
                     route_Object.route_length = length_Object.route_length; 
                     
                     for(i=0; i<length_Object.subroute_length.length;i++){
                      
                      var sub_route_i = {
                        sub_route:[ route_Object.stations[i],route_Object.stations[i+1]],
                        sub_route_length: length_Object.subroute_length[i] 
                                       }
                         segment.push(sub_route_i);               
                     }
                   //  console.log(subroute)
                       route_Object.route_segments = segment;
                    // length_Object.subroute_length.forEach(element=>{
                    //       var sub_route = {
                    //            sub_route: route_Object.station 
                    //       }
                    // })   
                    var route = new Route(route_Object);
                  // console.log(route.route_segments[1].sub_route);
                 //   Respond.respond(req, res,{success: true , message: route})
              //   console.log(route)
                   var result = await  Route.create(route)
                   //  .then(result=>{
                       if(result) 
                          return await Respond.respond(req, res,{success: true , message: `Route Id - ${result.route_Id} - registered`});
                       else 
                          return await Respond.respond(req, res,{success: false , message: `Route is not registered`}); 
                    //                   })
                    // .catch(err=>{
                    //     Respond.Property_Validator(err)
                    //     .then(message=>{ this.respond(req,res,{success: false , message: message}) })
                    //     .catch(err=>{throw err})
                    //              })
                           }
                   else
                        return await Respond.respond(req, res,{success: false , message: `Stations are not found`})  
            //   }) 
            // .catch(err=>{throw err})      
        }
        else
               return await Respond.respond(req , res,{success: false , message: "attempt to register a station with out access"});   
       }
    catch(err){
      var created_Route = await Route.find(route_Object); 
          //  console.log(created_customer)
           if(created_Route.length == 0 && req.file)
                  await utility.delete_file(req.file.path)
          
          throw err } 
    },
      async find_Route(req, res , limit = 1){
        try {
                var route = await this.search_For_Route_EV(req, req.query , limit)
                   // .then(route=>{  
                    return await Respond.respond(req,res , route)       
                    //               })
                    // .catch(err=>{throw err})
        } 
        catch (err) {  throw err}
      },
      async search_For_Route_EV(req , data , limit = 1 ){
          try {
            if(await Auth.authenticate_Access({route: {view: true}},req.user.employee)) {
                              var result = await this.search_For_Route_IV( data , limit )
                                       //  .then(result=>{
                                           return result
                                        //   })
                                        //  .catch(err=>{throw err}); 
                                      }
                  else
                        return {success: false, message: "attempt to find a station with out access"}; 
          } catch (err) {throw err }
      },
      async search_For_Route_IV(data, limit =1){
        try{
          var query_Object = {};  
          if(data.route_Id)
               query_Object.route_Id = data.route_Id;
          if(data.route_Name){
           query_Object.route_Name = {
                      $regex : new RegExp(data.route_Name,'ig')
                                      }  
                             }
          if(data._id)
               query_Object._id = data._id                        
          if(data.stations)
               query_Object.stations = {$all: data.stations} 
       var result = await Route.find(query_Object)   //.catch(err=>{throw err})
            .limit(limit)
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
      async update_Route (req,res){
        try{
            var route = await this.search_For_Route_EV(req,req.query)   //.catch(err=>{ throw err });
            if(route.success){
            if(await Auth.authenticate_Access({route:{proccess: true}},req.user.employee)){
            var route_Object = await this.create_Route_Object(req);
            if(route_Object.route_Id )  delete route_Object.route_Id;     
           // if(req.body._id) delete req.body._id; 
            // console.log(route_Object)
            var result = await Route.findByIdAndUpdate(route.message._id,{$set: route_Object},{new:true,runValidators:true,context:'query'})
           // .then(result=>{
           //  console.log(result)
             if(result)  
                    return await Respond.respond(req , res , {success: true, message: `Route Id - ${route.message.route_Id} have been updated`});
             else
                    return await Respond.respond(req , res , {success: false, message: `Route is not found`}); 
            //  })
            //  .catch(err=>{
            //         Respond.Property_Validator(err)
            //         .then(message=>{ this.respond(req,res,{status: false , message: message}) })
            //         .catch(err=>{throw err})   
            //          })
                 }
                 else
                       return await Respond.respond(req, res , {success: false, message: "attempt to update route with out access"});
                    }
                    else
                        return await Respond.respond(req , res , {success: false , message: ' Route is not found'});   
        }catch(err){  throw err }
    },
    async delete_Route (req,res){
        try{ 
            var route = await this.search_For_Route_EV(req) //.catch(err=>{throw err });
            if(route && route.success) {        
               if(await Auth.authenticate_Access({route:{remove: true}},req.user.employee)){     
            var result = await Route.findByIdAndDelete(route.message._id)
            //.then(result=>{
                if(result)  
                       return await Respond.respond(req , res , {success: true, message: `Route Id - ${route.message.route_Id} have been deleted`});
                    else 
                       return await Respond.respond(req , res , {success: false, message: `Route is not found on database`});
                // })
                // .catch(err=>{throw err});
                 }  
                else
                      return await Respond.respond(req, res , {success: false , message: "attempt to delete a route with out access"});
            }
            else
                      return await Respond.respond(req , res , {success: false , message: 'Route is not found'});
        }catch(err){ throw err  }
    },
    // async Search_Route (req){
    //     try{
    //         var query_Object= {};
    //         if(await Auth.authenticate_Access({organization: {view: true}},req.user.employee)){
    //       //  if(Object.keys(req.query).length !== 0){ 
    //         if(req.query.id)
    //              query_Object._id = req.query.id;
    //         else if(req.query.name)
    //              query_Object.name = {
    //                 $regex : new RegExp(req.query.name,'ig')
    //                              }  
    //             await  Route.find(query_Object)
    //               .then(route=>{
    //                 if(route)   
    //                 return this.respond(req,res,{success: true, message: route});
    //                 else
    //                 return this.respond(req,res,{success: false , message: 'Route is not found'});
    //               })
    //               .catch(err=>{throw err})  
    //             }
    //             else{
    //                 return this.respond(req,res,{success: false, message: "attempt to find route with out access"});  
    //             }
    //     }catch(err){
    //        throw err
    //     }
    //   },
    async create_route_file(req,res){
        // ors.get_geocoding_extension(req,(error,result)=>{
        //   if(error){
        //     this.respond(req,res,{success: false , message: 'Geocoder error has occured'});
        //           }
        //   if(result){
        //     this.respond(req,res,{success: true , message: result});
        //   }
        //        })
      //  console.log('oooooo')

    //   var r = result.features.reduce(elm => {return elm})
    //   console.log(r.properties.summary) 
    //  // var segment = r.properties.segments.reduce(elm => {return elm})
    //   r.properties.segments.forEach(e=>{
    //        console.log(e.distance);
    //   })
      
    //  return;
      ors.get_Route(req,(error,result)=>{
                if(error){
                  Respond.respond(req,res,{success: false , message: 'Route generation error has occured'});
                }
                if(result){
             //     console.log(result)
               //   console.log(result.features.properties.summary.distance)
               //   return;
                  const file = `${config.FILE_DIRECTORY}/public/Route_generation/new_route.geojson`
                    fs.writeFileSync(file , result)
                   // console.log(file)
                 //    console.log( this.find_Sub_Routes('/public/Route_generation/new_route.geojson'));
                  
                   res.download(file , (err)=>{
                    if (err) {
                       new Error('route file could not be created')
                       Respond.respond(req,res,{success: false , message: 'Route generation error has occured'}); 
                    }
                    fs.unlinkSync(file)
                 //   fs.unlinkSync(file)   
                  //  Respond.respond(req,res,{success: true , message: result});
              //  }
                     }) 
                        }
                    })      
      // ors.get_Route(req,function(error,result){
      //   if(error){
      //     this.respond(req,res,{success: false , message: 'Route generation error has occured'});
      //   }
      //   if(result){  
      //     result = JSON.parse(result);
      //     this.respond(req,res,{success: true , message: result});
      //             }
      //           }) 
      // ors.get_geocode(req,function(error,result){
      //   if(error){
      //     this.respond(req,res,{success: false , message: 'Geocoder error has occured'});
      //   }
      //   if(result){
      //     this.respond(req,res,{success: true , message: result});
      //   }
      //  })
    },  
     find_Length_And_Segment(route_file){
      var subroute_length=[];
      var file = `${config.FILE_DIRECTORY}/${route_file}`
      const data = fs.readFileSync(file, 'utf8');

      // parse JSON string to JSON object
      var route_Object = JSON.parse(data);
      var features = route_Object.features.reduce(elm=>{return elm});
   //   console.log(features)
      features.properties.segments.forEach(element=>{
            subroute_length.push(element.distance/1000)
      });
      var route_length = features.properties.summary.distance/1000;

     // console.log({route_length , subroute_length});
       return {route_length , subroute_length};
    },
    async activate_Route(req,res){
      try{
          var route = await this.search_For_Route_IV({_id: req.query._id})  //.catch(err=>{throw err});
           if(route.success){
                 if(await Auth.authenticate_Access({route: {proccess: true}},req.user.employee)){
          let route_Object = {
              status: 'Activated'
          }
         var result = await Route.findByIdAndUpdate(route.message._id,{$set: route_Object},{new: true, runValidators: true, context:'query'})
        // .then(result=>{
           if(result.length !== 0)
             return await Respond.respond(req , res , {success:true, message: `Route - ${route.message.route_Name} is Activated`});
           else 
             return await Respond.respond(req , res , {success: false, message: 'Route could not  be found'});     
      //                   })
      //    .catch(err=>{throw err})
                              }
                else//{
                    return await Respond.respond(req, res , {success: false , message: "attempt to activate a route with out access"});
               // }
          }
           else //{
                  return await Respond.respond(req, res , {success: false, message: 'Route is not found'});
                //}
           }  catch(err){ throw err }
                 },
    async deactivate_Route(req,res){
       try{
        var route = await this.search_For_Route_IV({_id: req.query._id})
        if(route.success){
          if(await Auth.authenticate_Access({route: {proccess: true}},req.user.employee)){
   let route_Object = {
       status: 'Deactivated'
   }
         var result = await Route.findByIdAndUpdate(route.message._id,{$set: route_Object},{new: true, runValidators: true, context:'query'})
        // .then(result=>{
           if(result.length !== 0)
             return await Respond.respond(req , res , {success: true, message: `Route - ${route.message.route_Name} is Deactivated`});
           else 
             return await Respond.respond(req , res , {success: false, message: 'Route could not  be found'});     
      //                   })
      //    .catch(err=>{throw err})
                              }
                else//{
                    return await Respond.respond(req, res , {success: false , message: "attempt to deactivate a route with out access"});
               // }
          }
           else //{
                  return await Respond.respond(req, res , {success: false, message: 'Route is not found'});
              // }
          }  catch(err){ throw err }
    },
    async create_Route_Object(req){
      try{
        console.log(req.body)
        var route = {
       //    stations: JSON.parse(req.body.stations),
           route_Id: req.body.route_Id,
           route_Name: req.body.route_Name,
        //   route_File: req.body.file,
           status: req.body.status
       }
       if(req.file)    route.route_File = req.file.path;
       if(req.body.stations) 
            route.stations = req.body.stations.split(',')    
       Object.keys(route).forEach(key=>route[key] === undefined ? delete route[key]: {})        
       return route
      }
      catch(err){throw err} 
    },
    // async respond (req,res,response_message){
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
    async log_this(req,res){
       try{
        //  Error.stackTraceLimit = 3;
       //   await this.kk(req,res)//.then(som=>{
      //  //  await Respond.respond(req, res , 'kkkkkkkkkkkkkkkkkk')  
               // jj();
            //  y = 'iii'  
            // if(req.query.id)
            //          y = 'jjjj'   
            var user = await Station.search_For_Station_IV({_id: '5e68eb606f9dc743346052c'})
            //    .then(user=>{
                   //  console.log(await user);
                    if(user.message.organization ) //!== 'Platform_Provider')
                            return 'hhhhhhhhhhhhhhhh'
                    else
                            return 'lllllllllll'

          // })
           //  .catch(err=>{console.log('kk'); this.functionf(err)});    
       }catch(error){
           console.log('ll')
        //   this.functionf(err)
          throw error
       }
    },
    async kk(req,res){
       try{
        // Error.captureStackTrace(5);
            //  await  Route.find({})
            //    .then(resal=>{
            //          jj()
            //         })
              //   jj();  
              return 'kkk' 
             //  .catch(async err=>{console.log('aa'); await ii()})
        
             // throw new Error ('hole neww hahhhhhh')
          } catch(err){//console.log('bb') ;
          this.functionf(req,res,err) ; }//throw err}
    } , 
    functionf(req,res, err){
      //    console.log(Object.keys(err))
      //   console.log(`err - ${err.name}`)
    //     console.log(`stack - ${err.stack}`)
      //   console.log(`code - ${err.code}`)
         //console.log(`message - ${err.message}`)
         res.status(400).json('pppppppp')
       //  console.log(res.statusCode);
         Respond.logparams(req,res)
            .then(message=>{
       //  message.success = response_message.success
         message.message = err.stack
        // console.log(message);
         logger.error(message);
                 })
    }
    
}
