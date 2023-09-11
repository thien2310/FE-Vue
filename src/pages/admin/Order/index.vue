<template>
    <a-card title="Quản lý đơn hàng">
        <div class="row mb-3" style="width: 100%;">
            <div class="col-12 d-flex justify-content-space-between">
                <a-input-search v-model:value="search" placeholder="Tìm ..." style="width: 200px ; order: -1;" />

                <a-button type="primary" class="action" style="background-color: rgb(34, 168, 72); margin-left: auto;">
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
                            <a-menu>
                                <a-menu-item>1st menu item</a-menu-item>
                                <a-menu-item>2nd menu item</a-menu-item>
                                <a-sub-menu key="sub1" title="Trạng thái">
                                    <a-menu-item>Hoạt động</a-menu-item>
                                    <a-menu-item>Tạm khóa</a-menu-item>
                                </a-sub-menu>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-button>


                <a-button type="primary" class="" style="margin-left: 10px;">
                    <router-link :to="{ name: 'admin-coupons-create' }">
                        <i class="fa-solid fa-plus"></i>
                    </router-link>
                </a-button>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <a-table :dataSource="orders" :columns="columns" :pagination="{ pageSize: 5 }" :scroll="{ x: 576 }">

                    <template #bodyCell="{ column, index, record }">

                        <template v-if="column.key === 'index'">
                            <span>{{ index + 1 }}</span>
                        </template>
                        <template v-if="column.key === 'status_order'">
                            <span v-if="record.status_order === 1"> <a-button type="primary"> Đơn hàng mới
                                </a-button></span>
                            <span v-if="record.status_order === 2"><a-button type="primary"> Đã xử lý </a-button></span>
                        </template>
                        <template v-if="column.key === 'action'">
                            <a-button class="" style="margin: 10px !important">
                                <router-link :to="{ name: 'admin-order-preview', params: { id: record.id } }">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                            </a-button>
                        </template>

                        <template v-if="column.key === 'action'">
                            <a-button>
                                <a-popconfirm title="Hoàn tất đơn hàng"
                                    @confirm="OrderComple(record.id, record.status_order)">
                                    <i class="fa-solid fa-check"></i>
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
import { ref } from 'vue';
import { useMenu } from '../../../store/use-menu.js';
import axios from 'axios';
import { notification } from 'ant-design-vue';

export default {
    setup() {
        useMenu().onSlectedKeys(['admin-orders']);

        const columns = [
            {
                title: '#',
                dataIndex: '',
                key: 'index',
                width: '10%'
            },
            {
                title: 'Mã đơn hàng',
                dataIndex: 'code_zip',
                key: 'code_zip',
            },

            {
                title: 'Trạng thái đơn hàng',
                dataIndex: 'status_order',
                key: 'status_order',
            },


            {
                title: 'Công cụ',
                key: 'action',
                fixed: 'right',
                width: 150

            },
        ];


        const orders = ref([])
        const status = ref();

        const getData = () => {
            axios.get('api/order').then((res) => {
                orders.value = res.data.orders

            })
        }


        const OrderComple = (id, status_order) => {
            if (status_order === 2) {
                axios.post(`api/order/compleOrder/${id}`).then((res) => {
                    if (res.data.code == 4) {
                        orders.value = orders.value.filter(m => m.id !== id)
                        notification.open({
                            message: 'Thành công',
                            description: res.data.message,
                        });
                    }
                })
            } else {
                notification.open({
                    message: 'Thất bại',
                    description: 'Bạn chưa phê duyệt đơn hàng vui lòng thử lại',
                });
            }


        }

        getData();
        return {
            columns,
            orders,
            status,
            OrderComple

        }


    },
}

</script>