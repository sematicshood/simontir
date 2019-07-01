<template>
  <div id="navbar">
    <header class="main-header" v-b-modal="'modal-select'" @click="openModal()">
    <!-- Logo -->
    <a href="#" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>A</b>LT</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg">{{ company.name }}</span>
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

  <b-modal id="modal-select" @ok="ok()">
    <b-form-radio-group id="radio-group-2" v-model="company_id" name="radio-sub-component">
      <b-form-radio v-for="c in user.companies" :key="c.id" name="some-radios" :value="c.id">{{ c.name }}</b-form-radio>
    </b-form-radio-group>
  </b-modal>

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

  public ok(): void {
    const comp = this.user.companies.filter((c: any) => {
      return c.id === this.company_id;
    })[0];
    console.log(comp)

    localStorage.setItem('select_company', JSON.stringify(comp));

    location.reload();
  }

  public openModal(): void {
    this.company_id = this.company.id;
  }

  public company_id: any = '';
  public company: any = JSON.parse(localStorage.getItem('select_company')!);
  public user: any = JSON.parse(localStorage.getItem('login')!)
}
</script>

