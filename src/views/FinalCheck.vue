<template>
    <div>
        <h3>Final Check</h3>
        This is is {{ id }}
    </div>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                id: this.$route.params.id
            }
        }
    }
</script>