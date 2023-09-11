<template>
    <section>
        <div class="div" style="margin-left: 86px;padding-top: 17px;">
            <a-breadcrumb>
                <a-breadcrumb-item>Home</a-breadcrumb-item>
                <a-breadcrumb-item>Cart</a-breadcrumb-item>
                <a-breadcrumb-item><span style="color: blue;">Comple</span></a-breadcrumb-item>
            </a-breadcrumb>
        </div>

        <a-card style="width: 90%; margin-left: 70px;margin-top: 11px;  ">
            <a-result status="success" title="CẢM ƠN BẠN ĐÃ MUA HÀNG"
                sub-title="Theo dõi đơn hàng của bạn tại trang cá nhân và gmail mọi thông tin liên hệ SĐT: 099999999">
                <template #extra>
                    <router-link :to="{ name: 'home' }"> <a-button key="console" type="primary">Tiếp tục mua sắm</a-button>
                    </router-link>
                    <!-- <a-button key="buy">Quay lại</a-button> -->
                </template>
            </a-result>
        </a-card>
    </section>
</template>
<script>

import { defineComponent, ref } from 'vue';
import { useCartStore } from '../../../store/use-cart';

export default defineComponent({
    setup() {

        const cart = useCartStore();
        return {


        };
    },
});
</script>


