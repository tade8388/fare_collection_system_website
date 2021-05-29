import Api from './Api'
import axios from './../service/Api'
export default{
displayWalet(search,token){  
  axios.defaults.headers.common['Authorization'] = token

        return Api.get('/api/Employee/Customer/find_Wallet',{
          params: {
            customer:search,
            limit:1
          }
        }) 
},
display_Walet_Transaction(search,token){
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Customer/view_Wallet_Transaction',{
        params: {
            _id:search,
            
          }
    })
  },
  display_Normal_Transaction(search,token){
    console.log("normal nnnnnnnnnnnnn")
    console.log(search)
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/TicketandTransaction/find_Transaction',{
        params: {
            _id:search,
            limit:1
            
          }
    })
  }
}