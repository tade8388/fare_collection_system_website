
//const Employee_credential = require('../User Managment Module/Controllers/Employee_credential_controller');
//const Role = require('../User Managment Module/Controllers/Role_Controller');
//const {Role} = require('./internal');
//const emp = require('../User Managment Module/Models/Employee_credential')
const passport = require('passport');
const Employee = require('../User Managment Module/Models/Employee_credential');
const Role = require('../User Managment Module/Models/Role');


const authenticate_User = passport.authenticate('jwt' , {session: false});
const authenticate_Access_deeper =  async (role , key , value)=>{
  var access_for = []; 
  var role = await Role.findById(role)

     for(var elm in role.access)
        {
            if(elm == key) 
             {
                  for(var access in role.access[elm])
                    {
                        if(role.access[elm][access][value])
                              access_for.push(access)
                    }
             }
        }
      return access_for;  
}

const authenticate_Access = async (access_For,employee_id)=>{
    try{    
    var  employee = await Employee.find({employee: employee_id}).limit(1).populate('role');  //.search_For_Employee_Credential_IV({employee: employee_id},1,'role') //.populate('role')
    //  .catch(err=>{
    //          throw err
    //    })   
    if(employee){
        employee = employee.reduce(emp=>{return emp}); 
        
    //  employee = JSON.stringify(employee);
    //  employee = JSON.parse(employee);      
    access_name = Object.keys(access_For)[0];
    if(!Object.keys(access_For)[1])
          access_type = Object.keys(access_For[access_name])[0];
    else 
          access_type =  Object.keys(access_For)[1];     
   // console.log(access_name);
    //console.log(Object.keys(access_For)[1]);
    //console.log(access_type);
     // console.log(employee.role)
     var result = await Role.find({_id: employee.role._id}).limit(1)
      //   .catch(err=>{
      // throw err
      //            })
     // console.log(result);    
    
      result = result.reduce(rol=>{return rol})       
      result = JSON.stringify(result);
      result = JSON.parse(result);  
     // console.log(access_For);
     // console.log(result);
   //  var result = result;
   //  console.log(result);
     // console.log(result.access)
    // console.log(access_For)
     
    if(result){
      for(var values in result.access){      
              // console.log(Object.keys(access_For)[0]);  
              if(values== Object.keys(access_For)[0] ){ 
             //    console.log(result.access[values]);
                 if(Object.keys(access_For)[1]){
                //  console.log(access_For[access_name])
                  for(var type in result.access[values]){
                   // console.log(type + '  ' +access_For[access_name])
                    if(type == access_For[access_name])
                           for(var inner in result.access[values][type]){
                                 // console.log(result.access[values]);  
                                  if(inner == access_type){
                                       
                                        return result.access[values][type][inner]

                                                           }
                         //return access_For[access_name][access_type]
                                                           }                     
                            }
                           
                     return false
                   }
                 else{
                     for(var type in result.access[values]){
                           if(type == access_type)
                               {
                                return result.access[values][type]
                     }}
                   //  return result.access[values];
                 }      
                 //     console.log(key);
                 //else console.log(access_For);   
                // Object.keys(values).forEach(item=>{
                //   console.log(values[item]);
                // })
               //  for(var keys in result[values]){
               //     console.log(keys);
               //  }
          //  }
             /* for(values in result.access){
                   console.log(values)
            /*   if(values == Object.keys(access_For) ){
                          if(Object(result.access[values]) === result.access[values]){
                         for(var inner in result.access[values]){  
                           if(inner == access_For[access_name]){
                              return true;
                            }
                          }}else{
                               return result.access[values]
                          }       
                    return false;
                }
            }
            return false*/
                        }    
                      }
                  return false    
         }else{
              return false
         }
        }else{
              return false
        }
    }catch(err){
      //  console.log(err);
        throw err
    }                                  
}

module.exports = {
    // respond,
    // error_Handler,
    // logparams,
    // Property_Validator,
  //  authenticate_Access_To_Employee_Controller,
    authenticate_Access,
    authenticate_Access_deeper,
    authenticate_User
    // storage,
   // upload
}