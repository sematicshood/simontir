<template>
    <div id="reguler">
        <router-link @click.native="pick" :to="{ name: type, params: { id: data.name } }">
            <div class="box no-border-top">
                <div class="box-body">
                    <div class="small-box bg-green">
                        <div class="inner">
                            <h3><strong>{{ data.no_polisi }}</strong></h3>

                            <p>{{ data.tipe_kenadaraan }}</p>
                        </div>
                        <div class="a-group-green">
                            <a href="#" class="number-task pull-left">
                            {{ countSparepart(data) }} <i class="fa fa-gears"></i>
                            </a>
                            <a href="#" class="number-task pull-righ">
                            {{ countService(data) }} <i class="fa fa-motorcycle"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import mekanik from '../api/mekanik';

export default {
    name: 'reguler',

    props: ['data', 'type'],

    methods: {
        countService(dataq) {
            let datas = dataq.order_line.filter(el => {
                return el.type == 'service'
            })

            return datas.length
        },

        countSparepart(dataq) {
            let datas = dataq.order_line.filter(el => {
                return el.type != 'service'
            })

            return datas.length
        },

        pick() {
            if(type == 'timesheet_mekanik')
                mekanik.pick({invoice: this.data.name, user_id: this.$data.user.id})
        }
    }
}
</script>

