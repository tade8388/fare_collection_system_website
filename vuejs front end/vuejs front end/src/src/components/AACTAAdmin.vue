<template>
    <v-app>
        <SystemBar/>
    
              <v-app-bar flat app class="blue-grey darken-2">
    <v-app-bar-nav-icon class="white--text"
     @click="drawer = !drawer"
     @click.stop="mini = !mini">
     </v-app-bar-nav-icon >
    <v-toolbar-title> CBFCS </v-toolbar-title>

</v-app-bar>
 <v-navigation-drawer 
         v-model = "drawer" app
         :mini-variant= "mini"
         permanent
         class="pa-5"
         mini-variant-width=70>
             <v-expansion-panels
         focusable  
         permanent
        flat 
        accordion>

                     <v-expansion-panel>
                       <v-expansion-panel-header  class="pl-0 title">
                          <v-icon left >dashboard</v-icon>
                           <span>Dashboard</span>
                       </v-expansion-panel-header>                    <v-expansion-panel-content>
                         </v-expansion-panel-content>
                  </v-expansion-panel> 
                   <v-expansion-panel>
       <v-expansion-panel-header  class="pl-0 title">
                          <v-icon left > far fa-money-bill-alt</v-icon>
                           <span>FareAmount</span>
                       </v-expansion-panel-header>                      <v-expansion-panel-content>
                      <ul style="list-style-type: none">
                        <li role="presentation"><router-link to="/AACTAAdmin/SetFareAmount">SetFareAmount</router-link></li>
                                                 <li role="presentation"><router-link to="/AACTAAdmin/UpdateFareAmount">UpdateFareAmount</router-link></li>
                         <li role="presentation"><router-link to="/AACTAAdmin/ViewFare">ViewFare</router-link></li>
                    </ul>
                         </v-expansion-panel-content>
                  </v-expansion-panel>
                     <v-expansion-panel>
          <v-expansion-panel-header class="pl-0 title">
                           <v-icon left  class="pr-5">  fa-list-ul</v-icon>
                           <span  class="pl-5">Report</span>
                           </v-expansion-panel-header>              
                                   <v-expansion-panel-content>
                         </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
             </v-navigation-drawer>

              
<router-view></router-view>
   <!-- </v-content> -->
          
 

  
           
    </v-app>
</template>
<script>
import SystemBar from './../SystemBar'
export default {
    data:()=>({
drawer: true,
 mini: false,
    }),
        components:{
            SystemBar
        }

    
}
</script>
<style scoped>
.v-input {
    border-radius: 30px;
    margin: auto;
}
</style>