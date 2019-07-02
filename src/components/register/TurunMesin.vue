<template>
    <tr>
        <td>
            -
        </td>
        <td>
            <span>Heavy Repair</span>
        </td><td>
            <input type="radio" name="mesin" v-model="value" value="true"> Iya </td>
            <td><input type="radio" name="mesin" v-model="value" value="false"> Tidak 
        </td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
    </tr>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { EventBus } from '../../event';

@Component({})

export default class TurunMesin extends Vue {
    @Prop({})
    isTurunMesin: any;

    public value: any = this.isTurunMesin;

    @Watch('value')
    onIsTurunMesinChange(value: any) {
        const data = (value === 'true') ? true : false;

        EventBus.$emit('changeData', {
            isTurunMesin: data
        })
    }
}
</script>
