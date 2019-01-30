<template>
    <div id="BookingOrder">
        <router-link @click.native="pick" :to="{ name: 'timesheet_mekanik', params: { id: data.name } }">
            <div class="box no-border-top">
                <div class="box-body">
                    <div class="small-box bg-red">
                        <div class="inner">
                            <h3><strong>{{ data.no_polisi }}</strong></h3>

                            <p>{{ data.tipe_kenadaraan }}</p>
                        </div>
                        <div class="a-group-red">
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
    name: 'BookingOrder',

    props: ['data'],

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
            mekanik.pick({invoice: this.data.name})
        }
    }
}
</script>
