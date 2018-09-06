<template>
  <Layout>
    <div id="top">
      <Home v-if="!isLogin"></Home>
      <Editor v-if="isLogin" :user="userData"></Editor>
    </div>
  </Layout>
</template>
<script>
import Layout from "./Layout.vue";
import Home from "../components/Home.vue";
import Editor from "../components/Editor.vue";
export default {
  name: "top",
  computed: {
    isLogin () {
      return this.$store.state.isLogin;
    },
    userData () {
      return this.$store.state.user;
    }
  },
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
