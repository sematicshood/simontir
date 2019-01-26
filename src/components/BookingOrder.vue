<template>
    <div id="BookingOrder">
        <router-link :to="{ name: 'timesheet_mekanik', params: { id: data['License Plate'] } }">
            <div class="box no-border-top">
                <div class="box-body">
                    <div class="small-box bg-red">
                        <div class="inner">
                            <h3><strong>{{data['License Plate']}}</strong></h3>

                            <p>{{ data.make }} {{ data.model_name }}</p>
                        </div>
                        <div class="a-group-red">
                            <a href="#" class="number-task pull-left">
                            {{ (data.product_id) ? data.product_id.length : 0 }} <i class="fa fa-gears"></i>
                            </a>
                            <a href="#" class="number-task pull-righ">
                            {{ (data.timesheet_id) ? data.timesheet_id.length : 0 }} <i class="fa fa-motorcycle"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'BookingOrder',

    props: ['data']
}
</script>
