<template>
  <div>
    <v-data-table
      :headers="organization_header"
      :items="organization"
      :items-per-page="5"
      class="elevation-0"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>employee information manegment </v-toolbar-title>

          <!-- <v-divider class="" inset vertical></v-divider> -->

          <v-spacer></v-spacer>
          <div class="pr-3"><sp /></div>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form id="form">
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editorganization.employee_Id"
                          label="employee id"
                          name="employee_Id"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editorganization.first_Name"
                          label=" first name"
                          name="first_Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editorganization.last_Name"
                          label="last Name"
                          name="last_Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editorganization.grand_Father_Name"
                          label="grand father  Name"
                          name="grand_Father_Name"
                        ></v-text-field>
                      </v-col>
                      <!-- <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editorganization.phone_Number"
                          label="phone number"
                        ></v-text-field>
                      </v-col> -->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Email"
                          name="email"
                          v-model="editorganization.email"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="phone number"
                          name="phone_Number"
                          v-model="editorganization.phone_Number"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Address"
                          name="address"
                          v-model="editorganization.address"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label=" username"
                          name="username"
                          :rules="inputRules"
                          v-model="editorganization.username"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editorganization.organization_Name"
                          :items="organizationName"
                          label="Organizationa"
                          data-vv-name="select"
                          required
                          name="organization_Name"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editorganization.status"
                          :items="status_select"
                          label="status"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editorganization.role_Name"
                          :items="roleName"
                          label="Role"
                          ata-vv-name="select"
                          required
                          name="role_Name"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editorganization.branch_Name"
                          :items="branchName"
                          label="Branch"
                          name="branch_Name"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <input type="file" ref="Employee" @change="onselect" />
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogActivate" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want activate?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeActivate"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="activateConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDiactivate" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want deactivate?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeactivate"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deactivateConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.status="{ item }">
        <!-- <v-chip :color="getColor(item.status2)" dark>
          {{ item.status2 }}
        </v-chip> -->
        {{ item.status2 }}
      </template>
      <template v-slot:item.activate="{ item }">
        <v-btn
          outlined
          rounded
          color="green"
          small
          class="mr-2"
          @click="activateItem(item)"
        >
          <v-icon>check</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.deactivate="{ item }">
        <v-btn outlined rounded color="red" small @click="deactivateItem(item)">
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.edit="{ item }">
        <v-icon outlined class="mr-2" @click="editItem(item)"> edit </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogRegister" max-width="500px">
      <v-card>
        <v-alert outlined type="success"> {{ response }} </v-alert>
      </v-card>
    </v-dialog>
    <v-dialog outlined v-model="dialogError" max-width="500px">
      <v-card>
        <v-alert dismissible outlined type="error">
          {{ errorresponse }}
        </v-alert>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import sp from "./../../SearchPanel";

import organizationService from "./../../service/EmployeeService";
import ea from "./../../service/EmployeeAction";
import OrganizationService from "./../../service/OrganizationService";
import roleService from "./../../service/RoleService";
import branchService from "./../../service/BranchService";
export default {
  data: () => ({
    org: null,
    search: "",
    organizationName: [],
    response: null,
    errorresponse: null,
    roleName: [],
    branchName: [],
    organization_header: [
      { text: "first name ", value: "first_Name" },
      { text: "last name", value: "last_Name", align: "start" },
      { text: "grand father name ", value: "grand_Father_Name" },
      { text: "employee id", value: "employee_Id" },
      { text: "phone Number", value: "phone_Number" },
      { text: "email ", value: "email" },
      { text: "status", value: "status", sortable: false },
      { text: "Activate", value: "activate", sortable: false },
      { text: "deactivate", value: "deactivate", sortable: false },
      { text: "edit", value: "edit", sortable: false },
      { text: "reset", value: "reset", sortable: false },
    ],
    organization: [],
    Employee: "",
    organizationType: ["Platform_Provider", "Service_Provider", "Government"],
    status_select: ["Activated", "Deactivated"],
    editedIndex: -1,
    editorganization: {
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

      //   about_Organization: "",
    },
    dialog: false,
    dialogDiactivate: false,
    dialogActivate: false,
    dialogRegister: false,
    dialogRegister: false,
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDiactivate(val) {
      val || this.closeDeactivate();
    },
    dialogActivate(val) {
      val || this.closeActivate();
    },
    dialogRegister(val) {
      val || this.closeRegister();
    },
    dialogError(val) {
      val || this.closeError();
    },
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        try {
          this.search = value;
          const token = this.$store.state.token;
          if (value) {
            const org_Data = (await organizationService.show2(value, token))
              .data.message;
            if (!Array.isArray(org_Data) && org_Data._id) {
            } else if (!org_Data._id) {
              alert("employee not found");
            } else {
              this.organization = org_Data;

              //   for (let i in org_Data) {
              //     var each__Organization = {
              //       employee_Id: org_Data[i].employee_Id,
              //       first_Name: org_Data[i].name.first_Name,
              //       last_Name: org_Data[i].name.last_Name,
              //       grand_Father_Name: org_Data[i].name.grand_Father_Name,
              //       phone_Number: org_Data[i].phone_Number,
              //       email: org_Data[i].email,
              //       status: org_Data[i].status,
              //       _id: org_Data[i]._id,
              //     };
              //   }

              //   this.organization.push(each__Organization);
            }
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
  async mounted() {
    try {
      const token = this.$store.state.token;

      const org_Data = (await organizationService.displayAllEmployee(token))
        .data.message;
      console.log(org_Data);

      for (let i in org_Data) {
        var each__Organization = {
          employee_Id: org_Data[i].employee_Id,
          first_Name: org_Data[i].name.first_Name,
          last_Name: org_Data[i].name.last_Name,
          grand_Father_Name: org_Data[i].name.grand_Father_Name,
          phone_Number: org_Data[i].phone_Number,
          email: org_Data[i].email,
          status: org_Data[i].status,
          _id: org_Data[i]._id,
        };
        this.organization.push(each__Organization);
      }

      // console.log(this.organization[0].organization_Name);
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
      const branch = (await branchService.displayAllBranch(token)).data.message;
      console.log(branch);
      for (let i in branch) {
        console.log(branch[i].branch_Name);

        this.branchName.push(branch[i].branch_Name);
        console.log(branch[i].branch_Name);
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
    getColor(status) {
      console.log(status);
      if (status === "Activated") return "green";
      else if (status == "Deactivated") return "red";
    },
    editItem(item) {
      this.editedIndex = this.organization.indexOf(item);
      this.editorganization = Object.assign({}, item);
      this.dialog = true;
    },
    activateItem(item) {
      this.editedIndex = this.organization.indexOf(item);
      this.editorganization = Object.assign({}, item);
      this.dialogActivate = true;
    },
    deactivateItem(item) {
      this.editedIndex = this.organization.indexOf(item);
      this.editorganization = Object.assign({}, item);
      this.dialogDiactivate = true;
    },

    async activateConfirm() {
      const token = this.$store.state.token;

      await ea.activate_Credential(
        this.organization[this.editedIndex]._id,
        token
      );
      this.closeActivate();
      this.organization[this.editedIndex].status = "Activated";
    },
    async deactivateConfirm() {
      Object.assign(this.organization[this.editedIndex], this.editorganization);
      const token = this.$store.state.token;
      await ea.deactivate_Credential(
        this.organization[this.editedIndex]._id,
        token
      );
      this.organization[this.editedIndex], this.editorganization;
      this.closeDeactivate();
      this.organization[this.editedIndex].status = "Activated";
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editorganization = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDeactivate() {
      this.dialogDiactivate = false;
      this.$nextTick(() => {
        this.editorganization = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeActivate() {
      this.dialogActivate = false;
      this.$nextTick(() => {
        this.editorganization = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeRegister() {
      this.dialogRegister = false;
      this.$nextTick(() => {
        this.editorganization = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeError() {
      this.dialogError = false;
      this.$nextTick(() => {
        this.editorganization = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.organization[this.editedIndex],
          this.editorganization
        );

        const oi = this.organization[this.editedIndex]._id;
        const data = this.organization[this.editedIndex];
        const token = this.$store.state.token;
        await organizationService.update(data, oi, token);
      } else {
        console.log("register new employee");
        console.log(this.editorganization);
        // const token = this.$store.state.token;
        var form = document.getElementById("form");
        const fd = new FormData(form);
        fd.append("Employee_Profile", this.Employee[0]);
        const token = this.$store.state.token;
        // const credential = this.editorganization;
        this.resp = await organizationService.addEmployee(fd, token);
        if (this.resp.data.success == true) {
          this.organization.push(this.editorganization);
        }
      }
      this.close();
      if (this.resp.data.success == true) {
        this.response = this.resp.data.message;
        this.dialogRegister = true;
        setTimeout(() => {
          this.dialogRegister = false;
        }, 1500);
      } else if (this.resp.data.success == false) {
        this.errorresponse = this.resp.data.message;
        this.dialogError = true;
      }
    },

    //   getconv-divImageLink(image) {
    //     return "http://localhost:5000" + image;
    //   },
    //   edit(route) {
    //     this.$router.push(route);
    //   },
  },
  components: {
    sp,
  },
};
</script>
<style scoped>
/* .v-input {
  border-radius: 30px;
  margin: auto;
}
.v-card {
  background: #fff;
  white-space: normal;
  min-width: 280px;
  position: relative;
  justify-conv-div: space-between;
}
.v-card__actions {
  background-color: #34495e;
}
.v-card__text {
  line-height: 0.1;
  text-align: left;
}
.v-btn {
  color: #34495e;
} */
</style>
