<template>
    <tr>
        <td>
            -
        </td>
        <td>
            <span>Service Kunjungan</span>
            &nbsp;&nbsp;&nbsp;
            <input type="radio" name="serviceKunjungan" v-model="value" value="true"> Iya &nbsp;&nbsp;&nbsp;
            <input type="radio" name="serviceKunjungan" v-model="value" value="false"> Tidak
        </td>
        <td>-</td>
        <td>-</td>
    </tr>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { EventBus } from '../../event';

@Component({})

export default class ServiceKunjungan extends Vue {
    @Prop({})
    serviceKunjungan: any;

    public value: any = this.serviceKunjungan;

    @Watch('value')
    onserviceKunjunganChange(value: any) {
        const data = (value === 'true') ? true : false;

        EventBus.$emit('changeData', {
            serviceKunjungan: data
        })
    }
}
</script>
