<template>
  <div id="navbar">
    <header class="main-header">
    <!-- Logo -->
    <a href="/" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>A</b>LT</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>Bengkel</b> PINTAR</span>
    </a>
    
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">      
      <a href="#" @click="changeStatusSidebar" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav"> 
        </ul>
      </div>
    </nav>
  </header>

  <!-- =============================================== -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
    name: 'navbar',
})

export default class App extends Vue {
  public changeStatusSidebar(): void {
    this.$store.dispatch('web/changeStatusSidebar');
  }
}
</script>

