<template>
  <v-container class="home-container" fuild fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card id="home" class="elevation-12">
          <v-card-text color="indigo" dark>
            {{ msg }}
            <p>Google認証で簡単ログインのシンプルなMarkdownエディター</p>
          </v-card-text>
          <v-card-actions>
            <v-layout align-center justify-center>
              <v-btn color="indigo" dark @click="googleLogin">
                Googleアカウントでログイン
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
<style>
.home-container {
  height: 100vh;
}
</style>
