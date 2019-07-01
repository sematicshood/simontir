<template>
  <div id="login">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4 col-md-2"></div>
        <div class="col-lg-4 col-md-8">
          <div class="card form-login">
            <div class="card-body">
              <div class="alert alert-danger" v-if="error.length > 0">
                <ul>
                  <li v-for="(err, i) in error" v-text="error[i]"></li>
                </ul>
              </div>
              <form @submit.prevent="cekLogin">
                <center>
                  <h1 class="title-login">Bengkel Pintar</h1>
                </center>
                <center>
                  <h4 class="title-login">Login</h4>
                </center>
                <br>
                <div class="form-group has-feedback">
                  <input
                    type="text"
                    v-validate="'required'"
                    class="form-control"
                    placeholder="Username"
                    v-model="login"
                    name="username"
                  >
                  <span class="glyphicon glyphicon-user form-control-feedback"></span>
                </div>
                <div class="form-group has-feedback">
                  <input
                    type="password"
                    v-validate="'required'"
                    class="form-control"
                    placeholder="Password"
                    v-model="password"
                    name="password"
                  >
                  <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                </div>

                <button type="submit" class="btn btn-danger btn-login">Login</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-2"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import users from "../api/users";
import auth from "../helpers/auth";

@Component({
  components: {}
})
export default class Login extends Vue {
  public login: string = "";
  public password: string = "";
  public error: string[] = [];

  public cekLogin(): void {
    this.$toasted.info("Loading authentication....", { duration: 3000 });
    this.$data.error = [];

    const payload: any = this.$data;

    this.$validator.validateAll().then(result => {
      if (result) {
        users.cekUser(payload).then((res: any) => {
          try {
            if (res.data.result) {
              this.$toasted.success("Login success! Welcome back", {
                duration: 3000
              });

              const result = JSON.parse(res.data.result);

              const data = result[0];

              localStorage.setItem("login", JSON.stringify(data));

              const company = data.companies.filter((c: any) => {
                return c.id === data.company_id[0];
              })[0];

              localStorage.setItem("select_company", JSON.stringify(company));

              this.$router.push({ name: auth.cekRoleUrl(data.job) });
            } else {
              this.$toasted.error("Username atau password salah", {
                duration: 3000
              });
            }
          } catch (error) {
            this.$toasted.error("Username atau password salah", {
              duration: 3000
            });
          }
        });

        return true;
      }

      this.$toasted.error("Isi form dengan benar", { duration: 3000 });

      this.$validator.errors.items.forEach(el => {
        this.$data.error.push(el.msg);
      });
    });
  }
}
</script>

<style>
@import "../assets/login.css";
</style>