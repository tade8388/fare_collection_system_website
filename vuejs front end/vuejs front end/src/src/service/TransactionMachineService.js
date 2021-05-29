import Api from './Api'
import axios from './../service/Api'
export default{
displayTransactionMachine(token){  
  axios.defaults.headers.common['Authorization'] = token
   console.log("////////////////")
        return Api.get('/api/Employee/Machine/search',{
          params: {
            limit:20
          }
        }) 
},
addTransactionMachine(credentials){
  return Api.post('/api/Employee/Branch/register',credentials)
  },
  show2(search){
    console.log("search")
    console.log(search)

    return Api.get('/api/Employee/Organization/search',{
      params: {
        name:search,
        limit:1
        
    }
  })
  
},
update(credentials,_id){
  console.log("credentials"+credentials)
  console.log("updated credential befor send to database"+_id)
  return Api.post('/api/Employee/Organization/update',credentials,{
    params:{
      _id:_id
    }
  })
}
}