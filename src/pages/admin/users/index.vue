<template>
    <a-card title="Tài khoản" style="width: 100%">

        <div class="row mb-3">
            <div class="col-12 d-flex justify-content-space-between">
                <a-input-search v-model:value="search" placeholder="Tìm ..." style="width: 200px ; order: -1;" />

                <a-button type="primary" class="action" :disabled="disreload" @click="reloadUser"
                    style="background-color: rgb(34, 168, 72); margin-left: auto;">
                    <i class="fa-solid fa-rotate"></i>
                </a-button>

                <a-button type="primary" class="action" style="background-color: rgb(47, 145, 75); margin-left: 10px;">
                    <i class="fa-solid fa-file-export"></i>
                </a-button>

                <a-button type="primary" class="action" style="background-color: hsl(156, 55%, 36%); margin-left: 10px;">
                    <a-dropdown>
                        <a class="ant-dropdown-link" @click.prevent>
                            <DownOutlined />
                            <i class="fa-solid fa-filter"></i>
                        </a>
                        <template #overlay>
                            <a-menu v-model:openKeys="openKeys" :disabled="disfilter" v-model:selectedKeys="selectedKeys">
                                <a-menu-item key="Guest" @click="handleFilter('Guest')">Guest</a-menu-item>
                                <a-menu-item key="Admin" @click="handleFilter('Admin')">Quản trị</a-menu-item>
                                <a-sub-menu title="Trạng thái">
                                    <a-menu-item key="active" @click="handleFilter('active')">Hoạt động</a-menu-item>
                                    <a-menu-item key="noActive" @click="handleFilter('noActive')">Tạm khóa</a-menu-item>
                                </a-sub-menu>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-button>

                <a-button type="primary" class="action" style="margin-left: 10px; ">
                    <router-link :to="{ name: 'admin-users-create' }">
                        <i class="fa-solid fa-plus"></i>
                    </router-link>
                </a-button>

            </div>

        </div>

        <div class="row">
            <div class="col-12">
                <a-table :dataSource="dataSource" :columns="columns" :pagination="{ pageSize: 5 }" :scroll="{ x: 576 }">

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
import { defineComponent, ref, computed, reactive, toRefs } from 'vue';
import { TableColumnGroup, message } from 'ant-design-vue';
import { useMenu } from '../../../store/use-menu.js';
import axios from 'axios';




export default defineComponent({
    setup() {
        useMenu().onSlectedKeys(["admin-users"]);
        const users = ref([]);

        const fillterUser = ref('');

        const radioStyle = reactive({
            display: 'flex',
            height: '30px',
            lineHeight: '30px',
            background: 'hsl(164, 41%, 95%)',
            paddingLeft: '10px',
            padingTop: '10px'
        });

        const stateFilter = reactive({
            selectedKeys: [],
            openKeys: [],
            disreload: true,
            disfilter: false
        });


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
        const search = ref('');


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
                    console.log(users.value);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        
        const temp = ref([]);
        const dataSource = computed(() => {
            if (search.value) {
                return filteredUsers.value;
            }
            else if (stateFilter.selectedKeys.includes('Guest')) {
                return temp.value
            } else if (stateFilter.selectedKeys.includes('Admin')) {
                return temp.value
            } 
            else if (stateFilter.selectedKeys.includes('active')) {
                return temp.value
            } 
            else if (stateFilter.selectedKeys.includes('noActive')) {
                return temp.value
            } 
            else {
                return users.value;
            }
           
        });


        const handleFilter = key => {
            stateFilter.selectedKeys = [key]
            stateFilter.openKeys = [key]
            if (key === 'Guest') {
                temp.value = users.value
                message.loading('Đang lọc vui lòng chờ..', 2.5).then(() => {
                    temp.value = filterUsersByDepartment(users.value, 2)
                    message.success('lọc thành công')
                }
                )
                stateFilter.disreload = false
                stateFilter.disfilter = true
            }
            else if (key === 'Admin') {
                temp.value = users.value
                message.loading('Đang lọc vui lòng chờ..', 2.5).then(() => {
                    temp.value = filterUsersByDepartment(users.value, 1)
                    message.success('lọc thành công')
                    console.log(temp.value)
                }
                )
                stateFilter.disreload = false
                stateFilter.disfilter = true
            }
            else if (key === 'active') {
                temp.value = users.value
                message.loading('Đang lọc vui lòng chờ..', 2.5).then(() => {
                    temp.value = filterUsersByStatus(users.value, 1)
                    message.success('lọc thành công')
                    console.log(temp.value)
                }
                )
                stateFilter.disreload = false
                stateFilter.disfilter = true
            }
            else if (key === 'noActive') {

                temp.value = users.value
                message.loading('Đang lọc vui lòng chờ..', 2.5).then(() => {
                    temp.value = filterUsersByStatus(users.value, 2)
                    message.success('lọc thành công')
                    console.log(temp.value)
                }
                )
                stateFilter.disreload = false
                stateFilter.disfilter = true
            }

        }

        const filterUsersByDepartment = (users, targetId) => {
            return users.filter(users => users.department_id === targetId)
        }
        const filterUsersByStatus = (users, targetId) => {
            return users.filter(users => users.status_id === targetId)
        }

        
        

        const filteredUsers = computed(() => {
            return users.value.filter(user => {
                return user.name.toLowerCase().includes(search.value.toLowerCase());
            });
        });



        const reloadUser = () => {
            message.loading('Đang tải lại..', 2.5).then(() => {
                stateFilter.selectedKeys = []
                stateFilter.openKeys = []
                temp.value = users.value
            }
            )
            stateFilter.disreload = true
            stateFilter.disfilter = false

        }


        getUser();


        return {
            filterUsersByStatus,
            temp,
            users,
            columns,
            deletelUser,
            search,
            fillterUser,
            filteredUsers,
            dataSource,
            radioStyle,
            handleFilter,
            ...toRefs(stateFilter),
            filterUsersByDepartment,
            reloadUser
        }
    },
});

</script>