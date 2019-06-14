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
                      <tr v-for="(d, i) in data" :key="d.name">
                          <td>{{ d.nama }}</td>
                          <td>{{ d.point | rupiah }}</td>
                          <td>{{ d.bonus | rupiah }}</td>
                          <td>
                              <b-button @click="select = i" v-b-modal.modal-xl variant="primary">Detail</b-button>
                          </td>
                      </tr>
                      <tr>
                          <td>Total ({{ data.length }}HK)</td>
                          <td>{{ total_point | rupiah }}</td>
                          <td>{{ total_bonus | rupiah }}</td>
                          <td></td>
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
                        <h3>{{ data[select].nama }}</h3>
                        <p>Periode {{ getDate() }}</p>
                    </div>

                    <div class="col-md-12">
                        <table class="table table-hover table-bordered">
                            <tr>
                                <th>Tanggal</th>
                                <th>Point Jasa</th>
                                <th>Bonus Jasa</th>
                                <th>Point Part</th>
                                <th>Bonus Part</th>
                                <th>Bonus Cuci</th>
                                <th>Bonus Total</th>
                                <th>UE</th>
                            </tr>
                            <tr v-for="(d, i) in data[select].data" :key="d.name">
                                <td>{{ convertDate(d.check_in) }}</td>
                                <td>{{ d.point_jasa | rupiah }}</td>
                                <td>{{ d.bonus_jasa | rupiah }}</td>
                                <td>{{ d.point_part | rupiah }}</td>
                                <td>{{ d.bonus_part | rupiah }}</td>
                                <td>{{ d.cuci | rupiah }}</td>
                                <td>{{ d.total_bonus | rupiah }}</td>
                                <td>{{ d.total_ue | rupiah }}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>{{ total_point_jasa | rupiah }}</td>
                                <td>{{ total_bonus_jasa | rupiah }}</td>
                                <td>{{ total_point_part | rupiah }}</td>
                                <td>{{ total_bonus_part | rupiah }}</td>
                                <td>{{ total_bonus_cuci | rupiah }}</td>
                                <td>{{ total_bonus | rupiah }}</td>
                                <td>{{ total_ue | rupiah }}</td>
                            </tr>
                        </table>
                    </div>
                </b-row>
            </b-col>
        </b-modal>
    </div>
  </div>
</template>

<script>
const date = new Date();
import payroll from "../api/payroll";

export default {
  props: ["id"],

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
            return rupiah;
        } catch (error) {
            return angka;
        }
        }
    },

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
      total_point: 0,
      total_bonus: 0,
      select: 0,

      total_point_jasa: 0,
      total_bonus_jasa: 0,
      total_point_part: 0,
      total_bonus_part: 0,
      total_bonus_cuci: 0,
      total_bonus: 0,
      total_ue: 0
    };
  },

  watch: {
    date() {
      if (this.type === 'range') {
          if (this.date <= this.dateUntil) {
              this.getData();
          } else {
              alert('Range tanggal salah');
          }
      } else {
          this.getData();
      }
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
    },

    select(value) {
        this.resetDetail();

        if (this.data[value]) {
            this.data[value].data.forEach(d => {
                total_point_jasa += d.point_jasa;
                total_bonus_jasa += d.bonus_jasa;
                total_point_part += d.point_part;
                total_bonus_part += d.bonus_part;
                total_bonus_cuci += d.cuci;
                total_bonus += d.total_bonus;
                total_ue += d.total_ue;
            })
        }
    }
  },

  methods: {
    dateChange(value) {
      this.date = value;
    },

    resetDetail() {
        total_point_jasa = 0;
        total_bonus_jasa = 0;
        total_point_part = 0;
        total_bonus_part = 0;
        total_bonus_cuci = 0;
        total_bonus = 0;
        total_ue = 0;
    },

    convertDate(date) {
      try {
          const d = date.split(' ')[0].split('-');

          return `${d[2]} ${this.months[parseInt(d[1]) - 1]} ${d[0]}`;
      } catch (error) {
          
      }
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
        this.total_point = 0;
        this.total_bonus = 0;
    },

    getData() {
        const date = this.date.split("-");
        const date_until = this.dateUntil.split("-");

        this.reset();

        payroll.get(date[2], date[1], date[0], date_until[2], date_until[1], date_until[0], this.type).then(res => {
            this.data = res.data.results;

            this.data.forEach(d => {
                this.total_point += d.point;
                this.total_bonus += d.bonus;
            })
        });
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

    @media (min-width: 768px) {
        .modal-dialog {
            width: 1200px !important;
            margin: 30px auto;
            margin-top: 50px;
        }
    }
</style>
