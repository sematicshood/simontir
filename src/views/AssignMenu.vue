<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="text-center">Assign Menu</h4>
      </div>
      <div class="card-body">
        <b-form-group label="Nama Pekerjaan">
            <b-form-select v-model="data.job_id">
                <option :value="job.id" v-for="job in jobs" :key="job.id">{{ job.name }}</option>
            </b-form-select>
        </b-form-group>

        <b-form-group label="Menu Diizinkan">
            <b-form-checkbox-group id="checkbox-group-2" v-model="data.menus" name="flavour-2">
                <b-form-checkbox style="padding: 15px;" v-if="route.meta.show" :value="route.meta.title" v-for="route in routes" :key="route.meta.title">{{ route.meta.title }}</b-form-checkbox>
            </b-form-checkbox-group>
        </b-form-group>

        <b-button block variant="primary" @click="submit()">Simpan</b-button>
      </div>
    </div>
  </div>
</template>

<script>
const date = new Date();
import job from "../api/job";

export default {
  data() {
    return {
      data: {
          job_id: '',
          menus: []
      },
      routes: [],
      jobs: []
    };
  },

  watch: {
      'data.job_id'(value) {
          job.detail(value).then(data => {
              if (data.data.results[0]) {
                  this.data.menus = data.data.results[0].menus.split(',');
              } else {
                  this.data.menus = [];
              }
        })
      }
  },

  methods: {
      submit() {
          const menus = this.data.menus;
          this.data.menus = this.data.menus.join(',');

          return job.post(this.data).then(data => {
              this.data.menus = menus;
          });
      }
  },

  created() {
    this.routes = this.$router.options.routes.filter(el => {
      return el.meta;
    });

    job.get().then(data => {
        this.jobs = data.data.results
    })
  }
};
</script>