<template>
    <a-card title="Chi tiết đơn hàng" style="width: 90%;">
        <div class="d-flex justify-content-between align-items-center">
            <div class="div " style="margin-right: 20px;">
                <a-button>Xuất PDF</a-button>

            </div>

            <div class="div">
                <span>Đơn hàng: {{ order.code_zip }} </span>
            </div>
            <div class="div-status" style="margin-left: auto;" v-if="order.status_order == 1">
                <span>Trạng thái: </span>
                <a-switch v-model:checked="checkedOrder" @change="changeOrder()" />
            </div>
            <div class="div-status" style="margin-left: auto;" v-if="order.status_order == 2">
                <h4>Đơn hàng đã được kiểm duyệt </h4>
            </div>
        </div>
    </a-card>

    <a-card style="width: 90%; background-color: antiquewhite;">
        <div class="row">
            <div class="col-sm-4">
                <h3>Thông tin khách hàng</h3>
                <p>{{ order.name }} </p>
                <p>Điện thoại: {{ order.phoneNumber }}</p>
                <p>Email: {{ order.email }}</p>
                <p>Địa chỉ: {{ order.address }} <br> {{ ward }} - {{ district }} - {{ city }}</p>
                <p>Ghi chú : {{ order.addressDetail }}</p>
            </div>
            <div class="col-sm-4">
                <h3>Hình thức thanh toán</h3>
                <p>Vận chuyển : </p>
                <p>Thanh toán : </p>
            </div>
            <div class="col-sm-4">
                <h3>Ngày đặt hàng</h3>
                <p>{{ order.created_at }}</p>
            </div>
        </div>
    </a-card>
    <a-card style="width: 90%;">
        <a-table :dataSource="products" :columns="columns" :pagination=false>

            <template #bodyCell="{ column, index, record }">

                <template v-if="column.key === 'index'">
                    <span>{{ index + 1 }}</span>
                </template>

                <template v-if="column.key === 'product_id'">
                    {{ findProduct(product, record.product_id) }}
                </template>
                <template v-if="column.key === 'size'">
                    {{ findProduct(size, record.size) }}
                </template>
                <template v-if="column.key === 'color'">
                    {{ findProduct(color, record.color) }}
                </template>


                <template v-if="column.key === 'price'">
                    <span>{{ formatCurrency(record.price) }}</span>
                </template>


            </template>

        </a-table>
    </a-card>

    <div class="div">
        <div class="row mt-4" style="display: flex; justify-content: end;">
            <a-card style="width: 500px; margin-right: 100px; font-size: 17px; background-color: antiquewhite;">
                <h5>Tổng tiền hàng: <span> {{ total }} </span></h5>
                <h5>Giảm giá sản phẩm: <span> </span></h5>
                <h5>Giảm giá coupon: -{{ voucher }} <span> </span></h5>
                <h5>Phí vận chuyển: <span> {{ ship }} </span></h5>
                <hr>
                <h5>Tổng tiền hàng: <span> {{ bill }} </span></h5>
            </a-card>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useMenu } from '../../../store/use-menu.js';
import axios from 'axios';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';


export default {
    setup() {
        useMenu().onSlectedKeys(['admin-orders']);

        const columns = [
            {
                title: '#',
                dataIndex: '',
                key: 'index',
                width: '10%'
            },
            {
                title: 'Sản phẩm',
                dataIndex: 'product_id',
                key: 'product_id',
            },

            {
                title: 'Số lượng',
                dataIndex: 'quantity',
                key: 'quantity',
            },

            {
                title: 'Size',
                dataIndex: 'size',
                key: 'size',
            },

            {
                title: 'Màu',
                dataIndex: 'color',
                key: 'color',
            },

            {
                title: 'Giá',
                dataIndex: 'price',
                key: 'price',
            },

        ];

        const checkedOrder = ref(false);

        const order = ref([])
        const city = ref([])
        const ward = ref([])
        const district = ref()
        const route = useRoute();
        const products = ref([]);
        const product = ref([]);
        const size = ref([]);
        const color = ref([]);
        const total = ref();
        const voucher = ref();
        const ship = ref();
        const bill = ref();

        const getData = () => {
            axios.get(`api/order/preview/${route.params.id}`).then((res) => {

                order.value = res.data.order
                products.value = res.data.order.order_products
                const cityArrOj = res.data.city.find(m => m.matp == res.data.order.city)
                const wardArrOj = res.data.ward.find(m => m.xaid == res.data.order.ward)
                const districtOj = res.data.district.find(m => m.maqh == res.data.order.district)
                city.value = cityArrOj.name
                ward.value = wardArrOj.name
                district.value = districtOj.name
                product.value = res.data.product
                size.value = res.data.size
                color.value = res.data.color
                total.value = formatCurrency(order.value.total)
                ship.value = formatCurrency(order.value.ship)
                voucher.value = formatCurrency(order.value.voucher)
                bill.value = formatCurrency(order.value.total - order.value.voucher + order.value.ship)
            })
        }

        const formatCurrency = (price) => {
            return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }

        const findProduct = (Arr, id) => {
            const foundItem = Arr.find(item => item.id === id);
            return foundItem.name
        }

        const changeOrder = () => {
            Swal.fire({
                title: 'Xác nhận phê duyệt đơn hàng',
                showDenyButton: true,
                confirmButtonText: 'Xác nhận',
                denyButtonText: `Quay lại`,
            }).then((result) => {
                if (result.isConfirmed) {
                    if (checkedOrder.value) {
                        axios.post(`api/order/updateStatus/${route.params.id}`).then((res) => { })
                        // location.reload(); 
                        setTimeout(() => {
                            location.reload(); 
                        }, 3000);
                    }
                } else {
                    checkedOrder.value = false
                }
            })


        }

        getData();
        return {

            columns,
            order,
            city,
            ward,
            district,
            products,
            formatCurrency,
            product,
            findProduct,
            size,
            color,
            total,
            voucher,
            ship,
            bill,
            checkedOrder,
            changeOrder

        }


    },
}

</script>