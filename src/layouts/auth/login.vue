<template>
    <div class="container-fluid">
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
</template>

<script>
import { reactive, defineComponent, toRefs } from 'vue';

import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/use-user';
import { notification } from 'ant-design-vue';
const router = useRouter();

export default defineComponent({
    setup() {
        const users = reactive({
            email: '',
            password: ''
        })



        const storeUser = useUserStore();
        const router = useRouter();
        const login = () => {
            // console.log(123);

            if (users) {
                storeUser.login(users);
            }


            router.push('/home');
        }

        return {
            ...toRefs(users),
            login,
            router,
            storeUser
        }
    }


})

</script>

<style></style>
