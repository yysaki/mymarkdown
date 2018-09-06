<template>
  <Layout>
    <div id="top">
      <Home v-if="!isLogin"></Home>
      <Editor v-if="isLogin" :user="user"></Editor>
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
#top {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
