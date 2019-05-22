<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="text-center">Periode {{ getDate() }}</h4>
      </div>
      <div class="card-body">
        <div class="widget-user-header bg-red" style="margin-bottom: 20px;">
          <h3 class="widget-user-username">{{ user.name }}</h3>
          <h5 class="widget-user-desc">{{ user.job }}</h5>
          <img class="img-circle" :src="`data:image/gif;base64,${ user.image }`" alt="User Avatar">
        </div>
        <div class="col-md-12">
          <br>
          <br>
          <div class="row">
            <div class="col-md-4 col-sm-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Jumlah Unit Entri Tahun Ini</h4>
                </div>
                <div class="card-body">
                  <h3 class="text-center" v-text="data.unit_entri_year"></h3>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Jumlah Return Tahun Ini</h4>
                </div>
                <div class="card-body">
                  <h3 class="text-center" v-text="data.return_year"></h3>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Jumlah Jasa Tahun Ini</h4>
                </div>
                <div class="card-body">
                  <h3 class="text-center" v-text="data.jasa_year"></h3>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-sm-12">
              <br>
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Jumlah Unit Entri Bulan Ini</h4>
                </div>
                <div class="card-body">
                  <h3 class="text-center" v-text="data.unit_entri_year"></h3>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-sm-12">
              <br>
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Jumlah Jasa Bulan Ini</h4>
                </div>
                <div class="card-body">
                  <h3 class="text-center" v-text="data.jasa_month"></h3>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-sm-12">
              <br>
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Total Absensi</h4>
                </div>
                <div class="card-body">
                  <h3 class="text-center" v-text="data.attendance"></h3>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-sm-12">
              <br>
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Performance</h4>
                </div>
                <div class="card-body">
                  <h3 class="text-center" v-text="data.performance"></h3>
                </div>
              </div>
            </div>

            <div class="col-md-12 col-sm-12">
              <br>
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Jumlah Unit Entri {{ getDate() }}</h4>
                </div>
                <div class="card-body">
                  <line-chart :option="options" height="200" :chart-data="datacollection"></line-chart>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-12">
              <br>
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Jumlah Unit Entri Light Repair</h4>
                </div>
                <div class="card-body">
                  <h3 class="text-center" v-text="data.light_this_month"></h3>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-12">
              <br>
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Jumlah Return Heavy Repair</h4>
                </div>
                <div class="card-body">
                  <h3 class="text-center" v-text="data.booking_this_month"></h3>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-12">
              <br>
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Jumlah Jasa Reguler</h4>
                </div>
                <div class="card-body">
                  <h3 class="text-center" v-text="data.reguler_this_month"></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const date = new Date();
import profile_mekanik from "../api/profile_mekanik";
import LineChart from "./chart/LineChart";

export default {
  props: ["id"],

  components: {
    LineChart
  },

  data() {
    return {
      date: date
        .toISOString()
        .split("T")[0]
        .split("-")
        .splice(0, 2)
        .join("-"),
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      data: [],
      user: JSON.parse(localStorage.getItem("login")),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      },
      datacollection: null
    };
  },

  watch: {
    date() {
      this.getData();
    }
  },

  methods: {
    dateChange(value) {
      this.date = value;
    },

    getDate() {
      return `${this.date.split("-")[0]}`;
    },

    getData() {
      const date = this.date.split("-");

      profile_mekanik.get(date[1], date[0], this.id).then(res => {
        this.data = res.data.results;

        this.fillData();
      });
    },

    fillData() {
      try {
        const labels = [];
        const datasets = [
          {
            label: "Jumlah Unit Entri",
            backgroundColor: "#f87979",
            fill: false,
            data: []
          }
        ];

        this.data.unit_permonth.forEach(data => {
          labels.push(this.months[data.date - 1]);
          datasets[0].data.push(data.unit_permonth);
        });

        this.datacollection = {
          labels: labels,
          datasets: datasets
        };
      } catch (error) {}
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style>
h3 {
  margin: 0;
}

.card-body {
  padding: 0 0 1.25rem 0 !important;
}

.widget-user-header {
  padding: 25px;
  box-sizing: border-box;
  position: relative;
  padding-bottom: 50px;
  margin-bottom: 50px !important;
}

.widget-user-header .img-circle {
  position: absolute;
  width: 100px;
  left: 45%;
}
</style>
