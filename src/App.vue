<template>
  <div id="app">
    <v-app>
      <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-title>MyMarkdown</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-layout
            justify-center
            align-center
          >
            <v-flex text-xs-center>
              <router-view></router-view>
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
  name: "app"
};
</script>
