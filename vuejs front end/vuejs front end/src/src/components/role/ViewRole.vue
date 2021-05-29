<template>
  <!-- <v-app> -->
  <v-content class="grey lighten-3 ml-4 mr-4">
    <sp />
    <v-row justify="space-between">
      <div v-for="(branch, index) in org" :key="index">
        <v-col cols="12" xs="12" sm="6" md="3" l="3">
          <v-card elevation="0">
            <v-card-subtitle>role name:{{ branch.role_Name }}</v-card-subtitle>
            <v-card-text
              >organazation type:{{ branch.organization_Type }}</v-card-text
            >
            <v-card-text>role_Id:{{ branch.role_Id }}</v-card-text>

            <v-card-actions>
              <!-- <router-link to="ViewEmployee" params:{Employee_Id:Employee_Id}>View</router-link> -->
              <v-btn
                color="#34495e"
                class="grey--text"
                elevation="0"
                @click="
                  edit({
                    name: 'editRoute',
                    params: {
                      route_Name: branch.route_Name,
                    },
                  })
                "
              >
                edite
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </div>
    </v-row>

    <!-- </v-flex>  
 </v-layout> -->
  </v-content>
  <!-- </v-app> -->
</template>
<script>
// import axios from 'axios'
// import axios from './../../axios-auth'
import sp from "./../../SearchPanel";
// import lodash from 'lodash'
import rs from "./../../service/RoleService";
export default {
  data: () => ({
    org: null,
    search: "",
  }),
  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        try {
          this.search = value;
          const token = this.$store.state.token;
          const fetchedData = (await rs.displayRole(value, token)).data.message;
          if (!Array.isArray(fetchedData) && fetchedData._id) {
            this.org = [fetchedData];
            console.log("111111111111111");
          } else if (!Array.isArray(fetchedData) && !fetchedData._id) {
            console.log("search not found");
          } else {
            this.org = fetchedData;
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
  methods: {
    edit(route) {
      this.$router.push(route);
    },
  },

  //          async mounted () {
  //   this.emp=  (await EmployeeService.displayEmployee()).data.message
  //  },
  components: {
    sp,
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
  line-height: 1;
  padding: 0.5px;
  text-align: left;
  /* justify-content: space-between; */
}
.v-btn {
  color: #34495e;
}
</style>
