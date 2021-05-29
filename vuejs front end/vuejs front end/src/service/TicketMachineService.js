import Api from './Api'
export default{
displayTicketMachine(){  
        return Api.get('/api/Employee/Branch/search',{
          params: {
            limit:20
          }
        }) 
},
addTicketMachine(credentials){
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