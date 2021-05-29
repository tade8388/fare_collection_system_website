<template>
  <v-app>
    <v-content class="grey lighten-3">
      <v-card elevation="0" class="ml-4 pt-2 mb-4"> <sp /></v-card>

      <v-card elevation="0" class="ma-4">
        <form id="form" lazy-validation>
          <v-card-title> </v-card-title>

          <v-card-text>
            <v-text-field
              label="Route id"
              outlined
              dense
              :rules="inputRules"
              v-model="route_Id"
              name="route_Id"
            >
            </v-text-field>
            <v-text-field
              label="Route name"
              outlined
              dense
              :rules="inputRules"
              v-model="route_Name"
              name="route_Name"
            ></v-text-field>
            <v-select
              v-model="stations"
              :items="stationName"
              attach
              chips
              label="station"
              multiple
              return-object
            ></v-select>

            <v-select
              v-model="status"
              :items="items"
              label="status"
              name="status"
              outlined
              dense
            ></v-select>
            <v-btn>route File</v-btn>
            <input type="file" ref="Employee" @change="onselect" />
          </v-card-text>
        </form>
      </v-card>

      <div>
        <v-btn color="primary" @click="update">submit</v-btn>
      </div>
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
import rs from "./../../service/RouteService";
import sp from "./../../SearchPanel";
export default {
  data: () => ({
    route_Id: "",
    stations: [],
    route_Name: "",
    route_File: "",
    status: "",
    items: ["Activated", "Deactivated"],
    stationName: [],
    object_id: "",

    inputRules: [(v) => !!v || "required field"],
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
          const fatchedData = (await rs.show2(value, token)).data.message;
          this.object_id = fatchedData._id;
          (this.route_Id = fatchedData.route_Id),
            (this.stations = fatchedData.stations),
            (this.route_Name = fatchedData.route_Name),
            (this.route_File = fatchedData.route_File),
            (this.status = fatchedData.status),
            console.log("value");
          console.log(value);
        }
      },
    },
  },

  async mounted() {
    const token = this.$store.state.token;
    try {
      const route_Name = this.$store.state.route.params.route_Name;
      const fatchedData = (await rs.show2(route_Name, token)).data.message;
      if (route_Name) {
        this.object_id = fatchedData._id;
        (this.route_Id = fatchedData.route_Id),
          (this.stations = fatchedData.stations),
          (this.route_Name = fatchedData.route_Name),
          (this.route_File = fatchedData.route_File),
          (this.status = fatchedData.status);
      }
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
      fd.append("Route_Profile", this.Employee[0]);
      await rs.update(fd, this.object_id, token);
    },
  },
};
</script>
<style scoped>
</style>