<template>
  <div id="app">
      <navbar></navbar>
      <sidebar></sidebar>
      <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <ol class="breadcrumb">
          <li class="active">Dashboard</li>
        </ol>
      </section>
      <!-- Main content -->
      <section class="content">
        <router-view/>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
  import navbar from './components/Navbar.vue';
  import sidebar from './components/Sidebar.vue';
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
      components: {
          navbar, sidebar
      },
  })

  export default class App extends Vue {}
</script>

<style>
@import 'assets/adminLTE/bootstrap/dist/css/bootstrap.min.css';
@import 'assets/adminLTE/font-awesome/css/font-awesome.min.css';
@import 'assets/adminLTE/css/AdminLTE.min.css';
@import 'assets/adminLTE/css/skins/_all-skins.min.css';
</style>