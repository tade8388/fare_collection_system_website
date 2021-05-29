<template>
    <v-app>
               <v-system-bar app height="60px" color="white">
             
                             <v-avatar size="80">
                <img src="images/HP.png">
                 </v-avatar >
                      <v-spacer></v-spacer>
    
                          <v-badge>
                         <span slot="babage">3</span>
                  <v-btn icon color="white"> <v-icon> fa fa-bell</v-icon></v-btn>
                     </v-badge>   
                     <div class="white--text">          
                  <!-- <v-responsive> -->
                   <v-avatar size="40">
                <v-img src="images/car.jpeg"></v-img>
                 </v-avatar >
                 <!-- </v-responsive> -->
                 <span>tadese matebie</span>
                     </div>
        </v-system-bar>
    
              <v-app-bar flat app class="blue-grey darken-2">
    <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon >
    <v-toolbar-title> CBFCS </v-toolbar-title>

</v-app-bar>
        <v-navigation-drawer v-model = "drawer" app>
                            <v-expansion-panels focusable="grey darken-2">

                     <v-expansion-panel>
                       <v-expansion-panel-header>home</v-expansion-panel-header>
                    <v-expansion-panel-content>
                         </v-expansion-panel-content>
                  </v-expansion-panel>
                   <v-expansion-panel>
                       <v-expansion-panel-header>Employee</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <ul style="list-style-type: none">
                        <li role="presentation"><router-link to="/login">login</router-link></li>
                         <li role="presentation"><router-link to="/EditEmployee">EditEmployee</router-link></li>
                          <li role="presentation"><router-link to="/ViewEmployee">ViewEmployee</router-link></li>
                    </ul>
                         </v-expansion-panel-content>
                  </v-expansion-panel>
                                     <v-expansion-panel>
                       <v-expansion-panel-header>Route</v-expansion-panel-header>
                    <v-expansion-panel-content>
                           <ul style="list-style-type: none">
                        <li role="presentation"><router-link to="/AddRoute">addRoute</router-link></li>
                         <li role="presentation"><router-link to="/EditRoute">EditRoute</router-link></li>
                          <li role="presentation"><router-link to="/ViewRoute">ViewRoute</router-link></li>
                    </ul>
                         </v-expansion-panel-content>
                  </v-expansion-panel>
                        <v-expansion-panel>
                       <v-expansion-panel-header>Bus</v-expansion-panel-header>
                    <v-expansion-panel-content>
            <ul style="list-style-type: none">
                        <li role="presentation"><router-link to="/AddBus">AddBus</router-link></li>
                         <li role="presentation"><router-link to="/EditBus">EditBus</router-link></li>
                          <li role="presentation"><router-link to="/ViewBus">ViewBus</router-link></li>
                    </ul>
                         </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
             </v-navigation-drawer>
           
    </v-app>
</template>
<script>
export default {
    data:()=>({
drawer: true,
    })
}
</script>