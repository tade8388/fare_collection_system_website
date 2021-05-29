<template>
  <div>
    <v-app>
      <v-content class="grey lighten-3">
        <sp />

        <v-card min-height="100px" elevation="0" class="ma-4">
          <v-card-text class="mt-5"> Home/Add Costumer </v-card-text>
        </v-card>

        <form ref="form" lazy-validation>
          <v-card elevation="0" class="ma-4">
            <v-card-title> </v-card-title>
            <v-card-text>
              <!-- <form> -->
              <!-- <v-layout> -->
              <!-- <v-flex xs12 sm12 md6 lg6 xl6> -->
              <!-- <v-text-field
                label="Bus id"
                :rules="inputRules"
                v-model="bus_Id"
              ></v-text-field> -->
              <v-text-field
                label="ticket matchine"
                :rules="inputRules"
                v-model="bus.ticket_Machine"
              ></v-text-field>
              <v-text-field
                label="transaction machine"
                dense
                :rules="inputRules"
                v-model="bus.transaction_Machine"
              ></v-text-field>
              <!-- <v-text-field
                label=" bus driver "
                dense
                :rules="inputRules"
                v-model="bus.bus_Driver"
              ></v-text-field> -->
              <v-select
                v-model="bus.status"
                :items="items"
                label="status"
                outlined
                dense
              ></v-select>

              <!-- </v-flex> -->

              <!-- </v-layout> -->
            </v-card-text>
          </v-card>

          <div>
            <v-btn color="primary" @click="addBus">addRoute</v-btn>
          </div>
        </form>
        <!-- </v-container> -->
      </v-content>
      <div class="text-center">
        <v-footer>
          <v-card color="blue accent-2 " class="white--text text-center">
            copyright &copy; Allright reserved2020
          </v-card>
        </v-footer>
      </div>
    </v-app>
  </div>
</template>
<script>
import busService from "./.././../service/BusService";
import sp from "./../../SearchPanel";
export default {
  data: () => ({
    bus: {
      bus_Id: "",
      organization: "",
      bus_Driver: "",
      machine_ID: "",
      status: "",
    },
    items: ["Activated", "Deactivated"],

    //      inputRules: [
    // v => !!v || 'required field'
    // ],
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
        if (value) {
          this.bus = (await busService.show2(value, token)).data.message;
        }
      },
    },
  },
  async mounted() {
    const token = this.$store.state.token;
    try {
      const bus_Id = this.$store.state.route.params.bus_Id;
      if (bus_Id) {
        const fatchedData = (await busService.show2(bus_Id, token)).data
          .message;
        this.bus = fatchedData;
        console.log("informationdata");
      }
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    async update() {
      console.log("yyyyyyyyyyyyyyyyyyyyyyy" + this.EmployeeInformation._id);
      await EmployeeService.update(
        this.EmployeeInformation,
        this.EmployeeInformation._id
      );

      console.log("xxxxxxxxxxxxxxxxx" + this.EmployeeInformation.name);
      console.log(_id);
    },
  },
};
</script>