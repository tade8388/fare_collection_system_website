<template >
  <v-app>
    <v-card> login as:{{ user }}<SystemBar /></v-card>
    <!-- <v-app-bar flat app>
      <v-app-bar-nav-icon
        class=""
        @click="drawer = !drawer"
        @click.stop="mini = !mini"
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title> CBFCS </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/SuperAdmin/notify">
        <v-icon>dashboard</v-icon>notification</router-link
      >
    </v-app-bar> -->
    <!-- v-model="drawer"
      :mini-variant="mini"
      mini-variant-width="70"
      permanent -->
    <v-navigation-drawer app>
      <ul class="bb" style="list-style-type: none">
        <li role="presentation">
          <router-link to="/SuperAdmin/DashBoard"> </router-link>
        </li>
        <li v-if="route == 'creator'" role="presentation">
          <router-link to="/SuperAdmin/ViewRoute"> Route</router-link>
        </li>
        <li v-if="station == 'creator'" role="presentation">
          <router-link to="/SuperAdmin/VIewStation"> Station</router-link>
        </li>

        <li v-if="organization == 'creator'" role="presentation">
          <router-link to="/SuperAdmin/ViewOrganization">
            Organization</router-link
          >
        </li>
        <li v-if="employee == 'creator'">
          <router-link to="/SuperAdmin/ViewAdmin"> Employee</router-link>
        </li>
        <li v-if="branch == 'creator'">
          <router-link to="/SuperAdmin/ViewBranch"> branch</router-link>
        </li>
        <li v-if="bus == 'creator'">
          <router-link to="/SuperAdmin/ViewBus"> Bus</router-link>
        </li>
        <li v-if="fare == 'creator'" role="presentation">
          <router-link to="/SuperAdmin/ViewFare"> ViewFare</router-link>
        </li>
        <li v-if="machine == 'creator'">
          <router-link to="/SuperAdmin/ViewMachine"> Machine</router-link>
        </li>
        <li v-if="customer == 'creator'" role="presentation">
          <router-link to="/SuperAdmin/ViewCostumer"> Costumer</router-link>
        </li>
        <li>
          <router-link
            v-if="organization == 'creator'"
            to="/SuperAdmin/HomePage"
          >
            report</router-link
          >
        </li>
        <li>
          <router-link to="/SuperAdmin/notify"> notification</router-link>
        </li>
        <!-- <li>
          <router-link to="/SuperAdmin/AddRole"> Role</router-link>
        </li> -->
      </ul>
    </v-navigation-drawer>

    <v-content class="pt-0">
      <!-- Provides the application the proper gutter -->

      <!-- If using vue-router -->

      <router-view></router-view>
    </v-content>

    <v-footer>
      <v-card flat tile class="grey lighten-5 white--text text-center">
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>city bus</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import SystemBar from "./../SystemBar";
export default {
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    drawer: true,
    mini: false,
    dashbord: "",
    employee: "",
    bus: "",
    fare: "",
    organization: "",
    branch: "",
    station: "",
    customer: "",
    route: "",
    customer: "",
    machine: "",
    role: "",

    data: [],
  }),
  components: {
    SystemBar,
  },
  created() {},
  mounted() {
    const role_select2 = this.$store.state.token;
    const role_select = this.$store.state.access;
    this.user = this.$store.state.user;

    try {
      (this.branch = role_select.branch),
        (this.employee = role_select.employee),
        (this.organization = role_select.organization),
        (this.station = role_select.station),
        (this.route = role_select.route),
        (this.customer = role_select.customer);
      this.bus = role_select.bus;
      this.fare = role_select.fare;
      this.role = role_select.role;
      this.machine = role_select.machine;
    } catch (err) {
      console, log(error);
    }
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