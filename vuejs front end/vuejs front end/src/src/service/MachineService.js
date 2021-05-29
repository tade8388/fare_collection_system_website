import Api from './Api'
import axios from './../service/Api'

export default {
  displayMachine(search, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/machine/search', {
      params: {
        machine_Id: search,
        limit: 15
      }
    })
  },
  displayAllMachine(token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/machine/search', {
      params: {

        limit: 50
      }
    })
  },
  addMachine(credentials, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/machine/register', credentials)
  },
  show2(search) {
    console.log("search")
    console.log(search)

    return Api.get('/api/Employee/machine/search', {
      params: {
        machine_Id: search,
        limit: 1

      }
    })
  },
  update(credentials, _id) {
    console.log("credentials" + credentials)
    console.log("updated credential befor send to database" + _id)
    return Api.post('/api/Employee/machine/update', credentials, {
      params: {
        _id: _id
      }
    })
  },
  activate_Credential(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/machine/activate', {}, {
      params: {
        _id: _id,
      }
    })
  },
  deactivate_Credential(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/machine/deactivate', {}, {
      params: {
        _id: _id,
      }
    })
  },
}