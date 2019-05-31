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
            <h3 class="widget-user-username">{{ user.name }} ({{ total }})</h3>
            <h5 class="widget-user-desc">{{ user.role }}</h5>
          </div>
          <div class="box-body no-padding">
            <div class="row">
              <div class="col-lg-4">
                <BookingOrder :type="'final_check'" :data="booking" v-for="booking in bookings"></BookingOrder>
              </div>
              <div class="col-lg-4">
                <LightRepair :type="'final_check'" :data="light" v-for="light in lights"></LightRepair>
              </div>
              <div class="col-lg-4">
                <reguler :type="'final_check'" :data="regular" v-for="regular in regulars"></reguler>
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
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    BookingOrder,
    LightRepair,
    reguler
  }
})
export default class LastFinalCheck extends Vue {
  public user: any = JSON.parse(localStorage.getItem("login")!);
  public services: any[] = [];
  public bookings: any[] = [];
  public lights: any[] = [];
  public regulars: any[] = [];
  public total: any = 0;
  public loading: any = false;
  public loadDatas: any = false;

  public created() {
    this.loadData();

    setInterval(() => {
      this.loadData();
    }, 5000);
  }

  public loadData(): void {
    if (!this.loadDatas) {
      this.loading = true;
    }

    mekanik.countTotalFinal(this.user.id).then((res: any) => {
      this.total = res.data.count;
    });

    mekanik.getLastSO().then((res: any) => {
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

      this.loading = false;
      this.loadDatas = true;
    });
  }
}
</script>

<style>
@import "../assets/adminLTE/css/custom.css";
</style>