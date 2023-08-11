<template>
    <a-card title="HỒ SƠ CỦA TÔI " :bordered="false" style="width: 100% ,">

        <div class="row">
            <div class="col-sm-8">
                <div style="display: flex; align-items: center; margin-bottom: 30px;">
                    <span style="flex-shrink: 0;">Tên đăng nhập </span>
                    <a-input placeholder="Tên đăng nhập" style="flex-grow: 1; margin-left: 40px;"
                        v-model:value="username" />
                </div>

                <div style="display: flex; align-items: center; margin-bottom: 30px;">
                    <span style="flex-shrink: 0;"> Tên </span>
                    <a-input placeholder="Tên " style="flex-grow: 1; margin-left: 110px;" v-model:value="name" />
                </div>

                <div style="display: flex; align-items: center; margin-bottom: 30px;">
                    <span style="flex-shrink: 0;"> Email </span>
                    <a-input placeholder="Email" style="flex-grow: 1; margin-left: 100px;" v-model:value="email" />
                </div>

                <div style="display: flex; align-items: center; margin-bottom: 30px;">
                    <span style="flex-shrink: 0;">Số điện thoại </span>
                    <a-input placeholder="Số điện thoại" style="flex-grow: 1; margin-left: 52px;"
                        v-model:value="phoneNumber" />
                </div>

                <div style="display: flex; align-items: center; margin-bottom: 30px;">
                    <span style="flex-shrink: 0;">Ngày sinh </span>
                    <a-select placeholder="Ngày" style="flex-grow: 1; margin-left: 70px;" />
                    <a-select placeholder="Tháng " style="flex-grow: 1; margin-left: 20px;" />
                    <a-select placeholder="Năm" style="flex-grow: 1; margin-left: 20px;" />
                </div>

                <h1> THÔNG TIN NHẬN HÀNG </h1>

                <div style="display: flex; align-items: center; margin-bottom: 30px;">
                    <span style="flex-shrink: 0;"> Tỉnh/Thành phố</span>
                    <a-select placeholder="--Chọn tỉnh--" style="flex-grow: 1; margin-left: 40px;" />
                </div>

                <div style="display: flex; align-items: center; margin-bottom: 30px;">
                    <span style="flex-shrink: 0;">Quận/Huyện </span>
                    <a-select placeholder="--Chọn Quận/Huyện--" style="flex-grow: 1; margin-left: 60px;" />
                </div>

                <div style="display: flex; align-items: center; margin-bottom: 30px;">
                    <span style="flex-shrink: 0;">Phường/Xã </span>
                    <a-select placeholder="--Chọn Xã/Phường--" style="flex-grow: 1; margin-left: 70px;" />
                </div>

                <div style="display: flex; align-items: center; margin-bottom: 30px;">
                    <span style="flex-shrink: 0;"> Địa chỉ </span>
                    <a-input placeholder="Địa chỉ" style="flex-grow: 1; margin-left: 98px;" />
                </div>

                <div class="div">
                    <a-button>
                        Lưu thông tin
                    </a-button>
                </div>

            </div>

            <div class="col-md-4">
                <div class="col-12 d-flex justify-content-center mb-3">
                    <a-avatar shape="square" :size="200">
                        <template #icon>
                            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                            <div v-else>
                                <loading-outlined v-if="loading"></loading-outlined>
                                <img v-else-if="imagepath" :src="'http://127.0.0.1:8000' + imagepath['path']" alt="avatar" />
                                <i v-else class="fa-solid fa-user-plus"></i>
                            </div>

                        </template>
                    </a-avatar>
                </div>
                <div class="col-12 d-flex justify-content-center ">
                    <a-upload v-model:file-list="fileList" name="avatar1" class="avatar-uploader" :show-upload-list="false"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :before-upload="beforeUpload"
                        @change="handleChange">
                        <a-button>
                            <i class="fa-solid fa-plus me-2"></i>
                            Upload
                        </a-button>
                    </a-upload>
                </div>

                <div class="col-12 d-flex justify-content-center flex-column align-items-center">
                    <span>* Ảnh không quá 1M</span>
                    <span>Định dạng ảnh JPEG, PNG</span>
                </div>


            </div>
        </div>
    </a-card>
</template>

<script>

import { defineComponent, reactive, ref, toRefs } from 'vue';
import axios from "axios";
export default defineComponent({
    setup() {


        const dataUser = reactive({
            email: '',
            name: '',
            username: '',
            avatar: ''

        }
        );

        const getUser = () => {
            axios.get('api/auth/user').then((res) => {
                dataUser.email = res.data.email;
                dataUser.name = res.data.name;
                dataUser.username = res.data.username;
                dataUser.avatar = res.data.avatar;
            })
        }

        getUser();

        return {
            ...toRefs(dataUser),
            getUser

        };
    },
});

</script>