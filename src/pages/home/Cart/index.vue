<template>
    <section>
        <div class="div" style="margin-left: 86px;padding-top: 17px;">
            <a-breadcrumb>
                <a-breadcrumb-item>Home</a-breadcrumb-item>
                <a-breadcrumb-item><a href="">Cart</a></a-breadcrumb-item>
            </a-breadcrumb>
        </div>

        <a-card style="width: 90%; margin-left: 70px;margin-top: 11px;  ">

            <a-table :columns="columns" :data-source="cart.products" :pagination=false>
                <template #headerCell="{ column }">

                </template>

                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'total'">
                        <span>{{ formatCurrency(record.quantity * record.price) }}</span>
                    </template>
                    <template v-if="column.key === 'price'">
                        <span>{{ formatCurrency(record.price) }}</span>
                    </template>

                    <template v-if="column.key === 'action'">
                        <span style="cursor: pointer;;" @click="removeFromCart(record.id)"> Xóa</span>
                    </template>

                    <template v-if="column.key === 'quantity'">
                        <div>
                            <a-input-number id="inputNumber" v-model:value="record.quantity" :min="1" :max="10"
                                @change="updateQuantity(record.id)">
                                <template #upIcon>
                                    <ArrowUpOutlined />
                                </template>
                                <template #downIcon>
                                    <ArrowDownOutlined />
                                </template>
                            </a-input-number>
                        </div>
                    </template>

                </template>
            </a-table>
        </a-card>
        <br>
        <hr>

        <div class="row mt-4">
            <div class="col-sm-6">
            </div>
            <div class="col-sm-6 mr-2" style="">
                <p>Tổng tiền hàng: <span>{{ formatCurrency(total) }} </span></p>
                <p>Giảm giá sản phẩm: <span>{{ formatCurrency(giamgia) }} </span></p>
                <p>Giảm giá coupon: <span>{{ formatCurrency(voucher) }} </span></p>
                <p>Phí vận chuyển: <span>{{ formatCurrency(ship) }} </span></p>
                <hr>
                <p>Tổng tiền hàng: <span>{{ formatCurrency(total + giamgia + voucher + ship) }} </span></p>

            </div>
        </div>

       <InfoGuest />


    </section>
</template>
<script>
import { SmileOutlined, DownOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import { useCartStore } from '../../../store/use-cart';
import { computed } from 'vue';
import InfoGuest from './infoGuest.vue';


const columns = [{
    title: 'Sản phẩm',
    dataIndex: 'name',
    key: 'name',
    width: '40%'
}, {
    title: 'Đơn giá',
    dataIndex: 'price',
    key: 'price',
    width: '15%'
}, {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
    width: '15%'
}, {
    title: 'Tổng tiền',
    key: 'total',
    dataIndex: 'total',
    width: '15%'
}, {
    title: 'Thao tác',
    key: 'action',
    width: '15%'
}];
const data = [{

}];
export default defineComponent({
    components: {
    SmileOutlined,
    DownOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    InfoGuest
},
    setup() {

        const cart = useCartStore();

        const formatCurrency = (price) => {
            return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }
        const total = computed(() => {
            return cart.products.reduce((acc, product) => {
                return acc + product.price * product.quantity;
            }, 0);
        });

        const ship = 12000;
        const giamgia = 0;
        const voucher = 0;

        const updateQuantity = (productId) => {
            const product = cart.products.find(p => p.id === productId);
            if (product) {
                cart.updateProductQuantity(productId, product.qty);
            }
        };

        const removeFromCart = (productId) => {
            cart.removeFromCart(productId);
        };

        return {
            data,
            columns,
            cart,
            formatCurrency,
            total,
            ship,
            giamgia,
            voucher,
            updateQuantity,
            removeFromCart

        };
    },
});
</script>