<template>
    <form @submit.prevent="updateUser()">
        <a-card title="Cập nhật tài khoản" style="width: 100%">

            <div class="row">
                <div class="col-12 col-sm-4">
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center mb-3">
                            <a-avatar shape="square" :size="200">
                                <template #icon>
                                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                                    <div v-else>
                                        <loading-outlined v-if="loading"></loading-outlined>
                                        <img v-else-if="imagepath" :src="'http://127.0.0.1:8000'+imagepath['path']" alt="avatar" />
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
                                <span :class="{
                                    'text-danger': errors.status_id
                                }"> Tình trạng :</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-select show-search placeholder="Chọn tình trạng" style="width: 100%" :options="users_status"
                                :filter-option="filterOption" v-model:value="status_id" :class="{
                                    'select-danger': errors.status_id
                                }">
                            </a-select>

                            <div class="w-100"></div>

                            <small v-if="errors.status_id" class="text-danger"> {{ errors.status_id[0] }}</small>
                        </div>


                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span :class="{
                                    'text-danger': errors.username
                                }">Tên tài khoản :</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input v-model:value="username" placeholder="Tên tài khoản" :class="{
                                'input-danger': errors.status_id
                            }" />

                            <div class="w-100"></div>
                            <small v-if="errors.username" class="text-danger"> {{ errors.username[0] }}</small>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span :class="{
                                    'text-danger': errors.name
                                }">Tên :</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input v-model:value="name" placeholder="Nhập tên" :class="{
                                'input-danger': errors.status_id
                            }" />
                            <div class="w-100"></div>
                            <small v-if="errors.name" class="text-danger"> {{ errors.name[0] }}</small>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span :class="{
                                    'text-danger': errors.email
                                }">Email :</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input :class="{
                                'input-danger': errors.status_id
                            }" v-model:value="email" placeholder="Email" />
                            <div class="w-100"></div>
                            <small v-if="errors.email" class="text-danger"> {{ errors.email[0] }}</small>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span :class="{
                                    'text-danger': errors.departments
                                }">Phòng ban :</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <div class="row">
                                <div class="col-10 col-sm-10">
                                    <a-select :class="{
                                        'select-danger': errors.status_id
                                    }" v-model:value="department_id" style="width: 100%" show-search
                                        :options="departments" placeholder="Chọn phòng ban" :filter-option="filterOption">
                                    </a-select>
                                </div>
                                <div class="col-2 col-sm-2">
                                    <a-button type="primary" class="">
                                        <i class="fa-solid fa-plus"></i>
                                    </a-button>
                                </div>
                            </div>

                            <div class="w-100"></div>
                            <small v-if="errors.department_id" class="text-danger"> {{ errors.department_id[0] }}</small>

                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">

                        </div>
                        <div class="col-12 col-sm-5">
                            <a-checkbox v-model:checked="change_password">Đổi mật khẩu</a-checkbox>
                        </div>

                    </div>

                    <div class="row mb-3" v-if="change_password === true">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span :class="{
                                    'text-danger': errors.password
                                }">Mật khẩu :</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input-password :class="{
                                'input-danger': errors.status_id
                            }" v-model:value="password" placeholder="Mật khẩu" />
                            <div class="w-100"></div>
                            <small v-if="errors.password" class="text-danger"> {{ errors.password[0] }}</small>
                        </div>
                    </div>

                    <div class="row mb-3" v-if="change_password === true">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span :class="{
                                    'text-danger': errors.password_confirmation
                                }">Nhập lại mật khẩu :</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-input-password :class="{
                                'input-danger': errors.status_id
                            }" v-model:value="password_confirmation" placeholder="Nhập lại mật khẩu" />
                            <div class="w-100"></div>
                            <small v-if="errors.password" class="text-danger"> {{ errors.password[0] }}</small>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">

                                <span> Lần đăng nhập gần nhất : </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            {{ login_at }}
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">

                                <span>Lần đổi mật khẩu gần nhất : </span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            {{ change_password_at }}
                        </div>
                    </div>

                    <!-- <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span>Vai trò :</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <a-checkbox v-model:checked="checked">Admin</a-checkbox>
                            <br>
                            <a-checkbox v-model:checked="checked">Quản trị</a-checkbox>
                            <br>
                            <a-checkbox v-model:checked="checked">Nhân viên</a-checkbox>
                        </div>
                    </div> -->



                </div>
            </div>

            <div class="row">
                <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
                    <a-button type="primary" ghost class="me-0 me-sm-2 mb-3 mb-sm-0" html-type="submit">Lưu</a-button>
                    <a-button type="primary" danger ghost>
                        <router-link :to="{ name: 'admin-users' }">
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
import { message } from 'ant-design-vue';
import { useMenu } from '../../../store/use-menu.js';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';

import { LoadingOutlined } from '@ant-design/icons-vue';
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}



import axios from 'axios';

export default defineComponent({
    setup() {
        useMenu().onSlectedKeys(['admin-users']);

        const departments = ref([]);
        const users_status = ref([]);
        const route = useRoute();
        const router = useRouter();
        const errors = ref([]);
        const imagepath = ref([]);

        const loading = ref(false);
        const imageUrl = ref('');

        const handleChange = info => {
            if (info.file.status === 'uploading') {
                loading.value = true;
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, base64Url => {
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

        const users = reactive({
            username: '',
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            department_id: [],
            status_id: [],
            change_password: false,
            login_at: '',
            change_password_at: '',
            imageUrl 
        });

        const getUserEdit = () => {
        
            axios.get(`api/user/edit/${route.params.id}`).then((res) => {
              
                users.username = res.data.user.username;
                users.name = res.data.user.name;
                users.email = res.data.user.email;
                users.department_id = res.data.user.department_id;
                users.status_id = res.data.user.status_id;
                res.data.user.login_at ? users.login_at = res.data.user.login_at : users.login_at = 'chưa có lượt đăng nhập';
                res.data.user.change_password_at ? users.change_password_at = dayjs(res.data.user.change_password_at).format('DD/MM/YYYY  HH-mm-ss') : users.change_password_at = 'chưa có lượt đổi mật khẩu';
                departments.value = res.data.departments
                users_status.value = res.data.users_status;

                imagepath.value = res.data.imagepath;
                

            }).catch((errors) => {
                console.log(errors);
            })
        };
        
        const updateUser = () => {
            axios.put(`api/user/update/${route.params.id}`, users).then((res) => {
                // console.log(users); 
                message.success('Cập nhật tài khoản thành công');
                router.push({ name: "admin-users" })

            }).catch((error) => {
                errors.value = error.response.data.errors;
            })
        }

        // lấy dữ liệu

        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0; 
        };

        //tạo mới tài khoản
        getUserEdit();
        

        return {
            departments,
            users_status,
            ...toRefs(users),
            errors,
            filterOption,
            updateUser,
            loading,
            handleChange,
            beforeUpload,
            imagepath,
            imageUrl
            

        }

    },
});

</script>

<style>
.select-danger {
    border: solid red;
}

.input-danger {
    border: solid red;
}
</style>