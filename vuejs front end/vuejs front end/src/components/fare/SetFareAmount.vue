<template>
<v-app>
   <v-content>

   <h1> set fare</h1>



<form ref = "form"
       lazy-validation>
    <v-card elevation="0" class="ma-4">
    <v-card-title>
      </v-card-title>
      <v-card-text>
             <v-text-field
            label="fare id"
            v-model="fareInformation.fare_Id"
            outlined dense
          ></v-text-field>
             <v-text-field
            label="fare amount"
            v-model="fareInformation.fare_Amount"
            outlined dense
          ></v-text-field>
      </v-card-text>
      <v-card-actions>   <v-btn @click="set_Fare"> set fare</v-btn></v-card-actions>
    </v-card>
</form>

   </v-content>
</v-app>
</template>
<script>
import fs from './../../service/FareService'
export default {
   data: () => ({
fareInformation:{
     fare_Id:'',
     fare_Amount:'',
}
   }),
methods:{
   async set_Fare(){
          const token=this.$store.state.token

try{
         await fs.setFare(this.fareInformation,token)
         console.log(fareInformation)
}
catch(er)
{console.log(er)}
}
}
   
}
</script>
<style scoped>

</style>