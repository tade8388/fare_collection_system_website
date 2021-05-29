import Api from './Api'
import axios from './../service/Api'
export default {
  data: () => ({

  }),
  displayCostumer(search, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Customer/search', {
      params: {
        name: search,
        limit: 1
      }
    })
  },
  displayAllCostumer(token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Customer/search', {
      params: {

        limit: 50
      }
    })
  },
  addCostumer(credentials, token) {
    axios.defaults.headers.common['Authorization'] = token
    const headers = { headers: { 'Content-Type': 'multipart/form-data' } }
    return Api.post('/api/Employee/Customer/register ', credentials, headers)
  },
  update(credentials, _id, token) {
    const headers = { headers: { 'Content-Type': 'multipart/form-data' } }
    axios.defaults.headers.common['Authorization'] = token
    console.log("updated credential befor send to database" + _id)
    return Api.post('/api/Employee/Customer/update', credentials, {
      params: {
        _id: _id
      }
    })

  },
  show2(search, token) {
    console.log("search")
    console.log(search)
    axios.defaults.headers.common['Authorization'] = token
    return Api.get('/api/Employee/Customer/search', {
      params: {
        name: search,
        limit: 1

      }
    })
  },
  reset_Account(search, token) {
    axios.defaults.headers.common['Authorization'] = token

    return Api.get('/api/Employee/Customer/Reset_Account', {
      params: {
        _id: search,
      }
    })
  },
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
        _id: _id,
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
  deactivate_Credential(_id, token) {
    axios.defaults.headers.common['Authorization'] = token
    return Api.post('/api/Employee/Customer/deactivate_credential', {}, {
      params: {
        _id: _id,
      }
    })
  },
}