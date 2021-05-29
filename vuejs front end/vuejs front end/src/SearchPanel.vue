<template>
  <div class="Search">
    <v-text-field
      dense
      placeholder="search"
      v-model="search"
      append-icon="search"
    ></v-text-field>

    <div class="options"></div>
  </div>
</template>
<script>
import lodash from "lodash";
import EmployeeService from "./service/EmployeeService";

export default {
  data: () => ({
    search: "",
  }),
  watch: {
    search: lodash.debounce(async function (value) {
      // setTimeout(() => {

      const route = {
        path: "",
      };
      if (route.search !== "") {
        route.query = {
          search: this.search,
        };
      }

      this.$router.push(route);
      // }, 1000);
      console.log(value);
    }, 1000),
    "$route.query.search": {
      immediate: true,
      // async handler(value) {
      //   this.search=value
      //     this.emp=(await EmployeeService.displayEmployee(value)).data.message
      //       console.log(this.emp)

      //     }
    },
  },

  methods: {
    //   edit(){
    //      const route={
    //   path:'/SuperAdmin/ViewServiceProviderAdmin'
    // }
    // this.$router.push(route)
    //   }
  },
};
</script>
<style scoped>
/* .v-input {
  border-radius: 30px;
  margin: auto;
  width: 250px;
  margin-left: 30px;
} */
</style>

