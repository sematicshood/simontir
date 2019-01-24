<template>
    <div>
        <h3>Login</h3>
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