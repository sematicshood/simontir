<template>
    <div>
        <div class="card col-md-12" id="LaporanHarian">
            <div class="card-body">
                <div class="col-md-12">
                    <h4>Tanggal</h4>
                    <input v-model="date" @input="date = $event.target.valueAsDate.toISOString().split('T')[0]" type="date" name="" id="" class="form-control"/>
                    <hr/>
                </div>

                <div class="col-md-12">
                    <h4>Pecahan 100 rb</h4>
                    <VueNumeric separator="." v-model="pecahan_100" class="form-control"/>
                    <hr/>
                </div>

                <div class="col-md-12">
                    <h4>Pecahan 50 rb</h4>
                    <VueNumeric separator="." v-model="pecahan_50" class="form-control"/>
                    <hr/>
                </div>
                
                <div class="col-md-12">
                    <h4>Pecahan 20 rb</h4>
                    <VueNumeric separator="." v-model="pecahan_20" class="form-control"/>
                    <hr/>
                </div>

                <div class="col-md-12">
                    <h4>Pecahan 10 rb</h4>
                    <VueNumeric separator="." v-model="pecahan_10" class="form-control"/>
                    <hr/>
                </div>

                <div class="col-md-12">
                    <h4>Pecahan 5 rb</h4>
                    <VueNumeric separator="." v-model="pecahan_5" class="form-control"/>
                    <hr/>
                </div>

                <div class="col-md-12">
                    <h4>Pecahan 2 rb</h4>
                    <VueNumeric separator="." v-model="pecahan_2" class="form-control"/>
                    <hr/>
                </div>

                <div class="col-md-12">
                    <h4>Pecahan 1 rb</h4>
                    <VueNumeric separator="." v-model="pecahan_1" class="form-control"/>
                    <hr/>
                </div>

                <div class="col-md-12">
                    <h4>Total Koin</h4>
                    <VueNumeric separator="." v-model="koin" class="form-control"/>
                    <hr/>
                </div>

                <div class="col-md-12">
                    <h4>Total Cash</h4>
                    <VueNumeric currency="Rp. " separator="." v-model="total_cash" class="form-control"/>
                    <hr/>
                </div>

                <div class="col-md-12">
                    <h4>Saldo Aplikasi</h4>
                    <VueNumeric currency="Rp. " separator="." v-model="saldo_aplikasi" class="form-control"/>
                    <hr/>
                </div>

                <div class="col-md-12">
                    <h4>Selisih</h4>
                    <VueNumeric currency="Rp. " separator="." v-model="selisih" class="form-control"/>
                    <hr/>
                </div>

                <div class="col-md-12">
                    <h4>Keterangan</h4>
                    <textarea v-model="keterangan" class="form-control"></textarea>
                    <hr/>
                </div>

                <button class="btn form-control btn-warning" @click="printLaporan()">
                    Print Laporan
                </button>

                <br><br>

                <button class="btn form-control btn-primary" @click="submitData()">
                    {{ (isNew === true) ? 'Buat Laporan' : 'Update Laporan' }}
                </button>
            </div>
        </div>

        <div v-if="isNew === false">
            <TemplateLaporanHarian/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import cash_count from '../api/cash_count';
    import laporan from '../api/laporan';
    import TemplateLaporanHarian from '../templates/TemplateLaporanHarian.vue';
    import { EventBus } from '../event';
    
    import VueNumeric from 'vue-numeric';

    @Component({
        components: {
            VueNumeric, TemplateLaporanHarian,
        }
    })

    export default class LaporanHarian extends Vue {
        public date: any                = (new Date()).toISOString().split('T')[0];
        public pecahan_100: number      = 0;
        public pecahan_50: number       = 0;
        public pecahan_20: number       = 0;
        public pecahan_10: number       = 0;
        public pecahan_5: number        = 0;
        public pecahan_2: number        = 0;
        public pecahan_1: number        = 0;
        public koin: number             = 0;
        public total_cash: number       = 0;
        public saldo_aplikasi: number   = 0;
        public selisih: number          = 0;
        public keterangan: string       = "";
        public isNew: boolean           = true;

        public created() {
            this.getData({date: this.date})
        }

        public submitData(): void {
            delete this.$data['isNew']

            cash_count.submitLaporan(this.$data).then(() => {
                if (this.isNew) {
                    this.isNew = false;
                }
            })
        }

        public getData(date: any): void {
            cash_count.getData(date).then((res: any) => {
                try {
                    console.log(res.data.results)
                    this.setData(res.data.results)

                    if (res.data.count > 0) {
                        this.isNew = false;
                    }
                } catch (error) {
                    
                }
            })

            cash_count.getTotalSaldo(date).then((res: any) => {
                try {
                    if (this.saldo_aplikasi === 0) {
                        this.saldo_aplikasi = res.data.results
                    }
                } catch (error) {
                    
                }
            })
        }

        public setData(datas: any): void {
            datas.forEach((el: any) => {
                const keys   = Object.keys(el)

                keys.forEach((key: any) => {
                    this.$data[key] =   el[key]
                })
            })

            if (datas.length === 0) {
                this.pecahan_100      = 0;
                this.pecahan_50       = 0;
                this.pecahan_20       = 0;
                this.pecahan_10       = 0;
                this.pecahan_5        = 0;
                this.pecahan_2        = 0;
                this.pecahan_1        = 0;
                this.koin             = 0;
                this.total_cash       = 0;
                this.saldo_aplikasi   = 0;
                this.selisih          = 0;
                this.keterangan       = "";
                this.isNew            = true;
            }
        }

        public countSelisi(): void {
            this.selisih = this.total_cash - this.saldo_aplikasi
        }

        public printLaporan(): void {
            laporan.getReportToday({date: this.date}).then((res: any) => {
                try {
                    let data        = res.data.results;

                    data['date']    =   this.date;

                    EventBus.$emit('printReport', data);
                } catch (error) {
                    
                }
            })
        }

        @Watch('total_cash')
        onTotalCashChange() {
            this.countSelisi()
        }

        @Watch('saldo_aplikasi')
        onSaldoAplikasiChange() {
            this.countSelisi()
        }

        @Watch('date')
        onDateChange() {
            this.getData({date: this.date})
        }
    }
</script>