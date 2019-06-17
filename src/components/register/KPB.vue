<template>
    <tr>
        <td>
            -
        </td>
        <td>
            <span>KPB</span>
        </td><td>
             <input type="radio" name="kpb" v-model="values" value="1"> 1 </td>
            <td><input type="radio" name="kpb" v-model="values" value="2"> 2 </td>
            <td><input type="radio" name="kpb" v-model="values" value="3"> 3 </td>
            <td><input type="radio" name="kpb" v-model="values" value="4"> 4 </td>
            <td><input type="radio" name="kpb" v-model="values" value="0"> Tidak
        </td>
        <td>-</td>
        <td>-</td>
    </tr>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { EventBus } from '../../event';
import products from '../../api/products';
import additional from '../../helpers/additional';

@Component({})

export default class KPB extends Vue {
    @Prop({})
    kpb: any;

    public values: any      = this.kpb || 0;
    public type: any        = localStorage.getItem('vehicle')
    public harga: number    = 0;

    public convertToRupiah(angka: number): string {
        return additional.convertToRupiah(angka);
    }

    public created() {
        EventBus.$on('updateType', (el: any) => {
            this.type = el
        })
    }

    @Watch('values')
    onKpbChange(values: any) {
        const params: any = {};
        this.harga = 0;

        EventBus.$emit('removeItem', ['KPB'])

        params['name']      =   "KPB "  + values;
        params['type']      =   "service";
        params['vehicle']   =   this.type;

        if (values !== 0) {
            this.$toasted.info('Loading...');

            products.searchProduct(params).then(res => {
                if (res.data.results.length > 0) {
                        EventBus.$emit('changeData', {
                        'kpb': values
                    });

                    res.data.results.forEach((el: any) => {
                        this.harga = el.list_price

                        EventBus.$emit('addItem', {
                            item: el,
                            type: 'servicesSelected'
                        })
                    });
                    
                    this.$toasted.success(`${ params['name'] } berhasil ditambahkan`, {duration:3000});
                } else {
                    this.values = 0;
                    this.$toasted.error(`${ params['name'] } tidak ditemukan`, {duration:3000});
                }
            });
        }
    }
}
</script>
