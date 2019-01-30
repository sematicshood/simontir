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
                <tbody><tr>
                  <th>#</th>
                  <th>Column 1</th>
                  <th>Column 1</th>
                  <th>Column 1</th>
                  <th>Action</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Bacon ipsum</td>
                  <td>Bacon ipsum</td>
                  <td>Bacon ipsum</td>
                  <td>
                      <div class="btn-group">
                        <button type="button" class="btn btn-default btn-action"><i class="fa fa-pencil"></i></button>
                        <button type="button" class="btn btn-default btn-action" v-b-modal="'deleteModal'"><i class="fa fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Bacon ipsum</td>
                  <td>Bacon ipsum</td>
                  <td>Bacon ipsum</td>
                  <td>
                      <div class="btn-group">
                        <button type="button" class="btn btn-default btn-action"><i class="fa fa-pencil"></i></button>
                        <button type="button" class="btn btn-default btn-action" v-b-modal="'deleteModal'"><i class="fa fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Bacon ipsum</td>
                  <td>Bacon ipsum</td>
                  <td>Bacon ipsum</td>
                  <td>
                      <div class="btn-group">
                        <button type="button" class="btn btn-default btn-action"><i class="fa fa-pencil"></i></button>
                        <button type="button" class="btn btn-default btn-action" v-b-modal="'deleteModal'"><i class="fa fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
              </tbody></table>
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

    @Component({
        components: {},
    })

    export default class TabelRegistrasi extends Vue {}
</script>

<style>
@import '../assets/adminLTE/css/custom.css';
</style>