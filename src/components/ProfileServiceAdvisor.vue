<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="text-center">Periode {{ getDate() }}</h4>
      </div>
      <div class="card-body">
        <div class="form-group text-center">
          <div class="col-md-12" style="display: flex; justify-content: center;">
            <input
              type="month"
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
          <div class="row">
            <div class="col-md-4 col-sm-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Total Absensi</h4>
                </div>
                <div class="card-body">
                  <h3 class="text-center" v-text="data.attendance"></h3>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Jumlah Unit Entri</h4>
                </div>
                <div class="card-body">
                  <h3 class="text-center" v-text="data.unit_entri"></h3>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Jumlah Pekerjaan</h4>
                </div>
                <div class="card-body">
                  <h3 class="text-center" v-text="data.total_jasa"></h3>
                </div>
              </div>
            </div>

            <!-- <div class="col-md-6 col-sm-12">
              <br>
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Performance Kehadiran</h4>
                </div>
                <div class="card-body"></div>
              </div>
            </div>

            <div class="col-md-6 col-sm-12">
              <br>
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">Performance Pekerjaan</h4>
                </div>
                <div class="card-body"></div>
              </div>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const date = new Date();
import profile_service_advisor from "../api/profile_service_advisor";

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
      data: []
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
      return `${this.months[parseInt(this.date.split("-")[1]) - 1]} ${
        this.date.split("-")[0]
      }`;
    },

    getData() {
      const date = this.date.split("-");

      profile_service_advisor.get(date[1], date[0], this.id).then(res => {
        this.data = res.data.results;
      });
    }
  },

  created() {
    this.getData();
  }
};
</script>