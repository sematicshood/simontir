<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="title-timesheet">
                    <div class="row">
                        <div class="col-xs-12">
                            <center><h3><strong>{{ nopol }}</strong></h3></center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="title-task">
                    <center><h4><strong>Pekerjaan</strong></h4></center>
                </div>
                <table class="table table-striped white-background">
                    <tr v-for="(service, i) in services">
                        <td style="width: 20px;">{{ i += 1 }}</td>
                        <td style="text-align: left;">
                            {{ service.name.split(':')[1] }}
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button @click="accept(service.id)" type="button" class="btn btn-default"><i class="fa fa-check"></i></button>
                                <button v-b-modal="'reject'" type="button" class="btn btn-default"><i class="fa fa-close"></i></button>                                
                            </div>
                        </td>
                    </tr>
                </table>

                <div class="title-task" style="margin-top: -14px;">
                    <center><h4><strong>Suku Cadang</strong></h4></center>
                </div>
                <table class="table table-striped white-background">
                    <tr>
                        <td style="width: 20px;">2</td>
                        <td style="text-align: left;">
                            Ban 
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default"><i class="fa fa-check"></i></button>
                                <button v-b-modal="'reject'" type="button" class="btn btn-default"><i class="fa fa-close"></i></button>                                
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 20px;">2</td>
                        <td style="text-align: left;">
                            Ban 
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default"><i class="fa fa-check"></i></button>
                                <button v-b-modal="'reject'" type="button" class="btn btn-default"><i class="fa fa-close"></i></button>                                
                            </div>
                        </td>
                    </tr>
                </table>

                <div class="title-task" style="margin-top: -14px;">
                    <center><h4><strong>Keluhan</strong></h4></center>
                </div>
                <table class="table table-striped white-background">
                    <tr v-for="(kel, i) in keluhan">
                        <td style="width: 20px;">{{ i += 1 }}</td>
                        <td style="text-align: left;">
                            {{ kel.name }}
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default"><i class="fa fa-check"></i></button>
                                <button v-b-modal="'reject'" type="button" class="btn btn-default"><i class="fa fa-close"></i></button>                                
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="col-lg-4">
                    <div class="border-custom">
                        <div class="box-sub-header">
                            <center><h3 class="box-sub-title"><strong>Cuci </strong></h3></center>
                        </div>
                        <div class="box-body" style="padding: 0px;">
                            <table class="custom-table">
                                <tr class="validasi">
                                    <td>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">
                                                <input type="checkbox">
                                            </label>
                                            <div class="col-sm-9">
                                                <select class="form-control">
                                                    <option>Pilih Asisten Mekanik</option>
                                                    <option value="">A</option>
                                                    <option value="">B</option>
                                                    <option value="">C</option>
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!-- /.box-body -->
                    </div>
                </div>
                <button type="button" class="btn btn-success">Selesai</button>

                <!-- Modal reject -->
                <b-modal id="reject">
                    <h2>Reject Service?</h2>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import mekanik from '../api/mekanik';

    @Component({
        components: {},
    })

    export default class FinalCheck extends Vue {
        products: Array<string>     =   [];
        services: Array<string>     =   [];
        keluhan: Array<string>      =   [];
        nopol: string               =   "";
        id_select: number           =   0;
        user: Array<string> =   []

        created() {
            this.user       = JSON.parse(localStorage.getItem('login'))

            mekanik.getFinalSO(this.$route.params.id).then(res => {
                this.nopol      =   res.data.results.nopol

                this.services   =   res.data.results.tasks.filter(el => {
                    return el.name.split(':')[0].split(' ')[1] != 'keluhan'
                })

                this.keluhan   =   res.data.results.tasks.filter(el => {
                    return el.name.split(':')[0].split(' ')[1] == 'keluhan'
                })
            })
        }

        accept(ids): void {
            mekanik.accept({id: ids, user_id: this.user.id})
        }
    }
</script>

<style>
@import '../assets/adminLTE/css/custom.css';
</style>