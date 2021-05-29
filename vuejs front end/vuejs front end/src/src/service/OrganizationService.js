import Api from './Api'
import axios from './../service/Api'

export default {
  displayOrganization(search, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Organization/search', {
      params: {
        organization_Name: search,
        limit: 15
      }
    })
  },
  displayAllOrganization(token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Organization/search', {
      params: {
        limit: 15
      }
    })
  },
  addOrganization(credentials, token) {
    axios.defaults.headers.common['Authorization'] = token
    const headers = { headers: { 'Content-Type': 'multipart/form-data' } }
    return Api.post('/api/Employee/Organization/register', credentials)
  },
  show2(search, token) {
    axios.defaults.headers.common['Authorization'] = token
    console.log("search")
    console.log(search)
    return Api.get('/api/Employee/Organization/search', {
      params: {
        organization_Name: search,
        limit: 1

      }
    })
  },
  update(credentials, _id, token) {
    axios.defaults.headers.common['Authorization'] = token
    console.log("credentials" + credentials)
    console.log("updated credential befor send to database" + _id)
    return Api.post('/api/Employee/Organization/update', credentials, {
      params: {
        _id: _id
      }
    })
  },
  activate_Credential(id, token) {
    console.log(id)
    axios.defaults.headers.common['Authorization'] = token
    console.log("costumer object oo")
    // const headers = {headers: {'Content-Type': 'multipart/form-data'}}
    return Api.post('/api/Employee/Organization/activate', {}, {
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
    return Api.post('/api/Employee/Organization/deactivate', {}, {
      params: {
        _id: id,
      }
    })
  },
}