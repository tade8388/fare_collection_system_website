<template>
    <v-app>
         <SystemBar/>
     <v-app-bar flat app color="#34495e ">
    <v-app-bar-nav-icon class="white--text"
     @click="drawer = !drawer"
     @click.stop="mini = !mini">

     </v-app-bar-nav-icon >
    <v-toolbar-title> CBFCS </v-toolbar-title>

</v-app-bar>
        <v-navigation-drawer
         color="#34495e "
       v-model = "drawer" app
         :mini-variant= "mini"
         permanent
       
         mini-variant-width=70>
         <v-expansion-panels 
       focusable  
         permanent
        flat 
        accordion>
<p><v-icon></v-icon></p>
 <v-expansion-panel-header>
                          <v-icon >dashboard</v-icon>
                           <span>Dashboard</span>
                       </v-expansion-panel-header>                  
       
                   <v-expansion-panel>
 <v-expansion-panel-header >
                          <v-icon left >fa-users</v-icon>
                           <span>Costumer</span>
                       </v-expansion-panel-header>               
                             <v-expansion-panel-content>
                      <ul style="list-style-type: none">
                        <li role="presentation"><router-link to="/BranchAdminOfPlatformProvider/AddCostumer">AddCostumer</router-link></li>
                         <li role="presentation"><router-link to="/BranchAdminOfPlatformProvider/EditCostumer">EditCostumer</router-link></li>
                          <li role="presentation"><router-link to="/BranchAdminOfPlatformProvider/ViewCostumer">ViewCostumer</router-link></li>
                    </ul>
                         </v-expansion-panel-content>
                  </v-expansion-panel>
                                     <v-expansion-panel>
 <v-expansion-panel-header>
                           <v-icon left>far fa-user</v-icon>
                           <span>Employee</span>
                           </v-expansion-panel-header>                    <v-expansion-panel-content>
                        <ul>
                 <li role="presentation"><router-link to="/BranchAdminOfPlatformProvider/baViewEmployee">ViewEmployee</router-link></li>
                <li role="presentation"><router-link to="/BranchAdminOfPlatformProvider/baAddEmployee">AddEmployee</router-link></li>
                 <li role="presentation"><router-link to="/BranchAdminOfPlatformProvider/baEditEmployee">baEditEmployee</router-link></li>

                 </ul>

                         </v-expansion-panel-content>
                  </v-expansion-panel>
                        <v-expansion-panel>
          <v-expansion-panel-header>
                           <v-icon >  fa-list-ul</v-icon>
                           <span >Report</span>
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
 mini: false,    }),
         components:{
            SystemBar
        }
}
</script>
<style scoped>
 .v-navigation-drawer__content {
    background-color:#34495e;
}

.v-expansion-panel-header{
    background-color: #34495e;
    color: #abb4be;
  
   
}
.v-expansion-panel-content{
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