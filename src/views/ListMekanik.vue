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
                                <BookingOrder :data="booking" v-for="booking in bookings"></BookingOrder>
                            </div>
                            <div class="col-lg-6">
                                <div class="box-header with-border">
                                    <h3 class="box-title"><strong>Light Repair</strong></h3>

                                    <div class="box-tools pull-right">
                                        <span data-toggle="tooltip" title="" class="badge bg-red" data-original-title="3 New Messages">{{ lights.length }}</span>
                                    </div>
                                </div>
                                <LightRepair :data="light" v-for="light in lights"></LightRepair>
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
                                <reguler :data="regular" v-for="regular in regulars"></reguler>
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
    import mekanik from '../api/mekanik';
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
            
            this.loadData()

            setInterval(() => {
                this.loadData()
            }, 5000)
        }

        loadData(): void {
            mekanik.getSO().then(res => {
                this.bookings   = res.data.results.filter(el => {
                    return el.antrian_service == "Booking Service" 
                }).splice(0,1)

                this.lights   = res.data.results.filter(el => {
                    return el.antrian_service == "Light Repair" 
                }).splice(0,1)

                this.regulars = res.data.results.filter(el => {
                    return el.antrian_service == "Regular Service" 
                }).splice(0,1)
            })
        }
    }
</script>

<style>
@import '../assets/adminLTE/css/custom.css';
</style>