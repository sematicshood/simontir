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
                                            <th>Action</th>
                                        </tr>    
                                    </thead>    
                                    <tbody>
                                        <tr v-for="(user, i) in users">
                                            <td>{{ i += 1 }}</td>
                                            <td>{{ user.name }}</td>
                                            <td>
                                                <span v-if="edit != i">{{ user.job_id.name }}</span>
                                                <select v-model="role" class="form-control" v-else-if="edit == i">
                                                    <option :value="rol" v-for="rol in roles" v-text="rol"></option>
                                                </select>
                                            </td>
                                            <td>
                                                <button v-if="edit != i" @click="editUser(i)" class="btn btn-sm btn-warning">Edit</button>
                                                <button @click="saveUser(i)" v-else-if="edit == i" class="btn btn-sm btn-primary">Save</button>
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
        users: Array<string>    =   []
        edit: number            =   0
        role: string            =   ""
        roles: Array<string>    =   [
            "Front Desk", "Mekanik", "Asisten Mekanik", "Kepala Mekanik", "Manager"
        ]

        editUser(id): void {
            this.$data.edit  = id
            this.$data.role  = this.$data.users[id - 1].job_id.name
        }

        saveUser(id): void {
            this.$data.users[id - 1].job_id.name = this.$data.role

            this.$data.edit  = 0
            this.$data.role  = ""

            localStorage.setItem('users', JSON.stringify(this.$data.users))
        }

        created() {
            this.$data.users = JSON.parse(localStorage.getItem('users'))
        }
    }
</script>