<template>
    <div class="row" style="padding: 1rem; background-color: #7fffd4; ">
        <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
            <span @click="showDrawer()"><i class="fa-solid fa-bars"></i></span>
        </div>

        <div class="col-8 col-sm-1 d-flex align-items-center justify-content-center justify-content-sm-start">
            <span class="d-sm-flex ">

                <router-link :to="{ name: 'home' }" @click="selectHome" style="text-decoration: none;">
                    <span>
                        SHOPNICE
                    </span>
                </router-link>

            </span>
        </div>

        <div class="col-sm-7 d-sm-flex align-items-center justify-content-around d-none">
            <TheCategory />
        </div>


        <div class="col-sm-2 d-sm-flex align-items-center justify-content-sm-end d-none">
            <span @click="" m-2> <i class="fa-solid fa-magnifying-glass"></i> </span>
        </div>
        <div class="col-sm-2  d-sm-flex align-items justify-content-sm-end d-none">
            <router-link :to="{ name: 'profile-index' }" @click="selectProfile">
                <span style="cursor: pointer ;" class="me-3"> <i class="fa-regular fa-user fa-lg"></i> </span>
            </router-link>

            <span @click="showCart('default')" style="cursor: pointer ; " class="me-3">
                <a-badge :count="count" style="" :number-style="{
                    backgroundColor: '#fff',
                    color: '#999',
                    boxShadow: '0 0 0 1px #d9d9d9 inset',
                }">
                    <i class="fa-solid fa-cart-shopping fa-xl "></i>
                </a-badge>
            </span>


        </div>

        <div class="col-1 d-flex d-sm-none align-items-center justify-content-center m-sm-">

            <span @click=""> <i class="fa-regular fa-user"></i> </span>

        </div>

        <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
            <span @click=""> <i class="fa-solid fa-magnifying-glass"></i> </span>
        </div>
        <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
            <span @click=""> <i class="fa-solid fa-cart-shopping"></i> </span>
        </div>
    </div>


    <a-drawer v-model:visible="open" title="DANH MUC">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-drawer>

    <a-drawer :size="size" :visible="visible" @close="onClose">

        <div class="row mb-2" v-for="product in cart.products" :key="product.id">
            <div class="col-sm-4">
                <a-avatar shape="square" :size="75">
                    <template #icon>
                        <img :src="'http://127.0.0.1:8000' + product.image.path" alt="">
                    </template>
                </a-avatar>
            </div>
            <div class="col-sm-8">
                <p><span>{{ product.name }}</span></p>
                <p><span>Màu sắc: {{ getNameById(product.colors,product.color) }}</span></p>
                <p><span>Kích cỡ: {{ getNameById(product.sizes,product.size) }}</span></p>
                <p><span>{{ product.quantity }}</span> x <span class="me-5"> {{ formatCurrency(product.price) }}</span>
                    <span class="d-flex justify-content-end" style="cursor: pointer ;" @click="removeFromCart(product.id)">
                        <i class="fa-solid fa-xmark fa-xl "></i> </span>
                </p>
            </div>
            <hr>
        </div>



        <div class="row" v-if="cart.products.length > 0">
            <h1 style="text-align: center;">Tạm tính : <span> {{ formatCurrency(total) }}</span></h1>
        </div>
        <hr v-if="cart.products.length > 0">
        <div class="row" v-if="cart.products.length > 0">
            <router-link :to="{ name: 'cart' }">
                <a-button style="width: 100%; height: 40px;" @click="closeCart">Xem giỏ hàng</a-button>
            </router-link>
        </div>

        <div class="row" v-else>
            <h1>Bạn chưa có sản phẩm nào trong giỏ hàng</h1>
            <a-button style="width: 100%; height: 40px;" @click="closeCart">Tiếp tục mua sắm</a-button>
        </div>


        <template #extra>
            <h2>GIỎ HÀNG</h2>
        </template>
    </a-drawer>
</template>

<script >
import { defineComponent, ref } from 'vue';
import TheCategory from '../Shop/TheCategory.vue'
import { useCartStore } from '../../store/use-cart';
import { computed } from 'vue';
import { useMenu } from '../../store/use-menu';


export default defineComponent({
    components: {
        TheCategory

    },
    setup() {
        const store = useMenu();
        const selectHome = () => {
            store.onSlectedKeys(['home']);
            store.onOpenKeys(['home'])
        }
        const selectProfile = () => {
            store.onSlectedKeys(['profileUser']);
            store.onOpenKeys(['profileUser'])
        }


        const cart = useCartStore();
        const visible = ref(false);
        const size = ref('default');
        const showCart = val => {
            size.value = val;
            visible.value = true;
        };
        const onClose = () => {
            visible.value = false;
        };

        const closeCart = () => {
            visible.value = false;
        }
        const open = ref(false);

        const showDrawer = () => {
            open.value = true;
        }

        const total = computed(() => {
            return cart.products.reduce((acc, product) => {
                return acc + product.price * product.quantity;
            }, 0);
        });


        const count = computed(() => {
            return cart.products.reduce((acc, product) => {
                return acc + product.quantity;
            }, 0);
        });

        const getNameById = (Colors, Color) => {

            const foundColor = Colors.find(m => m.id === Color);
            return foundColor ? foundColor.name : null;
        }


        const removeFromCart = (productId) => {
            cart.removeFromCart(productId);
        };

        const formatCurrency = (price) => {
            return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }

        return {

            getNameById,
            open,
            showDrawer,
            visible,
            size,
            onClose,
            showCart,
            cart,
            total,
            formatCurrency,
            removeFromCart,
            closeCart,
            count,
            selectHome,
            selectProfile

        };
    },
});

</script>

<style>
/* Màu sắc mặc định khi không hover */
.router-link-active {


    color: blue;
    /* Hoặc màu gì đó bạn muốn */
}

/* Màu sắc khi hover */
.router-link-active:hover {
    color: black;
    /* Màu sắc khi hover */
}
</style>