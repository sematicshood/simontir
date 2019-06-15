<template>
    <tr>
        <td>
            -
        </td>
        <td>
            <span>Service</span>
        </td><td>
            <input type="radio" name="services" v-model="values" value="Ringan"> Ringan </td>
            <td><input type="radio" name="services" v-model="values" value="Lengkap"> Lengkap </td>
            <td><input type="radio" name="services" v-model="values" value=""> Tidak </td>
            <td></td>
            <td></td>
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

export default class Service extends Vue {
    @Prop({})
    service: any;
    
    public values: any      = this.service || '';
    public type: any        = localStorage.getItem('vehicle');
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
    onServiceChange(values: any) {
        const params: any = {};
        this.harga = 0;

        EventBus.$emit('removeItem', ['Service Ringan', 'Service Lengkap'])

        EventBus.$emit('changeData', {
            'service': values
        })

        if (values !== '') {
            this.$toasted.info('Loading...');

            params['name']      =   "Service " + values;
            params['type']      =   "service";
            params['vehicle']   =   this.type;

            products.searchProduct(params).then(res => {
                if (res.data.results.length > 0) {
                    res.data.results.forEach((el: any) => {
                        this.harga = el.list_price;

                        EventBus.$emit('addItem', {
                            item: el,
                            type: 'servicesSelected'
                        })
                    });

                    this.$toasted.success(`${ params['name'] } berhasil ditambahkan`, {duration:3000});
                } else {
                    this.values = '';
                    this.$toasted.error(`${ params['name'] } tidak ditemukan`, {duration:3000});
                }
            });
        }
    }
}
</script>
