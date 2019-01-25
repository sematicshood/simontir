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
                      <center><h1 class="title-login">Bengkel Pintar</h1></center>
                      <center><h4 class="title-login">Login</h4></center>
                      <br>
                      <div class="form-group has-feedback">
                        <input type="text" v-validate="'required'" class="form-control" placeholder="Username" v-model="login" name="username">
                        <span class="glyphicon glyphicon-user form-control-feedback"></span>
                      </div>
                      <div class="form-group has-feedback">
                        <input type="password" v-validate="'required'" class="form-control" placeholder="Password" v-model="password" name="password">
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
            // users.cekUser(payload)
            //      .then((res) => {
            //         let user = res.data.filter(el => {
            //             return el.login == payload.login && el.password == payload.password
            //         })

            //         if(user.length > 0) {
            //             const role = user[0].job_id.name

            //             const data = {
            //                 role: role
            //             }
                    
            //             localStorage.setItem("login", JSON.stringify(data))

            //             this.$router.push({ name: auth.cekRoleUrl(role) })
            //         } else {
            //           alert('Username atau password salah')
            //         }
            //      })
            //      .catch((err) => alert('Username atau password salah'))
            
            let user = users.cekUser(payload).filter(el => {
                return el.login == payload.login && el.password == payload.password
            })

            if(user.length > 0) {
                const role = user[0].job_id.name

                const data = {
                    role: role,
                    name: user[0].name
                }
            
                localStorage.setItem("login", JSON.stringify(data))

                this.$router.push({ name: auth.cekRoleUrl(role) })
            } else {
              alert('Username atau password salah')
            }

            return true
          }
          
          this.$validator.errors.items.forEach(el => {
            this.$data.error.push(el.msg)
          })
        });
      }

      created() {
        auth.cekData();
      }
    }
</script>

<style>
    @import '../assets/login.css';
</style>