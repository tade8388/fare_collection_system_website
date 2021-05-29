<template >
  <v-app>
    <v-app-bar flat app color="">
      <v-app-bar-nav-icon class="" @click="drawer = !drawer">
        <!-- @click.stop="mini = !mini" -->
      </v-app-bar-nav-icon>
      <v-toolbar-title> CBFCS </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer app color="white" v-model="drawer">
      <!-- mini-variant-width="70" -->
      <!-- :mini-variant="mini" -->
      <ul class="bb" style="list-style-type: none">
        <!-- <li role="presentation">
          <router-link to="/SuperAdmin/AddRoute">addRoute</router-link>
        </li>
        <li role="presentation">
          <router-link to="/SuperAdmin/EditRoute">EditRoute</router-link>
        </li> -->

        <!-- <li>
          <router-link to="/SuperAdmin/ActivateRoute"
            >Activate route</router-link
          >
        </li> -->
        <!-- <li role="presentation">
          <router-link to="/SuperAdmin/AddStation">Add station</router-link>
        </li>
        <li>
          <router-link to="/SuperAdmin/EditStation">Edit Station</router-link>
        </li> -->
        <li role="presentation">
          <router-link to="/SuperAdmin/DashBoard">
            <v-icon>dashboard</v-icon>dashboard</router-link
          >
        </li>
        <li role="presentation">
          <router-link to="/SuperAdmin/ViewRoute">
            <v-icon>dashboard</v-icon>ViewRoute</router-link
          >
        </li>
        <li role="presentation">
          <router-link to="/SuperAdmin/VIewStation">
            <v-icon>dashboard</v-icon>View Station</router-link
          >
        </li>

        <li role="presentation">
          <router-link to="/SuperAdmin/ViewOrganization">
            <v-icon>dashboard</v-icon>Organization</router-link
          >
        </li>
        <li>
          <router-link to="/SuperAdmin/ViewAdmin">
            <v-icon>dashboard</v-icon> Employee</router-link
          >
        </li>
        <li>
          <router-link to="/SuperAdmin/ViewBranch">
            <v-icon>dashboard</v-icon>btanch</router-link
          >
        </li>
        <li>
          <router-link to="/SuperAdmin/ViewBus">
            <v-icon>dashboard</v-icon>ViewBus</router-link
          >
        </li>
        <li role="presentation">
          <router-link to="/SuperAdmin/ViewFare">
            <v-icon>dashboard</v-icon>ViewFare</router-link
          >
        </li>
        <!-- <li role="presentation">
          <router-link to="/SuperAdmin/VIewStation">
            <v-icon>dashboard</v-icon>View Station</router-link
          >
        </li> -->
        <!-- <li role="presentation">
          <router-link to="/SuperAdmin/ViewRoute">
            <v-icon>dashboard</v-icon>ViewRoute</router-link
          >
        </li> -->
        <router-link to="/SuperAdmin/ViewMachine">
          <v-icon>dashboard</v-icon>ViewMachine</router-link
        >
        <li role="presentation">
          <router-link to="/SuperAdmin/ViewCostumer">
            <v-icon>dashboard</v-icon>ViewCostumer</router-link
          >
          <router-link to="/SuperAdmin/homepage">
            <span>Report</span></router-link
          >
          <router-link to="/SuperAdmin/notify">
            <span>Notification</span></router-link
          >
        </li>
      </ul>
    </v-navigation-drawer>
    <v-content class="pt-0">
      <!-- Provides the application the proper gutter -->

      <!-- If using vue-router -->

      <router-view></router-view>
    </v-content>

    <v-footer app color="grey lighten-5" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="black"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
        <v-col class="grey lighten-5 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
<script>
import SystemBar from "./../SystemBar";
export default {
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    drawer: false,
    // mini: false,
    dashbord: "",
    employee: "",
    organization: "",
    branch: "",
    station: "",
    customer: "",
    add: "",
    customer: "",
    data: [],
  }),
  components: {
    SystemBar,
  },
  created() {
    // const role_select = this.$store.state.access;
    // const role_select2 = this.$store.state.token;
    // console.log(role_select);
    // (this.branch = role_select.branch),
    //   (this.employee = role_select.employee),
    //   (this.organization = role_select.organization),
    //   (this.station = role_select.station),
    //   (this.route = role_select.route),
    //   (this.customer = role_select.customer);
    // console.log(this.customer);
  },
  methods: {
    logout() {
      this.$store.dispatch("logout", null);
    },
  },
};
</script>
<style scoped>
.v-application a {
  padding-top: 20px;
  font-size: 0.9rem;
  color: #abb4be;
  white-space: nowrap;
  text-decoration: none;
  line-height: 3;

  display: flex;
}
.v-icon.v-icon {
  font-size: 1.3rem;
  color: #abb4be;
  white-space: nowrap;
  position: relative;
  display: block;
  background-color: transparent;
  box-sizing: border-box;
  padding: 12px 25px;
  position: relative;
}

/* .v-conteng {
  padding: 0px;
  display: flex;
}
.element.style {
  padding: 0;
} */
/* .v-navigation-drawer__content {
  background-color: #34495e;
}

.v-expansion-panel-header {
  background-color: #34495e;
  color: #abb4be;
}
.v-expansion-panel-content {
  background-color: #21262d;
}
.v-application a {
  font-size: 0.9rem;
  color: #abb4be;
  white-space: nowrap;
  text-decoration: none;
  line-height: 3;
  padding-left: 45px;
}

.v-icon.v-icon {
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  color: #abb4be;
  white-space: nowrap;
  position: relative;
  margin-right: 0.2em;
  text-align: center;
  vertical-align: middle;
  box-sizing: border-box;
  padding-left: 0px;
  font-size: 1.4rem;
}

.v-expansion-panel-header > *:not(.v-expansion-panel-header__icon) {
  flex: 0.3;
  padding: 7px;
} */

/* .v-expansion-panel-header > *[data-v-e9d46e78]:not(.v-expansion-panel-header__icon) {
    flex: 0;
} */

/* .v-application a[data-v-e9d46e78]{
    color: #abb4be;
    white-space: nowrap;
    font-size: 1rem;
    text-overflow: ellipsis;
    text-decoration: none;
    font-family: "Open Sans", Arial, sans-serif;
    padding: 6px 15px 6px 57px;
overflow: hidden;
}
.v-navigation-drawer {
  background-color: #34495e;
    
}
.v-application--is-ltr .v-expansion-panel-header {
font-size: 1.3rem;
color: #abb4be;
white-space: nowrap;
position: relative;
display: block;
background-color: transparent;
box-sizing: border-box;
padding: 12px 25px;

}
.v-application--is-ltr .v-expansion-panel-header {
   position: relative;
display: block;
}
.v-navigation-drawer__content {
color: #134a9c;}
.v-expansion-panel-content__wrap {
    color: rgba(0, 0, 0, 0.87);
}
.v-application ul, .v-application ol {
     color: rgba(0, 0, 0, 0.87);}
     .v-expansion-panels > * {
         color: rgba(0, 0, 0, 0.87);}
         .expansion-panel__conv-content {
             background-color: yellowgreen;
         }
      */
</style>