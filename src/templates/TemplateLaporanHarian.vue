<template>
    <div id="TemplateLaporanHarian">
        <h3>LAPORAN HARIAN BENGKEL Tgl {{ date | date }}</h3>
        <hr>
        <table width="100%">
            <tr>
                <td>
                    <div class="left-boxed boxed">
                        <h4>I. Laporan Pendapatan Bengkel</h4>
                        <table width="100%">
                            <tr>
                                <td>
                                    <h6>Pendapatan Jasa Bengkel</h6>
                                </td>
                                <td>
                                    <h6>Rp. {{ satu | rupiah }}</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Total Jasa + OLI KPB</h6>
                                </td>
                                <td>
                                    <h6>Rp. {{ dua | rupiah }}</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>TOTAL PENJUALAN JAGA</h6>
                                </td>
                                <td>
                                    <h6>Rp. {{ tiga | rupiah }}</h6>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="left-boxed boxed" width="100%">
                        <h4>II. Penjualan Suku Cadang - Service</h4>
                        <table width="100%">
                            <tr>
                                <td>
                                    <h6>Pendapatan Parts Bengkel</h6>
                                </td>
                                <td>
                                    <h6>Rp. {{ empat | rupiah }}</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Pendapatan Oli</h6>
                                </td>
                                <td>
                                    <h6>Rp. {{ lima | rupiah }}</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Pendapatan Busi</h6>
                                </td>
                                <td>
                                    <h6>Rp. {{ enam | rupiah }}</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>TOTAL PENJUALAN PARTS SVC</h6>
                                </td>
                                <td>
                                    <h6>Rp. {{ tujuh | rupiah }}</h6>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="left-boxed boxed">
                        <h4>III. Penjualan Suku Cadang Counter Tunai</h4>
                        <table width="100%">
                            <tr>
                                <td>
                                    <h6>Pendapatan Parts counter</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Pendapatan Oli</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Pendapatan Busi</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>TOTAL PENJUALAN PARTS COUN</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="left-boxed boxed" width="100%">
                        <h4>IV. Penjualan Suku Cadang Counter Reguler</h4>
                        <table width="100%">
                            <tr>
                                <td>
                                    <h6>Pendapatan Parts counter</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Pendapatan Oli</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Pendapatan Busi</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>TOTAL PENJUALAN PARTS COUN</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class="rincian">
                        <h6>Rincian Jasa Per Kategori:</h6>
                        <table width="100%">
                            <tr>
                                <td></td>
                                <td class="bordered">8</td>
                                <td class="lr">ASS I</td>
                                <td class="bordered">3</td>
                                <td class="lr">ASS II</td>
                                <td class="bordered">1</td>
                                <td class="lr">ASS III</td>
                                <td class="bordered">2</td>
                            </tr>
                            <tr>
                                <td>ASS V</td>
                                <td class="bordered">8</td>
                                <td class="lr">ASS I</td>
                                <td class="bordered">3</td>
                                <td class="lr">ASS II</td>
                                <td class="bordered">1</td>
                                <td class="lr">ASS III</td>
                                <td class="bordered">2</td>
                            </tr>
                            <tr>
                                <td>LR</td>
                                <td class="bordered">8</td>
                                <td class="lr">ASS I</td>
                                <td class="bordered">3</td>
                                <td class="lr">ASS II</td>
                                <td class="bordered">1</td>
                                <td class="lr">ASS III</td>
                                <td class="bordered">2</td>
                            </tr>
                        </table>
                    </div>
                </td>
                <td>
                    <div class="middle-boxed boxed" width="100%">
                        <h4>I. PENGELUARAN BENGKEL</h4>
                        <table width="100%">
                            <tr>
                                <td>
                                    <h6>TOTAL PENGELUARAN BENGKEL</h6>
                                </td>
                                <td>
                                    <h6>Rp. 0</h6>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <h6 style="padding: 10px; display: block;">Rincian Kas Bon Karyawan :</h6>

                    <div class="middle-boxed boxed" width="100%">
                        <h4>II. PEMASUKAN BENGKEL</h4>
                        <table width="100%">
                            <tr>
                                <td>
                                    <h6>TOTAL PEMASUKAN BENGKEL</h6>
                                </td>
                                <td>
                                    <h6>Rp. 0</h6>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <h6 style="padding: 10px; display: block;">Rincian Nota Bengkel Kredit :</h6>

                    <h6 style="padding: 10px; display: block;">Rincian Pembayaran Piutang Tunai :</h6>

                    <h6 style="padding: 10px; display: block;">KETERANGAN :</h6>
                </td>
                <td>
                    <div class="right-boxed boxed">
                        <h4>I. Laporan Rincian</h4>
                        <table width="100%">
                            <tr>
                                <td>
                                    <h6>Total Omset</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Total WO Lalu Bayar Hari Ini</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Total Non Tunai</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Total Pembayaran Piutang NT</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Total Reguler Netto (ASS)</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Pembatalan Nota</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="right-boxed-last boxed" width="100%">
                        <h4>II. Laporan Setoran</h4>
                        <table width="100%">
                            <tr>
                                <td>
                                    <h6>Modal Awal</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Total Pembayaran</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Total Pemasukan</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Total Pembayaran Piutang Tunai</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6></h6>
                                </td>
                                <td class="operator">
                                    <hr>
                                    <h6> +</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Jumlah Penerima</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Total Pembayaran Piutang Trf</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Total Pengeluaran</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Total Retur Penjualan</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6></h6>
                                </td>
                                <td class="operator">
                                    <hr>
                                    <h6> -</h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6>Total SETORAN</h6>
                                </td>
                                <td>
                                    <h6>Rp. 3.041.420</h6>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { EventBus } from '../event';
    import additional from '../helpers/additional';
    
    @Component({
        components: {},
        filters: {
            rupiah(angka: any) {
                return additional.convertToRupiah(angka);
            },

            date(date: string) {
                const d   =   date.split('-')

                return `${d[2]}/${d[1]}/${d[0]}`
            }
        }
    })

    export default class TemplateLaporanHarian extends Vue {
        public satu: number         =   0;
        public dua: number          =   0;
        public tiga: number         =   0;
        public empat: number        =   0;
        public lima: number         =   0;
        public enam: number         =   0;
        public tujuh: number        =   0;
        public date: string         =   "";

        public created() {
            EventBus.$on('printReport', (data: any) => {
                this.setData(data)
            })
        }

        public setData(datas: any): void {
            const keys   = Object.keys(datas)

            keys.forEach((key: any) => {
                this.$data[key] =   datas[key]
            })
            
            setTimeout(() => {
                window.print()
            }, 1000)
        }
    }
</script>

<style>
    .left-boxed {
        border-right: 1px dashed black;
        box-sizing: border-boxed;
        /* border-bottom: 1px solid black; */
        width: 100%;
        padding-bottom: 5px;
    }

    .left-boxed:after {
        content: ""; /* This is necessary for the pseudo element to work. */ 
        display: block; /* This will put the pseudo element on its own line. */
        width: 97%;
        border-bottom: 1px solid black; /* This creates the border. Replace black with whatever color you want. */
    }

    .right-boxed, .right-boxed-last {
        border-left: 1px dashed black;
        box-sizing: border-boxed;
        width: 100%;
        padding-bottom: 5px;
        padding-left: 10px !important;
        box-sizing: border-box;
    }

    .right-boxed:after {
        content: ""; /* This is necessary for the pseudo element to work. */ 
        display: block; /* This will put the pseudo element on its own line. */
        width: 100%;
        border-bottom: 1px solid black; /* This creates the border. Replace black with whatever color you want. */
    }

    .middle-boxed {
        padding: 5px 10px !important;
        box-sizing: border-box;
        border-right: 1px dashed black;
        border: none;
    }

    h1,h2,h3,h4,h5,h6 {
        margin: 0;
        padding: 0;
        display: inline-block;
    }

    td {
        vertical-align: top;
    }

    hr {
        height: 1px;
        background: black;
        margin: 10px 0;
        width: 40%;
    }

    .boxed {
        padding: 5px 0;
    }

    .bordered {
        border-right: 1px dashed black;
        margin-right: 5px;
    }

    .lr {
        padding-left: 8px;
        box-sizing: border-box;
    }

    .operator {
        position: relative;
    }

    .operator hr {
        display: inline-block;
        position: absolute;
        width: 60px;
        height: 2px;
    }

    .operator h6 {
        position: absolute;
        top: 30%;
        right: 10px;
    }

    #TemplateLaporanHarian {
        display: none;
    }
    
    @media print
    {
        #LaporanHarian { display: none; }
        #TemplateLaporanHarian { display: block; }
    }
</style>