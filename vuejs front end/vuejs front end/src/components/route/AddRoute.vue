<template>
  <div>
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
          <v-btn color="primary" @click="submit">submit</v-btn>
        </div>
        <Map ref="themap" />
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
import sp from "./../../SearchPanel";
import rs from "./../../service/RouteService";
import station from "./../../service/StationService";
import Map from "../map/showLocation";
export default {
  data: () => ({
    route_Id: "",
    stations: [],
    route_Name: "",
    route_File: "",
    status: "",
    l: [
      { n: "pp", g: "jj" },
      { n: "kk", g: "mm" },
    ],
    lf: { value: "n", text: "g" },

    items: ["Activated", "Deactivated"],
    stationName: [],
    stationid: [],
    inputRules: [(v) => !!v || "required field"],
  }),
  components: {
    sp,
    Map,
  },
  async mounted() {
    this.$refs.themap.ss([9.0180934, 38.8021491]);
    const token = this.$store.state.token;
    const st = (await station.displayStation(null, token)).data.message;
    if (!Array.isArray(st)) {
      this.stationName.push(station_Name);
      console.log("not array");
    } else {
      console.log("]]]]]]]]]]]]]]]");

      console.log(Array.isArray(st));
      console.log("]]]]]]]]]]]]]]]");

      console.log(st);
      for (let i in st) {
        this.stationName.push(st[i].station_Name);
        this.stationid.push(st[i]._id);

        // this.organizationName.push([org.organization_Name])
      }
    }
  },
  methods: {
    onselect() {
      const Employee = this.$refs.Employee.files;
      this.Employee = Employee;
    },
    async submit() {
      console.log("lllllllllll");
      console.log(this.stations);
      console.log("llllllllllllllll");
      const fdd = {
        route_Id: this.route_Id,
        stations: this.stations,
        route_Name: this.route_Name,
        route_File: this.route_File,
        status: this.status,
      };

      console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
      console.log(this.stations);
      const token = this.$store.state.token;

      var form = document.getElementById("form");
      const fd = new FormData(form);
      fd.append("Route_File", this.Employee[0]);
      fd.append("stations", [this.stations]);

      //  fd.append(" stations", this.stations);

      try {
        await rs.AddRoute(fd, token);
      } catch (err) {
        console.log(err + "errrrrrrrrrrrr");
      }
    },
  },
};
</script>
<style scoped>
.button,
input,
select,
textarea {
}
</style>