<template>
    <div>
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Data Registrasi</h3>

              <div class="box-tools">
                <div class="input-group input-group-sm" style="width: 150px;">
                  <input type="text" name="table_search" class="form-control btn-search pull-right" placeholder="Search">

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
                    <th>Tanggal</th>
                    <th>Nomer SO</th>
                    <th>Jenis Antrian</th>
                    <th>Customer</th>
                    <th>No Polisi</th>
                    <th>Tipe Kenadaraan</th>
                    <th>Action</th>
                  </tr>
                  <tr v-for="(reg, i) in listRegister" :key="i" :class="{ 'red': reg.invoice == 'to invoice' }">
                    <td>{{ i += 1 }}</td>
                    <td>{{ reg.date }}</td>
                    <td>{{ reg.name }}</td>
                    <td>{{ reg.antrian_service }}</td>
                    <td>{{ reg.customer }}</td>
                    <td>{{ reg.no_polisi }}</td>
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
})

export default class TabelRegistrasi extends Vue {
  public listRegister: string[]  = [];

  public created() {
    setInterval(() => {
      this.getData()
    }, 3000)

    this.getData()
  }

  public getData(): void {
    board.getSO().then((res) => {
      this.listRegister  = res.data.results;
    });
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