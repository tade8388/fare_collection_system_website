<template>

  <div id="app">
    <!-- <Search :items= "Cost" filterby = "name"/> -->
    <!-- <ViewCostumer :items= "Cost" filterby = "firstname"/>  -->
    <!-- <Tabl/> -->
    <!-- <ViewEmployee/> -->
   <!-- <EditEmployee :items= "Cost" filterby = "firstname"/> -->
   <!-- <Costumer/>  -->
  <!-- <EditBus :items= "Cost" filterby = "busid"/>  -->
  <!-- <EditOrganization :items= "Cost" filterby = "organizationname"/>  -->
    <!-- <router-view name="nav-top"></router-view> -->
        <!-- <Home></Home>
    <home1></home1>
     <home2></home2> -->
  

     <!-- <router-link to= "/HomePage">Home</router-link>  -->
          <!-- <span v-if= "isLoggedIn">  <a @click="logout">logout</a></span>
          <span v-else>  <router-link to="/login">Login</router-link></span> -->
          <!-- <v-app> -->
             <!-- <router-link to= "/HomePage">Home</router-link>
          <span v-if= "$store.state.isUserLoggedIn">  <a @click="logout">logout</a></span>
          <span v-else>  <router-link to="/login">Login</router-link></span> -->
          <!-- <v-app> -->
       <!-- <router-link to= "/HomePage">Home</router-link>
          <span v-if= '$store.state.isUserLoggedIn'>  <a @click="logout">logout</a></span>
          <span v-if= '!$store.state.isUserLoggedIn'>  <router-link to="/login">Login</router-link></span> -->
        <router-view/>

  <!-- <Nav></Nav> -->

        <!-- <router-view/> -->

  </div>
</template>

<script>
// import Header from './Header'
  // import Cost from './asset/Cost';
  // import store from './store'
  // import home2 from  './components/home2.vue';
  //   import home1 from  './components/home1.vue';
  // import Home from  './components/Home.vue';
  //  import Search from './components/Search';
    // import EditCostumer from './components/EditCostumer';
  // import Organization from './components/Organization';
    // import ViewCostumer from './components/ViewCostumer';
    //  import Costumer from './components/Costumer';
    //  import ViewEmployee from './components/ViewEmployee';
        //  import EditEmployee from './components/EditEmployee';
          //  import Bus from './components/Bus';
          //  import EditBus from './components/EditBus';
            // import Tabl from './components/Tabl';
              // import table from './components/table';
// import ViewEmployee from './components/ViewEmployee';


export default {
 
  name: 'App',
  mounted(){
    // this.Cost=Cost;
  },
    data() {
      return{
       // Cost: []

      };
    },
    //  components: { 
    // home1: home1,
    //  home2: home2,
    //   Home: Home
    //   }
// computed: {
//         isLoggedIn: function() {
//           return this.$store.getters.isLoggedIn;
//         }
//       },
      // methods: {
      //   logout: function() {
      //     this.$store.dispatch("setToken",null)
      //     this.$store.dispatch("setUser",null) 
      //   }
      // }
      //     methods: {
      //   logout: function() {
      //     this.$store.dispatch("setToken",null)
      //     this.$store.dispatch("setUser",null) 
      //   }
      // }
}
</script>
<style>
/* #app{
  margin:0px auto;
  margin-top:60px;
  width:200px;
} */
</style>

