<template>
  <Layout>
    <v-container fuild fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card id="home" class="elevation-12">
            <v-card-text color="indigo" dark>
              404 Not Found
            </v-card-text>
            <v-card-actions>
              <v-layout align-center justify-center>
                <router-link :to="{name: 'top'}">TOPに戻る</router-link>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </Layout>
</template>

<script>
  import Layout from "./Layout.vue";
  export default {
    name: "page-not-found",
    components: {
      Layout: Layout
    }
  }
</script>

