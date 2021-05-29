<template>
  <v-app>
    <v-content class="grey lighten-3 ma-1">
      <h1>Account Activation</h1>
      <v-card elevation="0" class="ml-4 pt-2 mb-4"> <sp /></v-card>
      <v-card elevation="0" class="ma-4" min-width="400">
        <v-card-title> </v-card-title>
        <div v-for="(employee, index) in EmployeeInformation" :key="index">
          <v-card-subtitle>route:{{ employee.route_Name }}</v-card-subtitle>
          <v-card-text>id:{{ employee.route_Id }}</v-card-text>
          <v-card-text>status:{{ employee.status }}</v-card-text>
          <v-card-actions style="justify-content: center">
            <v-btn
              color="#34495e"
              class="grey--text"
              elevation="0"
              @click="
                Activate_Customer({
                  _id: employee._id,
                })
              "
            >
              Activate route
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-content>
  </v-app>
</template>
<script>
import rs from "./../../service/RouteService";
// import ca from "./../../service/CustomerAction";
import sp from "./../../SearchPanel";
export default {
  data: () => ({
    EmployeeInformation: null,
    objectId_Employee: "",
  }),
  components: {
    sp,
  },
  methods: {
    async Activate_Customer(oi) {
      const token = this.$store.state.token;

      try {
        console.log("method");
        // console.log(this.objectId_Employee);
        const token = this.$store.state.token;
        await rs.activate_Route(oi, token);
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
        const emp = (await rs.show2(value, token)).data.message;
        this.objectId_Employee = emp._id;
        if (!Array.isArray(emp) && emp._id) {
          this.EmployeeInformation = [emp];
          // this.objectId_Employee = this.EmployeeInformation._id;
          console.log("watcher");
          console.log(this.objectId_Employee);
        }
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