<template>
    <a-card title="Danh mục sản phẩm" style="width: 100%">

<div class="row mb-3">
    <div class="col-12 d-flex justify-content-end">
        <a-button type="primary" class="">
            <router-link :to="{ name: 'admin-product-create' }">
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
import { defineComponent, ref } from 'vue';
export default defineComponent({
    setup() {
        useMenu().onSlectedKeys(['admin-product']);


    },
});

</script>