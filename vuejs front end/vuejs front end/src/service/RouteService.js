import Api from './Api'
import axios from './../service/Api'
export default {
  displayRoute(search, token) {
    axios.defaults.headers.common['Authorization'] = token

    return Api.get('/api/Employee/Route/search', {
      params: {
        route_Name: search,
        limit: 20
      }
    })
  },
  displayAllRoute(token) {
    axios.defaults.headers.common['Authorization'] = token

    return Api.get('/api/Employee/Route/search', {
      params: {
        limit: 20
      }
    })
  },
  AddRoute(credentials, token) {
    axios.defaults.headers.common['Authorization'] = token
    const headers = { headers: { 'Content-Type': 'multipart/form-data' } }
    return Api.post('/api/Employee/Route/register ', credentials)
  },
  show2(search, token) {
    axios.defaults.headers.common['Authorization'] = token
    console.log("search")
    console.log(search)

    return Api.get('/api/Employee/Route/search', {
      params: {
        route_Name: search,
        limit: 1

      }
    })

  },
  update(credentials, _id, token) {
    const headers = { headers: { 'Content-Type': 'multipart/form-data' } }
    axios.defaults.headers.common['Authorization'] = token
    console.log("credentials" + credentials)
    console.log("updated credential befor send to database" + _id)
    return Api.post('/api/Employee/Route/update', credentials, {
      params: {
        _id: _id
      }
    })
  },
  activate_Route(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    console.log("updated credential befor send to database" + _id)

    return Api.post('/api/Employee/Route/activate', {}, {
      params: {
        _id: _id,
      }
    })
  },
  deactivate_Route(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Route/deactivate', {}, {
      params: {
        _id: _id,
      }
    })
  },

}