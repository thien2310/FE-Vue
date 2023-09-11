<template>
    <a-card title="Đơn hoàn thành">
        <div class="row mb-3" style="width: 100%;">
            <div class="col-12 d-flex justify-content-space-between">

                <a-input-search v-model:value="search" placeholder="Tìm ..." style="width: 200px ; order: -1;" />
                <!-- doanh thu -->
                <a-button @click="sales()" :disabled="!hasSelected" :loading="loading" style="margin-left: 10px;">Chốt doanh
                    thu - {{ date }}</a-button>

                <span v-if="hasSelected" style="margin-left: 15px; margin-top: 5px;">{{ `Tổng số ${selectedRowKeys.length}
                    đơn hàng` }}</span>

                <!-- doanh thu -->


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


                <a-table :dataSource="orders" :columns="columns" :pagination="{ pageSize: 5 }" :scroll="{ x: 576 }"
                    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">

                    <template #bodyCell="{ column, index, record }">

                        <template v-if="column.dataIndex === 'index'">
                            <span>{{ index + 1 }}</span>
                        </template>

                        <template v-if="column.dataIndex === 'status_order'">
                            <span v-if="record.status_order === 3"> <a-button type="primary"> Đơn hoàn thành
                                </a-button></span>
                        </template>


                        <template v-if="column.dataIndex === 'action'">
                            <a-button class="" style="margin: 10px !important">
                                <router-link :to="{ name: 'admin-order-preview', params: { id: record.id } }">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                            </a-button>
                        </template>

                    </template>

                </a-table>


            </div>
        </div>
    </a-card>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, computed } from 'vue';
import { useMenu } from '../../../store/use-menu.js';
import axios from 'axios';
import Swal from 'sweetalert2';
export default defineComponent({
    setup() {
        useMenu().onSlectedKeys(['admin-order-comple']);

        const state = reactive({
            selectedRowKeys: [],
            selectedRows: [],
            // Check here to configure the default column
            loading: false,
        });
        const columns = [
            {
                title: '#',
                dataIndex: 'index',
                // key: 'index',
                width: '10%'
            },
            {
                title: 'Mã đơn hàng',
                dataIndex: 'code_zip',
                // key: 'code_zip',
            },

            {
                title: 'Trạng thái đơn hàng',
                dataIndex: 'status_order',
                // key: 'status_order',
            },
            {
                title: 'Công cụ',
                // key: 'action',
                dataIndex: 'action',
                fixed: 'right',
                width: 150

            },
        ];

        const onSelectChange = (selectedRowKeys, selectedRows) => {
            // console.log('selectedRowKeys changed: ', selectedRowKeys);
            state.selectedRowKeys = selectedRowKeys;
            state.selectedRows = selectedRows;
        };
        const orders = ref([])
        const getData = () => {
            axios.get('api/order/compleOrder/index').then((res) => {
                // orders.value = res.data.orders
                // console.log(orders);
                for (const m of res.data.orders) {
                    orders.value.push({
                        id: m.id,
                        key: m.id,
                        code_zip: m.code_zip,
                        status_order: m.status_order
                    })
                }

            })
        }
        const hasSelected = computed(() => state.selectedRowKeys.length > 0);
        const sales = () => {
            state.loading = true
            setTimeout(() => {
                state.loading = false;

                axios.post('api/order/revenue', { id_order: state.selectedRowKeys, date: date.value }).then((res) => {
                    if (res.data.code === 3) {
                        Swal.fire({
                            title: res.data.message,
                            confirmButtonText: 'Đồng ý',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setTimeout(() => {
                                    location.reload()
                                }, 1000)
                            }
                        })

                    } else {
                        Swal.fire('Chốt doanh thu thất bại');
                    }

                })

                state.selectedRowKeys = [];

            }, 1000);
        }
        const date = ref();
        const now = new Date();
        date.value = now.toLocaleDateString();


        getData();

        return {
            columns,
            orders,
            ...toRefs(state),
            onSelectChange,
            hasSelected,
            sales,
            date




        }


    },
})

</script>