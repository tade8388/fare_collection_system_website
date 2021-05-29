import Api from './Api'
import axios from './../service/Api'
export default {
  displayRole(search, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Role/search', {
      params: {
        role_Name: search,
        limit: 20
      }
    })
  },
  displayAllRole(token) {
    console.log("rrrrrrrrrrrrrrrrrr")
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Role/search', {
      params: {
        limit: 20
      }
    })
  },
  role_Chooser(token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Role/access_list', {
      params: {
        limit: 20
      }
    })
  },
  register(credential, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Role/register', credential)
  },
  show2(search, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Role/search', {
      params: {
        role_Name: search,
        limit: 1
      }
    })
  },

  activate_Credential(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Role/activate', {}, {
      params: {
        _id: _id._id,
      }
    })
  },
  deactivate_Credential(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Role/deactivate', {}, {
      params: {
        _id: _id._id,
      }
    })
  },
}