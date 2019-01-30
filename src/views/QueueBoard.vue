<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <div class="box box-danger box-solid">
                    <div class="box-header with-border">
                    <h3 class="box-title">Antrian ({{ antrian.length }})</h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        <div v-for="a in antrian" :class="{'small-box': true, 'bg-red': a.antrian_service == 'Booking Service','bg-green': a.antrian_service == 'Regular Service','bg-yellow': a.antrian_service == 'Light Repair'}">
                            <div class="inner">
                                <h3 style="font-size: 200%;"><strong>{{ a.no_polisi }}</strong></h3>

                                <p>{{ a.customer }}</p>
                            </div>
                            <div :class="{'a-group-red': a.antrian_service == 'Booking Service','a-group-green': a.antrian_service == 'Regular Service','a-group-yellow': a.antrian_service == 'Light Repair'}">
                                <a href="#" class="number-task pull-left">
                                {{ countService(a.order_line) }} <i class="fa fa-gears"></i>
                                </a>
                                <a href="#" class="number-task pull-righ">
                                {{ countSparepart(a.order_line) }} <i class="fa fa-motorcycle"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-danger box-solid">
                            <div class="box-header with-border">
                            <h3 class="box-title">Dikerjakan</h3>
                            </div>
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="box box-danger">
                                            <div class="box-header with-border pit-activ">
                                            <center><h3 class="box-title"><strong>Pit #1</strong></h3></center>
                                            </div>
                                            <!-- /.box-header -->
                                            <div class="box-body">
                                                <div class="small-box bg-yellow">
                                                    <div class="inner">
                                                        <h3 style="font-size: 150%;">AB 1234 CA</h3>

                                                        <p>Vario 150 New</p>
                                                    </div>
                                                    <div class="a-group-yellow" style="font-size: 100%;">
                                                        <a href="#" class="number-task pull-left">
                                                        3 <i class="fa fa-gears"></i>
                                                        </a>
                                                        <a href="#" class="number-task pull-righ">
                                                        2 <i class="fa fa-motorcycle"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- /.box-body -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="box box-danger">
                                            <div class="box-header with-border pit-active">
                                            <center><h3 class="box-title"><strong>Pit #2</strong></h3></center>
                                            </div>
                                            <!-- /.box-header -->
                                            <div class="box-body">
                                                <div class="small-box bg-red">
                                                    <div class="inner">
                                                        <h3 style="font-size: 150%;">AB 1234 CA</h3>

                                                        <p>Vario 150 New</p>
                                                    </div>
                                                    <div class="a-group-red" style="font-size: 100%;">
                                                        <a href="#" class="number-task pull-left">
                                                        3 <i class="fa fa-gears"></i>
                                                        </a>
                                                        <a href="#" class="number-task pull-righ">
                                                        2 <i class="fa fa-motorcycle"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- /.box-body -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="box box-danger">
                                            <div class="box-header with-border pit-kosong"> 
                                            <center><h3 class="box-title"><strong>Pit #3</strong></h3></center>
                                            </div>
                                            <!-- /.box-header -->
                                            <div class="box-body">
                                               
                                            </div>
                                            <!-- /.box-body -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="box box-danger">
                                            <div class="box-header with-border pit-kosong">
                                            <center><h3 class="box-title"><strong>Pit #4</strong></h3></center>
                                            </div>
                                            <!-- /.box-header -->
                                            <div class="box-body">
                                                
                                            </div>
                                            <!-- /.box-body -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="box box-danger">
                                            <div class="box-header with-yellow pit-active">
                                            <center><h3 class="box-title"><strong>Pit #5</strong></h3></center>
                                            </div>
                                            <!-- /.box-header -->
                                            <div class="box-body">
                                                <div class="small-box bg-yellow">
                                                    <div class="inner">
                                                        <h3 style="font-size: 150%;">AB 1234 CA</h3>

                                                        <p>Vario 150 New</p>
                                                    </div>
                                                    <div class="a-group-yellow" style="font-size: 100%;">
                                                        <a href="#" class="number-task pull-left">
                                                        3 <i class="fa fa-gears"></i>
                                                        </a>
                                                        <a href="#" class="number-task pull-righ">
                                                        2 <i class="fa fa-motorcycle"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- /.box-body -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="box box-danger">
                                            <div class="box-header with-border pit-active">
                                            <center><h3 class="box-title"><strong>Pit #6</strong></h3></center>
                                            </div>
                                            <!-- /.box-header -->
                                            <div class="box-body">
                                                <div class="small-box bg-red">
                                                    <div class="inner">
                                                        <h3 style="font-size: 150%;">AB 1234 CA</h3>

                                                        <p>Vario 150 New</p>
                                                    </div>
                                                    <div class="a-group-red" style="font-size: 100%;">
                                                        <a href="#" class="number-task pull-left">
                                                        3 <i class="fa fa-gears"></i>
                                                        </a>
                                                        <a href="#" class="number-task pull-righ">
                                                        2 <i class="fa fa-motorcycle"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- /.box-body -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-danger box-solid">
                            <div class="box-header with-border">
                            <h3 class="box-title">Selesai</h3>
                            </div>
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="box box-danger">
                                            <div class="box-header with-border" style="background-color: #f5f5f5;">
                                                <h3 class="box-title"><strong>Booking Order</strong></h3>

                                                <div class="box-tools pull-right">
                                                    <span data-toggle="tooltip" title="" class="badge bg-red" data-original-title="3 New Messages">{{ filterBooking.length }}</span>
                                                </div>
                                            </div>
                                            <div class="box-body">
                                                <div v-for="a in filterBooking" class="small-box bg-red">
                                                    <div class="inner">
                                                        <h3 style="font-size: 200%;"><strong>{{ a.no_polisi }}</strong></h3>

                                                        <p>{{ a.customer }}</p>
                                                    </div>
                                                    <div class="a-group-red">
                                                        <a href="#" class="number-task pull-left">
                                                        {{ countService(a.order_line) }} <i class="fa fa-gears"></i>
                                                        </a>
                                                        <a href="#" class="number-task pull-righ">
                                                        {{ countSparepart(a.order_line) }} <i class="fa fa-motorcycle"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="box box-warning">
                                            <div class="box-header with-border" style="background-color: #f5f5f5;">
                                                <h3 class="box-title"><strong>Light Repair</strong></h3>

                                                <div class="box-tools pull-right">
                                                    <span data-toggle="tooltip" title="" class="badge bg-red" data-original-title="3 New Messages">{{ filterLight.length }}</span>
                                                </div>
                                            </div>
                                            <div class="box-body">
                                                <div v-for="a in filterLight" class="small-box bg-yellow">
                                                    <div class="inner">
                                                        <h3 style="font-size: 200%;"><strong>{{ a.no_polisi }}</strong></h3>

                                                        <p>{{ a.customer }}</p>
                                                    </div>
                                                    <div class="a-group-yellow">
                                                        <a href="#" class="number-task pull-left">
                                                        {{ countService(a.order_line) }} <i class="fa fa-gears"></i>
                                                        </a>
                                                        <a href="#" class="number-task pull-righ">
                                                        {{ countSparepart(a.order_line) }} <i class="fa fa-motorcycle"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="box box-success">
                                            <div class="box-header with-border" style="background-color: #f5f5f5;">
                                                <h3 class="box-title"><strong>Reguler</strong></h3>

                                                <div class="box-tools pull-right">
                                                    <span data-toggle="tooltip" title="" class="badge bg-red" data-original-title="3 New Messages">{{ filterRegular.length }}</span>
                                                </div>
                                            </div>
                                            <div class="box-body">
                                                <div v-for="a in filterRegular" class="small-box bg-green">
                                                    <div class="inner">
                                                        <h3 style="font-size: 200%;"><strong>{{ a.no_polisi }}</strong></h3>

                                                        <p>{{ a.customer }}</p>
                                                    </div>
                                                    <div class="a-group-green">
                                                        <a href="#" class="number-task pull-left">
                                                        {{ countService(a.order_line) }} <i class="fa fa-gears"></i>
                                                        </a>
                                                        <a href="#" class="number-task pull-righ">
                                                        {{ countSparepart(a.order_line) }} <i class="fa fa-motorcycle"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                        </div>
                    </div>
                </div>                
            </div>            
        </div>
    </div>    
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import board from '../api/board'

    @Component({
        components: {},
    })

    export default class QueueBoard extends Vue {
        antrian: Array<string>          =   [];
        dikerjakan: Array<string>       =   [];
        selesai: Array<string>          =   [];
        filterBooking: Array<string>    =   [];

        created() {
            board.getSO().then(res => {
              this.antrian = res.data.results.filter(el => {
                  return el.status == 'sent'
              })

              this.dikerjakan = res.data.results.filter(el => {
                  return el.status == 'sale'
              })

              this.selesai = res.data.results.filter(el => {
                  return el.invoice == 'to invoice' 
              })

              this.filterBooking = this.selesai.filter(el => {
                  return el.antrian_service == 'Booking Service'
              })

              this.filterLight = this.selesai.filter(el => {
                  return el.antrian_service == 'Light Repair'
              })

              this.filterRegular = this.selesai.filter(el => {
                  return el.antrian_service == 'Regular Service'
              })
            })
        }

        countService(data): void {
            let datas = data.filter(el => {
                return el.type == 'service'
            })

            return datas.length
        }

        countSparepart(data): void {
            let datas = data.filter(el => {
                return el.type != 'service'
            })

            return datas.length
        }
    }
</script>


<style>
@import '../assets/adminLTE/css/custom.css';
</style>