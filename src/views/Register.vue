<template>
    <div>
        <div id="content">
            <div class="row">
            <div class="col-lg-12">
                <div class="box box-danger box-solid">
                    <form>
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
                                        <p>Tipe Motor : {{ type.text }}</p>
                                        <model-select :options="types"
                                            v-model="type"
                                            :selected-options="type"
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
                                        <input type="text" class="form-control" id="" placeholder="" v-model="namaPemilik" @keyup.enter="$refs.noTelp.focus" ref="namaPemilik">
                                        <span>*) Wajib diisi</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="">No. Telp/HP</label>
                                        <input type="number" class="form-control" id="" placeholder="" v-model="noTelp" ref="noTelp" @keyup.enter="$refs.email.focus">
                                        <span>*) Wajib diisi</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Email</label>
                                        <input type="mail" class="form-control" id="" placeholder="" v-model="email" ref="email" @keyup.enter="$refs.sosmed.focus">
                                    </div>
                                    <div class="form-group">
                                        <label for="">Sosmed</label>
                                        <input type="text" class="form-control" id="" placeholder="" v-model="sosmed" ref="sosmed" @keyup.enter="$refs.namaPembawa.focus">
                                    </div>
                                    <dir class="box-sub-header" style="margin-top: 30px !important;">
                                        <center><h3 class="box-sub-title"><strong>Data Pembawa</strong></h3></center>
                                    </dir>
                                    <div class="form-group">
                                        <label for="">Nama</label> &nbsp;
                                        <button type="button" class="btn btn-primary btn-sm" @click="namaPembawa = namaPemilik">Copy</button>
                                        <br>
                                        <input type="text" class="form-control" id="" placeholder="" v-model="namaPembawa" ref="namaPembawa" @keyup.enter="$refs.alamat.focus">
                                    </div>
                                    <div class="form-group">
                                        <label>Alamat</label>
                                        <textarea class="form-control" rows="3" placeholder="Enter ..." v-model="alamat" ref="alamat" @keyup.enter="$refs.analisaService.focus"></textarea>
                                    </div>                                
                                </dir>
                            </dir>
                            <dir class="row">
                                <div class="col-lg-12">
                                    <dir class="box-sub-header">
                                        <h3 class="box-sub-title"><strong>Keluhan Konsumen</strong></h3>
                                        <button type="button" @click="formKeluhan = true" class="btn btn-danger btn-sm pull-right" style="height: 29px; padding: 2px 11px; margin-top: -5px;"><i class="fa fa-plus"></i></button>
                                    </dir>

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
                                            <tr v-if="formKeluhan">
                                                <td>-</td>
                                                <td>
                                                    <input type="text" class="form-control" v-model="keluhanInput">
                                                </td>
                                                <td><input disabled type="checkbox"></td>
                                                <td>
                                                    <div class="btn-group btn-sm">
                                                        <button type="button" @click="addKeluhan()" class="btn btn-primary btn-sm"><i class="fa fa-save"></i></button>
                                                    </div>
                                                    <button type="button" @click="formKeluhan = false" class="btn btn-warning btn-sm">x</button>
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
                                        <textarea class="form-control" rows="3" placeholder="Enter ..." v-model="analisaService" ref="analisaService" @keyup.enter="$refs.saranMekanik.focus"></textarea>
                                    </div>   
                                </div>
                            </dir>
                            <dir class="row">
                                <div class="col-lg-12">
                                    <dir class="box-sub-header">
                                        <h3 class="box-sub-title"><strong>Saran Mekanik</strong></h3>
                                    </dir>
                                    <div class="form-group">
                                        <textarea class="form-control" rows="3" placeholder="Enter ..." v-model="saranMekanik" ref="saranMekanik"></textarea>
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
                                                </tbody>
                                                </table>
                                                <div v-if="nextService || prevService">
                                                    <br>
                                                    <br>
                                                    <button class="btn btn-warning pull-left" :disabled="!prevService" @click.prevent="getServiceFromServer('prev')">Previous</button>
                                                    <button class="btn btn-primary pull-right" :disabled="!nextService" @click.prevent="getServiceFromServer('next')">Next</button>
                                                </div>
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
                                                    <KPB :kpb="kpb"/>
                                                    <Service :service="service"/>
                                                    <GantiOli :isGantiOli="isGantiOli"/>
                                                    <GantiPart :isGantiPart="isGantiPart"/>
                                                    <TurunMesin :isTurunMesin="isTurunMesin"/>
                                                    <Claim :claim="claim"/>
                                                    <JobReturn :jobReturn="jobReturn"/>
                                                    <ServiceKunjungan :serviceKunjungan="serviceKunjungan"/>
                                                    <OtherJob :otherJob="otherJob"/>
                                                    <SpesialProgram :spesialProgram="spesialProgram"/>
                                                    <tr v-for="(service, i) in servicesSelected" :key="i">
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
                                                <div v-if="prevSparepart || nextSparepart">
                                                    <br>
                                                    <br>
                                                    <button class="btn btn-warning pull-left" :disabled="!prevSparepart" @click.prevent="getSparepartFromServer('prev')">Previous</button>
                                                    <button class="btn btn-primary pull-right" :disabled="!nextSparepart" @click.prevent="getSparepartFromServer('next')">Next</button>
                                                </div>
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

                                     <div class="border-custom">
                                        <div class="box-sub-header">
                                            <h3 class="box-sub-title"><strong>History</strong></h3>
                                        </div>
                                        <div class="box-body">
                                            <table class="table table-hover table-responsive" style="height:200px !important; overflow: auto !important;">
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
                                            <tr :class="{'item-tr-center': km >= spare.minimal_km, 'sparepartSelect': qty_available > 0, 'unselect': true}" v-for="(spare, i) in saranSparepart" @click="addSparepart(spare)">
                                                <td>{{ spare.minimal_km }}</td>
                                                <td>{{ spare.name }}</td>
                                                <td>
                                                    <span v-if="spare.qty_available > 0" class="label label-success">Ada</span>
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
                                            </tr>

                                            <tr :class="{'item-tr-center': km >= ser.minimal_km, 'sparepartSelect': ser.qty_available > 0, 'unselect': true}" v-for="ser in saranService" @click="addServicesSelected(ser)">
                                                <td>{{ ser.minimal_km }}</td>
                                                <td>{{ ser.name }}</td>
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
                        <button @click.prevent="finish" :disabled="notFinish" class="btn btn-primary pull-right">Finish</button>                        
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
import products from '../api/products';
import printpendaftaran from './PrintPendaftaran.vue';
import { EventBus } from '../event';
import {ModelSelect} from 'vue-search-select';
import autocomplete from '../components/Autocomplete.vue';
import SearchAutocomplete from '../components/SearchAutocomplete.vue';
import board from '@/api/board';
import nopolAutocomplete from '../components/NopolAutocomplete.vue';
import KPB from '../components/register/KPB.vue';
import GantiOli from '../components/register/GantiOli.vue';
import GantiPart from '../components/register/GantiPart.vue';
import TurunMesin from '../components/register/TurunMesin.vue';
import Service from '../components/register/Service.vue';
import Claim from '../components/register/Claim.vue';
import JobReturn from '../components/register/JobReturn.vue';
import ServiceKunjungan from '../components/register/ServiceKunjungan.vue';
import OtherJob from '../components/register/OtherJob.vue';
import SpesialProgram from '../components/register/SpesialProgram.vue';

@Component({
    components: {
        printpendaftaran, ModelSelect, autocomplete, SearchAutocomplete, nopolAutocomplete, KPB, GantiPart, GantiOli, TurunMesin, Service, Claim, JobReturn, ServiceKunjungan, OtherJob, SpesialProgram
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
    public user: any = JSON.parse(localStorage.getItem("login")!);

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

    public kpb: number                         = 0;
    public service: string                     = "";
    public isGantiOli: boolean                 = false;
    public isGantiPart: boolean                = false;
    public isTurunMesin: boolean               = false;
    public nextService: boolean                = false;
    public prevService: boolean                = false;
    public pageService: number                 = 1;
    public nextSparepart: boolean              = false;
    public prevSparepart: boolean              = false;
    public pageSparepart: number               = 1;

    public nextSaranSparepart: boolean         = false;
    public prevSaranSparepart: boolean         = false;
    public pageSaranSparepart: number          = 1;
    public saranSparepart: any                 = [];

    public nextSaranService: boolean         = false;
    public prevSaranService: boolean         = false;
    public pageSaranService: number          = 1;
    public saranService: any                 = [];

    public hargaKPB: number                    = 0;
    public hargaService: number                = 0;

    public formKeluhan: boolean                = false;
    public keluhanDelete: any                  = [];
    public noOfFocusableControls: any          = 2;

    public claim: boolean                      = false;
    public jobReturn: boolean                  = false;
    public serviceKunjungan: boolean           = false;
    public otherJob: boolean                   = false;
    public spesialProgram: boolean             = false;

    public created() {
        EventBus.$on('refresh', () => {
            this.refreshTotal();
        })

        EventBus.$on('changeColor', (value: string) => {
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

        EventBus.$on('changeDatas', (val: any) => {
            const key: any = Object.keys(val);
            
            key.forEach((el: any) => {
                this.$data[el] = val[el]
            })
        })

        EventBus.$on('addItem', (item: any) => {
            const data = {
                harga: item.item.list_price,
                id: item.item.id,
                name: item.item.name,
                product_type: item.item.type,
                stok: item.item.qty_available,
                qty: 1,
                product_tmpl_id: item.item.product_tmpl_id[0]
            }

            const cekIfExist = this.$data[item.type].filter((el: any) => {
                return el.id == item.item.id;
            }).length

            if (cekIfExist === 0) {
                if(!this.cekExist(this.$data[item.type], data, 'product_tmpl_id')) {
                    this.$data[item.type].push(data)
                }
            }
        })

        EventBus.$on('removeItem', (datas: any) => {
            try {
                let data = []

                datas.forEach((d: any) => {
                    const keys = Object.keys(this.servicesSelected);
                    const servicesSelected = this.servicesSelected;

                    this.servicesSelected.forEach((s: any, i: any) => {
                        servicesSelected[i]['name'] = s.name.toUpperCase();
                    });

                    data = servicesSelected.filter((el: any) => {
                        return el.name.includes(d.toUpperCase())
                    })

                    const index = this.servicesSelected.indexOf(data[0]);
                
                    if (index !== -1) {
                        this.servicesSelected.splice(index, 1)
                    };
                })
            } catch(err) {}
        })

        if(this.$route.params.so) {
            const so: any = this.$route.params.so;

            register.cekSO().then((res) => {
                res.data.results[0].tipe_motor.forEach((el: any) => {
                    this.types.push({
                        "id": el.id,
                        "value": el,
                        "text": el.name
                    })
                })

                this.colors = res.data.colors;
            });

            register.getDetailSo(so).then(res => {
                const result    =   res.data.results[0]

                if(result) {
                    this.halaman    =   2

                    const tgl   =   new Date(result.tglService)

                    this.noUrut         =   result.noUrut
                    this.noPolisi       =   this.cekData(result.nopol)
                    this.jenisService   =   result.antrianService
                    this.cuci           =   result.isWash
                    this.tglService     =   tgl
                    this.namaPemilik    =   result.namaPemilik
                    this.noTelp         =   this.cekData(result.noTelp)
                    this.email          =   result.email
                    this.sosmed         =   result.sosmed
                    this.keluhanKonsumen    =   result.keluhan_konsumen
                    this.analisaService     =   this.cekData(result.analisaService)
                    this.saranMekanik       =   this.cekData(result.saranMekanik)
                    this.kpb            =   result.kpb
                    this.isGantiOli     =   result.gantiOli
                    this.isGantiPart    =   result.gantiPart
                    this.service        =   result.service
                    this.isTurunMesin   =   result.turunMesin

                    this.claim                  =   result.claim
                    this.jobReturn              =   result.jobReturn
                    this.serviceKunjungan       =   result.serviceKunjungan
                    this.otherJob               =   result.otherJob
                    this.spesialProgram         =   result.spesialProgram
                    
                    const motor =   result.motor[0]

                    if(motor) {
                        this.noMesin    =   motor.noMesin
                        this.noRangka   =   motor.noRangka
                        motor.type.name =   "Honda/" + motor.type.name
                        this.type       =   {
                            id: motor.type.id,
                            text: motor.type.name,
                            value: motor.type
                        }
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
            });
        }
    }

    getLabel (item: any): string {
        return item.color
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
        const count: number = this.servicesSelected.filter((service: any) => {
            return service.name === ser.name;
        }).length
        
        if (count === 0 ) {
            ser['qty']    =   1;
            ser['product_tmpl_id'] = ser['product_tmpl_id'][0];

            this.servicesSelected.push(ser);
        }
    }
    public addSparepart(spare: any): any {
        if (spare.qty_available > 0) {
            const count: number = this.sparepartsSelected.filter((sparepart: any) => {
                return sparepart.name === spare.name;
            }).length
            
            if (count === 0) {
                spare['qty']    =   1;

                this.sparepartsSelected.push(spare);
            }
        }
    }

    public cekSparepartSelect(index: number): boolean {
        return this.sparepartsSelected.indexOf(this.spareparts[index]) < 0;
    }

    public convertToRupiah(angka: number): string {
        return additional.convertToRupiah(angka);
    }
    public addKeluhan(): void {
        this.$toasted.info("Loading...");

        const count: number = this.keluhanKonsumen.filter((kel: any) => {
            return kel.nama === this.keluhanInput;
        }).length;

        if (count > 0) {
            this.$toasted.error('Keluhan sudah ada', {duration:3000});

            return;
        }

        this.keluhanKonsumen.push({ nama: this.keluhanInput });
        this.keluhanInput = '';
        this.formKeluhan  = false;

        this.$toasted.success('Keluhan berhasil ditambah', {duration:3000});
    }
    public deleteKeluhan(i: any): void {
        const keluhan = this.keluhanKonsumen[i]

        if ('id' in keluhan) {
            this.keluhanDelete.push(keluhan['id']);
        }

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
                el.product_tmpl_id = el.product_tmpl_id[0]

                this.sparepartsSelected.push(el);
            }
        });
    }

    public updateSparepartQty(event: any, i: number): void {
        if(event.target.value >= 0) {
            this.sparepartsSelected[i - 1].qty = event.target.value;
        }

        this.refreshTotal();
    }

    public isJenisSelect(service: string): boolean {
        return this.jenisService == service
    }

    public isNotJenisSelect(service: string): boolean {
        return this.jenisService != service
    }

    public refreshTotal(): void {
        this.total = 0;

        this.total += this.hargaKPB;
        this.total += this.hargaService;

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
            "kpb": this.kpb,
            "service": this.service,
            "gantiOli": this.isGantiOli,
            "gantiPart": this.isGantiPart,
            "turunMesin": this.isTurunMesin,
            "keluhanDelete": this.keluhanDelete,
            "user_id": this.user.id,
            "claim": this.claim,
            "jobReturn": this.jobReturn,
            "serviceKunjungan": this.serviceKunjungan,
            "otherJob": this.otherJob,
            "spesialProgram": this.spesialProgram,
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
        this.getSparepartFromServer('search');
    }

    // @Watch('searchService')
    // public onSearchService(val: string) {
    //     this.getServiceFromServer('search');
    // }

    @Watch('noMesin')
    public onNoMesinChange() {
        this.cekNoMesin();
    }

    @Watch('type')
    public ontypeChange() {
        localStorage.setItem('vehicle', this.type.value.id)
    }

    @Watch('halaman')
    public onChangeHalaman(value: number) {
        if (value == 2) {
            this.loadProduct();
        }
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

    public loadProduct(): void {
        this.getServiceFromServer();
        this.getSparepartFromServer();
        this.getSparepartFromServer(null, true);
        this.getServiceFromServer(null, true);
    }

    public getSparepartFromServer(type: any = null, register: boolean = false): void {
        if (register) {
            if (type === "next") {
                this.pageSaranSparepart++;    
            }
            
            if (type === 'prev') {
                this.pageSaranSparepart--;
            }
        } else {
            if (type === "next") {
                this.pageSparepart++;    
            }
            
            if (type === 'prev') {
                this.pageSparepart--;
            }

            if (type === 'search') {
                this.pageSparepart = 1;
            }
        }

        const sparepart: any      = {
            vehicle: this.type.value.id,
            type: 'product',
            page: this.pageSparepart,
        };

        if (register === true) {
            sparepart['register']   =   true;
        }

        if (this.searchSparepart !== '') {
            sparepart['name']  =   this.searchSparepart;
        };

        setTimeout(() => {
            try {
                products.searchProduct(sparepart).then(res => {
                    if (register) {
                        this.saranSparepart = [];
                    } else {
                        this.sparepartsOwn = [];
                    }

                    res.data.results.forEach((el: any) => {
                        el['harga'] = el['list_price'];
                        
                        if (register) {
                            this.saranSparepart.push(el);

                            const total: any = res.data.count / 10;
                            
                            if (this.pageSaranSparepart < total || this.pageSaranSparepart === 1) {
                                this.nextSaranSparepart = true;
                            } else {
                                this.nextSaranSparepart = false;
                            }

                            if (this.pageSaranSparepart > 1) {
                                this.prevSaranSparepart = true;
                            } else {
                                this.prevSaranSparepart = false;
                            }
                        } else {
                            this.sparepartsOwn.push(el);

                            const total: any = res.data.count / 10;
                            
                            if (this.pageSparepart < total || this.pageSparepart === 1) {
                                this.nextSparepart = true;
                            } else {
                                this.nextSparepart = false;
                            }

                            if (this.pageSparepart > 1) {
                                this.prevSparepart = true;
                            } else {
                                this.prevSparepart = false;
                            }
                        }
                    });
                });
            } catch (error) {
                
            }
        }, 1000)
    }

    public cekExist(data: any, check: any, field: any): boolean {
        const result = data.filter((d: any) => {
            if(check[field].length > 1) {
                return d[field][0] == check[field][0];
            } else {
                return d[field] == check[field];
            }
        });

        return result.length > 0;
    }

    public getServiceFromServer(type = null, register: boolean = false): void {
        if (register) {
            if (type === "next") {
                this.pageSaranService++;    
            }
            
            if (type === 'prev') {
                this.pageSaranService--;
            }
        } else {
            if (type === "next") {
                this.pageService++;    
            }
            
            if (type === 'prev') {
                this.pageService--;
            }

            if (type === 'search') {
                this.pageService = 1;
            }
        }

        const service: any      = {
            vehicle: this.type.value.id,
            type: 'service',
            page: this.pageService,
        };

        if (register === true) {
            service['register']   =   true;
        }

        if (this.searchService !== '') {
            service['name']  =   this.searchService;
        };

        setTimeout(() => {
            try {
                products.searchProduct(service).then(res => {
                    if (register) {
                        this.saranService = [];
                    } else {
                        this.servicesOwn = [];
                    }

                    res.data.results.forEach((el: any) => {
                        el['harga'] = el['list_price'];
                        
                        if (register) {
                            if(!this.cekExist(this.saranService, el, 'product_tmpl_id')) {
                                this.saranService.push(el);
                            }

                            const total: any = res.data.count / 10;
                            
                            if (this.pageSaranService < total || this.pageSaranService === 1) {
                                this.nextSaranService = true;
                            } else {
                                this.nextSaranService = false;
                            }

                            if (this.pageSaranService > total || this.pageSaranService > 1) {
                                this.prevSaranService = true;
                            } else {
                                this.prevSaranService = false;
                            }
                        } else {
                            this.servicesOwn.push(el);

                            const total: any = res.data.count / 10;
                            
                            if (this.pageService < total || this.pageService === 1) {
                                this.nextService = true;
                            } else {
                                this.nextService = false;
                            }

                            if (this.pageService > total || this.pageService > 1) {
                                this.prevService = true;
                            } else {
                                this.prevService = false;
                            }
                        }
                    });
                });
            } catch (error) {
                
            }
        }, 1000)
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
