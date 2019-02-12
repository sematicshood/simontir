<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="title-timesheet">
                    <div class="row">
                        <div class="col-xs-8">
                            <center><h3><strong>{{ nopol }}</strong></h3></center>
                        </div>
                        <div class="col-xs-4 timer">
                            <center><h4 v-text="timer"></h4></center>
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
                    <tr v-for="(service, i) in services" :key="i" :class="{'finished': service.x_state.toUpperCase() == 'finished'.toUpperCase()}">
                        <td style="width: 20px;">{{ i += 1 }}</td>
                        <td style="text-align: left;">
                            {{ service.name.split(':')[1] }} <br>
                        </td>
                        <td v-if="service.x_state.toUpperCase() == 'unfinished'.toUpperCase()">
                            <button class="btn btn-sm btn-primary" @click="finishTask(service.id)">Finish</button>
                        </td>
                        <td v-else>
                            <button class="btn btn-sm btn-primary" @click="unfinishTask(service.id)">Unfinish</button>
                        </td>
                    </tr>
                </table>

                <div class="title-task">
                    <center><h4><strong>Sparepart</strong></h4></center>
                </div>
                <table class="table table-striped white-background">
                    <tr v-for="(sparepart, i) in spareparts" :key="i" :class="{'finished': sparepart.x_state.toUpperCase() == 'finished'.toUpperCase()}">
                        <td style="width: 20px;">{{ i += 1 }}</td>
                        <td style="text-align: left;">
                            {{ sparepart.name.split(':')[1] }} <br>
                        </td>
                        <!-- <td>{{ convertToTime(sparepart.duration) }}</td> -->
                        <td v-if="sparepart.x_state.toUpperCase() == 'unfinished'.toUpperCase()">
                            <button class="btn btn-sm btn-warning" @click="start = `sparepart:${i}`">Start</button> &nbsp;
                            <button class="btn btn-sm btn-primary" @click="finishTask(sparepart.id)">Finish</button>
                        </td>
                        <td v-else>
                            <button class="btn btn-sm btn-primary" @click="unfinishTask(sparepart.id)">Unfinish</button>
                        </td>
                    </tr>
                </table>

                <div class="title-task" style="margin-top: -14px;">
                    <center><h4><strong>Keluhan</strong></h4></center>
                </div>
                <table class="table table-striped white-background">
                    <tr v-for="(kel, i) in keluhan" :key="i" :class="{'finished': kel.x_state.toUpperCase() == 'finished'.toUpperCase()}">
                        <td style="width: 20px;">{{ i += 1 }}</td>
                        <td style="text-align: left;">
                            {{ kel.name.split(':')[1] }} <br>
                        </td>
                        <td v-if="kel.x_state.toUpperCase() == 'unfinished'.toUpperCase()">
                            <button class="btn btn-sm btn-primary" @click="finishTask(kel.id)">Finish</button>
                        </td>
                        <td v-else>
                            <button class="btn btn-sm btn-primary" @click="unfinishTask(kel.id)">Unfinish</button>
                        </td>
                    </tr>
                </table>
                <div class="title-task" style="margin-top: -14px;">
                    <center><h4><strong>Saran Mekanik</strong></h4></center>
                </div>
                <div class="form-group">
                    <textarea class="form-control" rows="3" placeholder="Enter ..." v-model="saranMekanik"></textarea>
                </div>
                <button @click="finish" type="button" class="btn btn-primary btn-block">Selesai</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import additional from '../helpers/additional';
import board from '../api/board';
import mekanik from '../api/mekanik';

@Component({
    components: {},
})

export default class TimesheetMekanik extends Vue {
    public timer: string           =   '00:00:00';
    public seconds: number         =   0;
    public minutes: number         =   0;
    public hours: number           =   0;
    public ids: string             =   '';
    public data: string[]          =   [];
    public nopol: string           =   '';
    public saranMekanik: string    =   '';
    public services: string[]      =   [];
    public keluhan: string[]       =   [];
    public spareparts: string[]    =   [];
    public waktu: string           =   '';
    public id_saran: number        =   0;
    public start: string           =   "";

    public finishTask(id: number): void {
        board.finishTask(id).then(() => this.getData())
    }

    public unfinishTask(id: number): void {
        board.unfinishTask(id).then(() => this.getData())
    }

    public getData(): void {
        this.ids = this.$route.params.id;

        board.getTask(this.ids).then((res) => {
            if (res.data.results) {
                this.nopol          =   res.data.results.nopol;
                this.waktu          =   res.data.results.waktu_mulai;
                this.saranMekanik   =   res.data.results.saran; 
                this.id_saran       =   res.data.results.id_saran; 

                this.services   =   res.data.results.tasks.filter((el: any) => {
                    return el.name.split(':')[0].split(' ')[1] !== 'keluhan' && el.name.split(':')[0].split(' ')[1] !== 'sparepart' && el.name.split(':')[1].toUpperCase() !== 'Cuci Motor'.toUpperCase();
                });

                this.spareparts   =   res.data.results.tasks.filter((el: any) => {
                    return el.name.split(':')[0].split(' ')[1] === 'sparepart';
                });

                this.spareparts.forEach((el: any, i: number) => {
                    el.x_duration =   (el.x_duration) ? el.x_duration : 0;
                })

                this.keluhan   =   res.data.results.tasks.filter((el: any) => {
                    return el.name.split(':')[0].split(' ')[1] === 'keluhan';
                });

                const now: any     = new Date();
                const waktu: any   = new Date(this.waktu);

                let diff: any    = now - waktu;

                const hh: any = Math.floor(diff / 1000 / 60 / 60);
                diff -= hh * 1000 * 60 * 60;
                const mm: any = Math.floor(diff / 1000 / 60);
                diff -= mm * 1000 * 60;
                const ss: any = Math.floor(diff / 1000);
                diff -= ss * 1000;

                this.hours      = hh;
                this.minutes    = mm;
                this.seconds    = ss;
            }
        });
    }

    public convertToTime(seconds: any): string {
        let diff = parseInt(seconds);

        const hh: any = Math.floor(diff / 1000 / 60 / 60);
        diff -= hh * 1000 * 60 * 60;
        const mm: any = Math.floor(diff / 1000 / 60);
        diff -= mm * 1000 * 60;
        const ss: any = Math.floor(diff / 1000);
        diff -= ss * 1000;

        return `${hh}:${mm}:${ss}`;
    }

    public finish(): void {
        mekanik.lock({invoice: this.ids, 
                      id_saran: this.id_saran, 
                      saran: this.saranMekanik}).then((res) => {
            this.$router.push({ name: 'list_mekanik' });
        });
    }

    public created() {
        setInterval(() => {
            this.seconds++;

            if (this.seconds === 60) {
                this.seconds = 0;
                this.minutes++;
            }

            if (this.minutes === 60) {
                this.minutes = 0;
                this.hours++;
            }

            this.timer = additional.exact(this.hours) + ':' + additional.exact(this.minutes) + ':' + additional.exact(this.seconds);

            if(this.waktu === '') {
                this.getData();
            }
        }, 1000);
    }
}
</script>

<style>
@import '../assets/adminLTE/css/custom.css';

.finished {
    background: crimson;
    color: white;
}
</style>