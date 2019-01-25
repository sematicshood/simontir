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
                                    </dir><div class="form-group">
                                        <label for="">No. Polisi</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" v-model="no_polisi">
                                            <span class="input-group-btn">
                                            <button v-if="button_history" type="button" v-b-modal="'myModal'" @click="loadHistory()" class="btn btn-success btn-flat">History</button>
                                            </span>
                                        </div>
                                        <br>
                                        <b-modal id="myModal">
                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Tanggal</th>
                                                        <th>Riwayat</th>
                                                        <th>Biaya</th>
                                                        <th>KM</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-for="history in histories">
                                                    <tr>
                                                        <td v-text="history['Order Date']"></td>
                                                        <td v-text="history['Order Lines/Product/Name']"></td>
                                                        <td v-text="history['Order Lines/Unit Price']"></td>
                                                        <td v-text="history['Last Odometer']"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </b-modal>
                                    </div><div class="form-group">
                                        <label for="">No. Urut</label>
                                        <input disabled type="text" class="form-control" id="" placeholder="">
                                    </div>
                                    <div class="form-group">
                                        <label for="">Tgl. Servis</label>
                                        <input type="date" class="form-control" id="" placeholder="" v-model="tgl_service">
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
                                            <option v-for="ty in types" :value="ty.name">{{ ty.name }}</option>
                                        </select>
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
                                        <input type="text" class="form-control" id="" placeholder="" v-model="nama_pembawa">
                                    </div><div class="form-group">
                                        <label for="">No. Telp/HP</label>
                                        <input type="number" class="form-control" id="" placeholder="" v-model="no_telp">
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
                                        <input type="text" class="form-control" id="" placeholder="" v-model="nama_pemilik">
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
                        <div class="box box-danger col-lg-8">
                            <div class="row" style="margin-top: 10px; border">
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">KM </label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="km" placeholder="KM">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-6 control-label">Jenis Servis </label>
                                    <div class="col-sm-6">
                                        <select name="" id="" v-model="jenis_service" class="form-control">
                                            <option value="reguler">Reguler</option>
                                            <option value="Light Repair">Light Repair</option>
                                            <option value="Booking Service">Booking Service</option>
                                        </select>
                                    </div>
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
                                                <td>Rp. {{ convertToRupiah(service.list_price) }}</td>
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
                                                <td>Rp. {{ convertToRupiah(service.list_price) }}</td>
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
                                                <td>Rp. {{ convertToRupiah(sparepart.list_price) }}</td>
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
                                                <th>Harga</th>
                                                <th style="width: 40px">Action</th>
                                            </tr>
                                            <tr v-for="(sparepart, i) in spareparts_selected">
                                                <td>{{ i += 1 }}</td>
                                                <td>{{ sparepart.name }}</td>
                                                <td>Rp. {{ convertToRupiah(sparepart.list_price) }}</td>
                                                <td>
                                                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-trash" @click="removeSparepart(i)"></i></button>
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
                                            <th>Rp. {{ convertToRupiah(total) }}</th>
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
                    <div class="box-footer" v-if="halaman == 2">
                        <button @click.prevent="halaman = 1" class="btn btn-danger pull-left">Previous</button>
                        <button type="submit" class="btn btn-primary pull-right">Finish</button>
                    </div>
                    <div class="box-footer" v-else-if="halaman == 1">
                        <button @click.prevent="halaman = 2" :disabled="isNext()" class="btn btn-warning pull-right" >Next</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch, mixins } from 'vue-property-decorator';
    import additional from '../helpers/additional'
    @Component({
        components: {},
    })
    export default class Register extends Vue {
        halaman: number             = 2
        no_polisi: string           = ""
        tgl_service: string         = ""
        no_mesin: string            = ""
        no_rangka: string           = ""
        type: string                = ""
        types: Array<string>        = JSON.parse(localStorage.getItem('types'))
        tahun: number               = ""
        nama_pembawa: string        = ""
        no_telp: string             = ""
        email: string               = ""
        sosmed: string              = ""
        
        nama_pemilik: string        = ""
        alamat: string              = ""
        keluhan_konsumen: Array<string>    = []
        analisa_service: string            = ""
        saran_mekanik: string              = ""
        button_history: boolean            = false
        keluhan_input: string              = ""
        edit_keluhan: number               = 0
        keluhan_input: string              = ""
        histories: Array<string>           = []
        services_selected: Array<string>   = []
        spareparts_selected: Array<string> = []
        spareparts: Array<string>          = []
        services: Array<string>            = []
        services_own: Array<string>        = []
        km: number                         = 0
        jenis_service: string              = "Regular"
        list_spareparts: Array<string>     = [
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
        ]
        list_services: Array<string>       = [
            {name: 'Injector Cleaner', km: 4000},
            {name: 'Pembersih CVT', km: 8000},
            {name: 'Kuras Tangki', km: 12000},
            {name: 'Kuras Radiator', km: 12000},
            {name: 'Carbon Celaner', km: 12000}
        ]
        total: number                      = 0
        estimasi_konsumen: boolean         = false
        estimasi_advisor: boolean          = false
        tambahan_konsumen: boolean         = false
        tambahan_advisor: boolean          = false
        penyerahan_konsumen: boolean       = false
        products: Array<string>            = JSON.parse(localStorage.getItem('products'))
        multiple_service: Array<string>    = []
        multiple_sparepart: Array<string>  = []
        created() {
            this.spareparts = this.products.filter(el => {
                return el.type == 'Stockable Product'
            })
            this.services = this.products.filter(el => {
                return el.type == 'Service'
            })
            this.services_own = this.services.filter(el => {
                let models = `${ el.make }${ el.name_model }`
                return models.toUpperCase() == this.type.replace(/\s+/g, '').toUpperCase()
            })
            this.spareparts_own = this.spareparts.filter(el => {
                let models = `${ el.make }${ el.name_model }`
                
                return models.toUpperCase() == this.type.replace(/\s+/g, '').toUpperCase()
            })
        }
        cekStok(name): void {
            let pro = this.products.filter(el => {
                let models = `${ el.make }${ el.name_model }`
                return el.name == name && models.toUpperCase() == this.type.replace(/\s+/g, '').toUpperCase();
            })
            if(pro[0])
                if(pro[0].qty_available > 0) return true
            return false
        }
        cekStatus(name): void {
            let pro = this.products.filter(el => {
                let models = `${ el.make }${ el.name_model }`
                return el.name == name && models.toUpperCase() == this.type.replace(/\s+/g, '').toUpperCase();
            })
            if(pro[0]) return true
            return false
        }
        cekSparepartSelect(index): void {
            return this.spareparts_selected.indexOf(this.spareparts[index]) < 0
        }
        cekServiceSelect(index): void {
            return this.services_selected.indexOf(this.services[index]) < 0
        }
        findIndexSparepart(i): void {
            return this.spareparts.findIndex(x => x.name == i.name && `${ x.make }${ x.name_model }`.toUpperCase() == this.type.replace(/\s+/g, '').toUpperCase())
        }
        findIndexService(i): void {
            return this.services.findIndex(x => x.name == i.name && `${ x.make }${ x.name_model }`.toUpperCase() == this.type.replace(/\s+/g, '').toUpperCase())
        }
        cekSparepartExist(i): void {
            return this.cekSparepartSelect(this.findIndexSparepart(i))
        }
        cekServiceExist(i): void {
            return this.cekServiceSelect(this.findIndexService(i))
        }
        addServicesSelected(ser): void {
            let index = this.findIndexService(ser);
            
            if(index > 0)
                if(this.cekServiceSelect(index))
                    this.services_selected.push(this.services[index])
        }
        addSparepart(i): void {
            if(this.cekStok(i.name)) {
                let index = this.findIndexSparepart(i);
                if(this.cekSparepartSelect(index))
                    this.spareparts_selected.push(this.spareparts[index])
            }
        }
        convertToRupiah(angka): void {
            return additional.convertToRupiah(angka)
        }
        addKeluhan(): void {
            this.keluhan_konsumen.push({ nama: this.keluhan_input })
            this.keluhan_input = ""
        }
        deleteKeluhan(i): void {
            this.keluhan_konsumen.splice(i - 1,1)
        }
        editKeluhan(i): void {
            this.edit_keluhan  = i
            this.keluhan_input = this.keluhan_konsumen[i - 1].nama
        }
        saveKeluhan(i): void {
            this.keluhan_konsumen[i - 1].nama = this.keluhan_input
            this.edit_keluhan  = 0
            this.keluhan_input = ""
        }
        addMultipleService(): void {
            this.multiple_service.forEach(el => {
                if(this.services_selected.indexOf(el) < 0)
                    this.services_selected.push(el)
            })
        }
        addMultipleSparepart(): void {
            this.multiple_sparepart.forEach(el => {
                if(this.spareparts_selected.indexOf(el) < 0)
                    this.spareparts_selected.push(el)
            })
        }
        loadHistory(): void {
            let his = JSON.parse(localStorage.getItem('history')),
                h   = his.filter(el => {
                    return el['License Plate'] == this.no_polisi
                })
            this.histories = h
        }
        refreshTotal(): void {
            this.total = 0
            this.spareparts_selected.forEach(el => {
                this.total += parseInt(el.list_price)
            })
            this.services_selected.forEach(el => {
                this.total += parseInt(el.list_price)
            })
        }
        removeSparepart(i): void {
            this.spareparts_selected.splice(i-1,1)
        }
        removeService(i): void {
            this.services_selected.splice(i-1,1)
        }
        isNext() {
            if(this.no_polisi == "") return true
            if(this.tgl_service == "") return true
            if(this.no_mesin == "") return true
            if(this.no_rangka == "") return true
            if(this.no_telp == "") return true
            if(this.type == "") return true
            if(this.tahun == "") return true
            if(this.nama_pemilik == "") return true
            if(this.nama_pembawa == "") return true
            if(this.email == "") return true
            if(this.sosmed == "") return true
            if(this.alamat == "") return true
            return false
        }
        finish(): void {
            console.log(this.$data)
        }
        
        @Watch('no_polisi')
        onNoPolisiChanged(val: string) {
            if(val == "")
                this.button_history  = false
            else
                this.button_history  = true
        }
        @Watch('spareparts_selected')
        onSperpatedChange() {
            this.refreshTotal()
        }
        @Watch('services_selected')
        onServicesChange() {
            this.refreshTotal()
        }
    }
</script>

<style>
@import '../assets/adminLTE/css/custom.css';
</style>