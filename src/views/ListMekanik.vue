<template>
  <div :class="{'disabled': loading}">
    <div class="row">
      <div class="col-lg-12">
        <div class="box box-widget widget-user-2">
          <!-- Add the bg color to the header using any of the bg-* classes -->
          <div class="widget-user-header bg-red" style="margin-bottom: 20px;">
            <div class="widget-user-image">
              <img
                class="img-circle"
                :src="`data:image/gif;base64,${ user.image }`"
                alt="User Avatar"
              >
            </div>
            <!-- /.widget-user-image -->
            <h3 class="widget-user-username">{{ user.name }}</h3>
            <h5 class="widget-user-desc">{{ user.role }}</h5>
          </div>
          <div class="box-body no-padding">
            <div class="row">
              <b-col md="12" style="display: flex; justify-content: center; margin-bottom: 25px;">
                  <b-form-input type="date" :value="tanggal" style="width: 40%;" @change="changeData($event)"></b-form-input>
              </b-col>

              <div class="col-lg-12">
                <div class="box-header with-border">
                  <h3 class="box-title">
                    <strong>Service yang diambil</strong>
                  </h3>

                  <div class="box-tools pull-right">
                    <span
                      data-toggle="tooltip"
                      title
                      class="badge bg-red"
                      data-original-title="3 New Messages"
                    >{{ own.length }}</span>
                  </div>
                </div>
                <div v-for="o in own" :key="o.name" style="display: inline-block;">
                  <reguler
                    v-if="o.antrian_service == 'reguler'"
                    :type="'timesheet_mekanik'"
                    :data="o"
                  ></reguler>
                  <LightRepair
                    v-if="o.antrian_service == 'Light Repair'"
                    :type="'timesheet_mekanik'"
                    :data="o"
                  ></LightRepair>
                  <BookingOrder
                    v-if="o.antrian_service == 'Booking Service'"
                    :type="'timesheet_mekanik'"
                    :data="o"
                  ></BookingOrder>
                </div>
              </div>
            </div>
          </div>
          <div class="box-body no-padding">
            <div class="row">
              <div class="col-lg-6" v-if="checking()">
                <div class="box-header with-border">
                  <h3 class="box-title">
                    <strong>Booking Service</strong>
                  </h3>

                  <div class="box-tools pull-right">
                    <span
                      data-toggle="tooltip"
                      title
                      class="badge bg-red"
                      data-original-title="3 New Messages"
                    >{{ bookings.length }}</span>
                  </div>
                </div>
                <BookingOrder
                  :type="'timesheet_mekanik'"
                  :data="booking"
                  v-for="booking in bookings"
                ></BookingOrder>
              </div>
              <div :class="{'col-lg-6': checking(), 'col-lg-12': !checking()}">
                <div class="box-header with-border">
                  <h3 class="box-title">
                    <strong>Light Repair</strong>
                  </h3>

                  <div class="box-tools pull-right">
                    <span
                      data-toggle="tooltip"
                      title
                      class="badge bg-red"
                      data-original-title="3 New Messages"
                    >{{ lights.length }}</span>
                  </div>
                </div>
                <LightRepair :type="'timesheet_mekanik'" :data="light" v-for="light in lights"></LightRepair>
              </div>
            </div>
            <div class="row" v-if="checking()">
              <div class="col-lg-12">
                <div class="box-header with-border">
                  <h3 class="box-title">
                    <strong>Reguler</strong>
                  </h3>

                  <div class="box-tools pull-right">
                    <span
                      data-toggle="tooltip"
                      title
                      class="badge bg-red"
                      data-original-title="3 New Messages"
                    >{{ regulars.length }}</span>
                  </div>
                </div>
                <reguler :type="'timesheet_mekanik'" :data="regular" v-for="regular in regulars"></reguler>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BookingOrder from "../components/BookingOrder.vue";
import LightRepair from "../components/LightRepair.vue";
import reguler from "../components/Reguler.vue";
import mekanik from "../api/mekanik";
import { Component, Vue, Watch } from "vue-property-decorator";

const d = new Date();

@Component({
  components: {
    BookingOrder,
    LightRepair,
    reguler
  },
})
export default class ListMekanik extends Vue {
  public user: any = JSON.parse(localStorage.getItem("login")!);
  public services: any[] = [];
  public bookings: any[] = [];
  public lights: any[] = [];
  public regulars: any[] = [];
  public own: any = [];
  public loading: any = false;
  public loadDatas: any = false;
  public tanggal: any = d.toISOString().split("T")[0].split("-").join("-")

  public created() {
    this.loadData();
    /*
    setInterval(() => {
      this.loadData();
    }, 5000);
    */
  }

  public checking(): any {
    return this.user.job.toUpperCase() !== "ass mekanik".toUpperCase();
  }

  public changeData(e: any): void {
    this.tanggal = e;

    this.loadData();
  }

  public loadData(): void {
    if (!this.loadDatas) {
      this.loading = true;
    }

    mekanik.getSO(this.user.id, this.tanggal).then((res: any) => {
      if (res.data.results) {
        this.bookings = res.data.results
          .filter((el: any) => {
            return el.antrian_service === "Booking Service";
          })
          .splice(0, 1);

        this.lights = res.data.results
          .filter((el: any) => {
            return el.antrian_service === "Light Repair";
          })
          .splice(0, 1);

        this.regulars = res.data.results
          .filter((el: any) => {
            return el.antrian_service === "reguler";
          })
          .splice(0, 1);
      }

      if (res.data.own) {
        this.own = res.data.own;
      }

      this.loading = false;
      this.loadDatas = true;
    });
  }
}
</script>

<style>
@import "../assets/adminLTE/css/custom.css";
</style>