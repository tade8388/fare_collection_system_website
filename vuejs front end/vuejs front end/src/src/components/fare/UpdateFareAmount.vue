<template>
<v-app>
   <v-content class="grey lighten-3 ml-4 mr-4">
<sp/>

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
      <v-card-actions>   
         <v-btn 
         @click="update_Fare"> update fare
         </v-btn>
         </v-card-actions>
    </v-card>
</form>

   </v-content>
</v-app>
</template>
<script>
import fs from './../../service/FareService'
import sp from './../../SearchPanel'
export default {
   data: () => ({
fareInformation:{
     fare_Id:'',
     fare_Amount:'',
},
object_Id_Of_Fare:'',
   }),
   watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        try {
          this.search = value;
          const token = this.$store.state.token;
          const fetchedData = (
            await fs.show2(value, token)
          ).data.message;
          this.object_Id_Of_Fare=fetchedData._id
          this.fareInformation=fetchedData
          console.log("ddddddddddd")
          console.log(this.fareInformation)
        }
        catch (err) {
          console.log(err);
        }
    }
    },
   },

methods:{
   async update_Fare(){
          const token=this.$store.state.token

try{
         await fs.update(this.fareInformation,this.object_Id_Of_Fare,token)
         console.log(this.fareInformation)
}
catch(er)
{console.log(er)}
}
},
components:{
   sp
},
   
}
</script>
<style scoped>

</style>