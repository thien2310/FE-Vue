<template>
    <a-card title="Danh mục sản phẩm" style="width: 100%">

        <div class="row mb-3">
            <div class="col-12 d-flex justify-content-end">
                <a-button type="primary" class="">
                    <router-link :to="{ name: 'admin-category-create' }">
                        <i class="fa-solid fa-plus"></i>
                    </router-link>

                </a-button>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <a-table :dataSource="category" :columns="columns" :pagination="{ pageSize: 5 }" :scroll="{ x: 576 }">

                    <template #bodyCell="{ column, index, record }">

                        <template v-if="column.key === 'index'">
                            <span>{{ index + 1 }}</span>
                        </template>

                        <template v-if="column.key === 'status'">
                            <!-- <span v-if="record.status_id = 1" class="text-primary">{{ record.status }}</span> -->
                            <span v-if="record.status === 0"> <a-button type="primary" danger> Chưa kích hoạt
                                </a-button></span>
                            <span v-if="record.status === 1"><a-button type="primary"> kích hoạt </a-button></span>
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
import { useMenu } from '../../../store/use-menu.js';
import { defineComponent, ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import axios from 'axios';

export default defineComponent({
    setup() {
        useMenu().onSlectedKeys(['admin-category']);

        const category = ref('')

        const columns = [
            {
                title: '#',
                dataIndex: '',
                key: 'index',
            },
            {
                title: 'Tên danh mục',
                dataIndex: 'name',
                key: 'name',
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


        const getCategory = () => {
            axios.get('api/category')
                .then((response) => {
                    console.log(response);
                    category.value = response.data.category

                })
                .catch((error) => {
                    // xử trí khi bị lỗi
                    console.log(error);
                })
        }

        const deletelCategory = (id) => {

            axios.get(`api/category/deletel/${id}`)
                .then((response) => {
                    message.success('Xóa người dùng thành công');
                    category.value = category.value.filter(item => item.id !== id);
                })
                .catch((error) => {
                    console.log(error);
                })
        }


        getCategory();



        return {
            columns,
            category,
            deletelCategory


        };


    },
})

</script>