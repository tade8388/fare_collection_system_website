import Vue from 'vue'
// import VueRouter from 'vue-router';
import App from './App.vue'
import router from './routes'
import vuetify from '@/plugins/vuetify';
import store from './store/store';
import { sync } from 'vuex-router-sync';
import { MultiSelectPlugin } from '@syncfusion/ej2-vue-dropdowns';
// import Axios from 'axios';
// Axios.defaults.headers.common['Authorization'] = this.$store.state.token 
// import vuetify from './vuetify/dist/vuetify.min.css';
// Vue.use(VueRouter);
// const tt=this.$store.state.token
// Axios.defaults.headers.common['Authorization'] = tt
Vue.config.productionTip = false
sync(store, router)

// const router= new VueRouter({
//   routes,
//   mode: 'history'
// });

// router.beforeEach((to,from,next)=>{
//     next()   
//   })


// import Axios from 'axios'

//       Vue.prototype.$http = Axios;
//       const token = localStorage.getItem('token');
//       if (token) {
//         Vue.prototype.$http.defaults.headers.common['Authorization'] = token
//       }
new Vue({
  vuetify,
  store, router, MultiSelectPlugin,
  render: h => h(App)
}).$mount('#app')
