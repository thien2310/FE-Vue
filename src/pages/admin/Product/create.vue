<template>
    <form @submit.prevent="createProduct()">
        <a-card title="Thêm mới sản phẩm" style="width: 100%">

            <div class="row">
                <div class="col-12 col-sm-6">
                    <!-- danh mục sản phẩm -->
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span :class="{
                                    'text-danger': errors.parent_id
                                }"> Danh mục</span>
                            </label>
                        </div>

                        <div class="col-12 col-sm-9">
                            <a-select v-model:value="parent_id" show-search placeholder="Danh mục sản phẩm"
                                style="width: 100%"  :options="options" :filter-option="filterOption" :class="{
                                    'select-danger': errors.parent_id
                                }">
                            </a-select>
                            <div class="w-100"></div>
                            <small v-if="errors.parent_id" class="text-danger"> {{ errors.parent_id[0] }}</small>
                        </div>
                    </div>
                    <!-- tên sản phẩm -->
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Tên sản phẩm </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-9">
                            <a-input placeholder="" v-model:value="name" style="width: 100%" :class="{
                                    'input-danger': errors.name
                                }" />
                            <div class="w-100"></div>
                            <small v-if="errors.name" class="text-danger"> {{ errors.name[0] }}</small>
                        </div>
                    </div>
                    <!-- trạng thái -->
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span>Chọn trạng thái </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-9">
                            <a-select placeholder="Chọn trạng thái" style="width: 100%" :options="datastatus"
                                v-model:value="status" :class="{
                                    'select-danger': errors.status
                                }">
                            </a-select>
                            <div class="w-100"></div>
                            <small v-if="errors.status" class="text-danger"> {{ errors.status[0] }}</small>
                        </div>
                    </div>
                    <!-- giá sản gốc -->
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Giá sản phẩm </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-9">
                            <a-input type="number" placeholder="" v-model:value="price" style="width: 100%" :class="{
                                    'input-danger': errors.price
                                }" />
                            <div class="w-100"></div>
                            <small v-if="errors.price" class="text-danger"> {{ errors.price[0] }}</small>
                        </div>
                    </div>
                    <!-- giá sản phẩm sau khi giảm -->
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Giá sản phẩm sau khi giảm </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-9">
                            <a-input type="number" placeholder="" v-model:value="base_price" style="width: 100%" :class="{
                                    'input-danger': errors.base_price
                                }" />
                            <div class="w-100"></div>
                            <small v-if="errors.base_price" class="text-danger"> {{ errors.base_price[0] }}</small>
                        </div>
                    </div>


                    <!-- miêu tả ngắn gọn -->
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Mô tả ngắn gọn </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-9">
                            <a-textarea :rows="4" v-model:value="intro" placeholder="maxlength is 6" :maxlength="500000" :class="{
                                    'input-danger': errors.intro
                                }" />
                            <div class="w-100"></div>
                            <small v-if="errors.intro" class="text-danger"> {{ errors.intro[0] }}</small>
                        </div>
                    </div>

                    <!-- mô tả chi tiết -->
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Mô tả chi tiết </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-9">
                            <!-- <editor api-key="no-api-key" /> -->

                            <a-textarea :rows="4" v-model:value="body" placeholder="maxlength is 6" :maxlength="5000000" :class="{
                                    'input-danger': errors.body
                                }" />
                            <div class="w-100"></div>
                            <small v-if="errors.body" class="text-danger"> {{ errors.body[0] }}</small>

                        </div>
                    </div>
                </div>


                <div class="col-12 col-sm-6">
                    <!-- nguồn gốc -->
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Nguồn gốc </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-9">
                            <a-select v-model:value="origin" show-search placeholder="Nguồn gốc" style="width: 100%"
                                :options="origins" :filter-option="filterOption" :class="{
                                    'select-danger': errors.origin
                                }">
                            </a-select>
                            <div class="w-100"></div>
                            <small v-if="errors.origin" class="text-danger"> {{ errors.origin[0] }}</small>
                        </div>
                    </div>

                    <!-- tình trạng -->
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Tình trạng </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-9">
                            <a-select v-model:value="state" show-search placeholder="tình trạng" style="width: 100%"
                                :options="states" :filter-option="filterOption" :class="{
                                    'select-danger': errors.state
                                }">
                            </a-select>
                            <div class="w-100"></div>
                            <small v-if="errors.state" class="text-danger"> {{ errors.state[0] }}</small>
                        </div>
                    </div>




                    <!-- Thuowng hieeuj  -->
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span> Thương hiệu </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-9">
                            <a-select v-model:value="manufacturer" show-search placeholder="Danh mục cha"
                                style="width: 100%" :options="manufacturers" :filter-option="filterOption" :class="{
                                    'select-danger': errors.manufacturer
                                }">
                            </a-select>
                            <div class="w-100"></div>
                            <small v-if="errors.manufacturer" class="text-danger"> {{ errors.manufacturer[0] }}</small>
                        </div>
                    </div>
                    <!-- chi tiết ảnh -->
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span>Chi tiết ảnh </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-9 clearfix">
                            <a-upload v-model:file-list="fileList" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                list-type="picture-card" @preview="handlePreview" :multiple="true">
                                <div v-if="fileList.length < 20">
                                    <plus-outlined />
                                    <div style="margin-top: 8px">Upload</div>
                                </div>
                            </a-upload>
                            <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                                <img alt="example" style="width: 100%" :src="previewImage" />
                            </a-modal>

                        </div>
                    </div>

                    <!-- ảnh icon -->
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
                            <a-upload v-model:file-list="file" name="avatar1" class="avatar-uploader"
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

import { defineComponent, ref, reactive, toRefs } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import axios from 'axios';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';


import { LoadingOutlined } from '@ant-design/icons-vue';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function getBase64Avatar(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default defineComponent({


    components: {
        PlusOutlined,
        LoadingOutlined,


    },

    setup() {
        //avatar

        const loading = ref(false);
        const imageUrl = ref('');

        const handleChange = info => {
            if (info.file.status === 'uploading') {
                loading.value = true;
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64Avatar(info.file.originFileObj, base64Url => {
                    imageUrl.value = base64Url;
                    loading.value = false;

                });
            }
            if (info.file.status === 'error') {
                loading.value = false;
                message.error('upload error');
            }
        };
        const beforeUpload = file => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('Chọn đúng định dạng file');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Hình ảnh phải nhỏ hơn 2MB');
            }
            return isJpgOrPng && isLt2M;
        };
        //end avatar
        const options = ref([{
            value: '',
            label: '',
        },
        ]);

        const origins = ref([
            {
                value: '',
                label: '',
            }
        ]);

        const states = ref([]);



        const manufacturers = ref([
            {
                value: '',
                label: '',
            }
        ]);
        const datastatus = ref([]);
        // mutiupload
        const previewVisible = ref(false);
        const previewImage = ref('');
        const previewTitle = ref('');
        const uploadedImages = ref([]);
        const fileList = ref([]);
        const file = ref([]);
        const handleCancel = () => {
            previewVisible.value = false;
            previewTitle.value = '';
        };
        const handlePreview = async file => {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            // uploadedImages.value = await getBase64(file.originFileObj);
            previewImage.value = file.url || file.preview;
            previewVisible.value = true;
            previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);

        };
        //lấy dữ liệu
        const getProducts = () => {
            axios.get('api/product/create').then((res) => {
                // console.log(res);
                datastatus.value = res.data.status;
                states.value = res.data.state;

                for (const cate_id of res.data.category) {
                    options.value.push(
                        {
                            value: cate_id.id,
                            label: cate_id.name
                        }
                    )
                }

               

                for (const data_ori of res.data.manufacturer
                ) {
                    manufacturers.value.push(
                        {
                            value: data_ori.id,
                            label: data_ori.name
                        }
                    )
                }

                for (const data_manu of res.data.origin) {
                    origins.value.push(
                        {
                            value: data_manu.id,
                            label: data_manu.name
                        }
                    )
                }



            }).catch((error) => {
                console.log(error)
            })
        }

        //tạo mới sản phẩm


        const products = reactive({
            parent_id: '',
            name: '',
            status: '',
            price: '',
            base_price: '',
            imageUrl,
            fileList,
            intro: '',
            body: '',
            origin: '',
            manufacturer: '',
            state: ''
        });

        const errors = ref([]);
        const router = useRouter();

        const createProduct = () => {

            axios.post('api/product/create/store', products).then((res) => {

                console.log(res);
                message.success('Thêm sản phẩm thành công');
                router.push({ name: "admin-prodcut" })

            }).catch((error) => {
                console.log(error);
                errors.value = error.response.data.errors;
            })
        }


        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        getProducts();
        return {
            ...toRefs(products),
            value: ref(undefined),
            filterOption,
            previewVisible,
            previewImage,
            fileList,
            handleCancel,
            handlePreview,
            previewTitle,
            uploadedImages,
            options,
            datastatus,
            loading,
            handleChange,
            beforeUpload,
            imageUrl,
            createProduct,
            origins,
            manufacturers,
            errors,
            states


        };
    }
})
</script>

<style>
/* you can make up upload button and sample style by using stylesheets */

.select-danger {
    border: solid red;
}

.input-danger {
    border: solid red;
}



.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>