<template>
  <div id="app">
      <div v-if="path != 'login' && path != undefined">
        <navbar></navbar>
        <sidebar :class="{'tabSidebar': sidebar}"></sidebar>
        <div :class="{'content-wrapper': true, 'tabWrapper': sidebar}">
          <section class="content-header">
            <h1 v-text="title"></h1>
            <ol class="breadcrumb">
              <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
              <li class="active">Active Page</li>
            </ol>
          </section>
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
import { mapState } from 'vuex';

@Component({
    components: {
        navbar, sidebar,
    },

    computed: {
      ...mapState(['web']),
    },
})

export default class App extends Vue {
  public path: string     = '';
  public title: string    = '';
  public sidebar: any     = '';

  public created() {
    this.sidebar = (this as any).web.sidebar;
  }

  @Watch('$route', { immediate: true, deep: true })
  public onUrlChange(newVal: any) {
    this.$data.path  = (this.$router as any).currentRoute.name;
    this.$data.title = (this.$router as any).currentRoute.meta.title;
  }
}
</script>

<style>
@import 'assets/adminLTE/bootstrap/dist/css/bootstrap.min.css';
@import 'assets/adminLTE/font-awesome/css/font-awesome.min.css';
@import 'assets/adminLTE/css/AdminLTE.min.css';
@import 'assets/adminLTE/css/skins/_all-skins.min.css';
</style>