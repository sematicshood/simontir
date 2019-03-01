<template>
    <tr>
        <td>
            -
        </td>
        <td>
            <span>Ganti Oli</span>
            &nbsp;&nbsp;&nbsp;
        <input type="radio" name="oli" v-model="value" value="true"> Iya &nbsp;&nbsp;&nbsp;
        <input type="radio" name="oli" v-model="value" value="false"> Tidak
        </td>
        <td>-</td>
        <td>-</td>
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

    public value: any = this.isGantiOli;
    public type: any        = localStorage.getItem('vehicle')

    @Watch('value')
    onisGantiOliChange(value: any) {
        const data = (value === 'true') ? true : false;

        EventBus.$emit('changeData', {
            isGantiOli: data
        })

        if (data) {
            let params: any     =   {};

            params['name']      =   "Ganti Oli";
            params['type']      =   "service";
            params['vehicle']   =   this.type;

            products.searchProduct(params).then(res => {
                res.data.results.forEach((el: any) => {
                    EventBus.$emit('addItem', {
                        item: el,
                        type: 'servicesSelected'
                    })
                });
            });
        } else {
            EventBus.$emit('removeItem', 'Ganti Oli')
        }
    }
}
</script>
