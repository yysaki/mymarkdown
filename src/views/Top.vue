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
  data() {
    return {
      isLogin: false,
      userData: null
    };
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.isLogin = true;
        this.userData = user;
      } else {
        this.isLogin = false;
        this.userData = null;
      };
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
