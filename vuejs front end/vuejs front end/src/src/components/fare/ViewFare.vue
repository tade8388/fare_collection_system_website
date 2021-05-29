<template>
  <div>
    <sp />
    <!-- <v-card elevation="0">
      <v-card-text>
        <v-data-table
          :headers="fare_header"
          :items="fares"
          :items-per-page="5"
          class="elevation-0"
        >
        </v-data-table>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card> -->
    <v-data-table
      :headers="organization_header"
      :items="organization"
      :items-per-page="10"
      class="elevation-0"
      fixed-header
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>route information manegment </v-toolbar-title>
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
                        v-model="editorganization.fare_Id"
                        label="fare id"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editorganization.fare_Amount"
                        label="fare amount"
                      ></v-text-field>
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
          <!--  <v-dialog v-model="dialogActivate" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want update fare?</v-card-title
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
          </v-dialog> -->
        </v-toolbar>
      </template>
      <template v-slot:item.edit="{ item }">
        <v-icon outlined class="mr-2" @click="editItem(item)"> edit </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import sp from "./../../SearchPanel";
import fs from "./../../service/FareService";

export default {
  data: () => ({
    org: null,
    editorganization: {
      fare_Id: "",
      fare_Amount: "",
    },
    dialog: false,
    dialogDiactivate: false,
    dialogActivate: false,
    dialogRegister: false,
    dialogRegister: false,
    search: "",
    organization_header: [
      { text: "fare Id", value: "fare_Id", align: "start" },
      { text: "fare  amount", value: "fare_Amount" },
      { text: "issued by", value: "issued_By" },
      { text: "created at", value: "createdAt" },
      { text: "edit", value: "edit", sortable: false },
    ],
    organization: [],
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
            const fetchedData = (await fs.display_Fare(value, token)).data
              .message;
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
  methods: {
    // edit(route) {
    //   this.$router.push(route);
    // },
    editItem(item) {
      this.editedIndex = this.organization.indexOf(item);
      this.editorganization = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
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
        console.log("''''''''''''''''''''''thi._id''''''''''''''''''''''");
        console.log(this.organization[this.editedIndex]._id);
        const data = this.organization[this.editedIndex];
        const token = this.$store.state.token;
        this.resp = await fs.update(data, oi, token);
      } else {
        console.log("register new employee");
        const token = this.$store.state.token;
        const credential = this.editorganization;
        this.resp = await fs.setFare(credential, token);
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
  },

  async mounted() {
    const token = this.$store.state.token;
    const fare = (await fs.display_All_Fare(token)).data.message;
    console.log("fare");
    console.log(fare);

    for (let i in fare) {
      var each__Fare = {
        fare_Id: fare[i].fare_Id,
        fare_Amount: fare[i].fare_Amount,
        issued_By: fare[i].issued_By.employee_Id,
        createdAt: fare[i].createdAt,
        // organization: fare[i].issued_By.organization,
      };
      this.organization.push(each__Fare);
    }
    console.log("ffffffffffffffff");
    console.log(this.organization);
  },
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
