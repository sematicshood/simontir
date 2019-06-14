<template>
    <tr>
        <td>
            -
        </td>
        <td>
            <span>Spesial Program</span>
            &nbsp;&nbsp;&nbsp;
            <input type="radio" name="spesialProgram" v-model="value" value="true"> Iya &nbsp;&nbsp;&nbsp;
            <input type="radio" name="spesialProgram" v-model="value" value="false"> Tidak
        </td>
        <td>-</td>
        <td>-</td>
    </tr>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { EventBus } from '../../event';

@Component({})

export default class SpesialProgram extends Vue {
    @Prop({})
    spesialProgram: any;

    public value: any = this.spesialProgram;

    @Watch('value')
    onspesialProgramChange(value: any) {
        const data = (value === 'true') ? true : false;

        EventBus.$emit('changeData', {
            spesialProgram: data
        })
    }
}
</script>
