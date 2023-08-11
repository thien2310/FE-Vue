<template>
    <form @submit.prevent="create()">
        <a-card title="Thêm mới danh mục" style="width: 100%">

            <div class="row">
                <div class="col-12 col-sm-8">
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Danh mục cấp cha </span>
                            </label>
                        </div>

                        <div class="col-12 col-sm-9">
                            <a-select v-model:value="parent_id" show-search placeholder="Danh mục cha" style="width: 100%"
                                :options="options" :filter-option="filterOption">
                            </a-select>
                            <div class="w-100"></div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Tên Danh mục </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-9">
                            <a-input placeholder="" v-model:value="name" style="width: 100%" />
                            <div class="w-100"></div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span>Chọn trạng thái </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-9">
                            <a-select  placeholder="Chọn trạng thái" style="width: 100%" 
                            :options="datastatus"

                            v-model:value="status" >
                            </a-select>
                            <div class="w-100"></div>
                        </div>
                    </div>



                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Mô tả ngắn gọn </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-9">
                            <a-textarea :rows="4" v-model:value="content" placeholder="maxlength is 6" :maxlength="6" />
                            <div class="w-100"></div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Mô tả chi tiết </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-9">
                            <CkedittorCustom />
                            <div class="w-100"></div>
                        </div>
                    </div>



                </div>

                <div class="col-12 col-sm-4">
                    <div class="row">
                        <div class="col-12 d-flex justify-content-start mb-3">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Ảnh icon </span>
                            </label>
                        </div>
                        <div class="col-12 d-flex justify-content-center mb-3">
                            <a-avatar shape="square" :size="200">
                                <template #icon>
                                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                                    <div v-else>
                                        <loading-outlined v-if="loading"></loading-outlined>
                                        <i v-else class="fa-solid fa-user-plus"></i>
                                        <!-- <div class="ant-upload-text">Upload</div> -->
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
import { useMenu } from '../../../store/use-menu';
import { defineComponent, ref, reactive, toRefs } from 'vue';
import CkedittorCustom from './CkedittorCustom.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { message } from 'ant-design-vue';
export default defineComponent({
    components: {
        CkedittorCustom
    },
    setup() {
        useMenu().onSlectedKeys(['admin-category']);
        const router = useRouter();
        const datastatus =  ref([]);
        const options = ref([{
            value: '',
            label: '',
        },
        ]);

        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const categories = reactive({
            parent_id: '',
            name: '',
            content: '',
            editorData: '',
            status: ''
        });

        //lấy dữ liệu

        const getParent = () => {
            axios.get('api/category/create').then((res) => {
                datastatus.value =  res.data.status;
                for (const data of res.data.parent) {
                    options.value.push({
                        value: data.id,
                        label: data.name
                    })
                }


            }).catch((error) => {
                console.log(error)
            })
        }



        const create = () => {
            axios.post('api/category/create/store', categories).then((res) => {
                if(res.data.code === 3 ){
                    message.success(res.data.message);
                    router.push({ name: "admin-category" })
                }
                if(res.data.code === 2 ){
                    message.warning(res.data.message);
                }

            }).catch((error) => {

                errors.value = error.response.data.errors;
            })
        }

        getParent();
        return {
            ...toRefs(categories),
            value: ref(undefined),
            filterOption,
            options,
            create,
            parent,
            datastatus

        };
    }
})
</script>