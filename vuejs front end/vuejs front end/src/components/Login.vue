<template>
  <div>
    <!-- <v-content class="grey lighten-3"> -->
    <!-- <v-btn><v-icon>back</v-icon></v-btn> -->

    <!-- <v-flex xs12 sm12 md6 l6 xl6> -->
    <!-- <div class="cardprelog">
            <v-card elevation="0">
              <v-card-title>City Bus Fare Collection System</v-card-title>
              <v-card-text>
                Easy
                <p>{{ error }}</p>
              </v-card-text>
              <v-card-text>Fast</v-card-text>
              <v-card-text>Secure</v-card-text>
            </v-card>
          </div> -->
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" l="6" xl="6">
        <div class="cardlog">
          <v-card elevation="0" min-width="300">
            <v-form class="login" ref="formValidation" @submit.prevent="submit">
              <v-card-title> Log in to your Account</v-card-title>
              <v-card-text class="pa-1 red--text">
                <p>{{ userError }}</p>
                <v-text-field
                  label="Username"
                  v-model="username"
                  prepend-icon="fas fa-user"
                  :rules="usernameRules"
                  id="username"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  v-model="password"
                  type="password"
                  prepend-icon=" fas fa-lock"
                  :rules="passwordRules"
                  id="password"
                >
                </v-text-field>
              </v-card-text>

              <v-card-text class="pa-1"> </v-card-text>

              <v-card-actions
                style="justify-content: center"
                class="d-block pa-2 deep-purple accent-4 white--text"
              >
                <v-btn
                  class="d-block pa-2 deep-purple accent-4 white--text"
                  type="submit"
                >
                  login
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <!-- </v-content> -->
  </div>
</template>
 <script>
import AuthenticationService from "./../service/AuthenticationService";
export default {
  data: () => ({
    er: [],
    userError: null,
    // passwordError:null,
    username: "",
    password: "",
    //   authenticate:{
    //   },
    //   user: [],
    usernameRules: [(v) => !!v || " username isrequired field"],
    passwordRules: [
      (v) => !!v || " password is required field",
      // v => v.length<6 || 'password length should be greater than 6 character',
      // v => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(v) || 'password must contain upercase lowercase,number',
    ],
  }),

  methods: {
    async submit() {
      this.$refs.formValidation.validate();
      const newuser = {
        username: this.username,
        password: this.password,
      };
      try {
        const response = await AuthenticationService.login(newuser);
        console.log("RESPO000000000000ND");
        if (response.data.message.username !== this.username) {
          this.userError = response.data.message;
          this.passwordError = null;
        } else {
          this.userError = response.data.message;
        }
        console.log(response.data.message);
        this.$store.dispatch("setToken", response.data.message.token);
        this.$store.dispatch("setUser", response.data.message.username);
        this.$store.dispatch("setAccess", response.data.message.access);
        //  console.log(response);
        console.log("wwwwooooooowww");
        // this.$router.push({ name: "AACTAAdmin" });
        this.$router.push("/SuperAdmin/DashBoard");
        if (true) {
        } else if (response.data.message.role_ID == "PP-111CD") {
          this.$router.push({ name: "BranchAdminOfPlatformProvider" });
        } else if (response.data.message.role_ID == "SP-222AB") {
          this.$router.push({ name: "AdminOfServiceProvider" });
        } else if (response.data.message.role_ID == "GV-333AB") {
          this.$router.push({ name: "AACTAAdmin" });
        } else if (response.data.message.role_ID == "PP-111EF") {
          this.$router.push({ name: "EmployeeOfPlatformProvider" });
        }
      } catch (err) {
        console.log("kkkkkkkkk");
        //   err = response.data.message;
        console.log("fdfdgdfgdfg");
        console.log(err);
      }
    },
    home() {
      this.$router.push("/");
    },
  },

  //       methods: {
  //   submit(){

  //                  const newuser={
  //                      username:this.username,
  //                      password:this.password

  //                  }

  //              this.$store.dispatch('login',{
  //                username:newuser.username,
  //                 password:newuser.password
  //                 })

  //              .then((response)=>{
  //               if(response.data.message.role_ID=='PP-111AB'){
  //            this.$router.push({name:"superAdmin"})
  //               }
  //               else if(response.data.message.role_ID==2){
  //                this.$router.push({name:"BranchAdminOfPlatformProvider"})
  //               }
  //                  else if(response.data.message.role_ID==3){
  //                this.$router.push({name:"AdminOfServiceProvider"})
  //               }
  //                  else if(response.data.message.role_ID==4){
  //                this.$router.push({name:"AACTAAdmin"})
  //               }
  //                  else if(response.data.message.role_ID==5){
  //                this.$router.push({name:"EmployeeOfPlatformProvider"})
  //               }
  //             })
  //        .catch(err => console.log(err))
  // },
  //       }
};
</script>
<style scoped>
.v-card {
  margin-top: 80px;
  margin-left: 500px;
  height: 300px;
}
/* .cardprelog .v-card {
  margin-left: 200px;
  margin-right: auto;
  background-color: #34495e;
  text-align: center;
  border-radius: 0px;
  border: 0px;
  max-width: 500px;
} */
/* .cardprelog .v-card__subtitle,
.v-card__text {
  text-align: center;
}
.cardprelog .v-card__title {
  padding-top: 80px;
  padding-left: 100px;
  color: white;
}
.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
  color: cornsilk;
} */
/* .cardlog .v-card {
  padding: 0px;
  border-radius: 0px;
  border: 0px;
  max-width: 300px;
}
.cardlog .v-card__title {
  padding-left: 60px;
}

.v-btn__content {
  justify-content: center;
} */
/* .v-card__title[data-v-ef68022e] {
    background-color: lavender;
    background-color: #f3eded;
} */
/* .v-icon{
    color: darkcyan;
}
.prepend-icon{
        color: darkcyan;


} */
</style>
