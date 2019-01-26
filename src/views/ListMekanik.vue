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
                                <div class="box-header with-border">
                                    <h3 class="box-title"><strong>Booking Service</strong></h3>

                                    <div class="box-tools pull-right">
                                        <span data-toggle="tooltip" title="" class="badge bg-red" data-original-title="3 New Messages">{{ bookings.length }}</span>
                                    </div>
                                </div>
                                <router-link to="/timesheet_mekanik/2">
                                    <BookingOrder :data="booking" v-for="booking in bookings.splice(0,1)"></BookingOrder>
                                </router-link>
                            </div>
                            <div class="col-lg-6">
                                <div class="box-header with-border">
                                    <h3 class="box-title"><strong>Light Repair</strong></h3>

                                    <div class="box-tools pull-right">
                                        <span data-toggle="tooltip" title="" class="badge bg-red" data-original-title="3 New Messages">{{ lights.length }}</span>
                                    </div>
                                </div>
                                <router-link to="/timesheet_mekanik/2">
                                    <LightRepair v-for="light in lights.splice(0,1)"></LightRepair>
                                </router-link>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="box-header with-border">
                                    <h3 class="box-title"><strong>Reguler</strong></h3>

                                    <div class="box-tools pull-right">
                                        <span data-toggle="tooltip" title="" class="badge bg-red" data-original-title="3 New Messages">{{ regulars.length }}</span>
                                    </div>
                                </div>
                                <router-link to="/timesheet_mekanik/2">
                                    <reguler v-for="regular in regulars.splice(0,1)"></reguler>
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
        user: Array<string>     =   []
        services: Array<string> =   []
        bookings: Array<string> =   []
        lights: Array<string>   =   []
        regulars: Array<string> =   []

        created() {
            this.user       = JSON.parse(localStorage.getItem('login'))
            this.services   = JSON.parse(localStorage.getItem('services'))
            this.bookings   = this.services.filter(el => {
                return el['jenis service'] == "Booking Service" 
            })

            this.lights   = this.services.filter(el => {
                return el['jenis service'] == "Light Repair" 
            })

            this.regulars   = this.services.filter(el => {
                return el['jenis service'] == "Regular" 
            })
        }
    }
</script>

<style>
@import '../assets/adminLTE/css/custom.css';
</style>