<template>
    <div>
        <div id="content">
            <div class="row">
            <div class="col-lg-12">
                <div class="box box-danger box-solid">
                    <form @submit.prevent="finish">
                        <div class="box-header">
                            <center><h2 class="box-title"><strong>Pendaftaran Servis Advisor</strong></h2></center>
                        </div>
                        <div class="box-body" v-if="halaman == 1">
                            <dir class="row">
                                <div class="col-lg-6">
                                    <dir class="box-sub-header">
                                        <center><h3 class="box-sub-title"><strong>Data Motor</strong></h3></center>
                                    </dir>
                                    <div class="form-group">
                                        <label for="">No. Polisi</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" v-model="noPolisi" @change="cekNopol">
                                            <span class="input-group-btn">
                                            <button v-if="buttonHistory" type="button" v-b-modal="'myModal'" class="btn btn-success btn-flat">History</button>
                                            </span>
                                        </div>
                                        <span>*) Wajib diisi</span>
                                    </div>
                                        
                                    <div class="form-group">
                                        <label for="" class="control-label">Jenis Servis </label>
                                        <select name="" id="" v-model="jenisService" class="form-control">
                                            <option value="reguler">Reguler</option>
                                            <option value="Light Repair">Light Repair</option>
                                            <option value="Booking Service">Booking Service</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="">No. Urut</label>
                                        <input disabled type="text" v-model="noUrut" class="form-control" id="" placeholder="">
                                    </div>
                                    <div class="form-group">
                                        <label for="">Tgl. Servis</label>
                                        <input type="date" class="form-control" id="date" placeholder="" :value="tglService.toISOString().split('T')[0]" @input="tglService = $event.target.valueAsDate">
                                    </div>
                                    <div class="form-group">
                                        <label for="">No. Mesin</label>
                                        <input type="number" class="form-control" id="" placeholder="" v-model="noMesin">
                                    </div>
                                    <div class="form-group">
                                        <label for="">No. Rangka</label>
                                        <input type="number" class="form-control" id="" placeholder="" v-model="noRangka">
                                    </div>
                                    <div class="form-group">
                                        <label>Type</label>
                                        <select class="form-control" v-model="type">
                                            <option v-for="ty in types" :value="ty">{{ ty.name }}</option>
                                        </select>
                                        <span>*) Wajib diisi</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Tahun</label>
                                        <input type="number" class="form-control" id="" placeholder="" v-model="tahun">
                                    </div>
                                </div>
                                <dir class="col-lg-6">
                                    <dir class="box-sub-header" style="margin-top: -14px !important;">
                                        <center><h3 class="box-sub-title"><strong>Data Pemilik</strong></h3></center>
                                    </dir>
                                    <div class="form-group">
                                        <label for="">Nama</label>
                                        <input type="text" class="form-control" id="" placeholder="" v-model="namaPemilik">
                                        <span>*) Wajib diisi</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="">No. Telp/HP</label>
                                        <input type="number" class="form-control" id="" placeholder="" v-model="noTelp">
                                        <span>*) Wajib diisi</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Email</label>
                                        <input type="mail" class="form-control" id="" placeholder="" v-model="email">
                                    </div>
                                    <div class="form-group">
                                        <label for="">Sosmed</label>
                                        <input type="text" class="form-control" id="" placeholder="" v-model="sosmed">
                                    </div>
                                    <dir class="box-sub-header" style="margin-top: 30px !important;">
                                        <center><h3 class="box-sub-title"><strong>Data Pembawa</strong></h3></center>
                                    </dir>
                                    <div class="form-group">
                                        <label for="">Nama</label>
                                        <input type="text" class="form-control" id="" placeholder="" v-model="namaPembawa">
                                    </div>
                                    <div class="form-group">
                                        <label>Alamat</label>
                                        <textarea class="form-control" rows="3" placeholder="Enter ..." v-model="alamat"></textarea>
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
                                    <b-modal @ok="addKeluhan" id="keluhan">
                                        <div class="form-group">
                                            <label for="">Keluhan</label>
                                            <input type="text" v-model="keluhanInput" class="form-control" id="" placeholder="">
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
                                            <tr v-for="(keluhan, i) in keluhanKonsumen">
                                                <td>{{ i += 1 }}</td>
                                                <td>
                                                    <span v-if="editKeluhan != i">{{ keluhan.nama }}</span>
                                                    <input v-else-if="editKeluhan == i" class="form-control" v-model="keluhanInput"></input>
                                                </td>
                                                <td><input disabled type="checkbox"></td>
                                                <td v-if="editKeluhan != i">
                                                    <div class="btn-group btn-sm">
                                                        <button type="button" @click="updateKeluhan(i)" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                                        <button type="button" @click="deleteKeluhan(i)" class="btn btn-default btn-sm"><i class="fa fa-trash"></i></button>
                                                    </div>
                                                </td>
                                                <td v-else-if="editKeluhan == i">
                                                    <div class="btn-group btn-sm">
                                                        <button type="button" @click="saveKeluhan(i)" class="btn btn-default btn-sm"><i class="fa fa-save"></i></button>
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
                                        <textarea class="form-control" rows="3" placeholder="Enter ..." v-model="analisa_service"></textarea>
                                    </div>   
                                </div>
                            </dir>
                            <dir class="row">
                                <div class="col-lg-12">
                                    <dir class="box-sub-header">
                                        <h3 class="box-sub-title"><strong>Saran Mekanik</strong></h3>
                                    </dir>
                                    <div class="form-group">
                                        <textarea class="form-control" rows="3" placeholder="Enter ..." v-model="saranMekanik"></textarea>
                                    </div>   
                                </div>
                            </dir>
                        </dir>
                    </div>

                    <div class="box-body" id="part2" v-else-if="halaman == 2">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="box box-danger">
                                    <div class="row" style="margin-top: 10px; border">
                                        <div class="form-group">
                                            <label for="" class="col-sm-2 control-label">KM </label>
                                            <div class="col-sm-10">
                                                <input type="number" class="form-control" v-model="km" placeholder="KM">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <button type="button" v-b-modal="'myModal'" class="btn btn-success btn-flat">History</button>
                                        </div>
                                    </div>
                                    <div class="border-custom">
                                        <div class="box-sub-header">
                                            <h3 class="box-sub-title"><strong>Pekerjaan / Jasa</strong></h3>
                                            <button type="button" v-b-modal="'jasa'" class="btn btn-danger btn-sm pull-right" style="height: 29px; padding: 2px 11px; margin-top: -5px;"><i class="fa fa-plus"></i></button>
                                        </div>

                                        <!-- Modal jasa -->
                                        <b-modal id="jasa" @ok="addMultipleService">
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
                                                        <th style="width: 10px">#</th>
                                                        <th>Pekerjaan</th>
                                                        <th>Harga</th>
                                                        <th style="width: 40px">Action</th>
                                                    </tr>
                                                    <tr v-for="(service, i) in servicesOwn">
                                                        <td>{{ i += 1 }}</td>
                                                        <td>{{ service.name }}</td>
                                                        <td>Rp. {{ convertToRupiah(service.harga) }}</td>
                                                        <td>
                                                            <input type="checkbox" v-model="multipleService" :value="service">
                                                        </td>
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
                                                        <th>Harga</th>
                                                        <th style="width: 40px">Action</th>
                                                    </tr>
                                                    <tr v-for="(service, i) in servicesSelected">
                                                        <td>{{ i += 1 }}</td>
                                                        <td>{{ service.name }}</td>
                                                        <td>Rp. {{ convertToRupiah(service.harga) }}</td>
                                                        <td>
                                                            <button @click="removeService(i)" type="button" class="btn btn-default btn-sm"><i class="fa fa-trash"></i></button>
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
                                            <button type="button" v-b-modal="'sukuCadang'" class="btn btn-danger btn-sm pull-right" style="height: 29px; padding: 2px 11px; margin-top: -5px;"><i class="fa fa-plus"></i></button>
                                        </div>

                                        <!-- Modal suku cadang -->
                                        <b-modal id="sukuCadang" @ok="addMultipleSparepart">
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
                                                        <th style="width: 10px">#</th>
                                                        <th>Suku Cadang</th>
                                                        <th>Harga</th>
                                                        <th style="width: 40px">Action</th>
                                                    </tr>
                                                    <tr v-for="(sparepart, i) in sparepartsOwn">
                                                        <td>{{ i += 1 }}</td>
                                                        <td>{{ sparepart.name }}</td>
                                                        <td>Rp. {{ convertToRupiah(sparepart.harga) }}</td>
                                                        <td>
                                                            <input type="checkbox" v-model="multipleSparepart" :value="sparepart">
                                                        </td>
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
                                                        <th>QTY</th>
                                                        <th>Harga</th>
                                                        <th style="width: 40px">Action</th>
                                                    </tr>
                                                    <tr v-for="(sparepart, i) in sparepartsSelected">
                                                        <td>{{ i += 1 }}</td>
                                                        <td>{{ sparepart.name }}</td>
                                                        <td><input type="number" :value="sparepart.qty" @change="updateSparepartQty($event, i)"></td>
                                                        <td>Rp. {{ convertToRupiah(sparepart.harga) }}</td>
                                                        <td>
                                                            <button type="button" class="btn btn-default btn-sm"><i class="fa fa-trash" @click="removeSparepart(i)"></i></button>
                                                        </td>
                                                    </tr>                
                                                </tbody></table>
                                            </div>
                                        </div>
                                        <!-- /.box-body -->
                                        <div class="box-footer">
                                            <div class="form-group">
                                                <label for="" class="col-sm-4">Cuci Motor </label>
                                                <div class="col-sm-8">
                                                    <div class="checkbox">
                                                        <label>
                                                            <input type="radio" v-model="cuci" value="true">
                                                            Ya
                                                        </label>
                                                        &nbsp;
                                                        <label>
                                                            <input type="radio" v-model="cuci" value="false">
                                                            Tidak
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="border-custom">
                                        <div class="box-sub-header">
                                            <table style="width: 100%;">
                                                <tr>
                                                    <th style="width: 70%;">Total</th>
                                                    <th>Rp. {{ convertToRupiah(total) }}</th>
                                                </tr>
                                            </table>
                                        </div>                                
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="border-custom">
                                    <div class="box-sub-header">
                                        <center><h3 class="box-sub-title"><strong>Saran Ganti Sparepart</strong></h3></center>
                                    </div>
                                    <div class="box-body">
                                        <table class="table">
                                            <tbody>
                                            <tr style="text-align: center;">
                                                <th>Periode Ganti (Km)</th>
                                                <th>Sparepart</th>
                                                <th>Stok</th>
                                            </tr>
                                            <tr :class="{'item-tr-center': km >= spare.km, 'sparepartSelect': cekSparepartExist(spare) == false}" v-for="(spare, i) in listSpareparts" @click="addSparepart(spare)">
                                                <td>{{ spare.km }}</td>
                                                <td>{{ spare.name }}</td>
                                                <td>
                                                    <span v-if="cekStok(spare.name)" class="label label-success">Ada</span>
                                                    <span v-else class="label label-warning">Habis</span>
                                                </td>
                                            </tr>        
                                        </tbody></table>
                                    </div>
                                    <!-- /.box-body -->
                                    <div class="box-sub-header">
                                        <center><h3 class="box-sub-title"><strong>Paket Tambahan</strong></h3></center>
                                    </div>
                                    <div class="box-body">
                                        <table class="table">
                                            <tbody>
                                            <tr style="text-align: center;">
                                                <th>Periode Ganti (Km)</th>
                                                <th>Service</th>
                                                <th>Status</th>
                                            </tr>

                                            <tr :class="{'item-tr-center': km >= ser.km, 'sparepartSelect': cekServiceExist(ser) == false}" v-for="ser in listServices" @click="addServicesSelected(ser)">
                                                <td>{{ ser.km }}</td>
                                                <td>{{ ser.name }}</td>
                                                <td>
                                                    <span v-if="cekStatus(ser.name)" class="label label-success">Tersedia</span>
                                                    <span v-else class="label label-warning">Tidak Tersedia</span>
                                                </td>
                                            </tr>           
                                        </tbody></table>
                                    </div>
                                    <!-- /.box-body -->
                                </div>
                            </div>
                        </div>

                        <div class="row">
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
                                                <td style="border-right: 1px solid #dd4b39;"><input v-model="estimasiKonsumen" type="checkbox"></td>
                                                <td><input v-model="estimasiAdvisor" type="checkbox"></td>
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
                                                <td style="border-right: 1px solid #dd4b39;"><input v-model="tambahanKonsumen" type="checkbox"></td>
                                                <td><input v-model="tambahanAdvisor" type="checkbox"></td>
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
                                                <td><input v-text="penyerahanKonsumen" type="checkbox"></td>
                                            </tr>
                                        </table>
                                    </div>
                                    <!-- /.box-body -->
                                </div>
                            </div>
                        </div>                        
                    </div>
                    <div class="box-footer" v-if="halaman == 2">
                        <button @click.prevent="halaman = 1" class="btn btn-danger pull-left">Previous</button>
                        <button type="submit" :disabled="notFinish" class="btn btn-primary pull-right">Finish</button>                        
                        <div class="pull-right" style="margin: 3px 0px 0px 15px;">
                            <label>
                                <input v-model="isPrint" type="checkbox"> Print    &nbsp; &nbsp;
                            </label>
                        </div>                        
                    </div>
                    <div class="box-footer" v-else-if="halaman == 1">
                        <button @click.prevent="halaman = 2" class="btn btn-warning pull-right" :disabled="isNext()">Next</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <b-modal id="myModal">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>KM</th>
                        <th>Jasa</th>
                        <th>Part</th>
                        <th>Mekanik</th>
                        <th>Front Desk</th>
                        <th>Biaya</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="history in histories">
                        <td v-text="history.tanggal"></td>
                        <td v-text="history.km"></td>
                        <td>
                            <ul>
                                <li v-for="jasa in history.jasa" v-text="jasa.name"></li>
                            </ul>
                        </td>
                        <td></td>
                        <td v-text="history.mekanik"></td>
                        <td v-text="history.frontdesk"></td>
                        <td v-text="history.biaya"></td>
                    </tr>
                </tbody>
            </table>
        </b-modal>
        </div>
        <printpendaftaran :datas="this.$data"></printpendaftaran>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import additional from '../helpers/additional';
import register from '../api/register';
import axios from 'axios';
import printpendaftaran from './PrintPendaftaran.vue';
import { EventBus } from '../event';

@Component({
    components:{
        printpendaftaran
    },
    beforeRouteLeave(to, from , next) {
    const answer = window.confirm('Yakin ingin keluar dari halaman ini? perubahan tidak akan tersimpan');
    if (answer) {
            next();
        } else {
            next(false);
        }
    },
})

export default class Register extends Vue {
    public halaman: number             = 1;
    public noPolisi: string           = '';
    public tglService: any            = new Date();
    public noMesin: string            = '';
    public noRangka: string           = '';
    public type: any[]                 = [];
    public types: any[]                = [];
    public tahun: number               = 0;
    public namaPembawa: string        = '';
    public noTelp: string             = '';
    public email: string               = '';
    public sosmed: string              = '';

    public namaPemilik: string        = '';
    public alamat: string              = '';
    public keluhanKonsumen: any[]     = [];
    public analisa_service: string     = '';
    public saranMekanik: string       = '';
    public buttonHistory: boolean     = false;
    public keluhanInput: string       = '';
    public editKeluhan: number        = 0;
    public histories: any[]            = [];
    public servicesSelected: any[]    = [];
    public sparepartsSelected: any[]  = [];
    public spareparts: any[]           = [];
    public services: any[]             = [];
    public servicesOwn: any[]         = [];
    public sparepartsOwn: any[]       = [];
    public km: number                  = 0;
    public jenisService: string       = '';
    public listSpareparts: any[]     = [
        {name: 'Busi', km: 8000},
        {name: 'Oil Transmisi', km: 8000},
        {name: 'Coolant', km: 12000},
        {name: 'Filter Udara', km: 16000},
        {name: 'Ban Depan', km: 24000},
        {name: 'Ban Belakang', km: 24000},
        {name: 'Rantai', km: 24000},
        {name: 'Driver Belt', km: 24000},
        {name: 'Kampas Rem', km: 24000},
        {name: 'Aki', km: 24000},
    ];
    public listServices: any[]       = [
        {name: 'Injector Cleaner', km: 4000},
        {name: 'Pembersih CVT', km: 8000},
        {name: 'Kuras Tangki', km: 12000},
        {name: 'Kuras Radiator', km: 12000},
        {name: 'Carbon Celaner', km: 12000},
    ];
    public total: number                      = 0;
    public estimasiKonsumen: boolean          = false;
    public estimasiAdvisor: boolean           = false;
    public tambahanKonsumen: boolean          = false;
    public tambahanAdvisor: boolean           = false;
    public penyerahanKonsumen: boolean        = false;
    public products: any[]                    = [];
    public multipleService: any[]             = [];
    public multipleSparepart: any[]           = [];

    public notFinish: boolean                 = true;
    public noUrut: string                     = '';
    public cuci: string                       = '';
    public isPrint: boolean                   = true;

    public created() {
        register.cekSO().then((res) => {
            this.types   = res.data.results[0].tipe_motor;

            this.noUrut = res.data.results[0].name;

            this.products = res.data.results[0].product;

            this.spareparts = this.products.filter((el: any) => {
                return el.product_type !== 'service';
            });

            this.services = this.products.filter((el: any) => {
                return el.product_type === 'service';
            });

            this.servicesOwn = this.services;

            this.sparepartsOwn = this.spareparts;
        });
    }

    public cekNopol(): void {
        register.cekNopol({nopol: this.noPolisi.toUpperCase()})
                .then((res) => {
                    if (res.data) {
                        const data = res.data.results[0];

                        this.noMesin       = data.noMesin;
                        this.noRangka      = data.noRangka;
                        this.tahun          = data.tahun;
                        this.namaPemilik   = data.namaPemilik;
                        this.noTelp        = data.telp_pemilik;
                        this.email          = data.email_pemilik;
                        this.sosmed         = data.sosmed;

                        this.histories      = data.history;
                    }
                });
    }

    public cekStok(name: string): boolean {
        const pro = this.products.filter((el: any) => {
            const models = `${ el.make }${ el.name_model }`;
            return el.name === name && models.toUpperCase() === (this.type.length > 0) ? this.type.name.replace(/\s+/g, '').toUpperCase() : 'false';
        });

        if (pro[0]) {
            if (pro[0].qty_available > 0) { return true; }
        }

        return false;
    }

    public cekStatus(name: string): boolean {
        const pro = this.products.filter((el: any) => {
            const models = `${ el.make }${ el.name_model }`;
            return el.name === name && models.toUpperCase() === (this.type.length > 0) ? this.type.name.replace(/\s+/g, '').toUpperCase() : 'false';
        });
        if (pro[0]) { return true; }
        return false;
    }
    public cekSparepartSelect(index: number): boolean {
        return this.sparepartsSelected.indexOf(this.spareparts[index]) < 0;
    }
    public cekServiceSelect(index: number): boolean {
        return this.servicesSelected.indexOf(this.services[index]) < 0;
    }
    public findIndexSparepart(i: any): number {
        return this.spareparts.findIndex((x) => x.name === i.name && `${ x.make }${ x.name_model }`.toUpperCase() === (this.type.length > 0) ? this.type.name.replace(/\s+/g, '').toUpperCase() : 'false');
    }
    public findIndexService(i: any): number {
        return this.services.findIndex((x) => x.name === i.name && `${ x.make }${ x.name_model }`.toUpperCase() === (this.type.length > 0) ? this.type.name.replace(/\s+/g, '').toUpperCase() : 'false');
    }
    public cekSparepartExist(i: any): boolean {
        return this.cekSparepartSelect(this.findIndexSparepart(i));
    }
    public cekServiceExist(i: any): boolean {
        return this.cekServiceSelect(this.findIndexService(i));
    }
    public addServicesSelected(ser: any): void {
        const index: number = this.findIndexService(ser);

        if (index > 0) {
            if (this.cekServiceSelect(index)) {
                this.servicesSelected.push(this.services[index]);
            }
        }
    }
    public addSparepart(i: any): any {
        if (this.cekStok(i.name)) {
            const index: number = this.findIndexSparepart(i);
            if (this.cekSparepartSelect(index)) {
                this.spareparts[index].push({qty: 1});

                this.sparepartsSelected.push(this.spareparts[index]);
            }
        }
    }
    public convertToRupiah(angka: number): string {
        return additional.convertToRupiah(angka);
    }
    public addKeluhan(): void {
        this.keluhanKonsumen.push({ nama: this.keluhanInput });
        this.keluhanInput = '';
    }
    public deleteKeluhan(i: any): void {
        this.keluhanKonsumen.splice(i - 1, 1);
    }
    public updateKeluhan(i: any): void {
        this.editKeluhan  = i;
        this.keluhanInput = this.keluhanKonsumen[i - 1].nama;
    }
    public saveKeluhan(i: any): void {
        this.keluhanKonsumen[i - 1].nama = this.keluhanInput;
        this.editKeluhan  = 0;
        this.keluhanInput = '';
    }
    public addMultipleService(): void {
        this.multipleService.forEach((el: any) => {
            if (this.servicesSelected.indexOf(el) < 0) {
                this.servicesSelected.push(el);
            }
        });
    }
    public addMultipleSparepart(): void {
        this.multipleSparepart.forEach((el: any) => {
            if (this.sparepartsSelected.indexOf(el) < 0) {
                el.qty = 1;

                this.sparepartsSelected.push(el);
            }
        });
    }

    public updateSparepartQty(event: any, i: number): void {
        this.sparepartsSelected[i - 1].qty = event.target.value;
    }

    public refreshTotal(): void {
        this.total = 0;
        this.sparepartsSelected.forEach((el: any) => {
            this.total += parseInt(el.harga);
        });
        this.servicesSelected.forEach((el: any) => {
            this.total += parseInt(el.harga);
        });
    }
    public removeSparepart(i: any): void {
        this.sparepartsSelected.splice(i - 1, 1);
    }
    public removeService(i: any): void {
        this.servicesSelected.splice(i - 1, 1);
    }
    public isNext() {
        if (this.noPolisi === '') { return true; }
        if (this.tglService === '') { return true; }
        if (this.noTelp === '') { return true; }
        if (this.type.length > 0) { return true; }
        if (this.namaPemilik === '') { return true; }
        return false;
    }
    public finish(): void {
        EventBus.$emit('finish', this.$data);

        if(this.isPrint) window.print()

        register.createRegister(this.$data);
    }

    public cekFinish(): void {
        if (this.sparepartsSelected.length > 0 || this.servicesSelected.length > 0) {
            this.notFinish = false;

            return;
        }

        this.notFinish     = true;
    }

    @Watch('noPolisi')
    public onNoPolisiChanged(val: string) {
        if (val === '') {
            this.buttonHistory  = false;
        } else {
            this.buttonHistory  = true;
        }
    }

    @Watch('sparepartsSelected')
    public onSperpatedChange() {
        this.refreshTotal();

        this.cekFinish();
    }

    @Watch('servicesSelected')
    public onServicesChange() {
        this.refreshTotal();

        this.cekFinish();
    }
}
</script>

<style>
@import '../assets/adminLTE/css/custom.css';
</style>