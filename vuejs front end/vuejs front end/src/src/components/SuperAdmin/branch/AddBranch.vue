<template>
<div>
 
<v-app>

    <v-content class= "grey lighten-3">


<form ref = "form"
       lazy-validation>
    <v-card elevation="0" class="ma-4">
    <v-card-title>
      </v-card-title>
      <v-card-text>
          <v-text-field label="Branch id"   outlined dense  :rules = "inputRules" v-model = "branch_Id"></v-text-field>
          <v-text-field label="Branch  name"  outlined dense :rules= "inputRules" v-model = "branch_Name" ></v-text-field>
          <v-text-field label="Address"  outlined dense :rules = "inputRules" v-model = "address"></v-text-field>
          <v-text-field label="phone number" outlined  dense :rules = "inputRules" v-model = "phone_Number"></v-text-field>
                <v-select    
      v-model= "status"
      :items="branchs"
      label="status"
      outlined dense
       
    ></v-select>
     </v-card-text>
  </v-card>
<div >
    <v-btn  color="primary" @click= "submit_data">register</v-btn>
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
import branchService from './../../../service/BranchService'
export default {
   data: () => ({
     branch_Id:'',
     branch_Name:'',
     address:'',
     phone_Number:'',
           status: '',
      branchs: [
        'Activated',
        'Deactivated',
        
      ],
   
        //      inputRules: [
        // v => !!v || 'required field' 
        // ],
       }),
     methods:{
      async submit_data(){
      const branch={   
    branch_Id: this.branch_Id,
    branch_Name: this.branch_Name,
    address: this.address,
    phone_Number:this.phone_Number,
    status:this.status
       }  
       try{
        await branchService.addBranch(branch)
        console.log(branch)
       }
       catch(err){
         console.log(err)
       }
        },
    },
}
</script>