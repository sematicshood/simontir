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
                        <h3 class="widget-user-username">Jhony Junet</h3>
                        <h5 class="widget-user-desc">Mekanik</h5>
                    </div>
                    <div class="box-body no-padding">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="box no-border-top">
                                    <div class="box-header with-border">
                                        <h3 class="box-title"><strong>Booking Service</strong></h3>

                                        <div class="box-tools pull-right">
                                            <span data-toggle="tooltip" title="" class="badge bg-red" data-original-title="3 New Messages">3</span>
                                        </div>
                                    </div>
                                    <div class="box-body">
                                        <div class="small-box bg-red">
                                            <div class="inner">
                                                <h3><strong>AB 1234 CA</strong></h3>

                                                <p>Vario 150 New</p>
                                            </div>
                                            <div class="a-group-red">
                                                <a href="#" class="number-task pull-left">
                                                3 <i class="fa fa-gears"></i>
                                                </a>
                                                <a href="#" class="number-task pull-righ">
                                                2 <i class="fa fa-motorcycle"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="box no-border-top">
                                    <div class="box-header with-border">
                                        <h3 class="box-title"><strong>Light Repair</strong></h3>

                                        <div class="box-tools pull-right">
                                            <span data-toggle="tooltip" title="" class="badge bg-red" data-original-title="3 New Messages">3</span>
                                        </div>
                                    </div>
                                    <div class="box-body">
                                        <div class="small-box bg-yellow">
                                            <div class="inner">
                                                <h3><strong>AB 1234 CA</strong></h3>

                                                <p>Vario 150 New</p>
                                            </div>
                                            <div class="a-group-yellow">
                                                <a href="#" class="number-task pull-left">
                                                3 <i class="fa fa-gears"></i>
                                                </a>
                                                <a href="#" class="number-task pull-righ">
                                                2 <i class="fa fa-motorcycle"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="box no-border-top">
                                    <div class="box-header with-border">
                                        <h3 class="box-title"><strong>Reguler</strong></h3>

                                        <div class="box-tools pull-right">
                                            <span data-toggle="tooltip" title="" class="badge bg-red" data-original-title="3 New Messages">3</span>
                                        </div>
                                    </div>
                                    <div class="box-body">
                                        <div class="small-box bg-green">
                                            <div class="inner">
                                                <h3><strong>AB 1234 CA</strong></h3>

                                                <p>Vario 150 New</p>
                                            </div>
                                            <div class="a-group-green">
                                                <a href="#" class="number-task pull-left">
                                                3 <i class="fa fa-gears"></i>
                                                </a>
                                                <a href="#" class="number-task pull-righ">
                                                2 <i class="fa fa-motorcycle"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {},
    })

    export default class ListMekanik extends Vue {}
</script>

<style>
@import '../assets/adminLTE/css/custom.css';
</style>