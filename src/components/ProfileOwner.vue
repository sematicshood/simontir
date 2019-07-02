<template>
  <div class="row">
    <div class="container">
      <br>
      <div class="col-md-12">
        <div class="col-md-6 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4 class="text-center">REVENUE</h4>
            </div>
            <div class="card-body">
              <line-chart :option="options" :chart-data="datacollection"></line-chart>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4 class="text-center">SALES FOR THE MONTH</h4>
            </div>
            <div class="card-body">
              <div class="col-md-12">
                <br>
                <div class="row">
                  <div class="col-md-12">
                    <div class="center-flex">
                      <input
                        type="month"
                        :value="dateSales"
                        class="form-control col-md-6 col-sm-12"
                        @change="dateSalesChange($event.target.value)"
                      >
                    </div>
                    <br>
                  </div>
                  <div class="col-md-12">
                    <div class="text-center">
                      <h3>{{ sales | rupiah }}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div class="col-md-12">
        <br>
        <br>
        <div class="col-md-6 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4 class="text-center">NEW CUSTOMER</h4>
            </div>
            <div class="card-body">
              <h3 class="text-center">{{ customers.newCustomer | rupiah }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4 class="text-center">RETURNING CUSTOMER</h4>
            </div>
            <div class="card-body">
              <h3 class="text-center">{{ customers.returnCustomer | rupiah }}</h3>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div class="col-md-12">
        <br>
        <br>
        <div class="col-md-6 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4 class="text-center">TOP 10 SERVICE REVENUE</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover table-bordered">
                  <tr>
                    <th>Nama</th>
                    <th>Total Terjual</th>
                  </tr>
                  <tr v-for="(revenue, i) in topRevenue.service" :key="i">
                    <td>{{revenue.name}}</td>
                    <td>
                      {{ revenue.sale }}
                      <progress :value="revenue.sale" :max="max_service"></progress>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4 class="text-center">TOP 10 PRODUCT REVENUE</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover table-bordered">
                  <tr>
                    <th>Nama</th>
                    <th>Total Terjual</th>
                  </tr>
                  <tr v-for="(revenue, i) in topRevenue.product" :key="i">
                    <td>{{revenue.name}}</td>
                    <td>
                      {{ revenue.sale }}
                      <progress :value="revenue.sale" :max="max_product"></progress>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <br>
        <br>
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <div class="card">
              <div class="card-header">
                <h4 class="text-center">Total Unit Entry</h4>
              </div>
              <div class="card-body">
                <h3 class="text-center">
                  {{ rasio.unit_this_month | rupiah }}
                  <span
                    v-if="rasio.unit_this_month > rasio.unit_previous_month"
                  >&#x25B2;</span>
                  <span v-else-if="rasio.unit_this_month < rasio.unit_previous_month">&#x25BC;</span>
                </h3>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-sm-12">
            <div class="card">
              <div class="card-header">
                <h4 class="text-center">Total Jasa</h4>
              </div>
              <div class="card-body">
                <h3 class="text-center">
                  {{ rasio.service_this_month | rupiah }}
                  <span
                    v-if="rasio.service_this_month > rasio.service_previous_month"
                  >&#x25B2;</span>
                  <span v-else-if="rasio.service_this_month < rasio.service_previous_month">&#x25BC;</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <br>
        <br>
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <div class="card">
              <div class="card-header">
                <h4 class="text-center">Rasio Unit/Mekanik/Hari</h4>
              </div>
              <div class="card-body">
                <h3 class="text-center">
                  {{ getRasioUnitThisMonth() }}%
                  <span
                    v-if="rasio.rasio_unit_this_month > rasio.rasio_unit_previous_month"
                  >&#x25B2;</span>
                  <span
                    v-else-if="rasio.rasio_unit_this_month < rasio.rasio_unit_previous_month"
                  >&#x25BC;</span>
                </h3>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-sm-12">
            <div class="card">
              <div class="card-header">
                <h4 class="text-center">Rasio Jasa/Mekanik/Hari</h4>
              </div>
              <div class="card-body">
                <h3 class="text-center">
                  {{ getRasioServiceThisMonth() }}%
                  <span
                    v-if="rasio.rasio_service_this_month > rasio.rasio_service_previous_month"
                  >&#x25B2;</span>
                  <span
                    v-else-if="rasio.rasio_service_this_month < rasio.rasio_service_previous_month"
                  >&#x25BC;</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <br>
        <br>
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <div class="card">
              <div class="card-header">
                <h4 class="text-center">Unit Booking Service</h4>
              </div>
              <div class="card-body">
                <h3 class="text-center">
                  {{ service.booking_service_unit_this_month | rupiah }}
                  <span
                    v-if="service.booking_service_unit_this_month > service.booking_service_unit_prev_month"
                  >&#x25B2;</span>
                  <span
                    v-else-if="service.booking_service_unit_this_month < service.booking_service_unit_prev_month"
                  >&#x25BC;</span>
                </h3>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-sm-12">
            <div class="card">
              <div class="card-header">
                <h4 class="text-center">Total Booking Service</h4>
              </div>
              <div class="card-body">
                <h3 class="text-center">
                  {{ service.booking_service_total_this_month | rupiah }}
                  <span
                    v-if="service.booking_service_total_this_month > service.booking_service_total_prev_month"
                  >&#x25B2;</span>
                  <span
                    v-else-if="service.booking_service_total_this_month < service.booking_service_total_prev_month"
                  >&#x25BC;</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <br>
        <br>
        <div class="col-md-6 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4 class="text-center">PERFORMANCE MEKANIK</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <tr>
                    <th>Team</th>
                    <th>Absensi</th>
                    <th>Jasa</th>
                    <th>Part</th>
                    <th>Total</th>
                  </tr>
                  <tr v-for="(mekanik, i) in staffMekanik.mekanik_users" :key="i">
                    <td>{{mekanik.name}}</td>
                    <td>{{ mekanik.attendance }}</td>
                    <td>{{ mekanik.jasa | rupiah }}</td>
                    <td>{{ mekanik.part | rupiah }}</td>
                    <td>{{ mekanik.total | rupiah }}</td>
                  </tr>
                  <tfoot>
                    <tr>
                      <th></th>
                      <th></th>
                      <th>{{ totalJasa | rupiah }}</th>
                      <th>{{ totalPart | rupiah }}</th>
                      <th>{{ totalMekanik | rupiah }}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4 class="text-center">PERFORMANCE STAFF</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <tr>
                    <th>Team</th>
                    <th>Absensi</th>
                    <th>Omset</th>
                    <th>Insentif</th>
                  </tr>
                  <tr v-for="(staff, i) in staffMekanik.staff_users" :key="i">
                    <td>{{staff.name}}</td>
                    <td>{{ staff.attendance }}</td>
                    <td>{{ staff.omset | rupiah }}</td>
                    <td>{{ staff.insentif | rupiah }}</td>
                  </tr>
                  <tfoot>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>{{ totalInsentif | rupiah }}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12 col-sm-12">
          <br>
          <br>
          <div class="card">
            <div class="card-header">
              <h4 class="text-center">PERFORMANCE MANAJEMEN</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover table-bordered">
                  <tr>
                    <th colspan="2"></th>
                    <th colspan="2" class="text-center">Omset</th>
                    <th></th>
                  </tr>
                  <tr>
                    <th>Nama</th>
                    <th>Absensi</th>
                    <th>Bengkel</th>
                    <th>Part</th>
                    <th>Total</th>
                  </tr>
                  <tr v-for="(head, i) in staffMekanik.head_users" :key="i">
                    <td>{{head.name}}</td>
                    <td>{{ head.attendance }}</td>
                    <td>{{ head.omset_bengkel | rupiah }}</td>
                    <td>{{ head.omset_part | rupiah }}</td>
                    <td>{{ head.total | rupiah }}</td>
                  </tr>
                  <tfoot>
                    <th></th>
                    <th></th>
                    <th>{{ totalBengkel | rupiah }}</th>
                    <th>{{ totalPart | rupiah }}</th>
                    <th>{{ totalHead | rupiah }}</th>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
import LineChart from "./chart/LineChart";
import profile from "../api/profile";

const date = new Date();

export default {
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: null,
      dateSales: date
        .toISOString()
        .split("T")[0]
        .split("-")
        .splice(0, 2)
        .join("-"),
      data: [],
      topRevenue: [],
      sales: 0,
      service: [],
      max_product: 0,
      max_service: 0,
      rasio: [],
      customers: [],
      staffMekanik: [],
      totalInsentif: 0,
      totalJasa: 0,
      totalPart: 0,
      totalMekanik: 0,
      totalHead: 0,
      totalBengkel: 0,
      totalPart: 0,
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
      }
    };
  },
  created() {
    const salesDate = this.dateSales.split("-");

    profile.revenue().then(res => {
      this.data = res.data.results;

      this.fillData();
    });

    profile.newReturnCustomer(salesDate[1], salesDate[0]).then(res => {
      this.customers = res.data.results;
    });

    profile.rasio(salesDate[1], salesDate[0]).then(res => {
      this.rasio = res.data.results;
    });

    profile.service(salesDate[1], salesDate[0]).then(res => {
      this.service = res.data.results;
    });

    profile.staffMekanik(salesDate[1], salesDate[0]).then(res => {
      this.staffMekanik = res.data.results;

      this.staffMekanik.staff_users.forEach(staff => {
        this.totalInsentif += staff.insentif;
      });

      this.staffMekanik.mekanik_users.forEach(mekanik => {
        this.totalJasa += mekanik.jasa;
        this.totalPart += mekanik.part;
        this.totalMekanik += mekanik.total;
      });

      this.staffMekanik.head_users.forEach(head => {
        this.totalBengkel += head.omset_bengkel;
        this.totalPart += head.omset_part;
        this.totalHead += head.total;
      });
    });

    profile.topRevenue(salesDate[1], salesDate[0]).then(res => {
      this.topRevenue = res.data.results;

      this.topRevenue.product.forEach(revenue => {
        if (revenue.sale > this.max_product) {
          this.max_product = revenue.sale;
        }
      });

      this.topRevenue.service.forEach(revenue => {
        if (revenue.sale > this.max_service) {
          this.max_service = revenue.sale;
        }
      });
    });

    this.getSales(salesDate[1], salesDate[0]);
  },

  filters: {
    rupiah: function(angka) {
      try {
        const prefix = "Rp. ";

        var number_string = angka
            .toString()
            .replace(/[^,\d]/g, "")
            .toString(),
          split = number_string.split(","),
          sisa = split[0].length % 3,
          rupiah = split[0].substr(0, sisa),
          ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
          const separator = sisa ? "." : "";
          rupiah += separator + ribuan.join(".");
        }

        rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
        return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
      } catch (error) {
        return angka;
      }
    }
  },

  watch: {
    dateSales() {
      const salesDate = this.dateSales.split("-");

      this.getSales(salesDate[1], salesDate[0]);
    }
  },
  mounted() {
    this.fillData();
  },
  methods: {
    getRasioUnitThisMonth() {
      return (
        ((this.rasio.rasio_unit_this_month -
          this.rasio.rasio_unit_previous_month) /
          this.rasio.rasio_unit_previous_month) *
        100
      );
    },

    getRasioServiceThisMonth() {
      return (
        ((this.rasio.rasio_service_this_month -
          this.rasio.rasio_service_previous_month) /
          this.rasio.rasio_service_previous_month) *
        100
      );
    },

    getSales(month, year) {
      profile.sales(month, year).then(res => {
        this.sales = res.data.results.sales;
      });
    },

    dateSalesChange(value) {
      this.dateSales = value;
    },

    fillData() {
      try {
        const labels = [];
        const datasets = [
          {
            label: "Revenue",
            backgroundColor: "#f87979",
            fill: false,
            data: []
          }
        ];

        this.data.revenue.forEach(data => {
          labels.push(data.date);
          datasets[0].data.push(data.revenue);
        });

        this.datacollection = {
          labels: labels,
          datasets: datasets
        };
      } catch (error) {}
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}

.center-flex {
  display: flex;
  justify-content: center;
}
</style>