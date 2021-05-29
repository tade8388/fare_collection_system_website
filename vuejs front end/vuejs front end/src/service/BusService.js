import Api from './Api'
import axios from './../service/Api'
export default {
  displayBus(search, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Bus/search', {
      params: {
        bus_Id: search,
        limit: 20
      }
    })
  },
  displayAllBus(token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Bus/search', {
      params: {
        limit: 20
      }
    })
  },
  addBus(credentials, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Bus/register', credentials)
  },
  show2(search) {
    console.log("search")
    console.log(search)

    return Api.get('/api/Employee/Bus/search', {
      params: {
        Bus_Id: search,
        limit: 1

      }
    })

  },
  update(credentials, _id) {
    console.log("credentials" + credentials)
    console.log("updated credential befor send to database" + _id)
    return Api.post('/api/Employee/Bus/update', credentials, {
      params: {
        _id: _id
      }
    })
  },
  activate_Credential(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Bus/activate', {}, {
      params: {
        _id: _id,
      }
    })
  },
  deactivate_Credential(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Bus/deactivate', {}, {
      params: {
        _id: _id,
      }
    })
  },
}