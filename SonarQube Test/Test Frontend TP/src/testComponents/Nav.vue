<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer clipped app v-model="drawer">
        <v-list dense>
          <v-list-tile>I must respect the Toolbar and appear below</v-list-tile>
          <v-list-tile>Home 1</v-list-tile>
          <v-list-tile>Home 2</v-list-tile>
          <v-list-tile>Home 3</v-list-tile>
          <v-list-tile>Home 4</v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <div v-if="drawer" class="custom_overlay" @click="drawer = !drawer"></div>

      <v-toolbar color="blue darken-3" dark app clipped-left>
        <v-btn @click="drawer = !drawer">Show drawer</v-btn>
        <v-toolbar-title>Toolbar should be always on top!</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-switch
          v-model="temporary"
          label="Make drawer temporary"
          hide-details
        />
      </v-toolbar>

      <v-content>
        <v-container fluid fill-height> nothing to see here </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  data(){
    return{
      drawer: false,
      temporary: false
    }
  }
}
</script>

<style>
.custom_overlay {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(50,50,50,0.5);
    z-index:2;
}
</style>