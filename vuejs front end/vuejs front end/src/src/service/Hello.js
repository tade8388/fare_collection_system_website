import Api from './Api'
import axios from './../service/Api'
import https from 'https'
export default {
  data: () => ({}),
  transaction_analysis(data) {
    console.log('it has been heer')
    return Api.post('/api/User/transaction', data)
    return Api.post('/api/Employee/Transaction/analysis', data)
  },
  customer_analysis(data) {
    return Api.post('/api/User/customer', data)
    return Api.post('/api/Employee/Customer/analysis', data)
  },
  bus_analysis(data) {
    return Api.post('/api/User/bus', data)
    return Api.post('/api/Employee/Bus/analysis', data)
  },
  machine_analysis(data) {
    return Api.post('/api/User/machine', data)
    return Api.post('/api/Employee/Machine/analysis', data)
  },
  employee_analysis(data) {
    return Api.post('/api/User/employee', data)
    return Api.post('/api/Employee/User/analysis', data)
  },
  // notification_shit(data){
  //   axios.defaults.headers['Authorization']= "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiZW1wbG95ZWUiLCJkYXRhIjp7Il9pZCI6IjVlNjhlYjYwNmY5ZGM3NDMzNDYwNTJjYiIsInVzZXJuYW1lIjoiU3VwZXJfQWRtaW4iLCJhY2Nlc3MiOnsiYnJhbmNoIjoiY3JlYXRvciIsIm9yZ2FuaXphdGlvbiI6ImNyZWF0b3IiLCJlbXBsb3llZSI6ImNyZWF0b3IiLCJzdGF0aW9uIjoiY3JlYXRvciIsInJvdXRlIjoiY3JlYXRvciIsInJvbGUiOiJjcmVhdG9yIiwiYnVzIjoidmlld2VyIiwibWFjaGluZSI6ImNyZWF0b3IiLCJmYXJlIjoidmlld2VyIiwiYW5hbHlzaXMiOiJjcmVhdG9yIn19LCJpYXQiOjE2MTExNDY1NDcsImV4cCI6MTYxMTE4OTc0N30.RyUNz5UFWX9XIJFIwwZd2YfP1s187knQHxzwVkuhYhA"
  //   return Api.post('/api/Employee/Notification/register', data)
  // },
  notification_view() {
    // axios.defaults.headers['Authorization'] = "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiZW1wbG95ZWUiLCJkYXRhIjp7Il9pZCI6IjVlNjhlYjYwNmY5ZGM3NDMzNDYwNTJjYiIsInVzZXJuYW1lIjoiU3VwZXJfQWRtaW4iLCJhY2Nlc3MiOnsiYnJhbmNoIjoiY3JlYXRvciIsIm9yZ2FuaXphdGlvbiI6ImNyZWF0b3IiLCJlbXBsb3llZSI6ImNyZWF0b3IiLCJzdGF0aW9uIjoiY3JlYXRvciIsInJvdXRlIjoiY3JlYXRvciIsInJvbGUiOiJjcmVhdG9yIiwiYnVzIjoidmlld2VyIiwibWFjaGluZSI6ImNyZWF0b3IiLCJmYXJlIjoidmlld2VyIiwiYW5hbHlzaXMiOiJjcmVhdG9yIn19LCJpYXQiOjE2MTExNDY1NDcsImV4cCI6MTYxMTE4OTc0N30.RyUNz5UFWX9XIJFIwwZd2YfP1s187knQHxzwVkuhYhA"
    return Api.get('/api/Employee/Notification/view')
  },
  notification_Search(data) {
    // axios.defaults.headers['Authorization'] = "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiZW1wbG95ZWUiLCJkYXRhIjp7Il9pZCI6IjVlNjhlYjYwNmY5ZGM3NDMzNDYwNTJjYiIsInVzZXJuYW1lIjoiU3VwZXJfQWRtaW4iLCJhY2Nlc3MiOnsiYnJhbmNoIjoiY3JlYXRvciIsIm9yZ2FuaXphdGlvbiI6ImNyZWF0b3IiLCJlbXBsb3llZSI6ImNyZWF0b3IiLCJzdGF0aW9uIjoiY3JlYXRvciIsInJvdXRlIjoiY3JlYXRvciIsInJvbGUiOiJjcmVhdG9yIiwiYnVzIjoidmlld2VyIiwibWFjaGluZSI6ImNyZWF0b3IiLCJmYXJlIjoidmlld2VyIiwiYW5hbHlzaXMiOiJjcmVhdG9yIn19LCJpYXQiOjE2MTExNDY1NDcsImV4cCI6MTYxMTE4OTc0N30.RyUNz5UFWX9XIJFIwwZd2YfP1s187knQHxzwVkuhYhA"
    return Api.get('/api/Employee/Notification/find', {
      params: {
        limit: 15,
        session_Id: data
      }
    })
  },
  notification_mark(data) {
    // axios.defaults.headers['Authorization'] = "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiZW1wbG95ZWUiLCJkYXRhIjp7Il9pZCI6IjVlNjhlYjYwNmY5ZGM3NDMzNDYwNTJjYiIsInVzZXJuYW1lIjoiU3VwZXJfQWRtaW4iLCJhY2Nlc3MiOnsiYnJhbmNoIjoiY3JlYXRvciIsIm9yZ2FuaXphdGlvbiI6ImNyZWF0b3IiLCJlbXBsb3llZSI6ImNyZWF0b3IiLCJzdGF0aW9uIjoiY3JlYXRvciIsInJvdXRlIjoiY3JlYXRvciIsInJvbGUiOiJjcmVhdG9yIiwiYnVzIjoidmlld2VyIiwibWFjaGluZSI6ImNyZWF0b3IiLCJmYXJlIjoidmlld2VyIiwiYW5hbHlzaXMiOiJjcmVhdG9yIn19LCJpYXQiOjE2MTExNDY1NDcsImV4cCI6MTYxMTE4OTc0N30.RyUNz5UFWX9XIJFIwwZd2YfP1s187knQHxzwVkuhYhA"
    return Api.post('/api/Employee/Notification/mark', {}, {
      params: {
        session_Id: data
      }
    })
  },
  notification_custom(data) {
    // axios.defaults.headers['Authorization'] = "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiZW1wbG95ZWUiLCJkYXRhIjp7Il9pZCI6IjVlNjhlYjYwNmY5ZGM3NDMzNDYwNTJjYiIsInVzZXJuYW1lIjoiU3VwZXJfQWRtaW4iLCJhY2Nlc3MiOnsiYnJhbmNoIjoiY3JlYXRvciIsIm9yZ2FuaXphdGlvbiI6ImNyZWF0b3IiLCJlbXBsb3llZSI6ImNyZWF0b3IiLCJzdGF0aW9uIjoiY3JlYXRvciIsInJvdXRlIjoiY3JlYXRvciIsInJvbGUiOiJjcmVhdG9yIiwiYnVzIjoidmlld2VyIiwibWFjaGluZSI6ImNyZWF0b3IiLCJmYXJlIjoidmlld2VyIiwiYW5hbHlzaXMiOiJjcmVhdG9yIn19LCJpYXQiOjE2MTExNDY1NDcsImV4cCI6MTYxMTE4OTc0N30.RyUNz5UFWX9XIJFIwwZd2YfP1s187knQHxzwVkuhYhA"
    return Api.get('/api/Employee/Notification/get_custom_notification', {
      params: {
        limit: 15,
        type: data
      }
    })
  },
  register_notification(data) {
    // axios.defaults.headers['Authorization'] = "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiZW1wbG95ZWUiLCJkYXRhIjp7Il9pZCI6IjVlNjhlYjYwNmY5ZGM3NDMzNDYwNTJjYiIsInVzZXJuYW1lIjoiU3VwZXJfQWRtaW4iLCJhY2Nlc3MiOnsiYnJhbmNoIjoiY3JlYXRvciIsIm9yZ2FuaXphdGlvbiI6ImNyZWF0b3IiLCJlbXBsb3llZSI6ImNyZWF0b3IiLCJzdGF0aW9uIjoiY3JlYXRvciIsInJvdXRlIjoiY3JlYXRvciIsInJvbGUiOiJjcmVhdG9yIiwiYnVzIjoidmlld2VyIiwibWFjaGluZSI6ImNyZWF0b3IiLCJmYXJlIjoidmlld2VyIiwiYW5hbHlzaXMiOiJjcmVhdG9yIn19LCJpYXQiOjE2MTExNDY1NDcsImV4cCI6MTYxMTE4OTc0N30.RyUNz5UFWX9XIJFIwwZd2YfP1s187knQHxzwVkuhYhA"
    return Api.post('/api/Employee/Notification/register', data)
  },
  get_route() {
    //  axios.defaults.headers['Authorization'] = "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiZW1wbG95ZWUiLCJkYXRhIjp7Il9pZCI6IjVlNjhlYjYwNmY5ZGM3NDMzNDYwNTJjYiIsInVzZXJuYW1lIjoiU3VwZXJfQWRtaW4iLCJhY2Nlc3MiOnsiYnJhbmNoIjoiY3JlYXRvciIsIm9yZ2FuaXphdGlvbiI6ImNyZWF0b3IiLCJlbXBsb3llZSI6ImNyZWF0b3IiLCJzdGF0aW9uIjoiY3JlYXRvciIsInJvdXRlIjoiY3JlYXRvciIsInJvbGUiOiJjcmVhdG9yIiwiYnVzIjoidmlld2VyIiwibWFjaGluZSI6ImNyZWF0b3IiLCJmYXJlIjoidmlld2VyIiwiYW5hbHlzaXMiOiJjcmVhdG9yIn19LCJpYXQiOjE2MTEzMDQzMzgsImV4cCI6MTYxMTM0NzUzOH0.bTf5ALnf-iJdyCVmlxBOx1QolxDkv4cbQ-ynfGfF-aM"
    return Api.get('/api/Employee/Route/search', {
      params: {
        limit: 15,
      }
    })
  },
  async register_Transaction(data) {
    try {
      //  axios.defaults.headers['Authorization'] = "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiZW1wbG95ZWUiLCJkYXRhIjp7Il9pZCI6IjVlNjhlYjYwNmY5ZGM3NDMzNDYwNTJjYiIsInVzZXJuYW1lIjoiU3VwZXJfQWRtaW4iLCJhY2Nlc3MiOnsiYnJhbmNoIjoiY3JlYXRvciIsIm9yZ2FuaXphdGlvbiI6ImNyZWF0b3IiLCJlbXBsb3llZSI6ImNyZWF0b3IiLCJzdGF0aW9uIjoiY3JlYXRvciIsInJvdXRlIjoiY3JlYXRvciIsInJvbGUiOiJjcmVhdG9yIiwiYnVzIjoidmlld2VyIiwibWFjaGluZSI6ImNyZWF0b3IiLCJmYXJlIjoidmlld2VyIiwiYW5hbHlzaXMiOiJjcmVhdG9yIn19LCJpYXQiOjE2MTExOTkzMjksImV4cCI6MTYxMTI0MjUyOX0.s4l2DM5FxAJNT7XMzUOIJVE2Hx31-Xh935RtBhfr5mM"
      var x = await Api.post('/api/Machine/Transaction/register', data)
      console.log('request failed');
      return x
    } catch (err) {
      if (err.response.status == 401) {
        axios.defaults.headers['refresh_token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoibWFjaGluZSIsImRhdGEiOnsiX2lkIjoiNWY4NmQ3ZTcyODM0MDUyNmYwZTg5ODg2IiwidHlwZSI6IlRyYW5zYWN0aW9uIn0sImlhdCI6MTYxMTMwNTMyMSwiZXhwIjoxNjExMzkxNzIxfQ.88WhJYWhidu-WY0pGaqerngNLJSunMseINVbv9U87r4";
        var refresh = (await Api.post('/api/User/Machine/refresh_Token', {})).data
        if (refresh.success) {
          //console.log(refresh.message)
          axios.defaults.headers['Authorization'] = refresh.message.token;
          //  console.log('another request')
          return await Api.post('/api/Machine/Transaction/register', data)
        }
        else {
          console.log('end of refresh_token')
          return ""
        }
      }

    }
  },

  addEmployee(credentials) {
    return Api.post('/api/Employee/User/register ', credentials)
  },
  // update(credentials){
  //   console.log(credentials)
  update(credentials, _id) {
    console.log(credentials)
    console.log("updated credential befor send to database")
    return Api.post('/api/Employee/User/update', credentials, _id)
    //   params:{
    //     _id:_id
    //   }
    // })


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

  },

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

  addCustomer(credentials) {
    return Api.post('/EOP/register/customer', credentials)
  },
  sendNotificationShit(form) {
    return Api.post('/api/User/notification', form)
  }
}
// import Api from './Api'
// export default {
//   data: () => ({

//     // k:[]
//   }),
//   displayshit() {
//     return Api.get('/api/User/analysis', { params: { type: 'month' } })
//   },
//   displayanothershit() {
//     return Api.get('/api/User/analysis2', {})
//   },
//   displayanothershit2() {
//     return Api.get('/api/User/analysis3', {})
//   },
//   displayanothershit3() {
//     return Api.get('/api/User/analysis31', {})
//   },
//   displayanothershit4() {
//     return Api.get('/api/User/analysis4', {})
//   },
//   displayanothershit5() {
//     return Api.get('/api/User/analysis5', { params: { type: 'month' } })
//   },
//   displayanothershit6() {
//     return Api.get('/api/User/analysis6', {})
//   },
//   displayanothershit7() {
//     return Api.get('/api/User/analysis7', {})
//   },
//   displayanothershit8() {
//     return Api.get('/api/User/analysis8', {})
//   },
//   displayanothershit9() {
//     return Api.get('/api/User/analysis12', { params: { type: 'month' } })
//   },
//   displayanothershit10() {
//     return Api.get('/api/User/analysis9', { params: { type: 'month' } })
//   },
//   displayanothershit11() {
//     return Api.get('/api/User/analysis10', { params: { type: 'month' } })
//   },
//   displayanothershit12() {
//     return Api.get('/api/User/analysis11', { params: { type: 'month' } })
//   },

//   addEmployee(credentials) {
//     return Api.post('/api/Employee/User/register ', credentials)
//   },
//   // update(credentials){
//   //   console.log(credentials)
//   update(credentials, _id) {
//     console.log(credentials)
//     console.log("updated credential befor send to database")
//     return Api.post('/api/Employee/User/update', credentials, _id)
//     //   params:{
//     //     _id:_id
//     //   }
//     // })


//     //credentials = JSON.stringify(credentials)
//     //credentials = JSON.parse(credentials)
//     // this.k=credentials
//     // if(credentials[0].organization) delete credentials[0].organization;
//     // credentials[0].role = credentials[0].role.role_Id
//     //  credentials[0].organization = credentials[0].organization.organization_Id
//     // console.log(credentials[0])
//     //              //  this.i=users[0]._id

//     // console.log("{{{{{{{{{{")
//     // return Api.post(`api/Employee/User/update/${credentials._id}`,credentials)

//   },

//   show(Employee_ID) {
//     return Api.get(`/SAD/find/Employee/${Employee_ID}`)
//   },
//   show2(search) {
//     console.log("search")
//     console.log(search)

//     return Api.get('/api/Employee/User/search', {
//       params: {
//         name: search,
//         limit: 1

//       }
//     })
//   },

//   addCustomer(credentials) {
//     return Api.post('/EOP/register/customer', credentials)
//   }
// }