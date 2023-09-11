<template>
    <form @submit.prevent="updateCate()">
        <a-card title="Cập nhật danh mục" style="width: 100%">
            <div class="row">
                <div class="col-12 col-sm-4">
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center mb-3">
                            <a-avatar shape="square" :size="200">
                                <template #icon>
                                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                                    <div v-else>
                                        <loading-outlined v-if="loading"></loading-outlined>
                                        <img v-else-if="imagepath" :src="'http://127.0.0.1:8000' + imagepath['path']"
                                            alt="avatar" />
                                        <i v-else class="fa-solid fa-user-plus"></i>
                                    </div>

                                </template>
                            </a-avatar>
                        </div>
                        <div class="col-12 d-flex justify-content-center ">
                            <a-upload v-model:file-list="fileList" name="avatar1" class="avatar-uploader"
                                :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                :before-upload="beforeUpload" @change="handleChange">
                                <a-button>
                                    <i class="fa-solid fa-plus me-2"></i>
                                    Upload
                                </a-button>
                            </a-upload>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-8">
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Danh mục cấp cha :</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-select show-search placeholder="Danh mục cấp cha" style="width: 100%" :options="catedata"
                                :filter-option="filterOption" v-model:value="cate">


                            </a-select>

                            <div class="w-100"></div>

                            <!-- <small v-if="errors.status_id" class="text-danger"> {{ errors.status_id[0] }}</small> -->
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span>Tên danh mục :</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input v-model:value="name" placeholder="Tên danh mục" />

                            <div class="w-100"></div>
                            <!-- <small v-if="errors.username" class="text-danger"> {{ errors.username[0] }}</small> -->
                        </div>
                    </div>


                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Trạng thái :</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-select show-search placeholder="Danh mục cấp cha" style="width: 100%" :options="statusCate"
                                :filter-option="filterOption" v-model:value="status_id">
                            </a-select>

                            <div class="w-100"></div>

                            <!-- <small v-if="errors.status_id" class="text-danger"> {{ errors.status_id[0] }}</small> -->
                        </div>
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
                    <a-button type="primary" ghost class="me-0 me-sm-2 mb-3 mb-sm-0" html-type="submit">Lưu</a-button>
                    <a-button type="primary" danger ghost>
                        <router-link :to="{ name: 'admin-category' }">
                            <span>Hủy</span>
                        </router-link>
                    </a-button>
                </div>
            </div>
        </a-card>
    </form>
</template>

<script>

import { defineComponent, reactive, toRefs, ref } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

import { notification } from 'ant-design-vue';

export default defineComponent({
    setup() {

        const route = useRoute();
        const router = useRouter();
        const dataCate = reactive({
            name: '',
            status_id: [],
            cate: ''
        })

        const statusCate = ref([])
        const catedata = ref([
            {
                value: 0,
                label: 'Danh mục cha'
            }
        ])


        const getData = () => {
            axios.get(`api/category/edit/${route.params.id}`).then((res) => {

                dataCate.name = res.data.categories.name;
                dataCate.status_id = res.data.categories.status;
                dataCate.cate = res.data.categories.parent_id;
                statusCate.value = res.data.statuses;

                for (const data of res.data.category) {
                    catedata.value.push({
                        value: data.id,
                        label: data.name
                    })
                }
            }).catch((Error) => {
                console.log(Error);
            })
        }


        const updateCate = () => {
            axios.put(`api/category/update/${route.params.id}`, dataCate).then((res) => {
                if (res.data.code == 17) {

                    notification.open({
                        message: 'Thông báo',
                        description: res.data.message,

                    }, 1000)

                    router.push({ name: "admin-category" })
                }

            }).catch((Error) => {
                console.log(Error);
            })
        }
        getData();
        return {
            getData,
            ...toRefs(dataCate),
            statusCate,
            catedata,
            updateCate,
            router

        }

    },
});

</script>

<style></style>