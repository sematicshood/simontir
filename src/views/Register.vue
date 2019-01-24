<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="box box-danger box-solid">
                    <div class="box-header">
                        <center><h2 class="box-title"><strong>Pendaftaran Servis Advisor</strong></h2></center>
                    </div>
                    <div class="box-body" id="part1">
                        <dir class="row">
                            <div class="col-lg-6">
                                <div class="box-sub-header">
                                    <center><h3 class="box-sub-title"><strong>Data Motor</strong></h3></center>
                                </div>

                                <label for="">No. Polisi</label>
                                <div class="input-group">
                                    <input type="text" class="form-control">
                                    <span class="input-group-btn">
                                    <button type="button" v-b-modal="'history'" class="btn btn-success btn-flat">History</button>
                                    </span>
                                </div>
                                <br>

                                <!-- Modal History -->
                                <b-modal id="history">
                                    Hello From My Modal!
                                </b-modal>

                                <div class="form-group">
                                    <label for="">No. Unit</label>
                                    <input type="text" class="form-control" id="" placeholder="">
                                </div>
                                <div class="form-group">
                                    <label for="">Tgl. Servis</label>
                                    <input type="date" class="form-control" id="" placeholder="">
                                </div>
                                <div class="form-group">
                                    <label for="">No. Mesin</label>
                                    <input type="number" class="form-control" id="" placeholder="">
                                </div>
                                <div class="form-group">
                                    <label for="">No. Rangka</label>
                                    <input type="number" class="form-control" id="" placeholder="">
                                </div>
                                <div class="form-group">
                                    <label>Type</label>
                                    <select class="form-control">
                                        <option>option 1</option>
                                        <option>option 2</option>
                                    </select>
                                    </div>
                                <div class="form-group">
                                    <label for="">Tahun</label>
                                    <input type="number" class="form-control" id="" placeholder="">
                                </div>
                            </div>
                            <dir class="col-lg-6">
                                <div class="box-sub-header" style="margin-top: -14px !important;">
                                    <center><h3 class="box-sub-title"><strong>Data Pembawa</strong></h3></center>
                                </div>
                                <div class="form-group">
                                    <label for="">Nama</label>
                                    <input type="text" class="form-control" id="" placeholder="">
                                </div><div class="form-group">
                                    <label for="">No. Telp/HP</label>
                                    <input type="number" class="form-control" id="" placeholder="">
                                </div>
                                <div class="form-group">
                                    <label for="">Email</label>
                                    <input type="mail" class="form-control" id="" placeholder="">
                                </div>
                                <div class="form-group">
                                    <label for="">Sosmed</label>
                                    <input type="text" class="form-control" id="" placeholder="">
                                </div>
                                <dir class="box-sub-header" style="margin-top: 30px !important;">
                                    <center><h3 class="box-sub-title"><strong>Data Pembawa</strong></h3></center>
                                </dir>
                                <div class="form-group">
                                    <label for="">Nama</label>
                                    <input type="text" class="form-control" id="" placeholder="">
                                </div>
                                <div class="form-group">
                                    <label>Alamat</label>
                                    <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
                                </div>                                
                            </dir>
                        </dir>
                        <dir class="row">
                            <div class="col-lg-12">
                                <dir class="box-sub-header">
                                    <h3 class="box-sub-title"><strong>Keluhan Konsumen</strong></h3>
                                    <button type="button" v-b-modal="'keluhan'" class="btn btn-danger btn-sm pull-right" style="height: 29px; padding: 2px 11px; margin-top: -5px;"><i class="fa fa-plus"></i></button>
                                </dir>

                                <!-- Modal keluhan -->
                                <b-modal id="keluhan">
                                    <div class="form-group">
                                        <label for="">Keluhan</label>
                                        <input type="text" class="form-control" id="" placeholder="">
                                    </div>
                                </b-modal>

                                <div class="form-group">
                                    <table class="table table-hover">
                                        <tbody><tr>
                                            <th style="width: 10px">#</th>
                                            <th>Keluhan</th>
                                            <th>Check</th>
                                            <th style="width: 100px">Action</th>
                                        </tr>
                                        <tr>
                                            <td>1.</td>
                                            <td>Lorem Ipsum Dolor Amet</td>
                                            <td><input type="checkbox"></td>
                                            <td>
                                                <div class="btn-group btn-sm">
                                                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-trash"></i></button>
                                                </div>
                                                
                                            </td>
                                        </tr>                
                                    </tbody></table>
                                </div>   
                            </div>
                        </dir>
                        <dir class="row">
                            <div class="col-lg-12">
                                <dir class="box-sub-header">
                                    <h3 class="box-sub-title"><strong>Analisa Service Advisor</strong></h3>
                                </dir>
                                <div class="form-group">
                                    <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
                                </div>   
                            </div>
                        </dir>
                        <dir class="row">
                            <div class="col-lg-12">
                                <dir class="box-sub-header">
                                    <h3 class="box-sub-title"><strong>Saran Mekanik</strong></h3>
                                </dir>
                                <div class="form-group">
                                    <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
                                </div>   
                            </div>
                        </dir>
                    </div>

                    <div class="box-body" id="part2">
                        <div class="box box-danger col-lg-8">
                            <div class="row" style="margin-top: 10px; border">
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">KM </label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" id="" placeholder="KM">
                                    </div>
                                </div>
                            </div>
                            <div class="border-custom">
                                <div class="box-sub-header">
                                    <h3 class="box-sub-title"><strong>Pekerjaan / Jasa</strong></h3>
                                    <button type="button" v-b-modal="'jasa'" class="btn btn-danger btn-sm pull-right" style="height: 29px; padding: 2px 11px; margin-top: -5px;"><i class="fa fa-plus"></i></button>
                                </div>

                                <!-- Modal jasa -->
                                <b-modal id="jasa">
                                    <div class="col-xs-12">
                                        <div class="box">
                                            <div class="box-header">
                                            <h3 class="box-title">Data Jasa</h3>

                                            <div class="box-tools">
                                                <div class="input-group input-group-sm" style="width: 150px;">
                                                <input type="text" name="table_search" class="form-control pull-right" placeholder="Search" style="height: 30px;">

                                                <div class="input-group-btn">
                                                    <button type="submit" class="btn btn-default btn-sm"><i class="fa fa-search"></i></button>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                            <!-- /.box-header -->
                                            <div class="box-body table-responsive no-padding">
                                            <table class="table table-hover">
                                                <tbody><tr>
                                                <th>#</th>
                                                <th>Column</th>
                                                <th>Column</th>
                                                <th>Column</th>
                                                <th>Column</th>
                                                </tr>
                                                <tr>
                                                <td>1</td>
                                                <td>John Doe</td>
                                                <td>11-7-2014</td>
                                                <td><span class="label label-success">Approved</span></td>
                                                <td>Bacon ipsum dolor</td>
                                                </tr>
                                            </tbody></table>
                                            </div>
                                            <!-- /.box-body -->
                                        </div>
                                        <!-- /.box -->
                                    </div>
                                </b-modal>
                                <div class="box-body">
                                <div class="form-group">
                                        <table class="table table-hover">
                                            <tbody><tr>
                                                <th style="width: 10px">#</th>
                                                <th>Pekerjaan</th>
                                                <th>Qty</th>
                                                <th>Harga</th>
                                                <th style="width: 40px">Action</th>
                                            </tr>
                                            <tr>
                                                <td>1.</td>
                                                <td>Lorem Ipsum Dolor Amet</td>
                                                <td>1</td>
                                                <td>Rp.125.000</td>
                                                <td>
                                                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-trash"></i></button>
                                                </td>
                                            </tr>                
                                        </tbody></table>
                                    </div>
                                </div>
                                <!-- /.box-body -->
                            </div>

                            <div class="border-custom">
                                <div class="box-sub-header">
                                    <h3 class="box-sub-title"><strong>Suku Cadang</strong></h3>
                                    <button type="button" b-v-modal="'sukuCadang'" class="btn btn-danger btn-sm pull-right" style="height: 29px; padding: 2px 11px; margin-top: -5px;"><i class="fa fa-plus"></i></button>
                                </div>

                                <!-- Modal suku cadang -->
                                <b-modal id="sukuCadang">
                                    <div class="col-xs-12">
                                        <div class="box">
                                            <div class="box-header">
                                            <h3 class="box-title">Data Suku Cadang</h3>

                                            <div class="box-tools">
                                                <div class="input-group input-group-sm" style="width: 150px;">
                                                <input type="text" name="table_search" class="form-control pull-right" placeholder="Search" style="height: 30px;">

                                                <div class="input-group-btn">
                                                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                            <!-- /.box-header -->
                                            <div class="box-body table-responsive no-padding">
                                            <table class="table table-hover">
                                                <tbody><tr>
                                                <th>#</th>
                                                <th>Column</th>
                                                <th>Column</th>
                                                <th>Column</th>
                                                <th>Column</th>
                                                </tr>
                                                <tr>
                                                <td>1</td>
                                                <td>John Doe</td>
                                                <td>11-7-2014</td>
                                                <td><span class="label label-success">Approved</span></td>
                                                <td>Bacon ipsum dolor</td>
                                                </tr>
                                            </tbody></table>
                                            </div>
                                            <!-- /.box-body -->
                                        </div>
                                        <!-- /.box -->
                                    </div>
                                </b-modal>
                                <div class="box-body">
                                <div class="form-group">
                                        <table class="table table-hover">
                                            <tbody><tr>
                                                <th style="width: 10px">#</th>
                                                <th>Suku Cadang</th>
                                                <th>Qty</th>
                                                <th>Harga</th>
                                                <th style="width: 40px">Action</th>
                                            </tr>
                                            <tr>
                                                <td>1.</td>
                                                <td>Lorem Ipsum Dolor Amet</td>
                                                <td>1</td>
                                                <td>Rp.125.000</td>
                                                <td>
                                                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-trash"></i></button>
                                                </td>
                                            </tr>                
                                        </tbody></table>
                                    </div>
                                </div>
                                <!-- /.box-body -->
                            </div>

                            <div class="border-custom">
                                <div class="box-sub-header">
                                    <table style="width: 100%;">
                                        <tr>
                                            <th style="width: 70%;">Total</th>
                                            <th>Rp.250.000</th>
                                        </tr>
                                    </table>
                                </div>                                
                            </div>
                        </div>
                        <div class=" col-lg-4 ">
                            <div class="border-custom">
                                <div class="box-sub-header">
                                    <center><h3 class="box-sub-title"><strong>Saran Ganti Sparepart</strong></h3></center>
                                </div>
                                <div class="box-body">
                                    <table class="table table-hover">
                                        <tbody><tr>
                                            <th>Periode Ganti (Km)</th>
                                            <th>Sparepart</th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-default btn-sm">8000</button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-default btn-sm">Busi</button>
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-primary btn-sm">8000</button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-primary btn-sm">Busi</button>
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-warning btn-sm">8000</button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-warning btn-sm">Busi</button>
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-danger btn-sm">8000</button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-danger btn-sm">Busi</button>
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-default btn-sm" disabled>8000</button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-default btn-sm" disabled>Busi</button>
                                            </td>
                                        </tr>               
                                    </tbody></table>
                                </div>
                                <!-- /.box-body -->
                                <div class="box-sub-header">
                                    <center><h3 class="box-sub-title"><strong>Paket Tambahan</strong></h3></center>
                                </div>
                                <div class="box-body">
                                    <table class="table table-hover">
                                        <tbody><tr>
                                            <th>Periode Ganti (Km)</th>
                                            <th>Sparepart</th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-default btn-sm">8000</button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-default btn-sm">Busi</button>
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-primary btn-sm">8000</button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-primary btn-sm">Busi</button>
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-warning btn-sm">8000</button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-warning btn-sm">Busi</button>
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-danger btn-sm">8000</button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-danger btn-sm">Busi</button>
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-default btn-sm" disabled>8000</button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-default btn-sm" disabled>Busi</button>
                                            </td>
                                        </tr>                
                                    </tbody></table>
                                </div>
                                <!-- /.box-body -->
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="border-custom">
                                <div class="box-sub-header">
                                    <center><h3 class="box-sub-title"><strong>Estimasi Pekerjaan Selesai</strong></h3></center>
                                </div>
                                <div class="box-body" style="padding: 0px;">
                                    <table class="custom-table">
                                        <tr class="custom-th">
                                            <td style="border-right: 1px solid #dd4b39; width:20%;" rowspan="2"><h5>2:30 Jam</h5></td>
                                            <td style="border-right: 1px solid #dd4b39; width:40%;"><strong>Konsumen</strong></td>
                                            <td style="width:40%;"><strong>Service Advisor</strong></td>
                                        </tr>
                                        <tr class="validasi">
                                            <td style="border-right: 1px solid #dd4b39;"><input type="checkbox"></td>
                                            <td><input type="checkbox"></td>
                                        </tr>
                                    </table>
                                </div>
                                <!-- /.box-body -->
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="border-custom">
                                <div class="box-sub-header">
                                    <center><h3 class="box-sub-title"><strong>Tambahan Pekerjaan </strong></h3></center>
                                </div>
                                <div class="box-body" style="padding: 0px;">
                                    <table class="custom-table">
                                        <tr class="custom-th">
                                            <td style="border-right: 1px solid #dd4b39; width:50%;"><strong>Konsumen</strong></td>
                                            <td style="width:50%;"><strong>Service Advisor</strong></td>
                                        </tr>
                                        <tr class="validasi">
                                            <td style="border-right: 1px solid #dd4b39;"><input type="checkbox"></td>
                                            <td><input type="checkbox"></td>
                                        </tr>
                                    </table>
                                </div>
                                <!-- /.box-body -->
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="border-custom">
                                <div class="box-sub-header">
                                    <center><h3 class="box-sub-title"><strong>Penyerahan Motor Oleh SA </strong></h3></center>
                                </div>
                                <div class="box-body" style="padding: 0px;">
                                    <table class="custom-table">
                                        <tr class="custom-th">
                                            <td><strong>Konsumen</strong></td>
                                        </tr>
                                        <tr class="validasi">
                                            <td><input type="checkbox"></td>
                                        </tr>
                                    </table>
                                </div>
                                <!-- /.box-body -->
                            </div>
                        </div>
                    </div>
                    <div class="box-footer">
                        <button type="submit" class="btn btn-warning pull-right">Next</button>
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

    export default class Register extends Vue {}
</script>

<style>
@import '../assets/adminLTE/css/custom.css';
</style>
