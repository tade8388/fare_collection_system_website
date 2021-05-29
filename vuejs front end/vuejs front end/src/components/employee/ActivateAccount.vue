<template>
  <v-app>
    <v-content class="grey lighten-3">
      <h1>Account Activation</h1>
      <v-layout row justify-space-around>
        <v-flex xs12 sm6 md6 l6 xl6>
          <v-card elevation="0" class="pt-2 mb-4">
            <v-layout row justify-space-around>
              <v-flex md6 l6 xl6> <sp /></v-flex></v-layout
          ></v-card>
          <v-card elevation="0" min-width="400" min-height="200">
            <v-card-title> </v-card-title>
            <div v-for="(employee, index) in EmployeeInformation" :key="index">
              <v-card-text>
                <h2>Employee id:{{ employee.employee_Id }}</h2>
              </v-card-text>
              <v-card-text>
                <h2>Email:{{ employee.email }}</h2></v-card-text
              >
              <!-- <v-card-text>
                <h2>organizatin:{{ employee.organization }}</h2>
              </v-card-text> -->

              <v-card-actions style="justify-content: center">
                <v-row justify="center">
                  <v-dialog v-model="dialog" persistent max-width="290">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="#34495e"
                        elevation="0"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        activate
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline">
                        Employee Activation
                      </v-card-title>
                      <v-card-text>Do you want to Activate</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="green darken-1"
                          text
                          @click="dialog = false"
                        >
                          cancel
                        </v-btn>
                        <v-btn
                          color="green darken-1"
                          text
                          @click="
                            Activate({
                              _id: employee._id,
                            })
                          "
                        >
                          save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
              </v-card-actions>
              <v-alert type="success" text v-if="success">
                {{ response }}
              </v-alert>
              <v-alert type="warning" text v-if="warn">
                {{ war }}
              </v-alert>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>
<script>
import EmployeeService from "./../../service/EmployeeService";
import ea from "./../../service/EmployeeAction";
import sp from "./../../SearchPanel";
export default {
  data: () => ({
    EmployeeInformation: null,
    objectId_Employee: "",
    dialog: false,
    response: "",
    war: "",
    success: false,
    warn: false,
  }),
  components: {
    sp,
  },
  methods: {
    async Activate(oi) {
      console.log(oi);
      const token = this.$store.state.token;
      this.dialog = false;

      try {
        console.log(oi);
        // console.log(this.objectId_Employee);
        const token = this.$store.state.token;
        var resp = await ea.activate_Credential(oi, token);
        if (resp.data.success == true) {
          this.success = true;
          this.response = resp.data.message;
        } else if (resp.data.success == false) {
          this.war = resp.data.message;
          this.warn = true;
        }
      } catch (err) {
        console.log("eeeeeeeeeee");
        console.log(err);
      }
    },
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.search = value;
        const token = this.$store.state.token;
        const emp = (await EmployeeService.show2(value, token)).data.message;
        console.log(emp);
        if (value) {
          this.EmployeeInformation = emp;
        }
        // this.objectId_Employee = this.EmployeeInformation._id;
        console.log("watcher");
        console.log(this.objectId_Employee);

        //  else {
        //   this.EmployeeInformation = emp;
        // }
      },
    },
  },
};
</script>
<style scoped>
.v-input {
  border-radius: 30px;
  margin: auto;
}
.v-card {
  background: #fff;
  /* border-radius: 2px; */
  white-space: normal;
  min-width: 280px;
  position: relative;
  justify-content: space-between;
}
.v-card__actions {
  background-color: #34495e;
}
.v-card__text {
  /* font-size: .9rem; */
  line-height: 1.5;
  padding: 0.5px;
  text-align: left;
  /* justify-content: space-between; */
}
.v-btn {
  color: #34495e;
}
</style>