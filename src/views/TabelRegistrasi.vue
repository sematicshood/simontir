<template>
    <div>
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Data Registrasi</h3>

              <div class="box-tools">
                <div class="input-group input-group-sm" style="width: 150px;">
                  <input type="text" name="table_search" class="form-control btn-search pull-right" placeholder="Search" v-model="search" @keyup="searching()">

                  <div class="input-group-btn">
                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body table-responsive no-padding">
              <table class="table table-hover">
                <tbody>
                  <tr>
                    <th>#</th>
                    <th @click="sort('date')">Tanggal</th>
                    <th @click="sort('name')">Nomer SO</th>
                    <th @click="sort('customer')">Customer</th>
                    <th @click="sort('status')">Status</th>
                    <th @click="sort('no_polisi')">No Polisi</th>
                    <th @click="sort('gross_amount')">Gross Amount</th>
                    <th @click="sort('tipe_kendaraan')">Tipe Kenadaraan</th>
                    <th>Action</th>
                  </tr>
                  <tr v-for="(reg, i) in listRegister" :key="i" :class="{ 'red': reg.invoice == 'to invoice' }">
                    <td>{{ i += 1 }}</td>
                    <td>{{ reg.date.split(' ')[0] }}</td>
                    <td :class="{
                      'light': reg.antrian_service === 'Light Repair',
                      'reguler': reg.antrian_service === 'reguler',
                      'booking': reg.antrian_service === '	Booking Service',
                    }">{{ reg.name }}</td>
                    <td>{{ reg.customer }}</td>
                    <td>{{ reg.status }}</td>
                    <td>{{ reg.no_polisi }}</td>
                    <td>{{ reg.gross_amount | rupiah }}</td>
                    <td>{{ reg.tipe_kenadaraan }}</td>
                    <td>
                        <div class="btn-group">
                          <router-link :to="{ name: 'edit register', params: { so: reg.name } }">
                            <button type="button" class="btn btn-default btn-action"><i class="fa fa-pencil"></i></button>
                          </router-link>
                          <!-- <button type="button" class="btn btn-default btn-action" v-b-modal="'deleteModal'"><i class="fa fa-trash"></i></button> -->
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
      </div>
      <!-- Modal keluhan -->
        <b-modal id="deleteModal">
            <div class="form-group">
                <center><h3>Hapus Data 1?</h3></center>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import board from '../api/board';

@Component({
    components: {},
    filters: {
      rupiah(angka: any) {
        try {
          const prefix = "Rp. ";

          var number_string = angka
              .toString()
              .replace(/[^,\d]/g, "")
              .toString(),
            split = number_string.split(","),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

          // tambahkan titik jika yang di input sudah menjadi angka ribuan
          if (ribuan) {
            const separator = sisa ? "." : "";
            rupiah += separator + ribuan.join(".");
          }

          rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
          return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
        } catch (error) {
          return angka;
        }
      }
    },
})

export default class TabelRegistrasi extends Vue {
  public listRegister: string[]  = [];
  public search: any = '';
  public raw: any[] = [];
  public isSort: any = '';

  public created() {
    /*
    setInterval(() => {
      this.getData()
    }, 3000)
    */
    this.getData()
  }

  public getData(): void {
    board.getSO().then((res) => {
      this.listRegister  = res.data.results;
      this.raw  = res.data.results;
    });
  }

  public searching(): any {
    const orders = this.raw.filter((l: any) => {
      return l.name.indexOf(this.search) > -1 || l.customer.indexOf(this.search) > -1;
    })

    this.listRegister = orders;
  }

  public sort(value: any): any {
    let orders: any = [];

    if (this.isSort === '') {
      orders = this.listRegister.sort((a, b) => (a[value] > b [value]) ? 1 : -1)

      this.isSort = value;
    } else {
      orders = this.listRegister.sort((a, b) => (a[value] < b [value]) ? 1 : -1)

      this.isSort = '';
    }

    this.listRegister = orders;
  }
}
</script>

<style>
@import '../assets/adminLTE/css/custom.css';

.red {
  background: red;
  color: white;
}

.red:hover {
  background: red !important;
  color: white !important;
}
</style>