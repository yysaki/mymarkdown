<template>
  <Layout>
    <div id="top">
      <div v-if="!hasSetCredential">
        <v-container class="loading-container" fuild fill-height>
          <v-layout align-center justify-center>
            <v-flex xs1>
              <v-progress-circular
                indeterminate
                color="indigo"
              /></v-progress-circular>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
      <div v-else>
        <Home v-if="!isLogin"></Home>
        <Editor v-if="isLogin" :user="user"></Editor>
      </div>
    </div>
  </Layout>
</template>
<script>
import Layout from "./Layout.vue";
import Home from "../components/Home.vue";
import Editor from "../components/Editor.vue";
import { mapState } from "vuex";
export default {
  name: "top",
  computed: mapState([
    'isLogin',
    'hasSetCredential',
    'user'
  ]),
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch('setCredential', user);
    });
  },
  components: {
    Layout: Layout,
    Home: Home,
    Editor: Editor
  }
 };
</script>
<style lang="scss">
.loading-container {
  height: 100vh;
}

#top {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>

