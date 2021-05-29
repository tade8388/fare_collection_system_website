<template>
<div><v-btn  @click="signOut"></v-btn></div>
</template>
<script>
export default {
    signOut(){
          this.$store.dispatch("logout");
        // .then(()=>{
        //     this.router.push({name:'login'})
 
        // })
    }
}
</script>