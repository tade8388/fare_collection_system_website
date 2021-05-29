import Api from './Api'
import axios from './../service/Api'
export default {
  displayStation(address, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Station/search', {
      params: {
        station_Name: address,
        limit: 20
      }
    })
  },
  displayAllStation(token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Station/search', {
      params: {
        limit: 20
      }
    })
  },
  addStation(credentials, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Station/register ', credentials)
  },
  show2(search, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Station/search', {
      params: {
        station_Name: search,
        limit: 1

      }
    })

  },
  update(credentials, _id) {
    console.log("credentials" + credentials)
    console.log("updated credential befor send to database" + _id)
    return Api.post('/api/Employee/Station/update', credentials, {
      params: {
        _id: _id
      }
    })
  },
  activate_Credential(_id, token) {
    console.log(_id)
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Station/activate', {}, {
      params: {
        _id: _id,
      }
    })
  },
  deactivate_Credential(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Station/deactivate', {}, {
      params: {
        _id: _id,
      }
    })
  },
}