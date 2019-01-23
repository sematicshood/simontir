<template>
    <div>
        <h3>Final Check</h3>
        This is is {{ id }}
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {},
    })

    export default class FinalCheck extends Vue {}
</script>