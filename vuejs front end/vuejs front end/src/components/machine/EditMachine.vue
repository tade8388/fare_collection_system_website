<template>

<v-app>
    <v-content class="grey lighten-3">


<!-- <v-container class="ma-1"> -->
  
<form ref = "form"
       lazy-validation>

    <v-card class = " ma-4" elevation="0">
    <v-card-title>   
       <!-- <div class= "Search" v-text= "selecteditem ? selecteditem[filterby] : ''"> -->
           

      </v-card-title>
      <v-card-text>
  <v-text-field label="machine id"  
           :rules = "inputRules"
            v-model = "mi.machine_Id"
                outlined dense></v-text-field> 
          <v-text-field label="ip address"  
          :rules = "inputRules" 
          v-model = "mi.ip_Address"
              outlined dense >
          </v-text-field>
                       <v-select    
      v-model= "mi.status"
      :items="items"
      label="status"
      outlined dense
       
    ></v-select>
            <v-select    
      v-model= "mi.machine_Type"
      :items="type"
      label="machine type"
      outlined dense
       
    ></v-select>
      </v-card-text>
          </v-card>
<div class="text-center">
    <v-btn  color="primary" @click= "update">submit</v-btn>
  </div>
</form>
</v-content>
<div class= "text-center">
<v-footer>
    <v-card  color="blue accent-2 " class="white--text text-center" > copyright &copy; Allright reserved2020 </v-card>
    </v-footer>
</div>
</v-app>
</template>
<script>
import ms from './../../service/MachineService'
export default {
  props: ['items', 'filterby'],
   data: () => ({
     mi:{
       machine_Id:'',
     machine_Type:'',
     ip_Address:'',
     status:'',
     },
      items: [
        'Activated',
        'Deactivated',
        
      ],
   
             inputRules: [
        v => !!v || 'required field' 
        ],
       }),
       
                 async mounted () {
                 try
                 {
                   const machine_Id=this.$store.state.route.params.machine_Id 
                      console.log("above")
                     console.log(machine_Id)
                 console.log("lower")
               const fatchedData  =(await ms.show2(machine_Id)).data.message
                console.log(fatchedData)
                console.log("feched data")
               this.mi=fatchedData
                                console.log("informationdata")
               console.log(this.mi)
                    
                 }
                 catch(err){
                   console.log(err)
                 }
                },
                    
    methods:{
                async update(){          
           console.log("yyyyyyyyyyyyyyyyyyyyyyy"+this.mi._id)
                   await EmployeeService.update(this.mi,this.mi._id)
                 
                    console.log("xxxxxxxxxxxxxxxxx"+this.mi.name)
                                        console.log(_id)

                 }
 
   
    },

  
}
</script>
<style scoped>


</style>