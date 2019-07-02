<template>
    <div class="searchAuto" style="width:100%;">
        <div class="input-group">
            <label for="">No. Polisi</label>
            <input type="text" class="form-control" v-model="nopol" @change="cekNopol" :placeholder="placeholder" @keyup.esc="isShow = false">
            <span class="input-group-btn">
                <button style="margin-top: 25px;" v-if="buttonHistory" type="button" v-b-modal="'myModal'" class="btn btn-success btn-flat">History</button>
            </span>
        </div>
        <span>*) Wajib diisi</span>
        <div class="list" v-show="isShow">
            <li v-for="item in showItems" @click="selectItem(item)" :key="item.id">
                {{ item.license_plate }}
            </li>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import auth from '../helpers/auth';
import { EventBus } from '../event';
import products from '../api/products';
import register from '../api/register';

@Component({})

export default class NopolAutocomplete extends Vue {
    @Prop({})
    value: any;

    @Prop({})
    placeholder: any;

    public isShow: boolean  =   false;
    public showItems: any   =   [];
    public buttonHistory    =   false;
    public nopol: string    =   this.value
    public prev: string     =   ''

    public selectItem(item: any): void {
        this.isShow = false
        this.nopol  = item.license_plate
        this.prev   = item.license_plate

        EventBus.$emit('changeData', {
            'noPolisi': item.license_plate
        })

        this.cekNopol()
    }

    public cekNopol(): void {
        register.cekNopol({nopol: this.nopol.toUpperCase()})
                .then((res) => {
                    if (res.data) {
                        const data = res.data.results[0];

                        let re: any   = {
                            "noMesin"        : data.no_mesin,
                            "noRangka"       : data.no_rangka,
                            "tahun"          : data.tahun,
                            "namaPemilik"    : data.nama_pemilik,
                            "noTelp"         : data.telp_pemilik,
                            "email"          : data.email_pemilik,
                            "sosmed"         : data.sosmed,
                            "histories"      : data.history,
                        }

                        if (data.tipe_motor != undefined) {
                            re['type'] = {
                                text: data.tipe_motor.name,
                                value: data.tipe_motor
                            }
                        }

                        EventBus.$emit('changeDatas', re)
                    }
                });
        
        EventBus.$emit('cekNomesin');
    }

    @Watch('nopol')
    onValueChange(value: string) {
        if (value === this.prev) {
            this.isShow = false;

            return
        }

        EventBus.$emit('changeDatas', {
            'noPolisi': value
        })
        if (value === '') {
            this.buttonHistory = false;
            this.isShow = false
        } else {
            this.buttonHistory = true;
            this.isShow = true;

            products.searchNopol({ nopol: value }).then(res => {
                    try {
                        this.showItems = res.data.results
                    } catch (error) {
                        
                    }
                })
        }
    }
}
</script>