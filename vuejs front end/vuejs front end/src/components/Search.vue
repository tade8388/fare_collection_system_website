<template>

    <div class= "Search">
            <div class="search-select-input">
                <span>  {{value }}</span>
            </div>
           <v-text-field placeholder="Search" outlined v-model = "query" 
          />
        <div  class = "options"> 
         <ul>
            <li v-for="(getmatch, index) in matchs"
                          :key= "getmatch[filterby]"
                        
                           @click = "itemClicked(index)"
                           v-text= "getmatch[filterby]"></li>
            </ul>
    </div>
 </div> 
    
  <!-- :class="{'selected': (selected==index)}" -->
</template>
<script>
export default {
    props: ['items', 'filterby'],
    data() {
     return{
         value:"item not selected",
        selected: 0,
 selectedItem: null,
        query: '',
     };
},
methods:
 { 
itemClicked(index){
   
   this.value = this.matchs[index];
//this.selectedItem();
    console.log(this.matchs[index]);
     console.log(index);
    
},
// selectedItem(){
//     this.selectedItem = this.matchs[this.selected];
// }
},
computed: {
    matchs() {
        if(this.query == ''){
            return[];
        }
        return this.items.filter((item) => item[this.filterby].toLowerCase().includes(this.query.toLowerCase()));
    }
    }   
}
</script>
<style scoped>
.Search{
  margin: auto;
    margin-right: auto;
 
  width:200px;

}
.Searched{
    width: 200;
    position: relative;
    margin-top:80px;
    border: 2px solid;
    }
.options{
    max-height: 120px;
    overflow-y: auto;
    width: 200px;
    margin-top:0px;
}
.options ul {
    list-style-type: none;
    text-align: left;
    padding-left: 0;
}
.options ul li {
 border-bottom: 1px solid lightgray;
 padding: 10px;
 cursor: pointer;
 background: #f1f1f1;
}
</style>