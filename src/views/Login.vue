<template>
    <div id="login">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-4"></div>
            <div class="col-lg-4">
              <div class="card form-login">
                <div class="card-body">
                    <div class="alert alert-danger" v-if="error.length > 0">
                      <ul>
                        <li v-for="(err, i) in error" v-text="error[i]"></li>
                      </ul>
                    </div>
                    <form @submit.prevent="cekLogin">
                      <center><h1 class="title-login">Login Simontir</h1></center>
                      <br>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"><i class="fa fa-user"></i></span>
                        </div>
                        <input type="text" v-validate="'required'" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" v-model="login" name="username">
                      </div>
                      <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-unlock-alt"></i></span>
                          </div>
                          <input type="password" v-validate="'required'" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" v-model="password" name="password">
                        </div>
                      <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="dropdownCheck">
                        <label class="form-check-label" for="dropdownCheck">
                          Remember me
                        </label>
                      </div>
                      <button type="submit" class="btn btn-danger btn-login">Login</button>
                    </form>
                </div>
              </div>        
            </div>
            <div class="col-lg-4"></div>
          </div>
      </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import users from '../api/users';
    import auth from '../helpers/auth';

    @Component({
        components: {},
    })

    export default class Login extends Vue {
      login: string         = ""
      password: string      = ""
      error: Array<string> = []

      cekLogin(): void {
        this.$data.error = []

        let payload      = this.$data

        this.$validator.validateAll().then((result) => {
          if (result) {
            users.cekUser(payload)
                 .then((res) => {
                    let user = res.data.filter(el => {
                        return el.login == payload.login && el.password == payload.password
                    })

                    if(user.length > 0) {
                        const role = user[0].job_id.name

                        const data = {
                            role: role
                        }
                    
                        localStorage.setItem("login", JSON.stringify(data))

                        this.$router.push({ name: auth.cekRoleUrl(role) })
                    } else {
                      alert('Username atau password salah')
                    }
                 })
                 .catch((err) => alert('Username atau password salah'))

            return true
          }
          
          this.$validator.errors.items.forEach(el => {
            this.$data.error.push(el.msg)
          })
        });
      }
    }
</script>

<style>
    @import '../assets/login.css';
</style>