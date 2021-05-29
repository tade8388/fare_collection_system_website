<template>
  <div>
    <v-data-table
      :headers="organization_header"
      :items="organization"
      :items-per-page="10"
      class="elevation-0"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>station information manegment </v-toolbar-title>

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
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editorganization.station_Id"
                        label="station id"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editorganization.station_Name"
                        label=" station  name"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editorganization.station_Type"
                        :items="stationType"
                        label="Station Type"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editorganization.status"
                        :items="status_select"
                        label="status"
                      ></v-select>
                    </v-col>
                  </v-row>
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
        <v-btn outlined rounded color="red" small @click="deactivateItem(item)">
          <v-icon>close</v-icon>
        </v-btn>
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
    <Map />
  </div>
</template>
<script>
import sp from "./../../SearchPanel";

import organizationService from "./../../service/StationService";
import Map from "../map/showLocation";
export default {
  data: () => ({
    // components: {
    //   Map,
    // },
    org: null,
    search: "",
    response: null,
    errorresponse: null,
    stationType: ["main", "sub"],
    organization_header: [
      { text: "station id", value: "station_Id" },
      { text: "station name", value: "station_Name", align: "start" },
      { text: "station type", value: "station_Type" },
      { text: "main office", value: "main_Office" },
      // { text: "phone Number", value: "phone_Number" },
      { text: "status", value: "status", sortable: false },
      { text: "Activate", value: "activate", sortable: false },
      { text: "deactivate", value: "deactivate", sortable: false },
      { text: "edit", value: "edit", sortable: false },
    ],
    organization: [],
    // organizationType: ["Platform_Provider", "Service_Provider", "Government"],
    status_select: ["Activated", "Deactivated"],
    editedIndex: -1,
    editorganization: {
      station_Name: "",
      station_Id: "",
      station_Type: "",
      // phone_Number: "",
      status: "",
      // about_Organization: "",
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
            const fetchedData = (
              await organizationService.displayStation(value, token)
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

      const org_Data = (await organizationService.displayAllStation(token)).data
        .message;
      console.log(org_Data);

      for (let i in org_Data) {
        var each__Organization = {
          station_Name: org_Data[i].station_Name,
          station_Id: org_Data[i].station_Id,
          station_Type: org_Data[i].station_Type,
          // main_Office: org_Data[i].main_Office,
          // phone_Number: org_Data[i].phone_Number,
          status: org_Data[i].status,
          _id: org_Data[i]._id,
        };
        this.organization.push(each__Organization);
      }
      // console.log(this.organization[0].organization_Name);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
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

      await organizationService.activate_Credential(
        this.organization[this.editedIndex]._id,
        token
      );
      this.closeActivate();
      this.organization[this.editedIndex].status = "Activated";
    },
    async deactivateConfirm() {
      Object.assign(this.organization[this.editedIndex], this.editorganization);
      const token = this.$store.state.token;
      await organizationService.deactivate_Credential(
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
        const token = this.$store.state.token;
        const credential = this.editorganization;
        this.resp = await organizationService.addStation(credential, token);
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
    Map,
  },
};
</script>
<style scoped>
</style>
