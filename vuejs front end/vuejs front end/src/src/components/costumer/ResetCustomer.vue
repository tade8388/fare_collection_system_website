<template>
  <v-app>
    <v-content class="grey lighten-3">
      <h1>Account Activation</h1>
      <v-card elevation="0" class="ml-4 pt-2 mb-4"> <sp /></v-card>
      <v-card elevation="0" class="ma-4" min-width="400">
        <v-card-title> </v-card-title>
        <div v-for="(employee, index) in EmpInfo" :key="index">
          <v-card-text>
            <h2>Employee id:{{ employee.customer_Id }}</h2>
          </v-card-text>
          <v-card-text>
            <h2>Email:{{ employee.name.first_Name }}</h2></v-card-text
          >
          <v-card-text>
            <h2>organizatin:{{ employee.phone_Number }}</h2>
          </v-card-text>

          <v-card-actions style="justify-content: center">
            <v-btn
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
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-content>
  </v-app>
</template>
<script>
import EmployeeService from "./../../service/CostumerService";
import ea from "./../../service/CustomerAction";
import sp from "./../../SearchPanel";
export default {
  data: () => ({
    EmployeeInformation: null,
    EmpInfo: "",
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
        if (!Array.isArray(EmployeeInformation) && EmployeeInformation._id) {
          this.EmpInfo = [EmployeeInformation];
        }
        console.log("value");
        console.log(value);
      },
    },
  },
  methods: {
    async reset_Account(object_id) {
      try {
        console.log(object_id);
        const token = this.$store.state.token;
        await ea.resetAccount(object_id, token);
        console.log(this.objectId_customer);
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