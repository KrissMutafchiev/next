<template>
  <v-container class="">
    <v-row>
      <v-col>
        <div class="container-box">
        <TopographyCustom title="Buildings" />
        </div>      
      </v-col>
     </v-row>
  </v-container>
</template>

<script>
import TopographyCustom from '../components/topography.custom.vue'

  export default {
    name: 'Home',
    components: {TopographyCustom},
    data: () => ({
        
    }),
  }
</script>
<style scoped>
    .container-box {
       position: relative;
       top: 45%;
       margin: auto;
       width: 50%;
       height: 500px;
       padding: 10px;
    }
</style>