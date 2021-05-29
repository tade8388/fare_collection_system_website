<template>
  <v-app>
    <v-content class="grey lighten-3">
      <!-- <v-container class="ma-1"> -->
      <sp />

      <form ref="form" lazy-validation>
        <v-card class="ma-4" elevation="0">
          <v-card-title>
            <!-- <div class= "Search" v-text= "selecteditem ? selecteditem[filterby] : ''"> -->
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="Branch id"
              outlined
              dense
              :rules="inputRules"
              v-model="branchInformation.branch_Id"
            ></v-text-field>
            <v-text-field
              label="Branch  name"
              outlined
              dense
              :rules="inputRules"
              v-model="branchInformation.branch_Name"
            ></v-text-field>
            <v-text-field
              label="Address"
              outlined
              dense
              :rules="inputRules"
              v-model="branchInformation.address"
            ></v-text-field>
            <v-text-field
              label="phone number"
              outlined
              dense
              :rules="inputRules"
              v-model="branchInformation.phone_Number"
            ></v-text-field>
            <v-select
              v-model="branchInformation.status"
              :items="items"
              label="status"
              outlined
              dense
            ></v-select>
          </v-card-text>
        </v-card>
        <div class="text-center">
          <v-btn color="primary" @click="update">update</v-btn>
        </div>
      </form>
    </v-content>
    <div class="text-center">
      <v-footer>
        <v-card color="blue accent-2 " class="white--text text-center">
          copyright &copy; Allright reserved2020
        </v-card>
      </v-footer>
    </div>
  </v-app>
</template>
<script>
import branchService from "./../../../service/BranchService";
import sp from "./../../../SearchPanel";
export default {
  props: ["items", "filterby"],
  data: () => ({
    branchInformation: {
      branch_Id: "",
      branch_Name: "",
      address: "",
      phone_Number: "",
      status: "",
    },
    items: ["Activated", "Deactivated"],

    // inputRules: [(v) => !!v || "required field"],
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
          const fatchedData = (await branchService.show2(value, token)).data
            .message;
          this.branchInformation = fatchedData;
        }
      },
    },
  },

  async mounted() {
    const token = this.$store.state.token;
    try {
      const branch_Name = this.$store.state.route.params.branch_Name;
      if (branch_Name) {
        const fatchedData = (await branchService.show2(branch_Name, token)).data
          .message;

        this.branchInformation = fatchedData;
      }
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    async update() {
      console.log("yyyyyyyyyyyyyyyyyyyyyyy" + this.branchInformation._id);
      await branchService.update(
        this.branchInformation,
        this.branchInformation._id
      );

      console.log("xxxxxxxxxxxxxxxxx" + this.branchInformation.branch_Name);
      console.log(_id);
    },
  },
};
</script>
<style scoped>
</style>