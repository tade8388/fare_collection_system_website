
<template>
  <v-app>
    <SystemBar />

    <!-- 
               <v-system-bar app  height="60px" color="white">
             
                             <v-avatar size="80">
                <img src="images/HP.png">
                 </v-avatar >
                      <v-spacer></v-spacer>
    
                          <v-badge>
                         <span slot="babage">3</span>
                  <v-btn icon color="white"> <v-icon> fa fa-bell</v-icon></v-btn>
                     </v-badge>   
                     <div class="white--text">          
                
                   <v-avatar size="40">
                <v-img src="images/car.jpeg"></v-img>
                 </v-avatar >
         
                 <span>tadese matebie</span>
                     </div>
        </v-system-bar > -->
    <v-app-bar flat app color="#34495e ">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
        @click.stop="mini = !mini"
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title> CBFCS </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      color="#34495e "
      v-model="drawer"
      app
      :mini-variant="mini"
      permanent
      mini-variant-width="70"
    >
      <v-expansion-panels focusable permanent flat accordion>
        <p><v-icon></v-icon></p>

        <v-expansion-panel-header>
          <v-icon left>dashboard</v-icon>
          <span>Dashboard</span>
        </v-expansion-panel-header>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon left>far fa-user</v-icon>
            <span>Employee</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ul style="list-style-type: none">
              <li role="presentation">
                <router-link to="/AdminOfServiceProvider/AddEmployee"
                  >AddEmployee</router-link
                >
              </li>
              <li role="presentation">
                <router-link to="/AdminOfServiceProvider/EditEmployee"
                  >EditEmployee</router-link
                >
              </li>
              <li role="presentation">
                <router-link to="/AdminOfServiceProvider/ViewEmployee"
                  >ViewEmployee</router-link
                >
              </li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon> fas fa-bus</v-icon>
            <span>Buses</span></v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <ul style="list-style-type: none">
              <li>
                <router-link to="/AdminOfServiceProvider/AddBus"
                  >AddBus</router-link
                >
              </li>
              <li>
                <router-link to="/AdminOfServiceProvider/EditBus"
                  >EditBus</router-link
                >
              </li>
              <li>
                <router-link to="/AdminOfServiceProvider/ViewBus"
                  >ViewBus</router-link
                >
              </li>
              <li>
                <router-link to="/AdminOfServiceProvider/ActivateBus"
                  >activate bus</router-link
                >
              </li>
              <li>
                <router-link to="/AdminOfServiceProvider/DeactivateBus"
                  >DeactivateBus</router-link
                >
              </li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>

    <router-view></router-view>
  </v-app>
</template> 


<script>
import SystemBar from "./../SystemBar";
export default {
  data: () => ({
    drawer: true,
    mini: false,
  }),
  components: {
    SystemBar,
  },
};
</script>
<style scoped>
.v-navigation-drawer__content {
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
}
</style>