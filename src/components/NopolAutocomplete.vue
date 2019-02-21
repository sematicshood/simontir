<template>
    <div class="searchAuto" style="width:100%;">
        <div class="input-group">
            <label for="">No. Polisi</label>
            <input type="text" class="form-control" v-model="value" @change="cekNopol" :placeholder="placeholder">
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

    public selectItem(item: any): void {
        this.isShow = false

        EventBus.$emit('changeData', {
            'noPolisi': item.license_plate
        })
    }

    public cekNopol(): void {
        console.log('halooo')
        register.cekNopol({nopol: this.value.toUpperCase()})
                .then((res) => {
                    console.log(res)
                    if (res.data) {
                        const data = res.data.results[0];

                        const re   = {
                            "noMesin"        : data.no_mesin,
                            "noRangka"       : data.no_rangka,
                            "tahun"          : data.tahun,
                            "namaPemilik"    : data.nama_pemilik,
                            "noTelp"         : data.telp_pemilik,
                            "email"          : data.email_pemilik,
                            "sosmed"         : data.sosmed,
                            "histories"      : data.history,
                            "type"           : data.tipe_motor,
                        }

                        EventBus.$emit('changeData', re)
                    }
                });
    }

    @Watch('value')
    onValueChange(value: string) {
        EventBus.$emit('changeData', {
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

        EventBus.$emit('cekNomesin');
    }
}
</script>