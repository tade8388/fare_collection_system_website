<template>
  <div>
    <v-app>
      <v-content class="grey lighten-5 ma-4">
        <v-card elevation="0" class="ml-4 pt-2 mb-4"> <sp /></v-card>
        <validation-observer ref="observer">
          <form id="form" @submit.prevent="submit">
            <v-card elevation="0" class="ma-4">
              <v-card-title>
                <div v-for="employee in emp" :key="employee"></div>
              </v-card-title>
              <v-card-text>
                <!-- <form> -->
                <v-layout row justify-space-around="2">
                  <v-flex xs12 sm12 md6 lg6 xl6>
                    <validation-provider
                      v-slot="{ errors }"
                      name="first_Name"
                      rules="required|alpha"
                    >
                      <v-text-field
                        placeholder="first name"
                        outlined
                        dense
                        name="first_Name"
                        v-model="first_Name"
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="last_Name"
                      rules="required|alpha|"
                    >
                      <v-text-field
                        label="last Name"
                        name="last_Name"
                        outlined
                        dense
                        v-model="first_Name"
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="grand_Father_Name"
                      rules="required|alpha"
                    >
                      <v-text-field
                        label="grand father Name"
                        blur
                        :error-messages="errors"
                        name="grand_Father_Name"
                        outlined
                        flat
                        dense
                        v-model="grand_Father_Name"
                      >
                      </v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="identification_Number"
                      rules="required"
                    >
                      <v-text-field
                        label="identification number"
                        outlined
                        :error-messages="errors"
                        name="identification_Number"
                        dense
                        v-model="identification_Number"
                      >
                      </v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="phone_Number"
                      :rules="{
                        required: true,
                        digits: 10,
                        regex: /^0(9)\d{8}$/,
                      }"
                    >
                      <v-text-field
                        label="phone number"
                        :error-messages="errors"
                        name="phone_Number"
                        outlined
                        dense
                        v-model="phone_Number"
                      >
                      </v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="balance"
                      rules="required"
                    >
                      <v-text-field
                        label="balance "
                        outlined
                        :error-messages="errors"
                        name="balance"
                        dense
                        v-model="balance"
                      >
                      </v-text-field>
                    </validation-provider>
                  </v-flex>

                  <v-flex xs12 sm12 md6 lg5 xl5>
                    <validation-provider
                      v-slot="{ errors }"
                      name="address"
                      rules="required|max:30"
                    >
                      <v-text-field
                        label="Address"
                        :error-messages="errors"
                        name="address"
                        outlined
                        dense
                        v-model="address"
                      >
                      </v-text-field>
                    </validation-provider>
                    <!-- <validation-provider
                      v-slot="{ errors }"
                      name="customer_Id"
                      rules="required"
                    >
                      <v-text-field
                        label="costumer Id"
                        :error-messages="errors"
                        name="customer_Id"
                        outlined
                        dense
                        v-model="customer_Id"
                      />
                    </validation-provider> -->
                    <validation-provider
                      v-slot="{ errors }"
                      name="username"
                      rules="required"
                    >
                      <v-text-field
                        label=" username"
                        :error-messages="errors"
                        name="username"
                        outlined
                        dense
                        :rules="inputRules"
                        v-model="username"
                      >
                      </v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="gender"
                      rules="required"
                    >
                      <v-select
                        v-model="gender"
                        :items="genderr"
                        :error-messages="errors"
                        label="gender"
                        required
                        outlined
                        dense
                        name="gender"
                      ></v-select>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="user_acces_type"
                      rules="required"
                    >
                      <v-select
                        v-model="user_acces_type"
                        :items="access"
                        :error-messages="errors"
                        label="User Acces Type"
                        data-vv-name="select"
                        required
                        outlined
                        dense
                        name="user_access_type"
                      ></v-select>
                    </validation-provider>
                    <!-- where we select or how  -->
                    <validation-provider
                      v-slot="{ errors }"
                      name="status"
                      rules="required"
                    >
                      <v-select
                        v-model="status"
                        :items="statuss"
                        :error-messages="errors"
                        label="status"
                        ata-vv-name="select"
                        required
                        outlined
                        dense
                        name="status"
                      ></v-select>
                    </validation-provider>
                    <input type="file" ref="Employee" @change="onselect" />
                    <!--       
<v-layout>
      <v-btn class="primary" @click= "pickImage" height="30px">upload </v-btn>
      <input type="file" 
             style="display: none" 
             ref="fileRef" 
             accept="profile_Picture /*"
             @change= "pickedImage">
             

</v-layout> -->
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>

            <div class="text-center">
              <v-btn class="mr-4" type="submit"> update </v-btn>
            </div>

            <v-btn @click="clear"> clear </v-btn>
          </form>
          <!-- </v-container> -->
        </validation-observer>
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
// <script>
// import OrganizationService from './../../service/OrganizationService'
import CustomerService from "./../../service/CostumerService";

import {
  required,
  digits,
  email,
  max,
  regex,
  alpha,
} from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import sp from "./../../SearchPanel";
import CostumerService from "./../../service/CostumerService";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});
extend("alpha", {
  ...alpha,
  message: "number is not allowed {_field_} ",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} start with 09",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    sp,
  },
  data: () => ({
    first_Name: "",
    last_Name: "",
    grand_Father_Name: "",

    phone_Number: "",
    address: "",
    // customer_Id: "",
    age: "",
    balance: "",
    identification_Number: "",
    username: "",
    gender: "",
    user_acces_type: "",
    status: "",

    object_id: "",
    statuss: ["Activated", "Deactivated"],
    genderr: ["Male", "Female"],
    access: ["Mobile", "Card", "Both"],

    emp: {},
    Employee: "",
    imageUrl: "",
    file: null,
    inputRules: [(v) => !!v || "required field"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.search = value;
        const token = this.$store.state.token;
        if (value) {
          const fatchedData = (await CustomerService.show2(value, token)).data
            .message;
          this.object_id = fatchedData._id;
          this.first_Name = fatchedData.name.first_Name;
          (this.last_Name = fatchedData.name.last_Name),
            (this.grand_Father_Name = fatchedData.name.grand_Father_Name),
            (this.phone_Number = fatchedData.phone_Number),
            (this.address = fatchedData.address);
          console.log("value");
          console.log(value);
        }
      },
    },
  },
  async mounted() {
    const token = this.$store.state.token;
    try {
      const cname = this.$store.state.route.params.cname;
      if (cname) {
        const fatchedData = (await CostumerService.show2(cname, token)).data
          .message;
        this.object_id = fatchedData._id;
        this.first_Name = fatchedData.name.first_Name;
        (this.last_Name = fatchedData.name.last_Name),
          (this.grand_Father_Name = fatchedData.name.grand_Father_Name),
          (this.phone_Number = fatchedData.phone_Number),
          (this.address = fatchedData.address);
        this.EmployeeInformation = fatchedData;
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
    async submit() {
      const token = this.$store.state.token;
      var form = document.getElementById("form");
      const fd = new FormData(form);
      fd.append("Customer_Profile", this.Employee[0]);
      await CustomerService.update(fd, this.object_id, token);

      // console.log("xxxxxxxxxxxxxxxxx" + this.object_id.name);
      // console.log(_id);
    },
  },

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
  //   this.profile_Picture =files[0]
  // }
};
</script>