<template>
  <div id="sidebar">
    <!-- Left side column. contains the sidebar -->
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
            <img :src="`data:image/gif;base64,${ user.image }`" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
            <p>{{ user.name }}</p>
            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu" data-widget="tree">
            <li class="header">MAIN NAVIGATION</li>
            <router-link v-for="route in routes" tag="li" :to="{ name: route.name }">
                <a><i class="fa fa-book"></i> <span>{{ route.meta.title }}</span></a>
            </router-link>
            <li>
                <a href="#" @click="logout">Logout</a>
            </li>
        </ul>
        </section>
        <!-- /.sidebar -->
    </aside>

    <!-- =============================================== -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import auth from '../helpers/auth';

@Component({})

export default class Sidebar extends Vue {
  public routes: any = '';
  public user: any   = JSON.parse(localStorage.getItem('login')!);

  public logout(): void {
      localStorage.removeItem('login');

      this.$router.push({ name: 'login' });
  }

  public created() {
        this.routes = (this.$router as any).options.routes.filter((el: any) => {
            return el.meta;
        });

        this.routes = this.routes.filter((el: any) => {
            try {
                if (this.user.job.toUpperCase() != 'Owner'.toUpperCase()) {
                    let role = '';

                    if (el.meta.role) {
                        role  = el.meta.role.map(function(x: string) { return x.toUpperCase(); });
                    } else {
                        role  = el.meta.role;
                    }

                    if (this.user.job.toUpperCase() === 'Ass Mekanik'.toUpperCase()) {
                        return el.meta.show && role.includes(this.user.role.toUpperCase());
                    } else {
                        return el.meta.show && role.includes(this.user.job.toUpperCase());
                    }
                } else {
                    return el.meta.show;
                }
            } catch (error) {
                return el.meta.show;
            }
        }).sort((a: any, b: any) => {
            if(a.meta.title < b.meta.title) { return -1; }
            if(a.meta.title > b.meta.title) { return 1; }
            return 0;
        });
  }
}
</script>
