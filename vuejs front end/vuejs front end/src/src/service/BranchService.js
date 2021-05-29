import Api from './Api'
import axios from './../service/Api'

export default {
  displayBranch(search, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Branch/search', {
      params: {
        branch_Name: search,
        limit: 20
      }
    })
  },
  displayAllBranch(token) {
    console.log("bbbbbbbbbbbbbbbbbbbbbb")
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Branch/search'
      , {
        params: {
          limit: 20
        }
      })
  },
  addBranch(credentials) {
    console.log("credentials")
    console.log(credentials)

    return Api.post('/api/Employee/Branch/register', credentials)
  },
  show2(search, token) {
    axios.defaults.headers.common['Authorization'] = token
    console.log("search")
    console.log(search)

    return Api.get('/api/Employee/Branch/search', {
      params: {
        branch_Name: search,
        limit: 1

      }
    })

  },
  update(credentials, _id) {
    console.log("credentials" + credentials)
    console.log("updated credential befor send to database" + _id)
    return Api.post('/api/Employee/Branch/update', credentials, {
      params: {
        _id: _id
      }
    })
  },
  activate_Credential(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Branch/activate', {}, {
      params: {
        _id: _id,
      }
    })
  },
  deactivate_Credential(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Branch/deactivate', {}, {
      params: {
        _id: _id,
      }
    })
  },
}