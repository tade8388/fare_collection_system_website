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
                label="machine id"
                :rules="inputRules"
                v-model="mi.machine_Id"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                label="ip address"
                :rules="inputRules"
                v-model="mi.ip_Address"
                outlined
                dense
              >
              </v-text-field>
              <v-select
                v-model="mi.status"
                :items="items"
                label="status"
                outlined
                dense
              ></v-select>
              <v-select
                v-model="mi.machine_Type"
                :items="type"
                label="machine type"
                outlined
                dense
              ></v-select>
              <!-- </v-flex> -->

              <!-- </v-layout> -->
            </v-card-text>
          </v-card>
          <v-card-actions style="justify-content: center">
            <v-btn color="primary" @click="submit">register machine</v-btn>
          </v-card-actions>
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
import ms from "./../../service/MachineService";
export default {
  data: () => ({
    mi: {
      machine_Id: "",
      machine_Type: "",
      ip_Address: "",
      status: "",
      status: "",
    },
    items: ["Activated", "Deactivated"],
    type: ["Ticket", "Transaction "],

    //      inputRules: [
    // v => !!v || 'required field'
    // ],
  }),
  methods: {
    async submit() {
      const token = this.$store.state.token;
      await ms.addMachine(this.mi, token);
    },
  },
};
</script>