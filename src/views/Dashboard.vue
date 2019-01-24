<template>
    <div id="dashboard">
        <h1>Dashboard</h1>
    </div>
</template>

<script lang="ts">
    import navbar from '../components/Navbar.vue';
    import sidebar from '../components/Sidebar.vue';
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {
            navbar, sidebar
        },
    })

    export default class Dashboard extends Vue {}
</script>

<style>
@import '../assets/adminLTE/bootstrap/dist/css/bootstrap.min.css';
@import '../assets/adminLTE/font-awesome/css/font-awesome.min.css';
@import '../assets/adminLTE/css/AdminLTE.min.css';
@import '../assets/adminLTE/css/skins/_all-skins.min.css';
</style>
