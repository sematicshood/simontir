<template>
  <div>
    <h1 class="text-center">Board Proses Service</h1>
    <h2 class="text-center">{{ datetime }}</h2>
    <hr>
    <div class="row">
      <div class="col-md-3">
        <div class="box box-danger box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">Antrian ({{ antrian.length }})</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div
              v-for="a in antrian"
              :class="{'small-box': true, 'bg-red': a.antrian_service == 'Booking Service','bg-green': a.antrian_service == 'reguler','bg-yellow': a.antrian_service == 'Light Repair'}"
            >
              <div class="inner">
                <h3 style="font-size: 200%;">
                  <strong>{{ a.no_polisi }}</strong>
                </h3>

                <p>{{ a.customer }} - {{ convertDate(a.date) }}</p>
              </div>
              <div
                :class="{'a-group-red': a.antrian_service == 'Booking Service','a-group-green': a.antrian_service == 'reguler','a-group-yellow': a.antrian_service == 'Light Repair'}"
              >
                <a href="#" class="number-task pull-left">
                  {{ countService(a.order_line) }}
                  <i class="fa fa-gears"></i>
                </a>
                <a href="#" class="number-task pull-righ">
                  {{ countSparepart(a.order_line) }}
                  <i class="fa fa-motorcycle"></i>
                </a>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-12">
            <div class="box box-danger box-solid">
              <div class="box-header with-border">
                <h3 class="box-title">Dikerjakan</h3>
              </div>
              <div class="box-body">
                <div class="row">
                  <div class="col-md-4" v-for="a in dikerjakan">
                    <div
                      :class="{'small-box': true, 'bg-red': a.antrian_service == 'Booking Service','bg-green': a.antrian_service == 'reguler','bg-yellow': a.antrian_service == 'Light Repair'}"
                    >
                      <div class="inner">
                        <h3 style="font-size: 200%;">
                          <strong>{{ a.no_polisi }}</strong>
                        </h3>

                        <p>{{ a.customer }} - {{ convertDate(a.date) }}</p>
                        <p>
                          Dikerjakan oleh
                          <b>{{ a.mekanik }}</b>
                        </p>
                      </div>
                      <div
                        :class="{'a-group-red': a.antrian_service == 'Booking Service','a-group-green': a.antrian_service == 'reguler','a-group-yellow': a.antrian_service == 'Light Repair'}"
                      >
                        <a href="#" class="number-task pull-left">
                          {{ countService(a.order_line) }}
                          <i class="fa fa-gears"></i>
                        </a>
                        <a href="#" class="number-task pull-righ">
                          {{ countSparepart(a.order_line) }}
                          <i class="fa fa-motorcycle"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.box-body -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="box box-danger box-solid">
              <div class="box-header with-border">
                <h3 class="box-title">Selesai</h3>
              </div>
              <div class="box-body">
                <div class="row">
                  <div class="col-md-4">
                    <div class="box box-danger">
                      <div class="box-header with-border" style="background-color: #f5f5f5;">
                        <h3 class="box-title">
                          <strong>Booking Order</strong>
                        </h3>

                        <div class="box-tools pull-right">
                          <span
                            data-toggle="tooltip"
                            title
                            class="badge bg-red"
                            data-original-title="3 New Messages"
                          >{{ filterBooking.length }}</span>
                        </div>
                      </div>
                      <div class="box-body">
                        <div v-for="a in filterBooking" class="small-box bg-red">
                          <div class="inner">
                            <h3 style="font-size: 200%;">
                              <strong>{{ a.no_polisi }}</strong>
                            </h3>

                            <p>{{ a.customer }} - {{ convertDate(a.date) }}</p>
                          </div>
                          <div class="a-group-red">
                            <a href="#" class="number-task pull-left">
                              {{ countService(a.order_line) }}
                              <i class="fa fa-gears"></i>
                            </a>
                            <a href="#" class="number-task pull-righ">
                              {{ countSparepart(a.order_line) }}
                              <i class="fa fa-motorcycle"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="box box-warning">
                      <div class="box-header with-border" style="background-color: #f5f5f5;">
                        <h3 class="box-title">
                          <strong>Light Repair</strong>
                        </h3>

                        <div class="box-tools pull-right">
                          <span
                            data-toggle="tooltip"
                            title
                            class="badge bg-red"
                            data-original-title="3 New Messages"
                          >{{ filterLight.length }}</span>
                        </div>
                      </div>
                      <div class="box-body">
                        <div v-for="a in filterLight" class="small-box bg-yellow">
                          <div class="inner">
                            <h3 style="font-size: 200%;">
                              <strong>{{ a.no_polisi }}</strong>
                            </h3>

                            <p>{{ a.customer }} - {{ convertDate(a.date) }}</p>
                          </div>
                          <div class="a-group-yellow">
                            <a href="#" class="number-task pull-left">
                              {{ countService(a.order_line) }}
                              <i class="fa fa-gears"></i>
                            </a>
                            <a href="#" class="number-task pull-righ">
                              {{ countSparepart(a.order_line) }}
                              <i class="fa fa-motorcycle"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="box box-success">
                      <div class="box-header with-border" style="background-color: #f5f5f5;">
                        <h3 class="box-title">
                          <strong>Reguler</strong>
                        </h3>

                        <div class="box-tools pull-right">
                          <span
                            data-toggle="tooltip"
                            title
                            class="badge bg-red"
                            data-original-title="3 New Messages"
                          >{{ filterRegular.length }}</span>
                        </div>
                      </div>
                      <div class="box-body">
                        <div v-for="(a, i) in filterRegular" class="small-box bg-green" :key="i">
                          <div class="inner">
                            <h3 style="font-size: 200%;">
                              <strong>{{ a.no_polisi }}</strong>
                            </h3>

                            <p>{{ a.customer }} - {{ convertDate(a.date) }}</p>
                          </div>
                          <div class="a-group-green">
                            <a href="#" class="number-task pull-left">
                              {{ countService(a.order_line) }}
                              <i class="fa fa-gears"></i>
                            </a>
                            <a href="#" class="number-task pull-righ">
                              {{ countSparepart(a.order_line) }}
                              <i class="fa fa-motorcycle"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.box-body -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import board from "../api/board";

@Component({})
export default class QueueBoard extends Vue {
  public antrian: string[] = [];
  public dikerjakan: string[] = [];
  public selesai: string[] = [];
  public filterBooking: string[] = [];
  public filterLight: string[] = [];
  public filterRegular: string[] = [];
  public datetime: string = "";
  public months: any = [
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
  ];

  public created() {
    /*
    setInterval(() => {
      this.getData();
    }, 5000);

    setInterval(() => {
      const date = new Date();

      this.datetime = `${date.getUTCDate()} ${
        this.months[date.getUTCMonth()]
      } ${date.getUTCFullYear()}`;
    }, 1000);
    */
    this.getData();
  }

  public convertDate(date: any): string {
    return date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("/");
  }

  public getData(): void {
    board.getSO().then(res => {
      if (res.data.results) {
        this.antrian = res.data.results.filter((el: any) => {
          return el.status === "sent";
        });

        this.dikerjakan = res.data.results.filter((el: any) => {
          console.log(el.status);
          return el.status === "sale" && el.invoice === "no";
        });

        console.log(this.dikerjakan);

        this.selesai = res.data.results.filter((el: any) => {
          return el.invoice === "to invoice";
        });

        this.filterBooking = this.selesai.filter((el: any) => {
          return el.antrian_service === "Booking Service";
        });

        this.filterLight = this.selesai.filter((el: any) => {
          return el.antrian_service === "Light Repair";
        });

        this.filterRegular = this.selesai.filter((el: any) => {
          return el.antrian_service === "reguler";
        });
      }
    });
  }

  public countService(data: any[]): number {
    const datas = data.filter((el: any) => {
      return el.type === "service";
    });

    return datas.length;
  }

  public countSparepart(data: any[]): number {
    const datas = data.filter((el: any) => {
      return el.type !== "service";
    });

    return datas.length;
  }
}
</script>


<style>
@import "../assets/adminLTE/css/custom.css";
</style>