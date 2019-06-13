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
                    <label class="form-check-label" for="inlineRadio1">Bulanan</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="harian" v-model="type">
                    <label class="form-check-label" for="inlineRadio2">Harian</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="range" v-model="type">
                    <label class="form-check-label" for="inlineRadio3">Range</label>
                </div>
            </div>
          </div>
          <div class="col-md-12" style="display: flex; justify-content: center;">
            <input
              :type="(type === 'bulanan') ? 'month' : 'date'"
              :value="date"
              class="form-control col-md-5 col-sm-12"
              @change="dateChange($event.target.value)"
            >

            <input
              :type="(type === 'bulanan') ? 'month' : 'date'"
              v-if="type === 'range'"
              :value="dateUntil"
              class="form-control col-md-5 col-sm-12"
              @change="dateUntilChange($event.target.value)"
            >
          </div>
        </div>

        <div class="col-md-12">
          <br>
          <br>

            <div class="col-md-12 col-sm-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center" style="text-transform: capitalize;">Total Intensif Mekanik</h4>
                </div>
                <div class="card-body">
                  <table class="table table-hover table-bordered">
                      <tr>
                          <th>Nama</th>
                          <th>Point</th>
                          <th>Bonus</th>
                          <th>Action</th>
                      </tr>
                      <tr v-for="d in data" :key="d.date_order">
                          <td>{{ convertDate(d.date_order) }}</td>
                          <td>{{ d.total_order }}</td>
                          <td>{{ d.product }}</td>
                          <td>
                              <b-button v-b-modal.modal-xl variant="primary">Detail</b-button>
                          </td>
                      </tr>
                      <tr>
                          <td>Total ({{ data.length }}HK)</td>
                          <td>{{ total_order }}</td>
                          <td>{{ total_product }}</td>
                          <td>{{ total_service }}</td>
                      </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
        <b-modal id="modal-xl" centered size="xl" title="Detail Pekerjaan Mekanik">
            <b-col md="12" class="text-center">
                <b-row>
                    <div class="col-md-12">
                        <h3>John Doe</h3>
                        <p>Periode {{ getDate() }}</p>
                    </div>
                </b-row>
            </b-col>
        </b-modal>
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
      dateUntil: date.toISOString().split('T')[0],
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
      total_cr: 0,
    };
  },

  watch: {
    date() {
      this.getData();
    },

    type(value) {
        const date = new Date();;
        if (value === 'harian' || value === 'range') {
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
    },

    convertDate(date) {
      const d = date.split(' ')[0].split('-');

      return `${d[2]} ${this.months[parseInt(d[1]) - 1]} ${d[0]}`;
    },

    getDate() {
        const date = this.date.split("-");
        const date_until = this.dateUntil.split("-");

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

            case 'range':
                return `${date[2]} ${this.months[parseInt(date[1]) - 1]} ${date[0]} sampai ${date_until[2]} ${this.months[parseInt(date_until[1]) - 1]} ${date_until[0]}`;
        
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

      if (this.type == 'harian') {
        this.reset();

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
        this.reset();

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

<style>
    .fade {
        opacity: 1;
    }

    h3 {
        margin: 0;
    }
</style>
