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
                                        <nopolAutocomplete 
                                            :value="noPolisi" 
                                            :placeholder="'Nomer Polisi Kendaraan'"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Warna Kendaraan</label>
                                        <autocomplete :colors="colors" :value="warnaKendaraan"/>
                                        <span>*) Wajib diisi</span>
                                    </div>
                                        
                                    <div class="form-group">
                                        <label for="" class="control-label">Jenis Antrian </label>
                                        <br/>
                                        <button type="button" :class="{'btn': true, 'btn-sm': 'true', 'btn-primary': isJenisSelect('reguler'), 'btn-danger': isNotJenisSelect('reguler')}" @click="jenisService = 'reguler'">Reguler</button> &nbsp;
                                        <button type="button" :class="{'btn': true, 'btn-sm': 'true', 'btn-primary': isJenisSelect('Light Repair'), 'btn-danger': isNotJenisSelect('Light Repair')}" @click="jenisService = 'Light Repair'">Light Repair</button> &nbsp;
                                        <button type="button" :class="{'btn': true, 'btn-sm': 'true', 'btn-primary': isJenisSelect('Booking Service'), 'btn-danger': isNotJenisSelect('Booking Service')}" @click="jenisService = 'Booking Service'">Booking Service</button>
                                    </div>

                                    <!-- <div class="form-group">
                                        <label for="" class="control-label">Jenis Service</label>
                                        <br/>
                                        <button type="button" :class="{'btn': true, 'btn-sm': 'true', 'btn-primary': isJenisSelect('reguler'), 'btn-danger': isNotJenisSelect('reguler')}" @click="jenisService = 'reguler'">Reguler</button> &nbsp;
                                        <button type="button" :class="{'btn': true, 'btn-sm': 'true', 'btn-primary': isJenisSelect('Light Repair'), 'btn-danger': isNotJenisSelect('Light Repair')}" @click="jenisService = 'Light Repair'">Light Repair</button> &nbsp;
                                        <button type="button" :class="{'btn': true, 'btn-sm': 'true', 'btn-primary': isJenisSelect('Booking Service'), 'btn-danger': isNotJenisSelect('Booking Service')}" @click="jenisService = 'Booking Service'">Booking Service</button>
                                    </div>

                                    <div class="form-group">
                                        <label for="" class="control-label">Item Service</label>
                                        <br/>
                                        <button type="button" :class="{'btn': true, 'btn-sm': 'true', 'btn-primary': isJenisSelect('reguler'), 'btn-danger': isNotJenisSelect('reguler')}" @click="jenisService = 'reguler'">Reguler</button> &nbsp;
                                        <button type="button" :class="{'btn': true, 'btn-sm': 'true', 'btn-primary': isJenisSelect('Light Repair'), 'btn-danger': isNotJenisSelect('Light Repair')}" @click="jenisService = 'Light Repair'">Light Repair</button> &nbsp;
                                        <button type="button" :class="{'btn': true, 'btn-sm': 'true', 'btn-primary': isJenisSelect('Booking Service'), 'btn-danger': isNotJenisSelect('Booking Service')}" @click="jenisService = 'Booking Service'">Booking Service</button>
                                    </div> -->

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
                                        <input type="text" class="form-control" id="" placeholder="" v-model="noMesin">
                                    </div>
                                    <div class="form-group">
                                        <label for="">No. Rangka</label>
                                        <input type="text" class="form-control" id="" placeholder="" v-model="noRangka">
                                    </div>
                                    <div class="form-group">
                                        <label>Type</label>
                                        <model-select :options="types"
                                            v-model="type"
                                            placeholder="select type"/>
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
                                        <textarea class="form-control" rows="3" placeholder="Enter ..." v-model="analisaService"></textarea>
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
                                            <SearchAutocomplete 
                                                    :value="searchNameService" 
                                                    :type="'name'" 
                                                    :protype="'service'"
                                                    :placeholder="'Name Service'"/>
                                            <SearchAutocomplete 
                                                    :value="searchBarcodeService" 
                                                    :type="'barcode'"
                                                    :protype="'service'"
                                                    :placeholder="'Barcode Service'"/>
                                            <SearchAutocomplete 
                                                    :value="searchSimiliarService" 
                                                    :type="'similiar'"
                                                    :protype="'service'"
                                                    :placeholder="'Similiar Service'"/>

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
                                                        <input type="text" v-model="searchService" class="form-control pull-right" placeholder="Type to search..." style="height: 30px;">
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

                                            <SearchAutocomplete 
                                                    :value="searchNameSparepart" 
                                                    :type="'name'"
                                                    :protype="'product'"
                                                    :placeholder="'Name Sparepart'"/>
                                            <SearchAutocomplete 
                                                    :value="searchBarcodeService" 
                                                    :type="'barcode'"
                                                    :protype="'product'"
                                                    :placeholder="'Barcode Sparepart'"/>
                                            <SearchAutocomplete 
                                                    :value="searchSimiliarSparepart" 
                                                    :type="'similiar'"
                                                    :protype="'product'"
                                                    :placeholder="'Similiar Sparepart'"/>

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
                                                        <input type="text" v-model="searchSparepart" class="form-control pull-right" placeholder="Type to search" style="height: 30px;">
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
                                                        <td>Rp. {{ convertToRupiah(sparepart.harga * sparepart.qty) }}</td>
                                                        <td>
                                                            <button type="button" @click="removeSparepart(i)" class="btn btn-default btn-sm"><i class="fa fa-trash"></i></button>
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
        <b-modal id="myModal" size="xl">
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
                                <li v-for="jasa in history.jasa" v-text="jasa.description"></li>
                            </ul>
                        </td>
                        <td></td>
                        <td v-text="history.mekanik"></td>
                        <td v-text="history.frontdesk"></td>
                        <td>Rp. {{convertToRupiah(history.biaya)}}</td>
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
const ModelSelectSearch = require('vue-search-select');
const { ModelSelect } = ModelSelectSearch;
import autocomplete from '../components/Autocomplete.vue';
import SearchAutocomplete from '../components/SearchAutocomplete.vue';
import board from '@/api/board';
import nopolAutocomplete from '../components/NopolAutocomplete.vue';

@Component({
    components: {
        printpendaftaran, ModelSelect, autocomplete, SearchAutocomplete, nopolAutocomplete
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
    public halaman: number              = 1;
    public noPolisi: string             = '';
    public tglService: any              = new Date();
    public noMesin: string              = '';
    public noRangka: string             = '';
    public type: any                    = [];
    public types: any                   = [];
    public tahun: number                = 0;
    public namaPembawa: string          = '';
    public noTelp: string               = '';
    public email: string                = '';
    public sosmed: string               = '';

    public namaPemilik: string          = '';
    public alamat: string               = '';
    public keluhanKonsumen: any[]       = [];
    public analisaService: string       = '';
    public saranMekanik: string         = '';
    public buttonHistory: boolean       = false;
    public keluhanInput: string         = '';
    public editKeluhan: number          = 0;
    public histories: any[]             = [];
    public servicesSelected: any[]      = [];
    public sparepartsSelected: any[]    = [];
    public spareparts: any[]            = [];
    public services: any[]              = [];
    public servicesOwn: any[]           = [];
    public sparepartsOwn: any[]         = [];
    public km: number                   = 0;
    public jenisService: string         = 'reguler';
    public listSpareparts: any[]        = [
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

    public searchSparepart: string           = "";
    public searchService: string             = "";
    public colors: any                       = [];
    public warnaKendaraan: string            = "";
    public cekMesin: boolean                 = true;

    public searchNameService: string         = "";
    public searchBarcodeService: string      = "";
    public searchSimiliarService: string     = "";

    public searchNameSparepart: string         = "";
    public searchBarcodeSparepart: string      = "";
    public searchSimiliarSparepart: string     = "";

    public created() {
        EventBus.$on('changeValue', (value: string) => {
            this.warnaKendaraan = value;
        })

        EventBus.$on('cekNomesin', () => {
            this.cekNoMesin();
        })

        EventBus.$on('changeData', (val: any) => {
            const key: string = Object.keys(val)[0],
                  value: any  = Object.values(val)[0]
            
            this.$data[key] = value
        })

        EventBus.$on('addItem', (item: any) => {
            const data = {
                harga: item.item.list_price,
                id: item.item.id,
                name: item.item.name,
                product_type: item.item.type,
                stok: item.item.qty_available,
                qty: 1,
            }

            const cekIfExist = this.$data[item.type].filter((el: any) => {
                return el.id == item.item.id;
            }).length

            if (cekIfExist === 0) {
                this.$data[item.type].push(data)
            }
        })

        if(this.$route.params.so) {
            const so: any = this.$route.params.so;

            register.getDetailSo(so).then(res => {
                const result    =   res.data.results[0]

                if(result) {
                    this.halaman    =   2

                    const tgl   =   new Date(result.tgl_service)

                    this.noUrut         =   result.no_urut
                    this.noPolisi       =   this.cekData(result.nopol)
                    this.jenisService   =   result.antrian_service
                    this.cuci           =   result.is_wash
                    this.tglService     =   tgl
                    this.namaPemilik    =   result.nama_pemilik
                    this.noTelp         =   this.cekData(result.no_telp)
                    this.email          =   result.email
                    this.sosmed         =   result.sosmed
                    this.keluhanKonsumen    =   result.keluhan_konsumen
                    this.analisaService     =   this.cekData(result.analisa_service)
                    this.saranMekanik       =   this.cekData(result.saran_mekanik)
                    
                    const motor =   result.motor[0]

                    if(motor) {
                        this.noMesin    =   motor.no_mesin
                        this.noRangka   =   motor.no_rangka
                        this.type       =   motor.type
                        this.tahun      =   motor.tahun
                        this.km         =   motor.km
                    }

                    const pembawa   =   result.pembawa[0]

                    if(pembawa) {
                        this.namaPembawa    =   pembawa.nama
                        this.alamat         =   pembawa.alamat
                    }

                    result.sale_order_line.forEach((el: any) => {
                        const type  =   el.type

                        if(type == 'product') this.sparepartsSelected.push(el)
                        if(type == 'service') this.servicesSelected.push(el)
                    })
                }
            })

            register.cekSO().then((res) => {
                res.data.results[0].tipe_motor.forEach((el: any) => {
                    this.types.push({
                        "value": el,
                        "text": el.name
                    })
                })

                this.colors = res.data.colors;

                this.products = res.data.results[0].product;

                this.spareparts = this.products.filter((el: any) => {
                    return el.product_type !== 'service';
                });

                this.services = this.products.filter((el: any) => {
                    return el.product_type === 'service';
                });

                this.servicesOwn   = this.services.splice(0,10);

                this.sparepartsOwn = this.spareparts.splice(0,10);
            });
        } else {
            register.cekSO().then((res) => {
                res.data.results[0].tipe_motor.forEach((el: any) => {
                    this.types.push({
                        "value": el,
                        "text": el.name
                    })
                })

                this.colors = res.data.colors;

                this.noUrut = res.data.results[0].name;

                this.products = res.data.results[0].product;

                this.spareparts = this.products.filter((el: any) => {
                    return el.product_type !== 'service';
                });

                this.services = this.products.filter((el: any) => {
                    return el.product_type === 'service';
                });

                this.servicesOwn   = this.services.splice(0,10);

                this.sparepartsOwn = this.spareparts.splice(0,10);
            });
        }
    }

    getLabel (item: any): string {
        return item.color
    }

    updateItems (text: any): void {
      console.log(text)
    }

    public cekData(data: any): any {
        if(data) return data;

        return "";
    }

    public cekStok(name: string): boolean {
        const pro = this.products.filter((el: any) => {
            const models = `${ el.make }${ el.name_model }`;
            const nganu  = (this.type.length > 0) ? this.type.name.replace(/\s+/g, '').toUpperCase() : 'false';

            return el.name === name && models.toUpperCase() === nganu;
        });

        if (pro[0]) {
            if (pro[0].qty_available > 0) { return true; }
        }

        return false;
    }

    public cekStatus(name: string): boolean {
        const pro = this.products.filter((el: any) => {
            const models = `${ el.make }${ el.name_model }`;
            const nganu  = (this.type.length > 0) ? this.type.name.replace(/\s+/g, '').toUpperCase() : 'false';

            return el.name === name && models.toUpperCase() === nganu;
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
    public findIndexSparepart(i: any): any {
        const nganu: any = (this.type.length > 0) ? this.type.name.replace(/\s+/g, '').toUpperCase() : 'false';

        return this.spareparts.findIndex((x) => x.name === i.name && `${ x.make }${ x.name_model }`.toUpperCase() === nganu);
    }
    public findIndexService(i: any): any {
        const nganu: any = (this.type.length > 0) ? this.type.name.replace(/\s+/g, '').toUpperCase() : 'false';

        return this.services.findIndex((x) => x.name === i.name && `${ x.make }${ x.name_model }`.toUpperCase() === nganu);
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
        if(event.target.value >= 0) {
            this.sparepartsSelected[i - 1].qty = event.target.value;
        }
    }

    public isJenisSelect(service: string): boolean {
        return this.jenisService == service
    }

    public isNotJenisSelect(service: string): boolean {
        return this.jenisService != service
    }

    public refreshTotal(): void {
        this.total = 0;
        this.sparepartsSelected.forEach((el: any) => {
            this.total += (parseInt(el.harga, 10) * el.qty);
        });
        this.servicesSelected.forEach((el: any) => {
            this.total += (parseInt(el.harga, 10));
        });
    }
    public removeSparepart(i: any): void {
        this.sparepartsSelected.splice(i - 1, 1);
    }
    public removeService(i: any): void {
        this.servicesSelected.splice(i - 1, 1);
    }
    public isNext() {
        if (this.noPolisi !== '' &&
            this.tglService !== '' &&
            this.noTelp !== '' &&
            this.type &&
            this.namaPemilik !== '' &&
            this.cekMesin) { return false; }

        return true;
    }
    public finish(): void {
        EventBus.$emit('finish', this.$data);

        if (this.isPrint) { window.print(); }

        register.createRegister({
            "tglService": this.tglService,
            "noPolisi": this.noPolisi,
            "namaPemilik": this.namaPemilik,
            "noTelp": this.noTelp,
            "email": this.email,
            "sosmed": this.sosmed,
            "namaPembawa": this.namaPembawa,
            "alamat": this.alamat,
            "noRangka": this.noRangka,
            "noMesin": this.noMesin,
            "type": this.type.value,
            "tahun": this.tahun,
            "noUrut": this.noUrut,
            "jenisService": this.jenisService,
            "total": this.total,
            "km": this.km,
            "keluhanKonsumen": this.keluhanKonsumen,
            "analisaService": this.analisaService,
            "saranMekanik": this.saranMekanik,
            "sparepartsSelected": this.sparepartsSelected,
            "servicesSelected": this.servicesSelected,
            "cuci": this.cuci,
            "warnaKendaraan": this.warnaKendaraan.toUpperCase(),
        }).then(() => {
            window.location.reload();
        });
    }

    public cekFinish(): void {
        if (this.sparepartsSelected.length > 0 || this.servicesSelected.length > 0) {
            this.notFinish = false;

            return;
        }

        this.notFinish     = true;
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

    @Watch('searchSparepart')
    public onSearchSparepart(val: string) {
        this.sparepartsOwn = this.products.filter(el => {
            return el.name.toUpperCase().indexOf(val.toUpperCase()) > -1;
        })
    }

    @Watch('searchService')
    public onSearchService(val: string) {
        this.servicesOwn = this.products.filter(el => {
            return el.name.toUpperCase().indexOf(val.toUpperCase()) > -1;
        })
    }

    @Watch('noMesin')
    public onNoMesinChange() {
        this.cekNoMesin();
    }

    public cekNoMesin(): void {
        if (this.noPolisi !== "" && this.noMesin !== "") {
            board.cekNoMesin({ nopol: this.noPolisi, nomesin: this.noMesin })
                 .then((el: any) => {
                     if (el.data.result === false) {
                         alert('No mesin telah digunakan');

                         this.cekMesin = false;
                     } else {
                         this.cekMesin = true;
                     };
                 });
        }
    }
}
</script>

<style>
@import '../assets/adminLTE/css/custom.css';

.v-autocomplete{position:relative};
.v-autocomplete-list{position:absolute};
.v-autocomplete-list-item{
    cursor:pointer;
    background: gray;
    color: white;
};
.v-autocomplete-item-active{background-color:#f3f6fa};
</style>
