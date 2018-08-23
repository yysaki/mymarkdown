<template>
  <v-containe fuild fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card id="home" class="elevation-12">
          <v-card-text color="indigo" dark>
            {{ msg }}
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
  </v-containe>
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
