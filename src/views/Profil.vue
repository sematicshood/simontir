<template>
  <div>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="info-box">
          <ProfileOwner v-if="user.job === 'Owner'"/>
          <ProfileStaff :id="user.id" v-else-if="user.job === 'Staff'"/>
          <ProfileServiceAdvisor :id="user.id" v-if="user.job === 'Service Advisor'"/>
          <ProfileMekanik :id="user.id" v-if="user.job === 'Mekanik'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import users from "../api/users";
import ProfileOwner from "../components/ProfileOwner";
import ProfileStaff from "../components/ProfileStaff";
import ProfileServiceAdvisor from "../components/ProfileServiceAdvisor";
import ProfileMekanik from "../components/ProfileMekanik";

@Component({
  components: {
    ProfileOwner,
    ProfileStaff,
    ProfileServiceAdvisor,
    ProfileMekanik
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