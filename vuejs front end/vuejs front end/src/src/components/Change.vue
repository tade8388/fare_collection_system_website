<template>
  <v-content class="ma-2 grey lighten-1">
    <v-layout row justify-space-around>
      <v-flex xs12 sm6 md6 l6 xl6>
        <div class="cardlog">
          <v-card elevation="0">
            <v-form class="login" ref="formValidation" @submit.prevent="submit">
              <v-card-title> change credential</v-card-title>
              <v-card-text class="pa-1 red--text">
                <p>{{ userError }}</p>
                <v-text-field
                  label="old password"
                  type="password"
                  v-model="oldpassword"
                  prepend-icon=" fas fa-lock"
                  :rules="usernameRules"
                ></v-text-field>
                <v-text-field
                  label=" new Password"
                  v-model="password"
                  type="password"
                  prepend-icon=" fas fa-lock"
                  :rules="passwordRules"
                >
                </v-text-field>
              </v-card-text>

              <v-card-text class="pa-1"> </v-card-text>

              <div class="white--text">
                <v-card-actions style="justify-content: center">
                  <v-btn class="white--text" color="#34495e" type="submit">
                    submit
                  </v-btn>
                </v-card-actions>
              </div>
              <!-- <div class="text-center">
                  <router-link to>Forgot Password</router-link>
                </div> -->
            </v-form>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-content>
</template>
<script>
import account from "./../service/EmployeeService";
export default {
  data: () => ({
    oldpassword: "",
    password: "",
  }),
  methods: {
    async submit() {
      const token = this.$store.state.token;
      const fd = {
        password: this.password,
        old_Password: this.oldpassword,
      };

      //   try {
      var resp = await account.change_credential(fd, token);
      // if (resp.data.success == true) {
      //   console.log("true");
      // this.success = true;
      // this.response = resp.data.message;
      // } else if (resp.data.success == false) {
      //   console.log("fslse");
      // this.war = resp.data.message;
      // this.warn = true;
      // }
      // console.log(resp.data.message);
      // console.log("1111111111111111111111111");
      //   } catch (err) {
      //     this.war = "an error occured";
      //     console.log(err + "errrrrrrrrrrrr");
      //   }
    },
  },
};
</script>