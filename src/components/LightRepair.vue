<template>
  <div id="LightRepair">
    <router-link @click.native="pick" :to="{ name: type, params: { id: data.name } }">
      <div class="box no-border-top">
        <div class="box-body">
          <div class="small-box bg-yellow">
            <div class="inner">
              <h3>
                <strong>{{ data.no_polisi }}</strong>
              </h3>

              <p>{{ data.tipe_kenadaraan }} - {{ data.mekanik }}</p>
            </div>
            <div class="a-group-yellow">
              <a href="#" class="number-task pull-left">
                {{ countSparepart(data) }}
                <i class="fa fa-gears"></i>
              </a>
              <a href="#" class="number-task pull-righ">
                {{ countService(data) }}
                <i class="fa fa-motorcycle"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import mekanik from "../api/mekanik";

export default {
  name: "LightRepair",

  props: ["data", "type"],

  data() {
    return {
      user: []
    };
  },

  created() {
    this.$data.user = JSON.parse(localStorage.getItem("login"));
  },

  methods: {
    countService(dataq) {
      let datas = dataq.order_line.filter(el => {
        return el.type == "service";
      });

      return datas.length;
    },

    countSparepart(dataq) {
      let datas = dataq.order_line.filter(el => {
        return el.type != "service";
      });

      return datas.length;
    },

    pick() {
      if (this.type == "timesheet_mekanik") {
        mekanik.pick({ invoice: this.data.name, user_id: this.$data.user.id });
      } else {
        mekanik.pickFinal({
          invoice: this.data.name,
          user_id: this.$data.user.id
        });
      }
    }
  }
};
</script>
