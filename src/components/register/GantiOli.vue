<template>
    <tr>
        <td>
            -
        </td>
        <td>
            <span>Ganti Oli</span>
        </td><td>
        <input type="radio" name="oli" v-model="value" value="true"> Iya </td>
        <td><input type="radio" name="oli" v-model="value" value="false"> Tidak </td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { EventBus } from '../../event';
import products from '../../api/products';

@Component({})

export default class GantiOli extends Vue {
    @Prop({})
    isGantiOli: any;

    public value: any       = this.isGantiOli;
    public type: any        = localStorage.getItem('vehicle')

    @Watch('value')
    onisGantiOliChange(value: any) {
        const data = (value === 'true') ? true : false;

        EventBus.$emit('changeData', {
            isGantiOli: data
        })

        if (data) {
            this.$toasted.info('Loading...');
            let params: any     =   {};

            params['name']      =   "Ganti Oli";
            params['type']      =   "service";
            params['vehicle']   =   this.type;
            params['equal']     =   '=';

            products.searchProduct(params).then(res => {
                if (res.data.results.length > 0) {
                    res.data.results.forEach((el: any) => {
                        EventBus.$emit('addItem', {
                            item: el,
                            type: 'servicesSelected'
                        })
                    });

                    this.$toasted.success(`${ params['name'] } berhasil ditambahkan`, {duration:3000});
                } else {
                    this.value = false;
                    this.$toasted.error(`${ params['name'] } tidak ditemukan`, {duration:3000});
                }
            });
        } else {
            EventBus.$emit('removeItem', 'Ganti Oli')
        }
    }
}
</script>
