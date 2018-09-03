<template>
  <div id="layout">
    <v-app>
      <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-title>MyMarkdown</v-toolbar-title>
        <v-spacer></v-spacer>
        <span v-if="isLogin">
          <v-toolbar-items>
            <v-toolbar-title color="indigo">{{ userData.displayName }}</v-toolbar-title>
            <v-btn color="indigo darken-4" @click="logout">ログアウト</v-btn>
          </v-toolbar-items>
        </span>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-layout
            justify-center
            align-center
          >
            <v-flex text-xs-center>
              <slot></slot>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer color="indigo" app>
        <span class="white--text">&copy; 2018</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "layout",
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
  methods: {
    logout: function() {
      firebase.auth().signOut();
    },
  }
};
</script>

