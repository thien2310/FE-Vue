

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Drawer, Button, message, List, Menu, Card, Table, Avatar, Select, Input, Checkbox, Popconfirm, Upload, Tree, Modal, Dropdown, Carousel, Breadcrumb, Badge, InputNumber,Radio, Rate , Tabs, Switch, Result, DatePicker } from 'ant-design-vue';
import CKEditor from '@ckeditor/ckeditor5-vue';

import router from './router/index.js'
import App from './App.vue'
import './axios.js'
import editor from '@tinymce/tinymce-vue'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import 'ant-design-vue/dist/reset.css';
import './static/fontawesome/css/all.min.css';

import { useCartStore } from './store/use-cart.js';


const app = createApp(App);

app.use(DatePicker);
app.use(Switch);
app.use(Result);
app.use(Rate);
app.use(Radio);
app.use(Tabs);
app.use(InputNumber);
app.use(Badge);
app.use(Breadcrumb);
app.use(Carousel);
app.use(Dropdown);
app.use(editor);
app.use(Modal);
app.use(Tree);
app.use(CKEditor);
app.use(router);
app.use(List);
app.use(Card);
app.use(Checkbox);
app.use(Table);
app.use(Upload);
app.use(Input);
app.use(Select);
app.use(Avatar);
app.use(Popconfirm);
app.use(createPinia());
app.use(Menu);
app.use(Drawer);
app.use(Button);
app.use(VueSweetalert2);

const cart = useCartStore();
// cart.initializeCart();
// Kiểm tra thời gian hết hạn
const cartLastUpdated = localStorage.getItem('cartLastUpdated');
if (cartLastUpdated) {
    const currentTime = Date.now();
    const expirationTime = parseInt(cartLastUpdated) + 24 * 60 * 60 * 1000; // 1 ngày
    if (currentTime <= expirationTime) {
        cart.initializeCart(); // Khởi tạo giỏ hàng từ localStorage
    } else {
        // Trạng thái giỏ hàng đã hết hạn, xóa dữ liệu
        cart.clearCart();
    }
}

app.mount('#app');

app.config.globalProperties.$message = message;
