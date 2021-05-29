<template>
  <v-app>
    <v-content class="grey lighten-3">
      <sp />
      <form id="form" lazy-validation>
        <v-card class="ma-4" elevation="0">
          <v-card-title> </v-card-title>
          <v-card-text>
            <!-- <v-text-field label="organization id generated" outlined dense   :rules = "inputRules" v-model = "organization_Id"></v-text-field> -->
            <v-text-field
              label="organization name"
              outlined
              dense
              :rules="inputRules"
              v-model="org.organization_Name"
            ></v-text-field>
            <!-- <v-text-field label="organization type" outlined dense :rules = "inputRules" v-model = "organization_Type"></v-text-field> -->
            <v-text-field
              label="main office"
              outlined
              dense
              :rules="inputRules"
              v-model="org.main_Office"
            ></v-text-field>
            <v-text-field
              outlined
              label="Detail about the organization"
              v-model="org.about_Organization"
            >
            </v-text-field>
            <v-text-field
              outlined
              label="phone number"
              v-model="org.phone_Number"
            >
            </v-text-field>
            <v-select
              v-model="org.status"
              :items="status_select"
              label="status"
              outlined
              dense
              name="status"
            ></v-select>
            <input type="file" ref="Employee" @change="onselect" />
          </v-card-text>
        </v-card>

        <div class="text-center">
          <v-btn color="primary" @click="update"> update </v-btn>
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
import organizationalService from "./../../../service/OrganizationService";
import sp from "./../../../SearchPanel";
export default {
  props: ["items", "filterby"],
  data: () => ({
    org: {
      organization_Name: "",
      main_Office: "",
      about_Organization: "",
      status: "",
    },
    status_select: ["Activated", "Deactivated"],
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
          const fatchedData = (await organizationalService.show2(value, token))
            .data.message;
          this.org = fatchedData;
        }
      },
    },
  },

  async mounted() {
    const token = this.$store.state.token;
    try {
      const organization_Name = this.$store.state.route.params
        .organization_Name;
      if (organization_Name) {
        const fatchedData = (
          await organizationalService.show2(organization_Name, token)
        ).data.message;
        this.org = fatchedData;
      }
      // if (!Array.isArray(fatchedData)) {
      //   this.org = fatchedData];
      // } else {
      //   this.org = fatchedData;
      // }
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    onselect() {
      const Employee = this.$refs.Employee.files;
      this.Employee = Employee;
    },
    async update() {
      const token = this.$store.state.token;
      var form = document.getElementById("form");
      const fd = new FormData(form);
      fd.append("Organization_Profile", this.Employee[0]);
      await organizationalService.update(fd, this.org._id, token);
    },
  },
};
</script>
<style scoped>
</style>