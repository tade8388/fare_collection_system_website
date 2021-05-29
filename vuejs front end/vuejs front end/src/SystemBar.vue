<template>
  <div>
    <v-system-bar app height="50px" color="grey lighten-3">
      {{ user }}
      <v-spacer></v-spacer>

      <div class="text-center">
        {{ user }}
        <v-menu open-on-hover top offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">
              <v-icon> settings </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <router-link to="Change">
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
      <p>{{ user }}</p>
    </v-system-bar>
  </div>
</template>
<script>
import account from "./service/EmployeeService";
export default {
  methods: {
    data: () => ({
      user: "",
    }),
    mounted() {
      this.user = this.$store.state.user;
    },
    signOut() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    async change() {},
  },
};
</script>