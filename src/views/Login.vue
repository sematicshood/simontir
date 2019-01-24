<template>
    <div id="login">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-3"></div>
            <div class="col-lg-6">
              <div class="card form-login">
                <div class="card-body">
                    <form>
                      <center><h1 class="title-login">Login Simontir</h1></center>
                      <br>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"><i class="fa fa-user"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" v-model="username" name="username" required>
                      </div>
                      <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-unlock-alt"></i></span>
                          </div>
                          <input type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" v-model="password" name="password" required>
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
            <div class="col-lg-3"></div>
          </div>
      </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import users from '../api/users';

    @Component({
        components: {},
    })

    export default class Login extends Vue {}
</script>

<style>
    @import '../assets/login.css';
</style>