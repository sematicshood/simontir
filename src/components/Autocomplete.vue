<template>
  <div>
    <input type="text" class="form-control" id placeholder @keyup.esc="isShow = false" v-model="v">
    <div class="list" v-show="isShow">
      <li
        v-for="(color, i) in showColors"
        @click="selectColor(color.color)"
        :key="i"
      >{{ color.color }}</li>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import auth from "../helpers/auth";
import { EventBus } from "../event";

@Component({})
export default class Autocomplete extends Vue {
  @Prop({})
  colors: any;

  @Prop({})
  value: any;

  public isShow: boolean = false;
  public showColors: any = this.colors;
  public prev: any = "";
  public v: any = this.value;

  public selectColor(color: string): void {
    this.v = color;
    this.prev = color;

    this.isShow = false;

    EventBus.$emit("changeValue", color);
  }

  @Watch("v")
  onValueChange(v: string) {
    if (v === this.prev) {
      this.isShow = false;
    } else {
      this.isShow = true;

      this.showColors = this.colors.filter((el: any) => {
        return el.color.toUpperCase().indexOf(v.toUpperCase()) > -1;
      });

      EventBus.$emit("changeColor", v);
    }
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
