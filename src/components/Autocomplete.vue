<template>
    <div>
        <input type="text" class="form-control" id="" placeholder="" 
            @focus="isShow = true"
            v-model="value"/>
        <div class="list" v-show="isShow">
            <li v-for="color in showColors" @click="selectColor(color.color)" :key="color.id">{{ color.color }}</li>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import auth from '../helpers/auth';
import { EventBus } from '../event';

@Component({})

export default class Autocomplete extends Vue {
    @Prop({})
    colors: any;

    @Prop({})
    value: any;

    public isShow: boolean  =   false;
    public showColors: any  =   this.colors;

    public selectColor(color: string): void {
        this.value = color;

        this.isShow = false;
    }

    @Watch('value')
    onValueChange(value: string) {
        this.showColors = this.colors.filter((el: any) => {
            return el.color.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })

        EventBus.$emit('changeValue', value)
    }
}
</script>

<style>
    .list li {
        padding: 10px;
        list-style: none;
        cursor: pointer;
    }
</style>
