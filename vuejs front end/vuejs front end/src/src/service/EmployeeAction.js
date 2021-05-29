import Api from './Api'
import axios from './../service/Api'
export default {


  resetAccount(id, token) {
    axios.defaults.headers.common['Authorization'] = token
    console.log("costumer object iddddddd")
    console.log(id._id)
    // const headers = {headers: {'Content-Type': 'multipart/form-data'}}
    return Api.post('/api/Employee/User/Reset_Account', {}, {
      params: {
        _id: id,
      }
    })
  },
  activate_Credential(id, token) {
    console.log(id)
    axios.defaults.headers.common['Authorization'] = token
    console.log("costumer object oo")
    // const headers = {headers: {'Content-Type': 'multipart/form-data'}}
    return Api.post('/api/Employee/User/activate_credential', {}, {
      params: {
        _id: id,
      }
    })
  },
  deactivate_Credential(id, token) {
    axios.defaults.headers.common['Authorization'] = token
    console.log("employee deact object oo")
    console.log(id)
    // const headers = {headers: {'Content-Type': 'multipart/form-data'}}
    return Api.post('/api/Employee/User/deactivate_credential', {}, {
      params: {
        _id: id,
      }
    })
  },
}