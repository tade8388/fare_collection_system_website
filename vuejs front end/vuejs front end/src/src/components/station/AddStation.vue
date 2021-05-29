<template>
<div>
 
<v-app>
    <v-content class= "grey lighten-3">
        <v-card elevation="0" class="ml-4 pt-2 mb-4"> <sp/></v-card> 

<form ref = "form"
       lazy-validation>
    <v-card elevation="0" class="ma-4">
    <v-card-title>
      </v-card-title>
      <v-card-text>

          <v-text-field label="station  id"   :rules = "inputRules" v-model = "si.station_Id"></v-text-field>
          <v-text-field label="station name"  :rules= "inputRules" v-model = "si.station_Name" ></v-text-field>
          <v-text-field label="latitude" dense :rules = "inputRules" v-model = "si.location.latitude"></v-text-field>
         <v-text-field label="longtitude"  :rules= "inputRules" v-model = "si.location.longitude" ></v-text-field>
         

            <v-select    
      v-model= "si.status"
      :items="statuses"
      label="status"
      outlined dense
       
    ></v-select>
            <v-select    
      v-model= "si.station_Type"
      :items="stationType"
      label="Station Type"
      outlined dense
       
    ></v-select>
     </v-card-text>
          </v-card>
 
<div >
    <v-btn  color="primary" @click= "submit">submit</v-btn>
  </div>
</form>
 <!-- </v-container> -->

</v-content>
<div class= "text-center">
<v-footer>
    <v-card  color="blue accent-2 " class="white--text text-center" > copyright &copy; Allright reserved2020 </v-card>
    </v-footer>
</div>
</v-app>
</div>
</template>
<script>
import sp from './../../SearchPanel'
import StationService from './../../service/StationService'
export default {
   data: () => ({
      // props:['search'],
       search:'',
       si:{
           station_Id:'',
           station_Name:'',
           location:{
               latitude:'',
               longitude:'',
           },
               status:'',
               station_Type:'',
       },
               stationType:[
    'main',
    'sub',
],
statuses:[
    'Activated',
    'Deactivated',
],

           
             inputRules: [
        v => !!v || 'required field' 
        ],
       }),
             components: {
      sp
    },
  //       watch: {
  //    '$route.query.search':{    
  // immediate:true,
  // async handler(value) {
  //   this.search=value
  //     const token =this.$store.state.token
  //       this.emp=(await StationService.displayStation(value)).data.message
  //         console.log(this.search)
  //       console.log("value")
  //        console.log(value)
  //    }
  //    }
  //   },
    methods:{
        async submit() {
                   const token =this.$store.state.token
                     try{
         await StationService.addStation(this.si,token)
         }catch(err){
        console.log(err+"errrrrrrrrrrrr")
            }
 
            }
            
        },
    
}
</script>