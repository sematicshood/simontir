<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="text-center">Periode {{ getDate() }}</h4>
      </div>
      <div class="card-body">
        <div class="form-group text-center">
          <div class="col-md-12">
              <div class="form-group">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="bulanan" v-model="type">
                    <label class="form-check-label" for="inlineRadio1">Rekap Bulanan</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="harian" v-model="type">
                    <label class="form-check-label" for="inlineRadio2">Harian</label>
                </div>
            </div>
          </div>
          <div class="col-md-12" style="display: flex; justify-content: center;">
            <input
              :type="(type === 'bulanan') ? 'month' : 'date'"
              style="width: 300px"
              :value="date"
              class="form-control col-md-6 col-sm-12"
              @change="dateChange($event.target.value)"
            >
          </div>
        </div>

        <div class="col-md-12">
          <br>
          <br>

            <div class="col-md-12 col-sm-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center" style="text-transform: capitalize;">List unit entri {{ type }}</h4>
                </div>
                <div class="card-body">
                  <table class="table table-hover table-bordered" v-if="type === 'bulanan'">
                      <tr>
                          <th>Tanggal</th>
                          <th>Unit Entri</th>
                          <th>Part</th>
                          <th>Jasa</th>
                      </tr>
                      <tr v-for="d in data" :key="d.date_order">
                          <td>{{ convertDate(d.date_order) }}</td>
                          <td>{{ d.total_order }}</td>
                          <td>{{ d.product }}</td>
                          <td>{{ d.service }}</td>
                      </tr>
                      <tr>
                          <td>Total ({{ data.length }}HK)</td>
                          <td>{{ total_order }}</td>
                          <td>{{ total_product }}</td>
                          <td>{{ total_service }}</td>
                      </tr>
                  </table>
                  <table class="table table-hover table-bordered" v-else>
                      <tr>
                          <th>Unit</th>
                          <th>JS</th>
                          <th>PT</th>
                          <th>SI</th>
                          <th>CR</th>
                      </tr>
                      <tr v-for="d in data" :key="d.x_nopol">
                          <td>{{ d.x_nopol }}</td>
                          <td>{{ d.service }}</td>
                          <td>{{ d.product }}</td>
                          <td>{{ d.si }}</td>
                          <td>{{ d.cr }}</td>
                      </tr>
                      <tr>
                          <td>Total ({{ data.length }}UE)</td>
                          <td>{{ total_service }}</td>
                          <td>{{ total_product }}</td>
                          <td>{{ total_si }}</td>
                          <td>{{ total_cr }}</td>
                      </tr>
                  </table>
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
import profile_staff from "../api/unit_entri";

export default {
  props: ["id"],

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
      type: 'bulanan',
      user: JSON.parse(localStorage.getItem("login")),
      total_order: 0,
      total_product: 0,
      total_service: 0,
      total_si: 0,
      total_cr: 0
    };
  },

  watch: {
    type(value) {
        const date = new Date();;
        if (value === 'harian') {
            this.date = date.toISOString().split('T')[0];
        } else {
            this.date = date
                        .toISOString()
                        .split("T")[0]
                        .split("-")
                        .splice(0, 2)
                        .join("-")
        }

        this.getData();
    }
  },

  methods: {
    dateChange(value) {
      this.date = value;
      this.getData();
    },

    convertDate(date) {
      const d = date.split(' ')[0].split('-');

      return `${d[2]} ${this.months[parseInt(d[1]) - 1]} ${d[0]}`;
    },

    getDate() {
        const date = this.date.split("-");

        switch (this.type) {
            case 'bulanan':
                return `${this.months[parseInt(date[1]) - 1]} ${
                    date[0]
                }`;       
                break;

            case 'harian':
                return `${date[2]} ${this.months[parseInt(date[1]) - 1]} ${
                    date[0]
                }`;
                break;
        
            default:
                break;
        }
    },

    reset() {
        this.data = [];
        this.total_order = 0;
        this.total_product = 0;
        this.total_service = 0;
        this.total_si = 0;
        this.total_cr = 0;
    },

    getData() {
      const date = this.date.split("-");
      let type = '';

      switch (this.user.job) {
        case 'mekanik':
          type = 'mekanik';
          break;
        
        case 'kepala mekanik':
          type = 'finalcheck';
          break;
      
        default:
          type = 'staff'
          break;
      }
      this.reset();

      if (this.type == 'harian') {
        profile_staff.getDay(date[2], date[1], date[0], this.user.id, type).then(res => {
          this.data = res.data.results;
          
          this.data.forEach(d => {
            this.total_product += d.product;
            this.total_service += d.service;
            this.total_si += d.si;
            this.total_cr += d.cr;
          })
        });
      } else {
        profile_staff.getMonth(date[1], date[0], this.user.id, type).then(res => {
          this.data = res.data.results;
          
          this.data.forEach(d => {
            this.total_order += d.total_order;
            this.total_product += d.product;
            this.total_service += d.service;
          })
        });
      }
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style scoped>
  .form-check-label {
      margin-bottom: 0;
      color: black !important;
  }
</style>
