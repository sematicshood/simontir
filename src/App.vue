<template>
  <div id="app">
      <div v-if="path != 'login' && path != undefined">
        <navbar></navbar>
        <sidebar></sidebar>
        <div class="content-wrapper">
          <!-- Content Header (Page header) -->
          <section class="content-header">
            <h1>
              Title Page
            </h1>
            <ol class="breadcrumb">
              <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
              <li class="active">Active Page</li>
            </ol>
          </section>
          <!-- Main content -->
          <section class="content">
            <router-view/>
          </section>
        </div>
      </div>
      <div v-else>
        <router-view/>
      </div>
  </div>
</template>

<script lang="ts">
  import navbar from './components/Navbar.vue';
  import sidebar from './components/Sidebar.vue';
  import { Component, Vue, Watch } from 'vue-property-decorator';

  @Component({
      components: {
          navbar, sidebar
      },
  })

  export default class App extends Vue {
    data() {
      return {
        path: ''
      }
    }

    @Watch('$route', { immediate: true, deep: true })
    onUrlChange(newVal: any) {
      this.$data.path = this.$router.currentRoute.name
    }
  }
</script>

<style>
@import 'assets/adminLTE/bootstrap/dist/css/bootstrap.min.css';
@import 'assets/adminLTE/font-awesome/css/font-awesome.min.css';
@import 'assets/adminLTE/css/AdminLTE.min.css';
@import 'assets/adminLTE/css/skins/_all-skins.min.css';
</style>