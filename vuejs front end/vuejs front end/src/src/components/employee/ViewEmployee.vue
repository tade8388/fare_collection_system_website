<template>
  <div>
    <v-toolbar fixed flat>
      <v-toolbar-title> </v-toolbar-title>
      <v-tabs v-model="tab" flat>
        <v-tabs-slider> </v-tabs-slider>
        <v-tab
          v-for="(item, index) in itemese"
          :class="{ active: ct === index }"
          @click="ct = index"
          :key="item"
        >
          {{ item }}
        </v-tab>
        <v-spacer></v-spacer>
        <div class="pr-3"><sp /></div>

        <v-tabs-items v-model="tab">
          <div v-if="ct === 0">
            <v-row justify="space-around">
              <div v-for="(employee, index) in emp" :key="index">
                <v-col cols="12" xs="12" sm="6" md="3" l="3">
                  <v-card elevation="0">
                    <v-card-title>
                      <v-avatar size="80">
                        <img
                          class="img-responsive"
                          :src="getContentImageLink(employee.profile_Picture)"
                        />
                      </v-avatar>
                    </v-card-title>
                    <v-card-text
                      ><v-icon>email</v-icon>:{{ employee.email }}</v-card-text
                    >
                    <v-card-text
                      ><v-icon>phone</v-icon>:
                      {{ employee.phone_Number }}</v-card-text
                    >
                    <v-card-text
                      ><v-icon>home</v-icon>:{{
                        employee.organization
                      }}</v-card-text
                    >
                    <v-card-actions>
                      <v-btn
                        elevation="0"
                        @click="
                          edit({
                            name: 'edit',
                            params: {
                              name: employee.name.first_Name,
                            },
                          })
                        "
                      >
                        edit
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </div>
            </v-row>
          </div>
          <div v-if="ct === 1">
            <v-card>
              <v />
              <!-- <addEmployee /> -->
            </v-card>
          </div>
          <v-spacer></v-spacer>
          <!-- <div class="pr-3"><sp /></div> -->
        </v-tabs-items>
      </v-tabs>
    </v-toolbar>
  </div>
  <!-- </v-app> -->
</template>
<script>
import sp from "./../../SearchPanel";
import EmployeeService from "./../../service/EmployeeService";
import ea from "./../../service/EmployeeAction";
import editemployee from "./EditEmployee";
import addEmployee from "./AddEmployee";
import v from "./View";
import os from "./../SuperAdmin/organization/ViewOrganization";
// import im from './../../../../server/public/uploads/Employee Profile/Employee Profile-1599541726219.jpg'
export default {
  props: "search",
  components: {
    editemployee,
    addEmployee,
    v,
    sp,
    os,
  },
  data: () => ({
    tab: null,
    emp: null,
    search: "",
    em: "",
    object_id_employee: "",
    path: "",
    itemese: [
      "personal information",
      "update employee Information",
      "Employee credential",

      ,
    ],
    ct: 0,
  }),
  mounted() {
    handler();
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.search = value;
        const token = this.$store.state.token;
        this.emp = (
          await EmployeeService.displayEmployee(value, token)
        ).data.message;
        console.log("value");
        console.log(value);
      },
    },
  },
  methods: {
    getContentImageLink(image) {
      return "http://localhost:5000" + image;
    },
    // getImgUrl(pic) {
    //   console.log(pic);
    //   pic = "@/../../server/" + pic;

    //   return require(pic);
    // },
    //     v(path){
    //       path = '@/../../server'+path
    //               console.log("path")
    //       console.log(path)
    //  return path
    //     },
    edit(route) {
      console.log(route);
      console.log("path");
      this.$router.push(route);
    },
  },

  //         async created () {
  //    const token =this.$store.state.token

  //           try{

  //   this.emp=  (await EmployeeService.displayEmployee(search)).data.message
  //           }
  //           catch(error){
  //             console.log(error)
  //           }
  //  },
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
  background-color: #edeff1;
}
.v-card__text {
  /* font-size: .9rem; */
  line-height: 0.1;
  padding: 0.5px;
  text-align: left;
  /* justify-content: space-between; */
}
.v-btn {
  color: #34495e;
}
</style>
