<template>
  <div>
    <v-app>
      <v-content class="grey lighten-3">
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
              <v-text-field
                label="Bus id"
                :rules="inputRules"
                v-model="bus_Id"
                outlined
                dense
              >
              </v-text-field>
              <v-text-field
                label="bus Driver "
                outlined
                dense
                :rules="inputRules"
                v-model="bus_Driver"
              >
              </v-text-field>
              <v-text-field
                label="transaction machine "
                outlined
                dense
                :rules="valid"
                v-model="transaction_Machine"
              >
              </v-text-field>
              <v-select
                v-model="status"
                :items="statuses"
                label="status"
                outlined
                dense
              ></v-select>
              <v-text-field
                v-model="ticket_Machine"
                label="ticket Machine"
                outlined
                dense
              ></v-text-field>
            </v-card-text>
          </v-card>

          <div>
            <v-btn color="primary" @click="register_Bus">register bus</v-btn>
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
import busService from "./../../service/BusService";
import Machine from "./../../service/MachineService";
import lodash from "lodash";

export default {
  data: () => ({
    bus_Id: "",
    transaction_Machine: "",
    bus_Driver: "",
    ticket_Machine: "",
    status: "",

    fached_Transaction_Machine_Id: "",
    fached_Ticket_machine_Id: "",
    statuses: ["Activated", "Deactivated"],
    ticket_Machines: [],
    t_Machine: [],
    inputRules: [(v) => !!v || "required field"],
    valid: [(v) => !!v || "invalid id"],
  }),

  watch: {
    transaction_Machine: {
      immediate: true,
      async handler(value) {
        try {
          const token = this.$store.state.token;
          const fetchedData = (await Machine.displayMachine(value, token)).data
            .message;
          if (this.transaction_Machine != "") {
            if (fetchedData.machine_Type == "Transaction") {
              this.fached_Transaction_Machine_Id = fetchedData.machine_Id;
            }
            if (
              this.fached_Transaction_Machine_Id == this.transaction_Machine
            ) {
              console.log("true match");
            } else {
              console.log("not match");
            }
          } else {
            console.log("enter bus id");
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
    ticket_Machine: {
      immediate: true,
      async handler(value) {
        try {
          const token = this.$store.state.token;
          const fetchedData = (await Machine.displayMachine(value, token)).data
            .message;
          if (this.ticket_Machine != "") {
            if (fetchedData.machine_Type == "Ticket") {
              this.fached_Ticket_machine_Id = fetchedData.machine_Id;
            }
            if (this.fached_Ticket_machine_Id == this.ticket_Machine) {
              console.log("oooooo match ticket machine");
            } else {
              console.log("notoo[[[[[]]]]] match");
            }
          } else {
            console.log("enter bus id");
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
  },

  methods: {
    async register_Bus() {
      const token = this.$store.state.token;
      var bus_Credential = {
        bus_Id: this.bus_Id,
        transaction_Machine: this.transaction_Machine,
        bus_Driver: this.bus_Driver,
        ticket_Machine: this.ticket_Machine,
        status: this.status,
      };
      await busService.addBus(bus_Credential, token);
    },
  },
};
</script>