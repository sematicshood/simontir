<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="title-timesheet">
                    <div class="row">
                        <div class="col-xs-8">
                            <center><h3><strong>AB 1234 CD</strong></h3></center>
                        </div>
                        <div class="col-xs-4 timer">
                            <center><h4 v-text="timer"></h4></center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="title-task">
                    <center><h4><strong>Pekerjaan</strong></h4></center>
                </div>
                <table class="table table-striped white-background">
                    <tr>
                        <td style="width: 20px;">2</td>
                        <td style="text-align: left;">
                            Ban <br>
                            <span class="label label-default"><i class="fa fa-pause"></i> 00:00:00</span>&nbsp;<span class="label label-default"><i class="fa fa-clock-o"></i> 00:00:00</span>
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default"><i class="fa fa-play"></i></button>
                                <button type="button" class="btn btn-default"><i class="fa fa-pause"></i></button>                                
                                <button type="button" class="btn btn-default"><i class="fa fa-stop"></i></button>                                
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 20px;">2</td>
                        <td style="text-align: left;">
                            Ban <br>
                            <span class="label label-default"><i class="fa fa-pause"></i> 00:00:00</span>&nbsp;<span class="label label-default"><i class="fa fa-clock-o"></i> 00:00:00</span>
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default"><i class="fa fa-play"></i></button>
                                <button type="button" class="btn btn-default"><i class="fa fa-pause"></i></button>                                
                                <button type="button" class="btn btn-default"><i class="fa fa-stop"></i></button>                                
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 20px;">2</td>
                        <td style="text-align: left;">
                            Ban <br>
                            <span class="label label-default"><i class="fa fa-pause"></i> 00:00:00</span>&nbsp;<span class="label label-default"><i class="fa fa-clock-o"></i> 00:00:00</span>
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default"><i class="fa fa-play"></i></button>
                                <button type="button" class="btn btn-default"><i class="fa fa-pause"></i></button>                                
                                <button type="button" class="btn btn-default"><i class="fa fa-stop"></i></button>                                
                            </div>
                        </td>
                    </tr>
                </table>

                <div class="title-task" style="margin-top: -14px;">
                    <center><h4><strong>Keluhan</strong></h4></center>
                </div>
                <table class="table table-striped white-background">
                    <tr>
                        <td style="width: 20px;">2</td>
                        <td style="text-align: left;">
                            Ban <br>
                            <span class="label label-default"><i class="fa fa-pause"></i> 00:00:00</span>&nbsp;<span class="label label-default"><i class="fa fa-clock-o"></i> 00:00:00</span>
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default"><i class="fa fa-play"></i></button>
                                <button type="button" class="btn btn-default"><i class="fa fa-pause"></i></button>                                
                                <button type="button" class="btn btn-default"><i class="fa fa-stop"></i></button>                                
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 20px;">2</td>
                        <td style="text-align: left;">
                            Ban <br>
                            <span class="label label-default"><i class="fa fa-pause"></i> 00:00:00</span>&nbsp;<span class="label label-default"><i class="fa fa-clock-o"></i> 00:00:00</span>
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default"><i class="fa fa-play"></i></button>
                                <button type="button" class="btn btn-default"><i class="fa fa-pause"></i></button>                                
                                <button type="button" class="btn btn-default"><i class="fa fa-stop"></i></button>                                
                            </div>
                        </td>
                    </tr>
                </table>
                <!-- <table class="table table-striped white-background total-time">
                    <tr>
                        <td><p><i class="fa fa-play"></i></p></td>
                        <td><p><i class="fa fa-pause"></i></p></td>
                        <td><p><i class="fa fa-stop"></i></p></td>
                    </tr>
                    <tr>
                        <td>00:00:00</td>
                        <td>00:00:00</td>
                        <td>00:00:00</td>
                    </tr>
                </table> -->
                <button type="button" class="btn btn-primary btn-block">Selesai</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import additional from '../helpers/additional'

    @Component({
        components: {},
    })

    export default class TimesheetMekanik extends Vue {
        timer: string   =   "00:00:00"
        seconds: number =   0
        minutes: number =   0
        hours: number   =   0

        created() {
            setInterval(() => {
                this.seconds++

                if(this.seconds == 60) {
                    this.seconds = 0
                    this.minutes++
                }

                if(this.minutes == 60) {
                    this.minutes = 0
                    this.hours++
                }

                this.timer = additional.exact(this.hours) + ":" + additional.exact(this.minutes) + ":" + additional.exact(this.seconds)
            }, 1000)
        }
    }
</script>

<style>
@import '../assets/adminLTE/css/custom.css';
</style>