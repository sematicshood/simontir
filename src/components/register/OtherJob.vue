<template>
    <tr>
        <td>
            -
        </td>
        <td>
            <span>Other Job</span>
            &nbsp;&nbsp;&nbsp;
            <input type="radio" name="otherJob" v-model="value" value="true"> Iya &nbsp;&nbsp;&nbsp;
            <input type="radio" name="otherJob" v-model="value" value="false"> Tidak
        </td>
        <td>-</td>
        <td>-</td>
    </tr>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { EventBus } from '../../event';

@Component({})

export default class OtherJob extends Vue {
    @Prop({})
    otherJob: any;

    public value: any = this.otherJob;

    @Watch('value')
    onotherJobChange(value: any) {
        const data = (value === 'true') ? true : false;

        EventBus.$emit('changeData', {
            otherJob: data
        })
    }
}
</script>
