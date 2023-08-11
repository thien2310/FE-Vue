<template>
    <a-card title="Tài khoản" style="width: 100%">

        <div class="row mb-3">
            <div class="col-12 d-flex justify-content-end">
                <a-button type="primary" class="">
                    <router-link :to="{ name: 'admin-users-create' }">
                        <i class="fa-solid fa-plus"></i>
                    </router-link>

                </a-button>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <a-table :dataSource="users" :columns="columns" :pagination="{ pageSize: 5 }" :scroll="{ x: 576 }">

                    <template #bodyCell="{ column, index, record }">

                        <template v-if="column.key === 'index'">
                            <span>{{ index + 1 }}</span>
                        </template>

                        <template v-if="column.key === 'status'">
                            <span v-if="record.status_id = 1" class="text-primary">{{ record.status }}</span>
                            <span v-else-if="record.status_id = 2" class="text-danger">{{ record.status }}</span>
                        </template>

                        <template v-if="column.key === 'action'">
                            <a-button class="" style="margin: 10px !important">
                                <router-link :to="{ name: 'admin-users-edit', params: { id: record.id } }">
                                    <i class="fa-solid fa-pen-to-square"></i> 
                                </router-link>
                            </a-button>
                        </template> 



                        <template v-if="column.key === 'action'">
                            <a-button>
                                <a-popconfirm title="Bạn có thực sự muốn xóa" @confirm="deletelUser(record.id)">
                                    <i class="fa-solid fa-trash"></i>
                                </a-popconfirm>
                            </a-button>
                        </template>



                    </template>

                </a-table>
            </div>
        </div>
    </a-card>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useMenu } from '../../../store/use-menu.js';
import axios from 'axios';



export default defineComponent({
    setup() {
        useMenu().onSlectedKeys(["admin-users"]);

        const users = ref([]);

        const columns = [
            {
                title: '#',
                dataIndex: '',
                key: 'index',
            },
            {
                title: 'Tên đăng nhập',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: 'Tên',
                dataIndex: 'name',
                key: 'name',
            },

            {
                title: 'Vai trò',
                dataIndex: 'departments',
                key: 'departments',
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                key: 'status',
            },

            {
                title: 'Công cụ',
                key: 'action',
                fixed: 'right',
                width: 150

            },
        ];

        // const getUserDelelte = () => {
        //     axios.get(`http://127.0.0.1:8000/api/user/deletel/`)
        // }



        const deletelUser = (id) => {

            axios.get(`api/user/deletel/${id}`)
                .then((response) => {
                    message.success('Xóa người dùng thành công');
                    users.value = users.value.filter(item => item.id !== id);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        const getUser = () => {
            axios.get('api/user')
                .then((response) => {
                    users.value = response.data;
                })
                .catch((error) => {
                    // xử trí khi bị lỗi
                    console.log(error);
                })

        }


        getUser();

        return {
            users,
            columns,
            deletelUser
        }
    },
});

</script>