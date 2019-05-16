<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4
          class="text-center"
        >Board Mekanik Kinerja {{ date.getUTCDay() }} {{ months[date.getUTCMonth()] }} {{ date.getUTCFullYear() }}</h4>
      </div>
      <div class="card-body">
        <table class="table table-hover table-bordered">
          <tr>
            <th>#</th>
            <th>Mekanik</th>
            <th>Target UE</th>
            <th>Total UE</th>
          </tr>
          <tr v-for="(mekanik, i) in mekaniks" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ mekanik.name }}</td>
            <td>
              <progress :value="mekanik.today" max="8"></progress>
            </td>
            <td>{{ mekanik.total }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
const date = new Date();
import board_mekanik from "../api/board_mekanik";

export default {
  data() {
    return {
      date: new Date(),
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
      mekaniks: []
    };
  },

  created() {
    const date = this.date
      .toISOString()
      .split("T")[0]
      .split("-");

    board_mekanik.mekaniks(date[2], date[1], date[0]).then(res => {
      this.mekaniks = res.data.results;
    });
  }
};
</script>