<template>
    <div>
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
                                            <input type="text" class="form-control" v-model="no_polisi" @change="cekNopol">
                                            <span class="input-group-btn">
                                            <button v-if="button_history" type="button" v-b-modal="'myModal'" class="btn btn-success btn-flat">History</button>
                                            </span>
                                        </div>
                                        <span>*) Wajib diisi</span>
                                    </div>
                                        
                                    <div class="form-group">
                                        <label for="" class="control-label">Jenis Servis </label>
                                        <select name="" id="" v-model="jenis_service" class="form-control">
                                            <option value="reguler">Reguler</option>
                                            <option value="Light Repair">Light Repair</option>
                                            <option value="Booking Service">Booking Service</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="">No. Urut</label>
                                        <input disabled type="text" v-model="no_urut" class="form-control" id="" placeholder="">
                                    </div>
                                    <div class="form-group">
                                        <label for="">Tgl. Servis</label>
                                        <input type="date" class="form-control" id="date" placeholder="" :value="tgl_service.toISOString().split('T')[0]" @input="tgl_service = $event.target.valueAsDate">
                                    </div>
                                    <div class="form-group">
                                        <label for="">No. Mesin</label>
                                        <input type="number" class="form-control" id="" placeholder="" v-model="no_mesin">
                                    </div>
                                    <div class="form-group">
                                        <label for="">No. Rangka</label>
                                        <input type="number" class="form-control" id="" placeholder="" v-model="no_rangka">
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
                                        <input type="text" class="form-control" id="" placeholder="" v-model="nama_pemilik">
                                        <span>*) Wajib diisi</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="">No. Telp/HP</label>
                                        <input type="number" class="form-control" id="" placeholder="" v-model="no_telp">
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
                                        <input type="text" class="form-control" id="" placeholder="" v-model="nama_pembawa">
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
                                            <input type="text" v-model="keluhan_input" class="form-control" id="" placeholder="">
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
                                            <tr v-for="(keluhan, i) in keluhan_konsumen">
                                                <td>{{ i += 1 }}</td>
                                                <td>
                                                    <span v-if="edit_keluhan != i">{{ keluhan.nama }}</span>
                                                    <input v-else-if="edit_keluhan == i" class="form-control" v-model="keluhan_input"></input>
                                                </td>
                                                <td><input disabled type="checkbox"></td>
                                                <td v-if="edit_keluhan != i">
                                                    <div class="btn-group btn-sm">
                                                        <button type="button" @click="editKeluhan(i)" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                                                        <button type="button" @click="deleteKeluhan(i)" class="btn btn-default btn-sm"><i class="fa fa-trash"></i></button>
                                                    </div>
                                                </td>
                                                <td v-else-if="edit_keluhan == i">
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
                                        <textarea class="form-control" rows="3" placeholder="Enter ..." v-model="saran_mekanik"></textarea>
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
                                                    <tr v-for="(service, i) in services_own">
                                                        <td>{{ i += 1 }}</td>
                                                        <td>{{ service.name }}</td>
                                                        <td>Rp. {{ convertToRupiah(service.harga) }}</td>
                                                        <td>
                                                            <input type="checkbox" v-model="multiple_service" :value="service">
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
                                                    <tr v-for="(service, i) in services_selected">
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
                                                    <tr v-for="(sparepart, i) in spareparts_own">
                                                        <td>{{ i += 1 }}</td>
                                                        <td>{{ sparepart.name }}</td>
                                                        <td>Rp. {{ convertToRupiah(sparepart.harga) }}</td>
                                                        <td>
                                                            <input type="checkbox" v-model="multiple_sparepart" :value="sparepart">
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
                                                    <tr v-for="(sparepart, i) in spareparts_selected">
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
                                            <tr :class="{'item-tr-center': km >= spare.km, 'sparepartSelect': cekSparepartExist(spare) == false}" v-for="(spare, i) in list_spareparts" @click="addSparepart(spare)">
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

                                            <tr :class="{'item-tr-center': km >= ser.km, 'sparepartSelect': cekServiceExist(ser) == false}" v-for="ser in list_services" @click="addServicesSelected(ser)">
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
                                                <td style="border-right: 1px solid #dd4b39;"><input v-model="estimasi_konsumen" type="checkbox"></td>
                                                <td><input v-model="estimasi_advisor" type="checkbox"></td>
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
                                                <td style="border-right: 1px solid #dd4b39;"><input v-model="tambahan_konsumen" type="checkbox"></td>
                                                <td><input v-model="tambahan_advisor" type="checkbox"></td>
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
                                                <td><input v-text="penyerahan_konsumen" type="checkbox"></td>
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
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import additional from '../helpers/additional';
import register from '../api/register';
import axios from 'axios';

@Component({
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
    public no_polisi: string           = '';
    public tgl_service: any            = new Date();
    public no_mesin: string            = '';
    public no_rangka: string           = '';
    public type: any[]                 = [];
    public types: any[]                = [];
    public tahun: number               = 0;
    public nama_pembawa: string        = '';
    public no_telp: string             = '';
    public email: string               = '';
    public sosmed: string              = '';

    public nama_pemilik: string        = '';
    public alamat: string              = '';
    public keluhan_konsumen: any[]     = [];
    public analisa_service: string     = '';
    public saran_mekanik: string       = '';
    public button_history: boolean     = false;
    public keluhan_input: string       = '';
    public edit_keluhan: number        = 0;
    public histories: any[]            = [];
    public services_selected: any[]    = [];
    public spareparts_selected: any[]  = [];
    public spareparts: any[]           = [];
    public services: any[]             = [];
    public services_own: any[]         = [];
    public spareparts_own: any[]       = [];
    public km: number                  = 0;
    public jenis_service: string       = '';
    public list_spareparts: any[]     = [
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
    public list_services: any[]       = [
        {name: 'Injector Cleaner', km: 4000},
        {name: 'Pembersih CVT', km: 8000},
        {name: 'Kuras Tangki', km: 12000},
        {name: 'Kuras Radiator', km: 12000},
        {name: 'Carbon Celaner', km: 12000},
    ];
    public total: number                      = 0;
    public estimasi_konsumen: boolean         = false;
    public estimasi_advisor: boolean          = false;
    public tambahan_konsumen: boolean         = false;
    public tambahan_advisor: boolean          = false;
    public penyerahan_konsumen: boolean       = false;
    public products: any[]                    = [];
    public multiple_service: any[]            = [];
    public multiple_sparepart: any[]          = [];

    public notFinish: boolean                 = true;
    public no_urut: string                    = '';
    public cuci: string                       = '';

    public created() {
        register.cekSO().then((res) => {
            this.types   = res.data.results[0].tipe_motor;

            this.no_urut = res.data.results[0].name;

            this.products = res.data.results[0].product;

            this.spareparts = this.products.filter((el: any) => {
                return el.product_type !== 'service';
            });

            this.services = this.products.filter((el: any) => {
                return el.product_type === 'service';
            });

            this.services_own = this.services;

            this.spareparts_own = this.spareparts;
        });
    }

    public cekNopol(): void {
        register.cekNopol({nopol: this.no_polisi.toUpperCase()})
                .then((res) => {
                    if (res.data) {
                        const data = res.data.results[0];

                        this.no_mesin       = data.no_mesin;
                        this.no_rangka      = data.no_rangka;
                        this.tahun          = data.tahun;
                        this.nama_pemilik   = data.nama_pemilik;
                        this.no_telp        = data.telp_pemilik;
                        this.email          = data.email_pemilik;
                        this.sosmed         = data.sosmed;

                        this.histories      = data.history;
                    }
                });
    }

    public cekStok(name: string): boolean {
        const pro = this.products.filter((el: any) => {
            const models = `${ el.make }${ el.name_model }`;
            return el.name === name && models.toUpperCase() === this.type[0].name.replace(/\s+/g, '').toUpperCase();
        });

        if (pro[0]) {
            if (pro[0].qty_available > 0) { return true; }
        }

        return false;
    }

    public cekStatus(name: string): boolean {
        const pro = this.products.filter((el: any) => {
            const models = `${ el.make }${ el.name_model }`;
            return el.name === name && models.toUpperCase() === this.type[0].name.replace(/\s+/g, '').toUpperCase();
        });
        if (pro[0]) { return true; }
        return false;
    }
    public cekSparepartSelect(index: number): boolean {
        return this.spareparts_selected.indexOf(this.spareparts[index]) < 0;
    }
    public cekServiceSelect(index: number): boolean {
        return this.services_selected.indexOf(this.services[index]) < 0;
    }
    public findIndexSparepart(i: any): number {
        return this.spareparts.findIndex((x) => x.name === i.name && `${ x.make }${ x.name_model }`.toUpperCase() === this.type[0].name.replace(/\s+/g, '').toUpperCase());
    }
    public findIndexService(i: any): number {
        return this.services.findIndex((x) => x.name === i.name && `${ x.make }${ x.name_model }`.toUpperCase() === this.type[0].name.replace(/\s+/g, '').toUpperCase());
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
                this.services_selected.push(this.services[index]);
            }
        }
    }
    public addSparepart(i: any): any {
        if (this.cekStok(i.name)) {
            const index: number = this.findIndexSparepart(i);
            if (this.cekSparepartSelect(index)) {
                this.spareparts[index].push({qty: 1});

                this.spareparts_selected.push(this.spareparts[index]);
            }
        }
    }
    public convertToRupiah(angka: number): string {
        return additional.convertToRupiah(angka);
    }
    public addKeluhan(): void {
        this.keluhan_konsumen.push({ nama: this.keluhan_input });
        this.keluhan_input = '';
    }
    public deleteKeluhan(i: any): void {
        this.keluhan_konsumen.splice(i - 1, 1);
    }
    public editKeluhan(i: any): void {
        this.edit_keluhan  = i;
        this.keluhan_input = this.keluhan_konsumen[i - 1].nama;
    }
    public saveKeluhan(i: any): void {
        this.keluhan_konsumen[i - 1].nama = this.keluhan_input;
        this.edit_keluhan  = 0;
        this.keluhan_input = '';
    }
    public addMultipleService(): void {
        this.multiple_service.forEach((el: any) => {
            if (this.services_selected.indexOf(el) < 0) {
                this.services_selected.push(el);
            }
        });
    }
    public addMultipleSparepart(): void {
        this.multiple_sparepart.forEach((el: any) => {
            if (this.spareparts_selected.indexOf(el) < 0) {
                el.qty = 1;

                this.spareparts_selected.push(el);
            }
        });
    }

    public updateSparepartQty(event: any, i: number): void {
        this.spareparts_selected[i - 1].qty = event.target.value;
    }

    public refreshTotal(): void {
        this.total = 0;
        this.spareparts_selected.forEach((el: any) => {
            this.total += parseInt(el.harga);
        });
        this.services_selected.forEach((el: any) => {
            this.total += parseInt(el.harga);
        });
    }
    public removeSparepart(i: any): void {
        this.spareparts_selected.splice(i - 1, 1);
    }
    public removeService(i: any): void {
        this.services_selected.splice(i - 1, 1);
    }
    public isNext() {
        if (this.no_polisi === '') { return true; }
        if (this.tgl_service === '') { return true; }
        if (this.no_telp === '') { return true; }
        if (this.type.length > 0) { return true; }
        if (this.nama_pemilik === '') { return true; }
        return false;
    }
    public finish(): void {
        register.createRegister(this.$data);
    }

    public cekFinish(): void {
        if (this.spareparts_selected.length > 0 || this.services_selected.length > 0) {
            this.notFinish = false;

            return;
        }

        this.notFinish     = true;
    }

    @Watch('no_polisi')
    public onNoPolisiChanged(val: string) {
        if (val === '') {
            this.button_history  = false;
        } else {
            this.button_history  = true;
        }
    }

    @Watch('spareparts_selected')
    public onSperpatedChange() {
        this.refreshTotal();

        this.cekFinish();
    }

    @Watch('services_selected')
    public onServicesChange() {
        this.refreshTotal();

        this.cekFinish();
    }
}
</script>

<style>
@import '../assets/adminLTE/css/custom.css';
</style>