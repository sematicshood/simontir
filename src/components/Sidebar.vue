<template>
  <div id="sidebar">
    <!-- Left side column. contains the sidebar -->
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
            <img src="#" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
            <p>Alexander Pierce</p>
            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu" data-widget="tree">
            <li class="header">MAIN NAVIGATION</li>
            <router-link v-for="route in routes" tag="li" :to="{ name: route.name }">
                <a><i class="fa fa-book"></i> <span>{{ route.meta.title }}</span></a>
            </router-link>
        </ul>
        </section>
        <!-- /.sidebar -->
    </aside>

    <!-- =============================================== -->
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';

  @Component({})

  export default class Sidebar extends Vue {
    data() {
      return {
        routes: 'yayayay'
      }
    }

    created() {
        this.$data.routes = this.$router.options.routes.filter(el => {
            return el.meta
        })

        this.$data.routes = this.$data.routes.filter(el => {
            let login = JSON.parse(localStorage.getItem('login'))
            
            if (login.role != 'manager')
                return el.meta.show && el.meta.role.includes(login.role)
            else
                return el.meta.show
        })
    }
  }
</script>
