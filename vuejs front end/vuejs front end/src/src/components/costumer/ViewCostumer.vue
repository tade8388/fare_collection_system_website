<template>
  <v-content class="grey lighten-3 ml-4 mr-4">
    <v-card elevation="0"> <sp /></v-card>
    <v-card>
      <v-toolbar flat color="blue-grey lighten-5">
        <v-toolbar-title> User Profile </v-toolbar-title>
      </v-toolbar>
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
        <v-tabs-items v-model="tab">
          <div v-if="ct === 0">
            <h2>personal information</h2>
            <!-- <v-card-title>
                <v-avatar>
                  <img
                    class="img-responsive"
                    :src="getContentImageLink(employee.profile_Picture)"
                  /> </v-avatar></v-card-title> -->

            <v-data-table
              :headers="organization_header"
              :items="organization"
              :items-per-page="5"
              class="elevation-0"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title
                    >customer information manegment
                  </v-toolbar-title>

                  <!-- <v-divider class="" inset vertical></v-divider> -->

                  <v-spacer></v-spacer>
                  <div class="pr-3"><sp /></div>
                  <v-dialog v-model="dialog" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
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
                                  v-model="editorganization.customer_Id"
                                  name="customer_Id"
                                  label="customer id"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editorganization.first_Name"
                                  name="first_Name"
                                  label=" first name"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editorganization.last_Name"
                                  name="last_Name"
                                  label="last Name"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editorganization.grand_Father_Name"
                                  name="grand_Father_Name"
                                  label="grand father  Name"
                                ></v-text-field>
                              </v-col>
                              <!-- <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editorganization.phone_Number"
                          label="phone number"
                        ></v-text-field>
                      </v-col> -->
                              <!-- <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Email"
                          name="email"
                          v-model="editorganization.email"
                        >
                        </v-text-field>
                      </v-col> -->
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  name="phone_Number"
                                  label="phone number"
                                  v-model="editorganization.phone_Number"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  name="address"
                                  label="Address"
                                  v-model="editorganization.address"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  name="username"
                                  label=" username"
                                  :rules="inputRules"
                                  v-model="editorganization.username"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-select
                                  v-model="editorganization.gender"
                                  :items="genderr"
                                  name="gender"
                                  label="gender"
                                  required
                                ></v-select>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-select
                                  v-model="editorganization.status"
                                  :items="statuss"
                                  label="status"
                                  ata-vv-name="select"
                                  required
                                  name="status"
                                ></v-select>
                              </v-col>
                              <!-- <v-col cols="12" sm="6" md="4"> -->
                              <!-- <v-select
                        v-model="EmployeeInformation.user_acces_type"
                        :items="access"
                        :error-messages="errors"
                        label="User Acces Type"
                        data-vv-name="select"
                        required
                        outlined
                        dense
                        name="user_access_type"
                      ></v-select>
                      </v-col> -->
                              <v-col cols="12" sm="6" md="4">
                                <v-select
                                  v-model="editorganization.user_acces_type"
                                  :items="access"
                                  label="User Acces Type"
                                  data-vv-name="select"
                                  required
                                  name="user_access_type"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <input
                                  type="file"
                                  ref="Employee"
                                  @change="onselect"
                                />
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
                        <v-btn color="blue darken-1" text @click="save">
                          Save
                        </v-btn>
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
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="activateConfirm"
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
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="closeDeactivate"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deactivateConfirm"
                          >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.status="{ item }">
                <div>
                  <v-chip outlined :color="getColor(item.status)">
                    {{ item.status }}
                  </v-chip>
                </div>
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
                <v-btn
                  outlined
                  rounded
                  color="red"
                  small
                  @click="deactivateItem(item)"
                >
                  <v-icon>close</v-icon>
                </v-btn>
              </template>
              <template v-slot:item.edit="{ item }">
                <v-icon outlined class="mr-2" @click="editItem(item)">
                  edit
                </v-icon>
              </template>
              <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template> -->
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
          <div v-show="ct === 1">
            <v-card
              flat
              v-for="walet in walet_Information"
              :key="walet.username"
            >
              <v-card-text><h2>wallet information</h2></v-card-text>
              <v-card-text
                ><v-icon>phone</v-icon> username:{{ walet.username }}
              </v-card-text>
              <v-card-text>
                <v-icon>phone</v-icon>
                customer type:{{ walet.customer_type }}
              </v-card-text>
              <v-card-text>
                <v-icon>phone</v-icon>
                balance:{{ walet.balance }}
              </v-card-text>
              <v-card-actions>
                <v-btn @click="reset">reset acount </v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div v-show="ct === 2">
            <v-card flat>
              <v-card-text>
                <h2>walet transaction info</h2>
              </v-card-text>
              <v-data-table
                :headers="walet_header"
                :items="walet_Total_Transaction"
                :items-per-page="5"
                class="elevation-0"
              >
              </v-data-table>
            </v-card>
          </div>
          <div v-show="ct === 3">
            <v-card flat>
              <v-card-text> <h2>normal transaction</h2></v-card-text>
              <v-data-table
                :headers="headers"
                :items="total_Transaction"
                :items-per-page="5"
                class="elevation-0"
              >
              </v-data-table>
            </v-card>
          </div>
          <div v-show="ct === 4">
            <v-card
              flat
              v-for="walet in walet_Information"
              :key="walet.username"
            >
              <h2>please Enter Amount to refill</h2>
              <v-card-text>
                <h2>username: {{ walet.username }}</h2>
              </v-card-text>
              <v-card-text>
                <h2>current balance :{{ walet.balance }}</h2>
              </v-card-text>

              <v-card-text>
                <v-text-field
                  label="Amount"
                  outlined
                  dense
                  v-model="transaction_Amount"
                />
              </v-card-text>
              <v-card-actions>
                <v-btn @click="refill"> refill </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-content>
</template>
<script>
import sp from "./../../SearchPanel";
import organizationService from "./../../service/CostumerService";
import ea from "./../../service/CustomerAction";
import walet from "./../../service/WaletService";
// import Customer_Action from "./../../service/CustomerAction";
import { text } from "body-parser";
export default {
  data: () => ({
    emp: null,
    search: "",
    tab: null,
    response: null,
    errorresponse: null,
    editorganization: {
      first_Name: "",
      last_Name: "",
      grand_Father_Name: "",

      phone_Number: "",
      address: "",
      customer_Id: "",
      age: "",
      balance: "",
      identification_Number: "",
      username: "",
      gender: "",
      user_acces_type: "",
      status: "",
    },
    Employee: "",
    dialog: false,
    dialogDiactivate: false,
    dialogActivate: false,
    dialogRegister: false,
    dialogRegister: false,
    organization: [],
    walet_Information: null,
    objectId_wallet: "",
    transaction_Amount: "",
    objectId_customer: "",
    normal_transaction: "",
    statuss: ["Activated", "Deactivated"],
    genderr: ["Male", "Female"],
    access: ["Mobile", "Card", "Both"],
    headers: [
      { text: "transaction Id", value: "transaction_Id", align: "start" },
      { text: "entry station", value: "entry_Station" },
      { text: "exit station", value: "exit_Station" },
      { text: "route", value: "route" },
      { text: "transaction amount", value: "transaction_Amount" },
    ],
    walet_header: [
      { text: "transaction Id", value: "transaction_Id", align: "start" },
      { text: "transaction type", value: "transaction_Type" },
      { text: "transaction amount", value: "transaction_Amount" },
      { text: "reason", value: "reason" },
      { text: "transaction made by", value: "transaction_Made_By" },
    ],
    organization_header: [
      { text: "first name ", value: "first_Name" },
      { text: "last name", value: "last_Name", align: "start" },
      { text: "grand father name ", value: "grand_Father_Name" },
      { text: "customer id", value: "customer_Id" },
      { text: "phone Number", value: "phone_Number" },
      { text: "user access type ", value: "user_access_type" },
      { text: "status", value: "status", sortable: false },
      { text: "Activate", value: "activate", sortable: false },
      { text: "deactivate", value: "deactivate", sortable: false },
      { text: "edit", value: "edit", sortable: false },
    ],
    total_Transaction: [],
    walet_Total_Transaction: [],
    itemese: [
      "personal information",
      "walet information",
      "walet transaction",
      "normal transaction",
      "refil account",
      ,
    ],
    ct: 0,
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
            const fetchedData = (
              await organizationService.displayCostumer(value, token)
            ).data.message;
            if (!Array.isArray(fetchedData) && fetchedData._id) {
              this.organization = [fetchedData];
              console.log("111111111111111");
            } else if (!Array.isArray(fetchedData) && !fetchedData._id) {
              console.log("search not found");
            } else {
              this.organization = fetchedData;
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

      const org_Data = (await organizationService.displayAllCostumer(token))
        .data.message;
      console.log(org_Data);

      for (let i in org_Data) {
        var each__Organization = {
          customer_Id: org_Data[i].customer_Id,
          first_Name: org_Data[i].name.first_Name,
          last_Name: org_Data[i].name.last_Name,
          grand_Father_Name: org_Data[i].name.grand_Father_Name,
          phone_Number: org_Data[i].phone_Number,
          user_access_type: org_Data[i].user_Acces_Type,
          status: org_Data[i].status,
          _id: org_Data[i]._id,
        };
        this.organization.push(each__Organization);
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
      this.organization[this.editedIndex].status = "Deactivated";
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
        fd.append("Customer_Profile", this.Employee[0]);
        const token = this.$store.state.token;
        // const credential = this.editorganization;
        this.resp = await organizationService.addCostumer(fd, token);
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
//   watch: {
//     "$route.query.search": {
//       immediate: true,
//       async handler(value) {
//         try {
//           this.search = value;
//           const token = this.$store.state.token;
//           const fetchedData = (
//             await CostumerService.displayCostumer(value, token)
//           ).data.message;
//           if (!Array.isArray(fetchedData) && fetchedData._id && value) {
//             this.emp = [fetchedData];
//             const object_Id__of_Customer = fetchedData._id;
//             this.objectId_customer = object_Id__of_Customer;
//             const walet_Information = (
//               await walet.displayWalet(object_Id__of_Customer, token)
//             ).data.message;

//             this.objectId_wallet = walet_Information._id;

//             this.walet_Information = [walet_Information];

//             const walet_transaction = (
//               await walet.display_Walet_Transaction(
//                 object_Id__of_Customer,
//                 token
//               )
//             ).data.message;

//             for (let i in walet_transaction) {
//               var each__walet_Transaction = {
//                 transaction_Id: walet_transaction[i].transaction_Id,
//                 reason: walet_transaction[i].reason,
//                 transaction_Type: walet_transaction[i].transaction_Type,
//                 transaction_Amount: walet_transaction[i].transaction_Amount,
//                 transaction_Made_By: walet_transaction[i].transaction_Made_By,
//               };
//               this.walet_Total_Transaction.push(each__walet_Transaction);
//             }
//             const transaction = (
//               await walet.display_Normal_Transaction(
//                 object_Id__of_Customer,
//                 token
//               )
//             ).data.message;
//             for (let i in transaction) {
//               var each_Transaction = {
//                 transaction_Id: transaction[i].transaction_Id,
//                 route: transaction[i].route.route_Name,
//                 exit_Station: transaction[i].exit_Station.station_Name,
//                 transaction_Amount: transaction[i].transaction_Amount,
//               };
//               this.total_Transaction.push(each_Transaction);
//             }
//           } else if (!Array.isArray(fetchedData) && !fetchedData._id) {
//             console.log("search not found");
//           } else {
//             this.org = null;
//           }
//         } catch (err) {
//           console.log(err);
//         }
//       },
//     },
//   },
//   methods: {
//     getContentImageLink(image) {
//       return "http://localhost:5000" + image;
//     },
//     edit(route) {
//       console.log(route);
//       this.$router.push(route);
//     },
//     async refill() {
//       try {
//         const token = this.$store.state.token;
//         await CostumerService.refill(
//           this.transaction_Amount,
//           this.objectId_wallet,
//           token
//         );
//         console.log(this.objectId_wallet);
//       } catch (err) {
//         console.log(err);
//       }
//     },
//     async reset() {
//       try {
//         const token = this.$store.state.token;
//         await CostumerService.resetAccount(this.objectId_customer, token);
//         console.log(this.objectId_customer);
//       } catch (err) {
//         console.log(err);
//       }
//     },
//     async activate() {
//       try {
//         const token = this.$store.state.token;
//         await CostumerService.activate_Credential(
//           this.objectId_customer,
//           token
//         );
//         console.log(this.objectId_customer);
//       } catch (err) {
//         console.log(err);
//       }
//     },
//     async deactivate() {
//       try {
//         const token = this.$store.state.token;
//         await CostumerService.deactivate_Credential(
//           this.objectId_customer,
//           token
//         );
//         console.log(this.objectId_customer);
//       } catch (err) {
//         console.log(err);
//       }
//     },
//   },
//   components: {
//     sp,
//   },
// };
</script>
<style scoped>
.v-content {
  margin: 20px;
}
</style>
