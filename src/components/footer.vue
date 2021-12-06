<template>
  <v-container fluid class="py-0 px-0">
  <v-footer padless >
    <v-row justify="center" no-gutters>

      <v-col
        class="red  lighten-2 py-7 text-center white--text"
        cols="6"
      >
      <v-btn to="/"  class="mx-4 white--text" elevation="2" x-large rounded color="grey darken-3">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
       </v-btn>

       <v-btn  to="/buildings" class="mx-4 white--text" elevation="2" x-large rounded color="grey darken-3" >
        <span>Favorites</span>
        <v-icon>mdi-office-building-outline</v-icon>
       </v-btn>

      </v-col>
       <v-col
        class="red lighten-2 py-7 text-center white--text "
        cols="6"
      >
      <h2>Next-IT Real-Estate</h2>
      
      </v-col>

       
    </v-row>

  </v-footer>
  </v-container>

</template>

<script>
  export default {
    data: () => ({ value: 'recent' }),
  }
</script>
