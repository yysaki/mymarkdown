<template>
  <div id="layout">
    <v-app>
      <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-title>MyMarkdown</v-toolbar-title>
        <v-spacer></v-spacer>
        <span v-if="isLogin">
          <v-toolbar-items>
            <v-toolbar-title color="indigo">{{ user.displayName }}</v-toolbar-title>
            <v-btn color="indigo darken-4" @click="logout">ログアウト</v-btn>
          </v-toolbar-items>
        </span>
      </v-toolbar>
      <v-content>
        <slot></slot>
      </v-content>
      <v-footer color="indigo" app>
        <span class="white--text">&copy; 2018</span>
        <v-spacer></v-spacer>
        <span class="white--text">
          <router-link :to="{name: 'terms'}">利用規約</router-link>
        </span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "layout",
  computed: mapState([
    'isLogin',
    'user'
  ]),
  methods: {
    logout: function() {
      firebase.auth().signOut();
    },
  }
};
</script>

