<template>
  <div>
    <v-card min-height="100px" elevation="0" class="ma-4">
      <v-card-text class="mt-5"> Home/Add Costumer </v-card-text>
    </v-card>

    <form ref="form">
      <v-card elevation="0" class="ma-4">
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
                v-model="costumerInfo.name.first_Name"
              />
              <v-text-field
                label="middle Name"
                outlined
                dense="10"
                :rules="inputRules"
                v-model="costumerInfo.name.last_Name"
              />
              <v-text-field
                label="last Name"
                outlined
                flat="0"
                dense
                :rules="inputRules"
                v-model="costumerInfo.name.grand_Father_Name"
              />
              <v-text-field
                label="phone number"
                outlined
                dense
                :rules="inputRules"
                v-model="costumerInfo.phone_Number"
              />
              <v-text-field
                label="address"
                outlined
                dense
                v-model="costumerInfo.address"
              />
              <v-text-field
                label="costumer id"
                outlined
                dense
                :rules="inputRules"
                v-model="costumerInfo.customer_Id"
              />
            </v-flex>

            <v-flex xs12 sm12 md6 lg5 xl5>
              <v-text-field
                label="identification number"
                v-model="costumerInfo.identification_Number"
                outlined
                dense
              />
              <v-select
                v-model="costumerInfo.gender"
                :items="items"
                label="Gender"
                outlined
                dense
                append-icon="event"
              ></v-select>

              <v-text-field
                label="age"
                outlined
                dense
                :rules="inputRules"
                v-model="costumerInfo.age"
              />

              <!-- <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model= "date"
        label="Birthday date" 
        outlined dense
        prepend-icon="event"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model= "date"
      :max="new Date().toISOString().substr(0, 10)"
      min="1950-01-01"
      @change="save"
    ></v-date-picker>
  </v-menu>  -->

              <!-- <v-text-field
      v-model= "email"
      :rules="emailRules"
      label="E-mail"
        outlined dense
    /> -->
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>

      <div class="text-center">
        <v-btn color="primary" @click="add">Register</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>