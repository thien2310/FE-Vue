<template>
    <section>
        <div class="div" style="margin-left: 86px;padding-top: 17px;" v-if="storeUser.isAuthenticated">
            <a-breadcrumb>
                <a-breadcrumb-item>Home</a-breadcrumb-item>
                <a-breadcrumb-item><router-link :to="{ name: 'profile-index' }"> profile </router-link></a-breadcrumb-item>
            </a-breadcrumb>
        </div>

        <div class="container-fuild mt-3" v-if="storeUser.isAuthenticated">
            <div class="row">
                <div class="col-sm-3 d-none d-sm-flex">
                    <a-list style="width: 100%;">
                        <menProfile />
                        <template #header>
                            <div style="margin-left: 40px;">
                                <a-avatar :size="64" class="me-4">
                                    <template #icon>
                                        <UserOutlined />
                                    </template>
                                </a-avatar>
                                <span> <i class="fa-solid fa-pen-to-square"></i> Sửa hồ sơ</span>
                            </div>
                        </template>
                    </a-list>
                </div>
                <div class="col-sm-9 col-12">
                    <router-view>
                    </router-view>

                </div>
            </div>
        </div>

        <div class="div" v-if="!storeUser.isAuthenticated" style="margin-left: 86px;padding-top: 17px;">
            <a-breadcrumb>
                <a-breadcrumb-item>Home</a-breadcrumb-item>
                <a-breadcrumb-item><router-link :to="{ name: 'profile-index' }"> Login </router-link></a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="container-fluid" v-if="!storeUser.isAuthenticated">
            <div class="row d-flex justify-content-center pt-4">
                <a-card title="Đăng nhập" :bordered="false" style="width: 500px ;">
                    <div class="col-12 ">
                        <a-input v-model:value="email" placeholder="Email" />
                    </div>
                    <div class="col-12 mt-3">
                        <a-input-password v-model:value="password" placeholder="password" />
                    </div>

                    <div class="col-12 mt-3">
                        <a-button style="width: 100%;" @click="login()">Đăng nhập</a-button>
                    </div>

                    <div class="col-12 mt-3">
                        <span><a href="">Quên mật khẩu </a> </span>
                    </div>
                    <div class="col-12 mt-3">
                        <div class="row">
                            <div class="col-md-5 col-5">
                                <hr>
                            </div>
                            <div class="col-md-2 col-2 d-flex justify-content-center mb-4">
                                <span>Hoặc</span>
                            </div>
                            <div class="col-md-5 col-5">
                                <hr>
                            </div>

                        </div>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6">
                                <a-button style="width: 100%;">
                                    <i class="fa-brands fa-facebook me-2"></i>
                                    <span>Facebook</span></a-button>
                            </div>
                            <div class="col-6">
                                <a-button style="width: 100%;">
                                    <i class="fa-brands fa-google me-2"></i>
                                    <span>Google</span>
                                </a-button>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-3">
                        <p>Nếu bạn chưa có tài khoản! Vui lòng <span><a href="">Đăng kí</a></span> </p>
                    </div>
                </a-card>
            </div>
        </div>


    </section>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from "vue";
import menProfile from "./menuProfile.vue"
import { UserOutlined } from '@ant-design/icons-vue';
import { useUserStore } from "../../../store/use-user";
import { useRouter } from 'vue-router';
import { notification } from 'ant-design-vue';


export default defineComponent({
    components: {
        menProfile,
        UserOutlined
    },

    setup() {

        const storeUser = useUserStore();
        const users = reactive({
            email: '',
            password: ''
        })
        const router = useRouter();
        const login = () => {
            storeUser.login(users)
            if(storeUser.isAuthenticated){
                router.push('/home');
            }
        }

       

        return {
            storeUser,
            ...toRefs(users),
            login,
            router,
           
        }

    }
})



</script>