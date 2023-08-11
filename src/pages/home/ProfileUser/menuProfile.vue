<template>
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline">

        <a-menu-item key="0">
            <span>
                <i class="fa-solid fa-fire fa-xl me-2"></i>
                Ưu đãi dành riêng cho bạn
            </span>
        </a-menu-item>

        <a-sub-menu key="sub1">
            <template #icon>
                <i class="fa-regular fa-user fa-xl me-2"></i>
            </template>
            <template #title>Tài khoản của tôi</template>
            <a-menu-item key="52">Hồ sơ</a-menu-item>
            <a-menu-item key="53">Đổi mật khẩu</a-menu-item>
           
        </a-sub-menu>

        <a-menu-item key="2">
            <span>
                <i class="fa-regular fa-rectangle-list fa-xl me-2"></i>
                Đơn mua
            </span>
        </a-menu-item>
        <a-menu-item key="3">
            <span>
                <i class="fa-regular fa-bell fa-xl me-2"></i>
                Thông báo
            </span>
        </a-menu-item>
        <a-menu-item key="4">
            <span>
                <i class="fa-solid fa-ticket fa-xl me-2"></i>
                Kho Voucher
            </span>
        </a-menu-item>
        <a-menu-item key="5">
            <span>
                <i class="fa-regular fa-heart fa-xl me-2"></i>
                Sản phẩm yêu thích
            </span>
        </a-menu-item>
        <a-menu-item key="6">
            <span @click="logout()">
                <i class="fa-solid fa-arrow-right-from-bracket fa-xl me-2"></i>
                Đăng xuất
            </span>
        </a-menu-item>


    </a-menu>
</template>

<script>

// import { useroutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue'
import { useUserStore } from '../../../store/use-user';
import { useRouter } from 'vue-router';

export default defineComponent({
    // components: {
    //     useroutlined,
    // },
    setup() {

        const storeUser = useUserStore();
        const router = useRouter();
        const logout = () => {
            storeUser.logout();
            router.push('/home');
        }

        return {
            storeUser,
            logout,
            router
        };
    },
});


</script>