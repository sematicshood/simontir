<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="box box-danger box-solid">
                    <div class="box-header">
                        <center><h2 class="box-title"><strong>Users Controller</strong></h2></center>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>Role</th>
                                        </tr>    
                                    </thead>    
                                    <tbody>
                                        <tr v-for="(user, i) in users">
                                            <td>{{ i += 1 }}</td>
                                            <td>{{ user.name }}</td>
                                            <td>
                                                <button @click="changeRole(i, rol)" :class="{'btn': true, 'btn-default': true, 'btn-primary': rol == user.job_id.name}" v-for="rol in roles" v-text="rol"></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {},
})

export default class OptionRole extends Vue {
    public users: any[]       =   [];
    public edit: number       =   0;
    public role: string       =   '';
    public roles: string[]    =   [
        'Front Desk', 'Mekanik', 'Asisten Mekanik', 'Kepala Mekanik', 'Manager',
    ];

    public editUser(id: number): void {
        this.$data.edit  = id;
        this.$data.role  = this.$data.users[id - 1].job_id.name;
    }

    public changeRole(id: number, role: string): void {
        this.$data.users[id - 1].job_id.name = role;

        localStorage.setItem('users', JSON.stringify(this.$data.users));
    }
}
</script>