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
                                                <button @click="changeRole(i, rol, user.id)" :class="{'btn': true, 'btn-default': true, 'btn-primary': rol == user.role}" v-for="rol in roles" v-text="rol" style="margin-right: 10px;"></button>
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
import users from '../api/users';

@Component({
    components: {},
})

export default class OptionRole extends Vue {
    public users: any[]       =   [];
    public roles: string[]    =   [
        'Mekanik', 'Cuci'
    ];

    public created() {
        users.getAsistenMekanik().then((res) => {
            try {
                this.users = res.data.results
                console.log(this.users)
            } catch (error) {
                
            }
        })
    }

    public changeRole(id: number, role: string, ids: number): void {
        this.$data.users[id - 1].role = role;

        users.updateRoleUser({ids,role})
    }
}
</script>