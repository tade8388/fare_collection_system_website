<template>
  <div>
    <v-card elevation="0"> <sp /></v-card>
    <v-card>
      <v-toolbar flat color="blue-grey lighten-5">
        <v-toolbar-title> User transaction profile </v-toolbar-title>
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
          <div v-show="ct === 0">
            <v-card flat v-for="employee in emp" :key="employee.customer_Id">
              <h2>personal information</h2>
              <v-card-title>
                <v-avatar>
                  <img
                    class="img-responsive"
                    :src="getContentImageLink(employee.profile_Picture)"
                  /> </v-avatar
              ></v-card-title>
              <v-card-text
                >name
                {{ employee.name.first_Name }}
                {{ employee.name.last_Name }}
              </v-card-text>
              <v-card-text>customer :{{ employee.customer_Id }}</v-card-text>
              <v-card-text phone number>
                :{{ employee.phone_Number }}
              </v-card-text>
              <v-card-actions>
                <v-btn @click="activate" class="grey--text"> Activate </v-btn>
                <v-btn @click="deactivate" class="grey--text">
                  Deactivate
                </v-btn>
                <v-btn
                  class="grey--text"
                  elevation="0"
                  @click="
                    edit({
                      name: 'editCostumer',
                      params: {
                        cname: employee.name.first_Name,
                      },
                    })
                  "
                >
                  edite
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div v-show="ct === 1">
            <v-card
              flat
              v-for="walet in walet_Information"
              :key="walet.username"
            >
              <v-card-text><h2>wallet information</h2></v-card-text>
              <v-card-text> username:{{ walet.username }} </v-card-text>
              <v-card-text>
                customer type:{{ walet.customer_type }}
              </v-card-text>
              <v-card-text> balance:{{ walet.balance }} </v-card-text>
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
  </div>
</template>
<script>
import sp from "./../../SearchPanel";
import CostumerService from "./../../service/CostumerService";
import walet from "./../../service/WaletService";
// import Customer_Action from "./../../service/CustomerAction";
import { text } from "body-parser";
export default {
  data: () => ({
    emp: null,
    search: "",
    tab: null,
    walet_Information: null,
    objectId_wallet: "",
    transaction_Amount: "",
    objectId_customer: "",
    normal_transaction: "",
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

  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        try {
          this.search = value;
          const token = this.$store.state.token;
          const fetchedData = (
            await CostumerService.displayCostumer(value, token)
          ).data.message;
          if (!Array.isArray(fetchedData) && fetchedData._id && value) {
            this.emp = [fetchedData];
            const object_Id__of_Customer = fetchedData._id;
            this.objectId_customer = object_Id__of_Customer;
            const walet_Information = (
              await walet.displayWalet(object_Id__of_Customer, token)
            ).data.message;

            this.objectId_wallet = walet_Information._id;

            this.walet_Information = [walet_Information];

            // const ticket_Information = (
            //   await CostumerService.display_ticket_Information(
            //     object_Id__of_Customer,
            //     token
            //   )
            // ).data.message;
            // console.log("ticket_Information");
            // console.log(ticket_Information);
            // console.log("ticket_Information");

            const walet_transaction = (
              await walet.display_Walet_Transaction(
                object_Id__of_Customer,
                token
              )
            ).data.message;

            for (let i in walet_transaction) {
              var each__walet_Transaction = {
                transaction_Id: walet_transaction[i].transaction_Id,
                reason: walet_transaction[i].reason,
                transaction_Type: walet_transaction[i].transaction_Type,
                transaction_Amount: walet_transaction[i].transaction_Amount,
                transaction_Made_By: walet_transaction[i].transaction_Made_By,
              };
              this.walet_Total_Transaction.push(each__walet_Transaction);
            }
            const transaction = (
              await walet.display_Normal_Transaction(
                object_Id__of_Customer,
                token
              )
            ).data.message;
            for (let i in transaction) {
              var each_Transaction = {
                transaction_Id: transaction[i].transaction_Id,
                route: transaction[i].route.route_Name,
                exit_Station: transaction[i].exit_Station.station_Name,
                transaction_Amount: transaction[i].transaction_Amount,
              };
              this.total_Transaction.push(each_Transaction);
            }
          } else if (!Array.isArray(fetchedData) && !fetchedData._id) {
            console.log("search not found");
          } else {
            this.org = null;
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
  methods: {
    getContentImageLink(image) {
      return "http://localhost:5000" + image;
    },
    edit(route) {
      console.log(route);
      this.$router.push(route);
    },
    async refill() {
      try {
        const token = this.$store.state.token;
        await CostumerService.refill(
          this.transaction_Amount,
          this.objectId_wallet,
          token
        );
        console.log(this.objectId_wallet);
      } catch (err) {
        console.log(err);
      }
    },
    async reset() {
      try {
        const token = this.$store.state.token;
        await CostumerService.resetAccount(this.objectId_customer, token);
        console.log(this.objectId_customer);
      } catch (err) {
        console.log(err);
      }
    },
    async activate() {
      try {
        const token = this.$store.state.token;
        await CostumerService.activate_Credential(
          this.objectId_customer,
          token
        );
        console.log(this.objectId_customer);
      } catch (err) {
        console.log(err);
      }
    },
    async deactivate() {
      try {
        const token = this.$store.state.token;
        await CostumerService.deactivate_Credential(
          this.objectId_customer,
          token
        );
        console.log(this.objectId_customer);
      } catch (err) {
        console.log(err);
      }
    },
  },
  components: {
    sp,
  },
};
</script>
<style scoped>
.v-content {
  margin: 20px;
}
</style>
