<template>
  <v-app>
    <Header v-if="isHome"/>
    <v-main>
        <router-view></router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'

export default {
  name: 'App',

  components: {
    Header,
    Footer
  },

  computed: {
    isHome() {      
      return this.$route.name === 'buildings'
    }
  },

  data: () => ({
  }),
};
</script>
