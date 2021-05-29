<template>
  <div>
    <!-- <v-app> -->
    <v-content class="grey lighten-2 ma-4">
      <!-- <v-card elevation="0" class="pt-2 mb-4">
        <v-layout row justify-space-around>
          <v-flex md6 l6 xl6> <sp /></v-flex></v-layout
      ></v-card> -->
      <validation-observer ref="observer">
        <v-form id="form" @submit.prevent="submit" v-model="xx">
          <v-card elevation="0" class="grey lighten-5 ma-4">
            <v-card-title>
              <div v-for="employee in emp" :key="employee"></div>
            </v-card-title>
            <v-card-text>
              <!-- <form> -->
              <v-layout row justify-space-around="2">
                <v-flex xs12 sm12 md4 lg4 xl4>
                  <validation-provider
                    v-slot="{ errors }"
                    name="first_Name"
                    rules="required|alpha"
                  >
                    <v-text-field
                      label="first name"
                      outlined
                      dense
                      name="first_Name"
                      v-model="EmployeeInformation.first_Name"
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
                      v-model="EmployeeInformation.last_Name"
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
                      v-model="EmployeeInformation.grand_Father_Name"
                    >
                    </v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                  >
                    <v-text-field
                      label="Email"
                      outlined
                      :error-messages="errors"
                      name="email"
                      dense
                      v-model="EmployeeInformation.email"
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
                      v-model="EmployeeInformation.phone_Number"
                    >
                    </v-text-field>
                  </validation-provider>
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
                      v-model="EmployeeInformation.address"
                    >
                    </v-text-field>
                  </validation-provider>
                </v-flex>

                <v-flex xs12 sm12 md6 lg4 xl4>
                  <validation-provider
                    v-slot="{ errors }"
                    name="employee_Id"
                    rules="required|"
                  >
                    <v-text-field
                      label="Employee Id"
                      :error-messages="errors"
                      name="employee_Id"
                      outlined
                      dense
                      v-model="EmployeeInformation.employee_Id"
                    />
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="username"
                    rules="required|Alpha"
                  >
                    <v-text-field
                      label=" username"
                      :error-messages="errors"
                      name="username"
                      outlined
                      dense
                      :rules="inputRules"
                      v-model="EmployeeInformation.username"
                    >
                    </v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="organization_Name"
                    rules="required"
                  >
                    <v-select
                      v-model="EmployeeInformation.organization_Name"
                      :items="organizationName"
                      :error-messages="errors"
                      label="Organizationa"
                      data-vv-name="select"
                      required
                      outlined
                      dense
                      name="organization_Name"
                    ></v-select>
                  </validation-provider>
                  <!-- where we select or how  -->
                  <validation-provider
                    v-slot="{ errors }"
                    name="role_Name"
                    rules="required"
                  >
                    <v-select
                      v-model="EmployeeInformation.role_Name"
                      :items="roleName"
                      :error-messages="errors"
                      label="Role"
                      ata-vv-name="select"
                      required
                      outlined
                      dense
                      name="role_Name"
                    ></v-select>
                  </validation-provider>
                  <div>
                    <v-select
                      v-if="rs"
                      v-model="EmployeeInformation.branch_Name"
                      :items="branchName"
                      label="Branch"
                      outlined
                      dense
                      name="branch_Name"
                    ></v-select>
                  </div>
                  <!-- <v-layout>
                    <v-btn class="primary" @click="pickImage" height="30px"
                      >upload
                    </v-btn>
                    <input
                      type="file"
                      style="display: none"
                      ref="fileRef"
                      accept="profile_Picture /*"
                      @change="pickedImage"
                    />
                  </v-layout> -->

                  <p>choose profile image</p>
                  <input type="file" ref="Employee" @change="onselect" />
                  <v-alert type="success" text dismissible v-if="success">
                    {{ response }}
                  </v-alert>
                  <v-alert type="warning" text dismissible v-if="warn">
                    {{ war }}
                  </v-alert>
                </v-flex>
              </v-layout>
            </v-card-text> </v-card
          ><v-card-actions style="justify-content: center">
            <v-btn class="mr-4" color="primary" type="submit"> submit </v-btn>
          </v-card-actions>
        </v-form>
      </validation-observer>
    </v-content>

    <!-- </v-app> -->
  </div>
</template>
<script>
import OrganizationService from "./../../service/OrganizationService";

import roleService from "./../../service/RoleService";
import branchService from "./../../service/BranchService";
import EmployeeService from "./../../service/EmployeeService";
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
  },
  data: () => ({
    EmployeeInformation: {
      first_Name: "",
      last_Name: "",
      grand_Father_Name: "",

      email: "",
      phone_Number: "",
      address: "",
      employee_Id: "",
      organization_Name: "",
      role_Name: "",
      branch_Name: "",
      username: "",
    },
    xx: false,
    response: "",
    war: "",
    success: false,
    warn: false,
    rs: false,
    select: "",
    organizationName: [],
    roleName: [],
    branchName: [],
    emp: {},
    Employee: "",
    imageUrl: "",
    file: null,
    file: null,
    inputRules: [(v) => !!v || "required field"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  async mounted() {
    const token = this.$store.state.token;
    const role_select = this.$store.state.role;
    const role = (await roleService.displayAllRole(token)).data.message;
    console.log(role);
    for (let i in role) {
      this.roleName.push(role[i].role_Name);
    }
    const org = (await OrganizationService.displayAllOrganization(token)).data
      .message;
    if (!Array.isArray(org)) {
      this.organizationName.push(org.organization_Name);
    } else {
      for (let i in org) {
        this.organizationName.push(org[i].organization_Name);
      }
    }

    if (role_select == "PP-111AB") {
      try {
        this.rs = true;
        // console.log("rrrrrrrrrrrrrrrrrrrr");
        console.log(role_select);
        console.log(this.rs);
        const branch = (await branchService.displayAllBranch(token)).data
          .message;
        console.log(branch);
        for (let i in branch) {
          console.log(branch[i].branch_Name);

          this.branchName.push(branch[i].branch_Name);
          console.log(branch[i].branch_Name);
        }
      } catch (err) {
        console.log(err);
        console.log("not find branch");
      }
    }
  },

  methods: {
    onselect() {
      const Employee = this.$refs.Employee.files;
      this.Employee = Employee;
    },

    async submit() {
      const role = this.$store.state.role;
      const token = this.$store.state.token;
      var form = document.getElementById("form");
      const fd = new FormData(form);
      fd.append("Employee_Profile", this.Employee[0]);
      if (this.xx) {
        try {
          var resp = await EmployeeService.addEmployee(fd, token);

          if (resp.data.success == true) {
            this.success = true;
            this.response = resp.data.message;
          } else if (resp.data.success == false) {
            this.war = resp.data.message;
            this.warn = true;
          }
        } catch (err) {
          this.war = "an error occured";
          console.log(err + "errrrrrrrrrrrr");
        }
      } else {
        this.$refs.observer.validate();
      }
    },

    pickImage() {
      this.$refs.fileRef.click();
    },
    pickedImage(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("please upload valid image");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result; //this change to hexa decimal
      });
      fileReader.readAsDataURL(files[0]);
      this.Employee = files[0];
    },
  },
};
</script>