<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="box box-widget widget-user-2">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header bg-red" style="margin-bottom: 20px;">
                        <div class="widget-user-image">
                            <img class="img-circle" src="../assets/img/user1-128x128.jpg" alt="User Avatar">
                        </div>
                        <!-- /.widget-user-image -->
                        <h3 class="widget-user-username">{{ user.name }}</h3>
                        <h5 class="widget-user-desc">{{ user.role }}</h5>
                    </div>
                    <div class="box-body no-padding">
                        <div class="row">
                            <div class="col-lg-6">
                                <router-link to="/timesheet_mekanik/2">
                                    <BookingOrder></BookingOrder>
                                </router-link>
                            </div>
                            <div class="col-lg-6">
                                <router-link to="/timesheet_mekanik/2">
                                    <LightRepair></LightRepair>
                                </router-link>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <router-link to="/timesheet_mekanik/2">
                                    <reguler></reguler>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import BookingOrder from '../components/BookingOrder.vue';
    import LightRepair from '../components/LightRepair.vue';
    import reguler from '../components/Reguler.vue';
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {
            BookingOrder, LightRepair, reguler
        },
    })

    export default class ListMekanik extends Vue {
        user: Array<string> =   []

        created() {
            this.user = JSON.parse(localStorage.getItem('login'))
        }
    }
</script>

<style>
@import '../assets/adminLTE/css/custom.css';
</style>