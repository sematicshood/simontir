<template>
  <div>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="info-box">
          <!-- <span class="info-box-icon bg-aqua">
            <i class="fa fa-motorcycle"></i>
          </span>

          <div class="info-box-content">
            <span class="info-box-text">Total Service Bulan Ini</span>
            <span class="info-box-number">{{ totalService }}</span>
          </div>-->
          <ProfileOwner/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import users from "../api/users";
import ProfileOwner from "../components/ProfileOwner";

@Component({
  components: {
    ProfileOwner
  }
})
export default class Profil extends Vue {
  public user: any = JSON.parse(localStorage.getItem("login")!);
  public totalService: number = 0;

  public created() {
    users.getTotalServiceUser(this.user.id).then(res => {
      this.totalService = res.data.results;
    });
  }
}
</script>