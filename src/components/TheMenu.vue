<template>
    
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="admin-users">
            <router-link :to="{ name: 'admin-users' }">
                <span>
                    <i class="fa-solid fa-user me-1"></i>
                    Tài khoản
                </span>
            </router-link>
        </a-menu-item> 

        <a-menu-item key="admin-category">
            <router-link :to="{ name: 'admin-category' }">
                <span>
                    <i class="fa-solid fa-tag me-1"></i>
                    Quản lý danh mục
                </span>
            </router-link>
        </a-menu-item>

        <a-menu-item key="admin-product">
            <router-link :to="{ name: 'admin-product' }">
                <span>
                    <i class="fa-solid fa-anchor me-1"></i>
                    Quản lý sản phẩm
                </span>
            </router-link>
        </a-menu-item>

        <a-menu-item key="admin-settings">
            <router-link :to="{ name: 'admin-settings' }">
                <span>
                    <i class="fa-solid fa-gear me-1"></i>
                    Settings
                </span>
            </router-link>
        </a-menu-item>
    </a-menu>
    

</template>

<script>

// import { useroutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useMenu } from '../store/use-menu.js';


export default defineComponent({
    // components: {
    //     useroutlined,
    // },
    setup() {
        const store = useMenu();

        return {
            ...storeToRefs(store)

        };
    },
});


</script>