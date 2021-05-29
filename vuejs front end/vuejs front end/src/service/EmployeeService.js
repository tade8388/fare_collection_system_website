import Api from './Api'
import axios from './../service/Api'
export default {
  data: () => ({

  }),
  displayEmployee(search, token) {

    // tok(token)
    // const token =this.$store.state.token
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/User/search', {
      params: {
        name: search,
        limit: 21
      }
    })

  },
  displayAllEmployee(token) {

    // tok(token)
    // const token =this.$store.state.token
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/User/search', {
      params: {
        limit: 21
      }
    })

  },

  addEmployee(credentials, token) {
    axios.defaults.headers.common['Authorization'] = token
    const headers = { headers: { 'Content-Type': 'multipart/form-data' } }
    return Api.post('/api/Employee/User/register', credentials, headers)
  },
  // update(credentials){
  //   console.log(credentials)
  update(credentials, _id, token) {

    axios.defaults.headers.common['Authorization'] = token
    const headers = { headers: { 'Content-Type': 'multipart/form-data' } }
    console.log("credentials" + credentials)
    console.log("updated credential befor send to database" + _id)
    return Api.post('/api/Employee/User/update', credentials, {
      params: {
        _id: _id
      }
    })

  },
  //credentials = JSON.stringify(credentials)
  //credentials = JSON.parse(credentials)
  // this.k=credentials
  // if(credentials[0].organization) delete credentials[0].organization;
  // credentials[0].role = credentials[0].role.role_Id
  //  credentials[0].organization = credentials[0].organization.organization_Id
  // console.log(credentials[0])
  //              //  this.i=users[0]._id

  // console.log("{{{{{{{{{{")
  // return Api.post(`api/Employee/User/update/${credentials._id}`,credentials)



  show(Employee_ID) {
    return Api.get(`/SAD/find/Employee/${Employee_ID}`)
  },
  show2(search) {
    console.log("search")
    console.log(search)

    return Api.get('/api/Employee/User/search', {
      params: {
        name: search,
        limit: 1

      }
    })
  },
  change_credential(credentials, token) {

    axios.defaults.headers.common['Authorization'] = token
    // const headers = { headers: { 'Content-Type': 'multipart/form-data' } }
    console.log("credentials" + credentials)
    // console.log("updated credential befor send to database" + _id)
    return Api.post('/api/Employee/User/Change_Credential', credentials)


  },

}