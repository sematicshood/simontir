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
                                <button @click="accept(service.id)" type="button" :class="{'btn': true, 'btn-default': true, 'btn-primary': service.x_status == 'accept'}"><i class="fa fa-check"></i></button>
                                <button @click="id_select = service.id" v-b-modal="'reject'" type="button" :class="{'btn': true, 'btn-default': true, 'btn-primary': service.x_status == 'reject'}"><i class="fa fa-close"></i></button>                                
                            </div>
                        </td>
                    </tr>
                </table>

                <div class="title-task" style="margin-top: -14px;">
                    <center><h4><strong>Suku Cadang</strong></h4></center>
                </div>
                <table class="table table-striped white-background">
                    <tr v-for="(spar, i) in sparepart">
                        <td style="width: 20px;">{{ i += 1 }}</td>
                        <td style="text-align: left;">
                            {{ spar.name.split(':')[1] }}
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button @click="accept(spar.id)" type="button" :class="{'btn': true, 'btn-default': true, 'btn-primary': spar.x_status == 'accept'}"><i class="fa fa-check"></i></button>
                                <button @click="id_select = spar.id" v-b-modal="'reject'" type="button" :class="{'btn': true, 'btn-default': true, 'btn-primary': spar.x_status == 'reject'}"><i class="fa fa-close"></i></button>                                
                            </div>
                        </td>
                    </tr>
                </table>

                <div class="title-task" style="margin-top: -14px;">
                    <center><h4><strong>Keluhan</strong></h4></center>
                </div>
                <table class="table table-striped white-background">
                    <tr v-for="(kel, i) in keluhan" :key="i">
                        <td style="width: 20px;">{{ i += 1 }}</td>
                        <td style="text-align: left;">
                            {{ kel.name.split(':')[1] }}
                        </td>
                        <td style="text-align: right;">
                            <div class="btn-group">
                                <button @click="accept(kel.id)" type="button" :class="{'btn': true, 'btn-default': true, 'btn-primary': kel.x_status == 'accept'}"><i class="fa fa-check"></i></button>
                                <button @click="id_select = kel.id" v-b-modal="'reject'" type="button" :class="{'btn': true, 'btn-default': true, 'btn-primary': kel.x_status == 'reject'}"><i class="fa fa-close"></i></button>                                
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
                                                <input type="checkbox" v-model="cuci">
                                            </label>
                                            <div class="col-sm-9">
                                                <select class="form-control" :disabled="cuci == false" v-model="userWash">
                                                    <option v-for="(us, i) in users" v-text="us.name" :key="i" :value="us.id"></option>
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
                <button type="button" @click="finished" class="btn btn-success">Selesai</button>

                <!-- Modal reject -->
                <b-modal id="reject" @ok="reject">
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
    public products: any[]     =   [];
    public services: any[]     =   [];
    public keluhan: any[]      =   [];
    public sparepart: any[]    =   [];
    public nopol: string       =   '';
    public id_select: number   =   0;
    public cuci: boolean       =   true;
    public user: any           =   JSON.parse(localStorage.getItem('login')!);
    public users: any[]        =   [];
    public userWash: number   =   0;

    public created() {
        this.load();
    }

    public load(): void {
        mekanik.getusers().then(res => {
            if(res.data.results) {
                this.users = res.data.results
            }
        })

        mekanik.getFinalSO(this.$route.params.id).then((res: any) => {
            this.nopol      =   res.data.results.nopol;

            this.services   =   res.data.results.tasks.filter((el: any) => {
                return el.name.split(':')[0].split(' ')[1] === undefined && el.name.split(':')[1].toUpperCase() !== 'Cuci Motor'.toUpperCase();
            });

            this.keluhan   =   res.data.results.tasks.filter((el: any) => {
                return el.name.split(':')[0].split(' ')[1] === 'keluhan';
            });

            this.sparepart   =   res.data.results.tasks.filter((el: any) => {
                return el.name.split(':')[0].split(' ')[1] === 'sparepart';
            });
        });
    }

    public accept(ids: number): void {
        mekanik.accept({id: ids, user_id: this.user.id}).then((res) => {
            console.log(res)
            this.load();
        });
    }

    public reject(): void {
        mekanik.reject({id: this.id_select, user_id: this.user.id})
        .then(() => {
            this.load();
        });
    }

    public finished(): void {
        let serviceCek: number = this.services.filter(el => {
            el.x_status !== 'reject'
        }).length

        let keluhanCek: number = this.keluhan.filter(el => {
            el.x_status !== 'reject'
        }).length

        let sparepartCek: number = this.sparepart.filter(el => {
            el.x_status !== 'reject'
        }).length

        if(serviceCek === 0 && keluhanCek === 0 && sparepartCek === 0) {
            mekanik.finishFinal({'invoice': this.$route.params.id, 'user_cuci': this.userWash})
                    .then(() => {
                        this.$router.push({ name: 'list_final_check' });
                    })
        } else {
            mekanik.unlock({'invoice': this.$route.params.id})
                    .then(() => {
                        this.$router.push({ name: 'list_final_check' });
                    })
        }
    }
}
</script>

<style>
@import '../assets/adminLTE/css/custom.css';
</style>