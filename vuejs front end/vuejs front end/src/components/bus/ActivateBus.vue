<template>
  <v-app>
    <v-content class="grey lighten-3">
      <h1>Account Activation</h1>
      <v-card elevation="0" class="ml-4 pt-2 mb-4"> <sp /></v-card>
      <v-card elevation="0" class="ma-4" min-width="400">
        <v-card-title> </v-card-title>
        <div v-for="(employee, index) in EmployeeInformation" :key="index">
          <v-card-subtitle class="title"
            >bus id:{{ employee.bus_Id }}</v-card-subtitle
          >
          <v-card-text class="font-weight-bold"
            >ticket_Machine :{{ employee.ticket_Machine }}</v-card-text
          >
          <v-card-text class="font-weight-bold"
            >transaction machine:{{ employee.transaction_Machine }}</v-card-text
          >

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
              Activate
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-content>
  </v-app>
</template>
<script>
import bus from "./../../service/BusService";
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
        await bus.activate_Credential(oi, token);
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
        const emp = (await bus.show2(value, token)).data.message;
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