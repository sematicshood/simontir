<template>
  <div id="reguler" :class="{'disabled': loading}">
    <div @click="pick">
      <div class="box no-border-top">
        <div class="box-body">
          <div class="small-box bg-green">
            <div class="inner">
              <h3>
                <strong>{{ data.no_polisi }}</strong>
              </h3>

              <p>{{ data.tipe_kenadaraan }} - {{ data.mekanik }}</p>
            </div>
            <div class="a-group-green">
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
    </div>
  </div>
</template>

<script>
import mekanik from "../api/mekanik";

export default {
  name: "reguler",

  props: ["data", "type"],

  data() {
    return {
      user: [],
      loading: false
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
      this.loading = true;

      if (this.type == "timesheet_mekanik") {
        mekanik
          .pick({ invoice: this.data.name, user_id: this.$data.user.id })
          .then(res => {
            try {
              if (res.data.result._status_code === 400) {
                alert(res.data.result.response.error_description);
                return false;
              }
            } catch (error) {}

            this.$router.push({
              name: this.type,
              params: { id: this.data.name }
            });
          });
      } else {
        mekanik
          .pickFinal({
            invoice: this.data.name,
            user_id: this.$data.user.id
          })
          .then(res => {
            try {
              if (res.data.result._status_code === 400) {
                alert(res.data.result.response.error_description);
                return false;
              }
            } catch (error) {}

            this.$router.push({
              name: this.type,
              params: { id: this.data.name }
            });
          });
      }
    }
  }
};
</script>
