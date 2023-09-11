<template>
    <a-card title="Danh mục sản phẩm" style="width: 100%">

        <div class="row mb-3">
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
                    <router-link :to="{ name: 'admin-product-create' }">
                        <i class="fa-solid fa-plus"></i>
                    </router-link>
                </a-button>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <a-table :dataSource="products" :columns="columns" :pagination="{ pageSize: 6 }">

                    <template #bodyCell="{ column, index, record }">

                        <template v-if="column.key === 'index'">
                            <span>{{ index + 1 }}</span>
                        </template>

                        <template v-if="column.key === 'status'">
                            <span v-if="record.status === 0"> <a-button type="primary" danger> Chưa kích hoạt
                                </a-button></span>
                            <span v-if="record.status === 1"><a-button type="primary"> kích hoạt </a-button></span>
                        </template>

                        <template v-if="column.key === 'state'">
                            <span v-if="record.state === 0"> <a-button type="primary" danger> Hết hàng
                                </a-button></span>
                            <span v-if="record.state === 1"><a-button type="primary"> Còn hàng </a-button></span>
                        </template>

                        <template v-if="column.key === 'price'">
                            {{ formatCurrency(record.price) }}
                        </template>

                        <template v-if="column.key === 'base_price'">
                            {{ formatCurrency(record.base_price) }}
                        </template>



                        <template v-if="column.key === 'action'">
                            <a-button class="" style="margin: 10px !important">
                                <router-link :to="{ name: 'admin-product-edit', params: { id: record.id } }">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </router-link>
                            </a-button>
                        </template>


                        <template v-if="column.key === 'action'">
                            <a-button>
                                <a-popconfirm title="Bạn có thực sự muốn xóa" @confirm="deletelProduct(record.id)">
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
import axios from 'axios';
import { useMenu } from '../../../store/use-menu.js';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';



export default defineComponent({
    setup() {
        useMenu().onSlectedKeys(['admin-product']);

        const columns = [
            {
                title: '#',
                dataIndex: '',
                key: 'index',
            },
            {
                title: 'Tên sản phẩm',
                dataIndex: 'name',
                key: 'name',
            },

            {
                title: 'Giá gốc',
                dataIndex: 'base_price',
                key: 'base_price',
            },

            {
                title: 'Giá ',
                dataIndex: 'price',
                key: 'price',
            },

            {
                title: 'Xuất xứ',
                dataIndex: 'origins',
                key: 'origins',
            },
            {
                title: 'Thương hiệu',
                dataIndex: 'manufacturers',
                key: 'manufacturers',
            },

            {
                title: 'Trạng thái',
                dataIndex: 'status',
                key: 'status',
            },

            {
                title: 'Tình trạng',
                dataIndex: 'state',
                key: 'state',
            },


            {
                title: 'Công cụ',
                key: 'action',
                fixed: 'right',
                width: 150

            },
        ];

        const formatCurrency = (price) => {
            return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }

        const products = ref([]);

        const getProduct = () => {
            axios.get('api/product').then((res) => {
                console.log(res);
                products.value = res.data.products
            }).catch((Error) => {
                console.log(Error);
            })
        }

        const deletelProduct = (id) => {

            axios.get(`api/product/deletel/${id}`)
                .then((response) => {
                    message.success('Xóa người dùng thành công');
                    category.value = category.value.filter(item => item.id !== id);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        getProduct();

        return {
            getProduct,
            products,
            columns,
            formatCurrency,
            deletelProduct
        }


    },
});

</script>