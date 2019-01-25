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
                            <center><h4>00:00:00</h4></center>
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
                        <td style="width: 20px;">1</td>
                        <td style="text-align: left;">
                            Ganti Oli <br>
                            00:00:00
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default"><i class="fa fa-check"></i></button>
                                <button type="button" class="btn btn-default"><i class="fa fa-close"></i></button>                                
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 20px;">1</td>
                        <td style="text-align: left;">
                            Ganti Oli <br>
                            00:00:00
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default"><i class="fa fa-check"></i></button>
                                <button type="button" class="btn btn-default"><i class="fa fa-close"></i></button>                                
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 20px;">1</td>
                        <td style="text-align: left;">
                            Ganti Oli <br>
                            00:00:00
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default"><i class="fa fa-check"></i></button>
                                <button type="button" class="btn btn-default"><i class="fa fa-close"></i></button>                                
                            </div>
                        </td>
                    </tr>
                </table>

                <div class="title-task" style="margin-top: -14px;">
                    <center><h4><strong>Suku Cadang</strong></h4></center>
                </div>
                <table class="table table-striped white-background">
                    <tr>
                        <td style="width: 20px;">1</td>
                        <td style="text-align: left;">
                            Ganti Oli <br>
                            00:00:00
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default"><i class="fa fa-check"></i></button>
                                <button type="button" class="btn btn-default"><i class="fa fa-close"></i></button>                                
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 20px;">1</td>
                        <td style="text-align: left;">
                            Ganti Oli <br>
                            00:00:00
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default"><i class="fa fa-check"></i></button>
                                <button type="button" class="btn btn-default"><i class="fa fa-close"></i></button>                                
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 20px;">1</td>
                        <td style="text-align: left;">
                            Ganti Oli <br>
                            00:00:00
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default"><i class="fa fa-check"></i></button>
                                <button type="button" class="btn btn-default"><i class="fa fa-close"></i></button>                                
                            </div>
                        </td>
                    </tr>
                </table>
                <button type="button" class="btn btn-primary btn-block">Selesai</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {},
    })

    export default class FinalCheck extends Vue {}
</script>

<style>
@import '../assets/adminLTE/css/custom.css';
</style>