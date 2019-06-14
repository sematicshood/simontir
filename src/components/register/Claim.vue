<template>
    <tr>
        <td>
            -
        </td>
        <td>
            <span>Claim</span>
            &nbsp;&nbsp;&nbsp;
            <input type="radio" name="claim" v-model="value" value="true"> Iya &nbsp;&nbsp;&nbsp;
            <input type="radio" name="claim" v-model="value" value="false"> Tidak
        </td>
        <td>-</td>
        <td>-</td>
    </tr>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { EventBus } from '../../event';

@Component({})

export default class Claim extends Vue {
    @Prop({})
    claim: any;

    public value: any = this.claim;

    @Watch('value')
    onclaimChange(value: any) {
        const data = (value === 'true') ? true : false;

        EventBus.$emit('changeData', {
            claim: data
        })
    }
}
</script>
