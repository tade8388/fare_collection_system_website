// import axios from 'axios'
// export default()=>{
//    return axios.create({
//     baseURL: 'http://localhost:5000/',
//     })
    //the objective is like connecter to the back end
// }
import axios from 'axios';
 
   const  instance= axios.create({
        baseURL: 'http://localhost:5000/',
        
     
   })

        export default instance