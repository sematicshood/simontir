<template>
    <div class="" id="printPendafataran">
        <div id="printMe">
            <table class="table-print">
                <tr class="t-header">
                    <td colspan="4"><center>
                        <h1><strong>AHASS MITRA PRATAMA<br>
                        ALAMAT</strong></h1>
                        </center></td>
                </tr>
                <tr class="t-header">
                    <td colspan="4"><center><h2><strong>FORM SERVICE ADVISOR</strong></h2></center></td>
                </tr>
                <tr class="data-motor">
                    <td><strong>NO ORDER</strong></td>
                    <td>{{ data.noUrut }}</td>
                    <td><strong>TANGGAL</strong></td>
                    <td>{{ data.tglService | tanggal }}</td>
                </tr>
                <tr class="data-motor">
                    <td><strong>NO NOPOL</strong></td>
                    <td>{{ data.noPolisi }}</td>
                    <td><strong>NAMA</strong></td>
                    <td>{{ data.namaPemilik }}</td>
                </tr>
                <tr class="data-motor">
                    <td><strong>KM</strong></td>
                    <td>{{ data.km }}</td>
                    <td><strong>NO TELP</strong></td>
                    <td>{{ data.noTelp }}</td>
                </tr>
                <tr class="data-motor">
                    <td><strong>JENIS</strong></td>
                    <td>{{ data.type.name }}</td>
                    <td><strong>ANTRIAN</strong></td>
                    <td>{{ data.jenisService }}</td>
                </tr>
                <tr class="t-header">
                    <td colspan="3"><strong>PEKERJAAN</strong></td>
                    <td><strong>BIAYA</strong></td>
                </tr>
                <tr v-for="(service, i) in data.servicesSelected">
                    <td colspan="3">{{ i += 1 }}. {{ service.name }}</td>
                    <td>Rp. {{ convertToRupiah(service.harga) }}</td>
                </tr>
                <tr class="t-space"><td colspan="4"></td></tr>
                <tr class="t-header">
                    <td colspan="3"><strong>SPARETPART</strong></td>
                    <td><strong>BIAYA</strong></td>
                </tr>
                <tr v-for="(sparepart, i) in data.sparepartsSelected">
                    <td colspan="3">{{ i += 1 }}. {{ sparepart.name }}</td>
                    <td>Rp. {{ convertToRupiah(sparepart.harga) }}</td>
                </tr>
                <tr class="t-space"><td colspan="4"></td></tr>
                <tr>
                    <td colspan="2">Subtotal</td>
                    <td></td>
                    <td>Rp. {{ convertToRupiah(data.total) }}</td>
                </tr>
                <!-- <tr>
                    <td colspan="2">Diskon Service</td>
                    <td>20%</td>
                    <td>Rp.19.000</td>
                </tr> -->
                <tr>
                    <td colspan="2"><strong>Total</strong></td>
                    <td></td>
                    <td><strong>Rp. {{ convertToRupiah(data.total) }}</strong></td>
                </tr>
                <tr class="t-space"><td colspan="4"></td></tr>
                <tr class="t-header">
                    <td colspan="4"><strong>KELUHAN CUSTOMER</strong></td>
                </tr>
                <tr>
                    <td colspan="4" v-for="(keluhan, i) in data.keluhanKonsumen">{{ i += 1 }}. keluhan.nama</td>
                </tr>
                <tr class="t-space"><td colspan="4"></td></tr>
                <tr class="t-header">
                    <td colspan="4"><strong>ANALISA SERVICE ADVISOR</strong></td>
                </tr>
                <tr>
                    <td colspan="4">{{ data.analisaService }}</td>
                </tr>
                <tr class="t-space"><td colspan="4"></td></tr>
                <tr>
                    <td colspan="4">Tambahan pekerjaan / ganti part diluar daftar maka</td>
                </tr>
                <tr>
                    <td>Konfirmasi Ke</td>
                    <td></td>
                    <td>Langsung Dikerjakan</td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="2"><strong>Customer</strong></td>
                    <td colspan="2"><strong>Penerima</strong></td>
                </tr>
                <tr class="t-space"><td colspan="4"></td></tr><tr class="t-space"><td colspan="4"></td></tr><tr class="t-space"><td colspan="4"></td></tr>
                <tr>
                    <td colspan="2">{{ data.namaPemilik }}</td>
                    <td colspan="2">{{ user.name }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
  import { EventBus } from '../event';
  import additional from '../helpers/additional';

  export default {
      props: ['datas'],

      data() {
          return {
              user: JSON.parse(localStorage.getItem('login')),
              data: this.datas
          }
      },
      filters: {
          tanggal(value) {
              return `${value.getUTCDay()}/${value.getUTCMonth()}/${value.getUTCFullYear()} ${value.getUTCHours()}:${value.getUTCMinutes()}:${value.getUTCSeconds()}`
          }
      },

      methods: {
          convertToRupiah(angka) {
            return additional.convertToRupiah(angka);
          }
      },

      created() {
          EventBus.$on('finish', data => {
            this.$data.data = data
          });
      },

      name: 'printPendaftaran'
  }
</script>

<style>
@import '../assets/adminLTE/css/custom.css';

#printPendafataran {
    display: none;
}

@media print
    {
        #content { display: none; }
        #printPendafataran { display: block; }
    }
</style>