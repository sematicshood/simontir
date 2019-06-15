<template>
    <tr>
        <td>
            -
        </td>
        <td>
            <span>Ganti Oli dan Part</span>
        </td><td>
            <input type="radio" name="part" v-model="value" value="true"> Iya </td>
            <td><input type="radio" name="part" v-model="value" value="false"> Tidak </td>
        <td></td>
        <td></td>
        <td></td>
        <td>-</td>
        <td>-</td>
    </tr>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { EventBus } from '../../event';

@Component({})

export default class GantiPart extends Vue {
    @Prop({})
    isGantiPart: any;

    public value: any = this.isGantiPart;

    @Watch('value')
    onisGantiPartChange(value: any) {
        const data = (value === 'true') ? true : false;

        EventBus.$emit('changeData', {
            isGantiPart: data
        })
    }
}
</script>
