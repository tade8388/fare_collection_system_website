import Api from './Api'
import axios from './../service/Api'
export default {

  // reset_Account(search, token) {
  //   axios.defaults.headers.common['Authorization'] = token

  //   return Api.get('/api/Employee/Customer/Reset_Account', {
  //     params: {
  //       _id: search._id,
  //     }
  //   })
  // },
  display_ticket_Information(customer, token) {
    console.log("customer of ticket")
    console.log(customer)
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/TicketandTransaction/find_Ticket', {

      params: {
        customer: customer,
        limit: 1
      }
    })
  },
  display_Walet_Transaction(search, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Customer/view_Wallet_Transaction', {
      params: {
        _id: search,
        limit: 1
      }
    })
  },
  refill(transaction_Amount, _id, token) {
    transaction_Amount = parseFloat(transaction_Amount)
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Customer/Refill_Balance', { 'transaction_Amount': transaction_Amount }, {
      params: {
        _id: _id,
      }
    })
  },
  resetAccount(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Customer/Reset_Account', {}, {
      params: {
        _id: _id._id,
      }
    })
  },
  activate_Credential(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Customer/activate_credential', {}, {
      params: {
        _id: _id,
      }
    })
  },
  deactivate_Credential(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Customer/deactivate_credential', {}, {
      params: {
        _id: _id,
      }
    })
  },
  // deactivate_Credential(_id, token) {
  //   axios.defaults.headers.common['Authorization'] = token
  //   return Api.post('/api/Employee/Customer/deactivate_credential', {}, {
  //     params: {
  //       _id: _id,
  //     }
  //   })
  // },
}