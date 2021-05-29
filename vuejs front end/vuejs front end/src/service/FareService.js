import Api from './Api'
import axios from './../service/Api'
export default {

  setFare(credentials, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Fare/register', credentials)
  },
  display_Fare(token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Fare/search', {
      id: search,
      params: {
        limit: 10
      }
    })
  },
  display_All_Fare(token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Fare/search', {
      params: {
        limit: 10
      }
    })
  },
  show2(search, token) {
    axios.defaults.headers.common['Authorization'] = token
    console.log("search")
    console.log(search)

    return Api.get('/api/Employee/Fare/search', {
      params: {
        fare_Id: search,
        limit: 1

      }
    })
  },
  update(fare, _id, token) {
    console.log("zzzzzzzzzzzzzzz")
    console.log(fare)
    console.log(_id)
    console.log(token)
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('api/Employee/Fare/update', fare, {
      params: {
        _id: _id
      }
    })
  },
}
