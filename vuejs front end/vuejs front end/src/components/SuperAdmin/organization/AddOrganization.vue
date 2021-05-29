<template>
  <div>
    <v-app>
      <v-content>
        <!-- <v-card min-height="70px" elevation="0" class="ma-4">
          <v-card-text class="mt-5"> Home/Add Costumer </v-card-text>
        </v-card> -->
        <validation-observer ref="observer">
          <v-form
            id="form"
            v-model="x"
            @submit.prevent="submit"
            lazy-validation
          >
            <v-card elevation="0" class="ma-4" min-width="600">
              <v-card-title> </v-card-title>
              <v-card-text>
                <v-layout justify-space-around>
                  <v-flex sm-12 md6 l6 xl6>
                    <validation-provider
                      v-slot="{ errors }"
                      name="organization_Id"
                      rules="required|alpha"
                    >
                      <v-text-field
                        placeholder="organization id"
                        outlined
                        dense
                        name="organization_Id"
                        v-model="org.organization_Id"
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="organizaion_Name"
                      rules="required|alpha|"
                    >
                      <v-text-field
                        label="organizaion Name "
                        name="organization_Name"
                        outlined
                        dense
                        v-model="org.organizaion_Name"
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="main_Office"
                      rules="required"
                    >
                      <v-text-field
                        label="main Office"
                        outlined
                        :error-messages="errors"
                        name="main_Office"
                        dense
                        v-model="org.main_Office"
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
                        v-model="org.phone_Number"
                      >
                      </v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="about_Organization"
                      rules="required"
                    >
                      <v-text-field
                        label="about Organization "
                        outlined
                        :error-messages="errors"
                        name="about_Organization"
                        dense
                        v-model="org.about_Organization"
                      >
                      </v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="organization_Type"
                      rules="required"
                    >
                      <v-select
                        v-model="org.organization_Type"
                        :error-messages="errors"
                        :items="organizationType"
                        label="organization Type"
                        outlined
                        dense
                        name="organization_Type"
                      ></v-select>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="status"
                      rules="required|alpha"
                    >
                      <v-select
                        v-model="org.status"
                        :error-messages="errors"
                        :items="status_select"
                        label="status"
                        outlined
                        dense
                        name="status"
                      ></v-select>
                    </validation-provider>
                    <input type="file" ref="Employee" @change="onselect" />
                    <!-- </v-flex> -->

                    <!-- </v-layout> -->
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>

            <div>
              <v-btn class="btn btn-primary" type="submit"> submit </v-btn>
            </div>
          </v-form>
        </validation-observer>
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
import organizationalService from "./../../../service/OrganizationService";
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
import sp from "./../../../SearchPanel";

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
    org: {
      organization_Id: "",
      organization_Name: "",
      organization_Type: "",
      main_Office: "",
      about_Organization: "",
      phone_Number: "",
      status: "",
      Employee: "",
    },
    x: false,
    organizationType: ["Platform_Provider", "Service_Provider", "Government"],
    status_select: ["Activated", "Deactivated"],
    //      inputRules: [
    // v => !!v || 'required field'
    // ],
  }),
  methods: {
    onselect() {
      const Employee = this.$refs.Employee.files;
      this.Employee = Employee;
    },
    async submit() {
      const token = this.$store.state.token;
      var form = document.getElementById("form");
      const fd = new FormData(form);
      fd.append("Organization_Profile", this.Employee[0]);
      if (this.x) {
        try {
          await organizationalService.addOrganization(fd, token);
        } catch (err) {
          console.log(err + "errrrrrrrrrrrr");
        }
      } else {
        this.$refs.observer.validate();
      }
    },
  },
};
</script>