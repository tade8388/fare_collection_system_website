import Api from './Api'
export default{
        login(credentials){
        return Api.post('/api/User/Employee/login',credentials)
    
    }
}