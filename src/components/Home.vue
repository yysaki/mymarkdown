<template>
  <div id="home">
    <h1>{{ msg }}</h1>
    <p>Google認証で簡単ログインのシンプルなMarkdownエディター</p>
    <button @click="googleLogin">Googleアカウントでログイン</button>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      msg: "Welcome to MyMarkdown"
    };
  },
  methods: {
    googleLogin: function() {
      firebase
        .auth()
        .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
  }
};
</script>
