import Vue from 'vue'
import Vuex from 'vuex'
import axios from './../service/Api'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: "",
    // access: JSON.parse(localStorage.getItem('access')) || '',

    //  let obj = JSON.parse(localStorage.getItem('role_select2'));

    logout: ''

  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    },
    setAccess(state, access) {
      state.access = access
    },
    logout(state) {
      state.token = ''
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = token
    },

    logout({ commit }) {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
    setUser({ commit }, user) {
      commit('setUser', user)
      localStorage.setItem('user', user)
      // axios.defaults.headers.common['Authorization'] = token 
    },
    setAccess({ commit }, access) {
      commit('setAccess', access)
      localStorage.setItem("access", JSON.stringify(access));





    }
  },
})









// import Vue from 'vue'
// import Vuex from 'vuex'
//  import axios from './../axios-auth'
// Vue.use(Vuex)
// export default new Vuex.Store({

//     state: {
//         status: '',
//           token: localStorage.getItem('token') || '',
//           user: {}
//         },
//     mutations:{
//         auth_request(state) {
//             state.status = 'loading'
//           },
//           auth_success(state, token, user) {
//             state.status = 'success'
//             state.token = token
//             state.user = user
//           },
//           auth_error(state) {
//             state.status = 'error'
//           },
//           logout(state) {
//             state.status = ''
//             state.token = ''
//           },

//  },
//  actions: {
//     login({ commit }, user) {
//       return new Promise((resolve, reject) => {
//         console.log("ussssssssssssssssssssssssssssssss")
//       console.log(user)
//         commit('auth_request')
//         axios.post('api/User/Employee/login',user)

//           .then(resp => {
//             console.log("respon;;;;;;;;;;;;;se")
//                console.log(resp.data.message.token)

//             const token = resp.data.message.token
//             const user = resp.data.message.username
//             localStorage.setItem('token', token)
//           localStorage.setItem('user', user)

//             axios.defaults.headers.common['Authorization'] = token
//             commit('auth_success', token, user)
//             resolve(resp)
//           })
//           .catch(err => {
//             commit('auth_error')
//             localStorage.removeItem('token')
//             reject(err)
//           })
//       })
//     },
//   }
// })




//     register({ commit }, user) {
//       console.log("user COSTUMER INPUT FROM KEYBOARD")
//       console.log(user)
//       return new Promise((resolve, reject) => {
//         commit('auth_request')
//         axios.post('/EOP/register/customer',user)       
//           .then(resp => {
//             console.log("response of costumer")
//             console.log(resp)
//             resolve(resp)
//           })
//           .catch(err => {
//             console.log('errrrrrrrrrrrrrrrrrrrrrrrr')
//             commit('auth_error', err)
//             localStorage.removeItem('token')
//             reject(err)
//           })
//       })
//     },    addBus({ commit }, user) {
//       console.log("user Bus INPUT FROM KEYBOARD")
//       console.log(user)
//       return new Promise((resolve, reject) => {
//         commit('auth_request')
//         axios.post('/ASP/register/bus',user)
//           .then(resp => {
//             console.log("response of costumer")
//             console.log(resp)
//             resolve(resp)
//           })
//           .catch(err => {
//             console.log('errrrrrrrrrrrrrrrrrrrrrrrr')
//             commit('auth_error', err)
//             localStorage.removeItem('token')
//             reject(err)
//           })
//       })
//     },
//     add_Employee({ commit }, user) {
//         console.log("user")
//         console.log(user)
//         return new Promise((resolve, reject) => {
//           commit('auth_request')
//           axios.post('SAD/register/employee',user)


//             .then(resp => {
//               console.log("response Employee")
//               console.log(resp)
//               resolve(resp)
//             })
//             .catch(err => {
//               console.log('errrrrrrrrrrrrrrrrrrrrrrrr')
//               commit('auth_error', err)
//               localStorage.removeItem('token')
//               reject(err)
//             })
//         })
//       },
//       add_Organization({ commit }, user) {
//          console.log("organization")
//          console.log(user)
//         return new Promise((resolve, reject) => {
//           commit('auth_request')
//           axios.post('/SAD/register/organization',user)
//               .then(resp => {
//                 console.log(resp)
//           console.log("wtf")

//               resolve(resp)
//             })
//             .catch(err => {
//               console.log('errrrrrrrrrrrrrrrrrrrrrrrr')
//               commit('auth_error', err)
//               localStorage.removeItem('token')
//               reject(err)
//             })
//         })
//       },


//     logout({ commit }) {
//         return new Promise((resolve) => {
//           commit('logout')
//           localStorage.removeItem('token')
//           delete axios.defaults.headers.common['Authorization']
//           resolve()
//         })
//       },  
//       branch({ commit }, user) {
//         console.log("user COSTUMER INPUT FROM KEYBOARD")
//         console.log(user)
//         return new Promise((resolve, reject) => {
//           commit('auth_request')
//           axios.post('/SAD/register/branch',user)


//             .then(resp => {
//               console.log("eeeeeeeeeeeee")
//               console.log(resp)
//               const token = resp.data.message.token
//               const user = resp.data.message
//               localStorage.setItem('token', token)
//               console.log(resp.data.message.token)

//               axios.defaults.headers.common['Authorization'] = token
//               commit('auth_success', token, user)

//               resolve(resp)
//             })
//             .catch(err => {
//               console.log('errrrrrrrrrrrrrrrrrrrrrrrr')
//               commit('auth_error', err)
//               localStorage.removeItem('token')
//               reject(err)
//             })
//         })
//       },
//  },
//  getters: {
//  isLoggedIn: state => !!state.token,   
//  authStatus: state => state.status,
//  }
// })