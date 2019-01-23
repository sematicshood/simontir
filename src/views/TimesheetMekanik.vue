<template>
    <div>
        <h3>Timesheet Mekanik</h3>
        This id is {{ id }}
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {},
    })

    export default class TimesheetMekanik extends Vue {
        data() {
            return {
                id: this.$route.params.id
            }
        }
    }
</script>