<template>
    <div class="searchAuto">
        <div class="form-group mx-sm-1 mb-3">
            <input type="text" id="" :placeholder="placeholder" 
                v-model="value"/>
        </div>
        <div class="list" v-show="isShow">
            <li v-for="item in showItems" @click="selectItem(item)" :key="item.id">
                {{ item.name }}
                <button class="btn btn-sm btn-danger">Barcode : {{ item.barcode }}</button>
                <button class="btn btn-sm btn-primary">Stok : {{ item.qty_available }}</button>
            </li>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import auth from '../helpers/auth';
import { EventBus } from '../event';
import products from '../api/products';

@Component({})

export default class Autocomplete extends Vue {
    @Prop({})
    value: any;

    @Prop({})
    type: any;

    @Prop({})
    placeholder: any;

    @Prop({})
    protype: any;

    public isShow: boolean  =   false;
    public showItems: any   =   [];

    public selectItem(item: any): void {
        if (item.qty_available > 0) {
            const type = (this.protype === 'service') ? 'servicesSelected' : 'sparepartsSelected';

            EventBus.$emit('addItem', {item,type});

            this.isShow = false;
        } else {
            alert('Stok habis!')
        }
    }

    @Watch('value')
    onValueChange(value: string) {
        this.isShow = true;

        if (value === '') {
            this.isShow = false;
        }

        setTimeout(() => {
            const params: any = {};

            params[this.type]   =   value;
            params['type']      =   this.protype;
            this.showItems      =   [];

            products.searchProduct(params).then(res => {
                res.data.results.forEach((el: any) => {
                    this.showItems.push(el);
                });
            });
        }, 1000);

        EventBus.$emit('changeValue', value);
    }
}
</script>

<style>
    .list li {
        padding: 10px;
        list-style: none;
        cursor: pointer;
    }

    .searchAuto {
        display: inline-block;
    }

    .searchAuto input {
        padding: 3px 6px;
        width: 140px;
    }

    .list {
        position: absolute;
        background: wheat;
        z-index: 99999;
    }
</style>
