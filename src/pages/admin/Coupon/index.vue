<template>
    <a-card title="Quản lý phí vận chuyển">
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
                <a-table :dataSource="coupons" :columns="columns" :pagination="{ pageSize: 5 }" :scroll="{ x: 576 }">

                    <template #bodyCell="{ column, index, record }">

                        <template v-if="column.key === 'index'">
                            <span>{{ index + 1 }}</span>
                        </template>

                       

                        <template v-if="column.key === 'action'">
                            <a-button class="" style="margin: 10px !important">
                                <router-link :to="{ name: 'admin-category-edit', params: { id: record.id } }">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </router-link>
                            </a-button>
                        </template>


                        <template v-if="column.key === 'action'">
                            <a-button>
                                <a-popconfirm title="Bạn có thực sự muốn xóa" @confirm="deletelCategory(record.id)">
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
import { ref } from 'vue';
import { useMenu } from '../../../store/use-menu.js';
import axios from 'axios';

export default {
    setup() {
        useMenu().onSlectedKeys(['admin-coupons']);

        const columns = [
            {
                title: '#',
                dataIndex: '',
                key: 'index',
            },
            {
                title: 'Tên mã giảm giá',
                dataIndex: 'name',
                key: 'name',
            },

            {
                title: 'Số lượng',
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: 'Trị giá voucher',
                dataIndex: 'price_coupon',
                key: 'price_coupon',
            },

            {
                title: 'Mã',
                dataIndex: 'coupon_code',
                key: 'coupon_code',
            },
           

            {
                title: 'Công cụ',
                key: 'action',
                fixed: 'right',
                width: 150

            },
        ];


        const coupons = ref([])
      
        const getData = () => {
            axios.get('api/coupons').then((res) => {

                coupons.value = res.data.coupons
             
            })
        }
        
    
        getData();
        return {
            columns,
            coupons,
           
        }


    },
}

</script>