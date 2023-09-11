<template>
    <section>
        <div class="div" style="margin-left: 86px;padding-top: 17px;">
            <a-breadcrumb>
                <a-breadcrumb-item>Home</a-breadcrumb-item>
                <a-breadcrumb-item><span style="color: blue;">Cart</span></a-breadcrumb-item>
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
        <div class="row">
            <a-card>
                <div class="d-flex justify-content-between">
                    <h3>Voucher của bạn</h3>
                    <a style="border-radius: none;" @click="showModal">Chọn Voucher</a>
                </div>

                <a-modal style="max-height: 500px; overflow-y: auto;" v-model:visible="visible" title="Chọn mã giảm giá"
                    @ok="handleOk">
                    <a-list>
                        <div class="row">
                            <a-radio-group v-model:value="checkedVoucher" v-for="m of coupons">
                                <div class="col-md-12 mt-2">
                                    <a-card style="width: 100%">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <i class="fa-solid fa-ticket fa-xl " style="width: 10%;"></i>
                                            <div style="width: 60%;">
                                                <h3>{{ m.coupons.name }}</h3>
                                                <p>Trị giá: {{ formatCurrency(m.coupons.price_coupon) }}</p>
                                                <p>Mã voucher: {{ m.coupons.coupon_code }}</p>
                                            </div>
                                            <div style="width: 30%; margin-left: auto;">
                                                <a-radio :value="m.id" class="position-absolute end-0"></a-radio>
                                            </div>
                                        </div>
                                    </a-card>
                                </div>
                            </a-radio-group>
                        </div>
                    </a-list>
                </a-modal>
            </a-card>
        </div>

        <div class="row mt-4" style="display: flex; justify-content: end;">

            <a-card title="Tổng thanh toán" style="width: 500px; margin-right: 100px; font-size: 17px; ">
                <h5>Tổng tiền hàng: <span>{{ formatCurrency(total) }} </span></h5>
                <h5>Giảm giá sản phẩm: <span> {{ formatCurrency(khuyenmai) }} </span></h5>
                <h5>Giảm giá coupon: <span> {{ formatCurrency(voucher) }} </span></h5>
                <!-- <h5>Phí vận chuyển: <span>{{ formatCurrency(ship) }} </span></h5> -->
                <hr>
                <h5>Tổng tiền hàng: <span>{{ formatCurrency(total - voucher - khuyenmai) }} </span></h5>

                <router-link :to="{ name: 'checkout', params: { idVoucher: idVoucher } }">
                    <a-button style="width: 100%;">
                        Tiến hành thanh toán
                    </a-button>
                </router-link>
            </a-card>

        </div>


    </section>
</template>
<script>
import { SmileOutlined, DownOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { useCartStore } from '../../../store/use-cart';
import { computed } from 'vue';
import axios from 'axios';



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



        const updateQuantity = (productId) => {
            const product = cart.products.find(p => p.id === productId);
            if (product) {
                cart.updateProductQuantity(productId, product.qty);
            }
        };

        const removeFromCart = (productId) => {
            cart.removeFromCart(productId);
        };
        //showvoucher
        const visible = ref(false);
        const showModal = () => {
            visible.value = true;
        };

        const checkedVoucher = ref()
        const coupons = ref([])
        const getData = () => {
            axios.get('api/user/coupon/index').then((res) => {
                coupons.value = res.data.coupons
            })
        }

        const voucher = ref(0);
        const khuyenmai = ref(0);
        const idVoucher = ref(0);
        const handleOk = () => {
            const voucherUse = coupons.value.find(m => m.id === checkedVoucher.value)
            const priceVoucher = voucherUse.coupons.price_coupon
            const id = voucherUse.id
            voucher.value = priceVoucher;
            idVoucher.value = id;
            visible.value = false;
        };



        getData()

        return {
            idVoucher,
            khuyenmai,
            voucher,
            checkedVoucher,
            coupons,
            visible,
            showModal,
            handleOk,
            data,
            columns,
            cart,
            formatCurrency,
            total,
            updateQuantity,
            removeFromCart

        };
    },
});
</script>


