<template>
    <tr>
        <td>
            -
        </td>
        <td>
            <span>Job Return</span>
        </td>
            <td><input type="radio" name="jobReturn" v-model="value" value="true"> Iya </td>
            <td><input type="radio" name="jobReturn" v-model="value" value="false"> Tidak
        </td>
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

export default class JobReturn extends Vue {
    @Prop({})
    jobReturn: any;

    public value: any = this.jobReturn;

    @Watch('value')
    onjobReturnChange(value: any) {
        const data = (value === 'true') ? true : false;

        EventBus.$emit('changeData', {
            jobReturn: data
        })
    }
}
</script>
