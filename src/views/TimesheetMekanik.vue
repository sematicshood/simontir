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
                    <tr v-for="(service, i) in services">
                        <td style="width: 20px;">{{ i += 1 }}</td>
                        <td style="text-align: left;">
                            {{ service.name }} <br>
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
                            {{ kel.name }} <br>
                        </td>
                    </tr>
                </table>
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
    public services: string[]      =   [];
    public keluhan: string[]       =   [];
    public waktu: string           =   '';

    public getData(): void {
        this.ids = this.$route.params.id;

        board.getTask(this.ids).then((res) => {
            if(res.data.results) {
                this.nopol      =   res.data.results.nopol;
                this.waktu      =   res.data.results.waktu_mulai;

                this.services   =   res.data.results.tasks.filter((el: any) => {
                    return el.name.split(':')[0].split(' ')[1] !== 'keluhan';
                });

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

    public finish(): void {
        mekanik.lock({invoice: this.ids}).then((res) => {
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
        }, 1000);

        this.getData();
    }
}
</script>

<style>
@import '../assets/adminLTE/css/custom.css';
</style>