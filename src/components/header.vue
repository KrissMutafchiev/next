<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col class="red  lighten-2 py-7 text-center white--text " cols="6">
         <h1>Welcome</h1>
      </v-col> 
      <v-col
        class="red avatar-box lighten-2 py-7 text-center white--text "
        cols="6"
      >
      <v-avatar size="62">
      <img
        src="https://banner2.cleanpng.com/20180128/yvw/kisspng-ninja-ico-icon-black-ninja-5a6dee087cdc18.5588411915171538005114.jpg"
        alt="avatar"
      >
      </v-avatar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Header',
    data: () => ({
    }),
  }
</script>
<style scoped>

  h1{
    color:white;
  }
</style>