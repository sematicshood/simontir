<template>
  <div class="searchAuto">
    <div class="form-group mx-sm-1 mb-3">
      <input type="text" id :placeholder="placeholder" v-model="value" @keyup.esc="isShow = false">
    </div>
    <div class="list" v-show="isShow">
      <li
        v-for="(item, i) in showItems"
        @click="selectItem(item)"
        :key="i"
      >{{ item.name }} | {{ item.barcode }} | {{ item.qty_available }} | Rp. {{ toRupiah(item.list_price) }}</li>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import auth from "../helpers/auth";
import { EventBus } from "../event";
import products from "../api/products";

@Component({})
export default class Autocomplete extends Vue {
  @Prop({})
  value: any;

  @Prop({})
  type: any;

  @Prop({})
  placeholder: any;

  @Prop({})
  protype: any;

  public isShow: boolean = false;
  public showItems: any = [];
  public prev: string = "";
  public kendaraan: any = localStorage.getItem("vehicle");

  public selectItem(item: any): void {
    if (item.qty_available > 0 || this.protype === "service") {
      const type =
        this.protype === "service" ? "servicesSelected" : "sparepartsSelected";

      EventBus.$emit("addItem", { item, type });

      this.isShow = false;
    } else {
      alert("Stok habis!");
    }
  }

  public toRupiah(value: any): any {
    try {
      let number_string = value
          .toString()
          .replace(/[^,\d]/g, "")
          .toString(),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

      if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }

      rupiah = split[1] != undefined ? rupiah + "." + split[1] : rupiah;
      return rupiah ? rupiah : 0;
    } catch (error) {
      return 0;
    }
  }

  @Watch("value")
  onValueChange(value: string) {
    if (value === "") {
      this.isShow = false;

      return;
    }

    this.isShow = true;

    setTimeout(() => {
      const params: any = {};

      params[this.type] = value;
      params["type"] = this.protype;
      params["vehicle"] = this.kendaraan;
      this.showItems = [];

      products.searchProduct(params).then(res => {
        this.showItems = res.data.results;
      });
    }, 1000);

    EventBus.$emit("changeValue", value);
  }
}
</script>

<style>
.list li {
  padding: 10px;
  list-style: none;
  cursor: pointer;
}

.searchAuto {
  display: inline-block;
}

.searchAuto input {
  padding: 3px 6px;
  width: 140px;
}

.list {
  position: absolute;
  background: wheat;
  z-index: 99999;
}
</style>
