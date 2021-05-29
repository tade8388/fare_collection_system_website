<template>
  <div>
    <v-system-bar app height="50px" color="white">
      <v-avatar size="80">
        <img src="images/HP.png" />
      </v-avatar>

      <v-spacer></v-spacer>
      <!-- <v-badge>
                         <span slot="babage">3</span>
                  <v-btn icon color="white"> <v-icon> fa fa-bell</v-icon></v-btn>
                     </v-badge>   
                     <div class="white--text">          
                  <v-responsive>
                   <v-avatar>
                <v-img src="images/tesfaye.jpg"></v-img>
                 </v-avatar >
                 </v-responsive> -->
      <!-- <span>tadese matebie</span> -->
      <!-- </div>          -->
      <!-- <v-btn @click="signOut" class="pt-1">logout</v-btn> -->
      <div class="text-center">
        <v-menu open-on-hover top offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">
              <v-icon> settings </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <router-link to="logout">
                <v-icon left> fas fa-exchange-alt</v-icon>change
                Account</router-link
              >
            </v-card-text>
            <v-card-text>
              <v-btn @click="signOut" elevation="0" text left
                ><v-icon left>logout</v-icon> logout</v-btn
              >
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
    </v-system-bar>
  </div>
</template>
<script>
import account from "./service/EmployeeService";
export default {
  methods: {
    signOut() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    async change() {},
  },
};
</script>