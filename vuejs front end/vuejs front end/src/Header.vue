<template>
  <v-app>
    <SystemBar />
    <v-app-bar flat app color="">
      <v-app-bar-nav-icon
        class=""
        @click="drawer = !drawer"
        @click.stop="mini = !mini"
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title> CBFCS </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <logout/> -->
    </v-app-bar>
    <v-navigation-drawer
      color=""
      v-model="drawer"
      app
      :mini-variant="mini"
      permanent
      mini-variant-width="70"
    >
      <v-expansion-panels focusable flat permanent>
        <p><v-icon></v-icon></p>

        <v-expansion-panel-header>
          <v-icon>dashboard</v-icon>
          <router-link to="/SuperAdmin/DashBoard">
            <span>Dashboard</span></router-link
          >
        </v-expansion-panel-header>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon>far fa-user</v-icon>
            <span>Employee</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ul style="list-style-type: none">
              <li role="presentation" active="red">
                <router-link to="/SuperAdmin/AddAdmin"
                  >Add Employee</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/EditAdmin"
                  >Edit Employee</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/ViewAdmin"
                  >View Employee</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/ActivateAccount"
                  >Activate Account</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/DeactivateAccount"
                  >Deactivate Account</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/ResetAccount"
                  >Reset Account</router-link
                >
              </li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon>far fa-user</v-icon>
            <span>organization</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ul style="list-style-type: none">
              <li role="presentation">
                <router-link to="/SuperAdmin/AddOrganization"
                  >Add Organization</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/EditOrganization"
                  >update organization</router-link
                >
              </li>
              <li role="presentation">
                <router-link to="/SuperAdmin/ViewOrganization"
                  >View Organization</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/ActivateOrganization"
                  >Activate Organization</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/DeactivateOrganization"
                  >Deactivate Organization</router-link
                >
              </li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon> far fa-object-ungroup</v-icon>
            <span>Branch</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ul style="list-style-type: none">
              <li role="presentation">
                <router-link to="/SuperAdmin/AddBranch">AddBranch</router-link>
              </li>
              <li role="presentation">
                <router-link to="/SuperAdmin/EditBranch"
                  >EditBranch</router-link
                >
              </li>
              <li role="presentation">
                <router-link to="/SuperAdmin/ViewBranch"
                  >ViewBranch</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/ActivateBranch"
                  >Activate branch</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/DeactivateBranch"
                  >Deactivate branch</router-link
                >
              </li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon>far fa-user</v-icon>
            <span>Station</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ul style="list-style-type: none">
              <li role="presentation">
                <router-link to="/SuperAdmin/AddStation"
                  >Add station</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/EditStation"
                  >Edit Station</router-link
                >
              </li>
              <li role="presentation">
                <router-link to="/SuperAdmin/VIewStation"
                  >View Station</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/ActivateStation"
                  >Activate Station</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/DeactivateStation"
                  >Deactivate station</router-link
                >
              </li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon> fas fa-road</v-icon>
            <span>Routes</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ul style="list-style-type: none">
              <li role="presentation">
                <router-link to="/SuperAdmin/AddRoute">addRoute</router-link>
              </li>
              <li role="presentation">
                <router-link to="/SuperAdmin/EditRoute">EditRoute</router-link>
              </li>
              <li role="presentation">
                <router-link to="/SuperAdmin/ViewRoute">ViewRoute</router-link>
              </li>
              <li>
                <router-link to="/SuperAdmin/ActivateRoute"
                  >Activate route</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/DeactivateRoute"
                  >Deactivate route</router-link
                >
              </li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon> far fa-object-ungroup</v-icon>
            <span>Matchine</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ul style="list-style-type: none">
              <li role="presentation">
                <router-link to="/SuperAdmin/AddMachine"
                  >AddMachine</router-link
                >
              </li>
              <li role="presentation">
                <router-link to="/SuperAdmin/EditMachine"
                  >Edit machine</router-link
                >
              </li>
              <li role="presentation">
                <router-link to="/SuperAdmin/ViewMachine"
                  >ViewMachine</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/ActivateMachine"
                  >Activate machine</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/DeactivateMachine"
                  >Deactivate machine</router-link
                >
              </li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon left>fa-users</v-icon>
            <span>Costumer</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ul style="list-style-type: none">
              <li role="presentation">
                <router-link to="/SuperAdmin/AddCostumer"
                  >AddCostumer</router-link
                >
              </li>
              <li role="presentation">
                <router-link to="/SuperAdmin/EditCostumer"
                  >EditCostumer</router-link
                >
              </li>
              <li role="presentation">
                <router-link to="/SuperAdmin/ViewCostumer"
                  >ViewCostumer</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/ActivateCustomer"
                  >Activate Customer</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/DeactivateCustomer"
                  >Deactivate Customer</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/ResetCustomer"
                  >Reset Customer</router-link
                >
              </li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon left>fa-users</v-icon>
            <span>Role</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ul style="list-style-type: none">
              <li role="presentation">
                <router-link to="/SuperAdmin/AddRole">AddRole</router-link>
              </li>
              <li role="presentation">
                <router-link to="/SuperAdmin/EditRole">EditRole</router-link>
              </li>
              <li role="presentation">
                <router-link to="/SuperAdmin/ViewRole">ViewRole</router-link>
              </li>
              <router-link to="/SuperAdmin/ActivateRole"
                >Activate Customer</router-link
              >
              <li>
                <router-link to="/SuperAdmin/DeactivateRole"
                  >Deactivate Role</router-link
                >
              </li>
              <li>
                <router-link to="/SuperAdmin/ResetRole">Reset Role</router-link>
              </li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon> far fa-comment </v-icon>
            <span>Notification</span>
          </v-expansion-panel-header>
        </v-expansion-panel>
        <v-expansion-panel-header>
          <v-icon>dashboard</v-icon>
          <router-link to="/SuperAdmin/homepage">
            <span>Report</span></router-link
          >
        </v-expansion-panel-header>
      </v-expansion-panels>
    </v-navigation-drawer>
    <router-view></router-view>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>city bus</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>
<script>
import SystemBar from "./SystemBar";
export default {
  data: () => ({
    drawer: true,
    mini: false,
    dashbord: false,
    employee: false,
    organization: false,
    branch: false,
    station: false,
    customer: false,
    add: false,
    data: [],
  }),
  components: {
    SystemBar,
  },
  created() {
    let c = 1;
    const role_select = this.$store.state.role;
    console.log("ooooooooooooooooooooooooooooo");
    console.log(role_select);
    if (role_select == "PP-111AB") {
      this.employee = true;
    }
    if (c == 1) {
      this.customer = true;
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
         .expansion-panel__container {
             background-color: yellowgreen;
         }
      */
</style>