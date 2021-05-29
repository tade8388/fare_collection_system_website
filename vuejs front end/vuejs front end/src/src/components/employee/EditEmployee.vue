<template>
  <div>
    <v-card elevation="0" class="pt-2 mb-4">
      <v-layout row justify-space-around>
        <v-flex md6 l6 xl6> <sp /></v-flex></v-layout
    ></v-card>
    <v-card elevation="0" class="ma-4">
      <form id="form" lazy-validation>
        <v-card-title> </v-card-title>

        <v-card-text>
          <!-- <form> -->

          <v-layout row justify-space-around="2">
            <v-flex xs12 sm12 md6 lg6 xl6>
              <v-text-field
                label="first Name"
                outlined
                dense=""
                :rules="inputRules"
                name="first_Name"
                v-model="first_Name"
              >
              </v-text-field>
              <v-text-field
                label="last Name"
                outlined
                dense="10"
                name="last_Name"
                :rules="inputRules"
                v-model="last_Name"
              />
              <v-text-field
                label="grand father Name"
                outlined
                flat="0"
                dense
                :rules="inputRules"
                name="grand_Father_Name"
                v-model="grand_Father_Name"
              />
              <v-text-field
                label="Email"
                outlined
                dense
                :rules="emailRules"
                v-model="email"
              />
              <v-text-field
                label="phone number"
                outlined
                dense
                :rules="inputRules"
                v-model="phone_Number"
              />
            </v-flex>
            <v-flex xs12 sm12 md6 lg5 xl5>
              <v-text-field
                label="Address"
                outlined
                dense
                :rules="inputRules"
                v-model="address"
              />
              <input type="file" ref="Employee" @change="onselect" />
            </v-flex>
          </v-layout>
        </v-card-text>
        <!-- <v-card-actions style="justify-content: center">
              <v-btn color="primary" @click="update"> update </v-btn>
            </v-card-actions> -->
        <v-card-actions style="justify-content: center">
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#34495e"
                  elevation="0"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  update
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline"> Employee update </v-card-title>
                <v-card-text>Do you want to update</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    cancel
                  </v-btn>
                  <v-btn color="green darken-1" text @click="update">
                    update
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-card-actions>
        <v-alert type="success" text v-if="success">
          {{ response }}
        </v-alert>
        <v-alert type="warning" text v-if="warn">
          {{ war }}
        </v-alert>
      </form>
    </v-card>

    <!-- </v-container> -->
    <div class="text-center">
      <v-footer>
        <v-card color="blue accent-2 " class="white--text text-center">
          copyright &copy; Allright reserved2020
        </v-card>
      </v-footer>
    </div>
  </div>
</template>
<script>
import sp from "./../../SearchPanel";
import employeeService from "./../../service/EmployeeService";
// import lodash from 'lodash'
export default {
  data: () => ({
    search: "",
    first_Name: "",
    last_Name: "",
    grand_Father_Name: "",

    email: "",
    phone_Number: "",
    address: "",
    Employee: "",
    object_id: "",
    dialog: false,
    response: "",
    war: "",
    success: false,
    warn: false,

    select: "",
    items: [],
    inputRules: [(v) => !!v || "required field"],
    // emailRules: [
    //   v => !!v || 'E-mail is required',
    //   v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
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
          const fatchedData = (await employeeService.show2(value, token)).data
            .message;

          console.log(fatchedData);
          this.object_id = fatchedData[0]._id;
          this.first_Name = fatchedData[0].name.first_Name;
          (this.last_Name = fatchedData[0].name.last_Name),
            (this.grand_Father_Name = fatchedData[0].name.grand_Father_Name),
            (this.email = fatchedData[0].email),
            (this.phone_Number = fatchedData[0].phone_Number),
            (this.address = fatchedData[0].address);
        }
      },
    },
  },
  async mounted() {
    try {
      const token = this.$store.state.token;
      const name = this.$store.state.route.params.name;
      console.log("above");
      console.log(name);
      console.log("lower");
      if (name) {
        const fatchedData = (await employeeService.show2(name, token)).data
          .message;
        this.object_id = fatchedData[0]._id;
        this.first_Name = fatchedData[0].name.first_Name;
        (this.last_Name = fatchedData[0].name.last_Name),
          (this.grand_Father_Name = fatchedData[0].name.grand_Father_Name),
          (this.email = fatchedData[0].email),
          (this.phone_Number = fatchedData[0].phone_Number),
          (this.address = fatchedData[0].address);
      }
      // console.log(this.EmployeeInformation.name);
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
      this.dialog = false;
      const token = this.$store.state.token;
      var form = document.getElementById("form");
      const fd = new FormData(form);
      fd.append("Employee_Profile", this.Employee[0]);
      var resp = await employeeService.update(fd, this.object_id, token);
      if (resp.data.success == true) {
        this.success = true;
        this.response = resp.data.message;
      } else if (resp.data.success == false) {
        this.war = resp.data.message;
        this.warn = true;
      }
    },
  },
  //                   console.log("shitttttttttt")
  //   const emp=  (await EmployeeService.displayEmployee()).data.message[0]
  //
  // console.log("employyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
  // console.log(emp)

  // methods:{
  //    async  add_Employee() {
  //  const  formData={
  //     name: {
  //       first_Name:this.first_Name,
  //      last_Name:this.last_Name,
  //     grand_Father_Name:this.grand_Father_Name
  //     },
  //     email:this.email,
  //     phone_Number:this.phone_Number,
  //     address:this.address,
  //     employee_Id:this.employee_Id,
  //     organization:this.organization,
  //     role:this.role
  //  }
  //     methods:{
  //      async  add_Employee() {
  //        try{
  //        await EmployeeService.addEmployee(this.EmployeeInformation)
  //        }catch(err){
  //       console.log(err+"errrrrrrrrrrrr")
  //           }

  // },
  //   },

  // pickImage(){
  //   this.$refs.fileRef.click()
  // },
  // pickedImage(event){
  //   const files=event.target.files
  //   let filename=files[0].name
  //   if(filename.lastIndexOf('.')<=0){
  //     return alert('please upload valid image')
  //   }
  //   const fileReader= new FileReader()
  //   fileReader.addEventListener('load',()=>{
  //     this.imageUrl=fileReader.result    //this change to hexa decimal
  //   })
  //   fileReader.readAsDataURL(files[0])
  //   this.image=files[0]
  // }
};
</script>