<template>
  <v-app>
    <v-content class="grey lighten-3">
      <h1>account reset</h1>
      <v-card elevation="0" class="ma-4 pt-2 mb-4"> <sp /></v-card>
      <v-card elevation="0" class="ma-4" min-width="400">
        <v-card-title> </v-card-title>
        <div v-for="(employee, index) in EmpInfo" :key="index">
          <v-card-text>
            <h2>Employee id:{{ employee.employee_Id }}</h2>
          </v-card-text>
          <v-card-text>
            <h2>Email:{{ employee.email }}</h2></v-card-text
          >
          <v-card-text>
            <h2>organizatin:{{ employee.organization }}</h2>
          </v-card-text>

          <v-card-actions style="justify-content: center">
            <!-- <v-btn
              color="#34495e"
              class="grey--text"
              elevation="0"
              @click="
                reset_Account({
                  _id: employee._id,
                })
              "
            >
              reset Acount
            </v-btn> -->
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
                    reset
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline"> Account reset </v-card-title>
                  <v-card-text>Do you want to reset account</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      cancel
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="
                        reset_Account({
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
    </v-content>
  </v-app>
</template>
<script>
import EmployeeService from "./../../service/EmployeeService";
import ea from "./../../service/EmployeeAction";
import sp from "./../../SearchPanel";
export default {
  data: () => ({
    EmpInfo: "",
    dialog: false,
    response: "",
    war: "",
    success: false,
    warn: false,
  }),
  components: {
    sp,
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.search = value;
        const token = this.$store.state.token;
        const EmployeeInformation = (await EmployeeService.show2(value, token))
          .data.message;
        if (value) {
          this.EmpInfo = EmployeeInformation;
        }
      },
    },
  },
  methods: {
    async reset_Account(object_id) {
      this.dialog = false;
      try {
        console.log(object_id);
        const token = this.$store.state.token;
        const resp = await ea.resetAccount(object_id, token);
        if (resp.data.success == true) {
          this.success = true;
          this.response = resp.data.message;
        } else if (resp.data.success == false) {
          this.war = resp.data.message;
          this.warn = true;
        }
      } catch (err) {
        console.log(err);
      }
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