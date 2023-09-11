<template>
    <section>
        <div class="div" style="margin-left: 86px;padding-top: 17px;">
            <a-breadcrumb>
                <a-breadcrumb-item>Home</a-breadcrumb-item>
                <a-breadcrumb-item> <router-link :to="{ name: 'cart' }"> Cart </router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    <span style="color: blue;"> Checkout </span>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <form @submit.prevent="checkout()" @input="clearError()">
            <a-card style="width: 90%; margin-left: 70px;margin-top: 11px;">
                <div class="thongtin" style="margin-left: 77px; margin-right: 77px;">
                    <h3 style="font-size: 23px;">Thanh toán và giao hàng</h3>

                    <div class="row mb-4 mt-3">
                        <div class="col-sm-4">
                            <span>(*) </span>
                            <span> Họ và tên</span>
                            <a-input v-model:value="name" placeholder="Họ tên" />
                            <div class="w-100"></div>
                            <small v-if="errors.name" class="text-danger"> {{ errors.name[0] }}</small>
                        </div>

                        <div class="col-sm-4">
                            <span>(*) </span>
                            <span> Số điện thoại </span>
                            <a-input v-model:value="phoneNumber" placeholder="SĐT" />
                            <div class="w-100"></div>
                            <small v-if="errors.phoneNumber" class="text-danger"> {{ errors.phoneNumber[0] }}</small>
                        </div>
                    </div>
                    <div class="col mb-4">
                        <span>(*) </span>
                        <span>Email </span>
                        <a-textarea v-model:value="email" placeholder="Vui lòng nhập email" :rows="1" />
                        <div class="w-100"></div>
                        <small v-if="errors.email" class="text-danger"> {{ errors.email[0] }}</small>
                    </div>
                    <div class="col mb-4">
                        <span>(*) </span>
                        <span> Địa chỉ nhận hàng </span>
                        <a-textarea v-model:value="address" placeholder="VD: Số nhà 14 ngách 63 Tân Triều Thanh Trì Hà Nội"
                            :rows="1" />
                        <div class="w-100"></div>
                        <small v-if="errors.address" class="text-danger"> {{ errors.address[0] }}</small>
                    </div>
                    <div class="row mb-4">
                        <div class="col-sm-4">
                            <span>(*) </span>
                            <span> Chọn tỉnh/ Thành phố </span>
                            <a-select v-model:value="city" show-search placeholder="Chọn tỉnh/ Thành phố"
                                style="width: 100%" :options="cityData" :filter-option="filterOption">
                            </a-select>
                            <div class="w-100"></div>
                            <small v-if="errors.city" class="text-danger"> {{ errors.city[0] }}</small>
                        </div>

                        <div class="col-sm-4">
                            <span>(*) </span>
                            <span> Chọn Huyện/Quận </span>
                            <a-select v-model:value="district" show-search placeholder="Danh mục cha" style="width: 100%"
                                :options="filteredDistrict" :filter-option="filterOption">
                            </a-select>
                            <div class="w-100"></div>
                            <small v-if="errors.district" class="text-danger"> {{ errors.district[0] }}</small>
                        </div>


                        <div class="col-sm-4">
                            <span>(*) </span>
                            <span> Chọn xã / phường </span>
                            <a-select v-model:value="ward" show-search placeholder="Danh mục cha" style="width: 100%"
                                :options="filteredWard" :filter-option="filterOption" @change="changeWard(ward)">
                            </a-select>
                            <div class="w-100"></div>
                            <small v-if="errors.ward" class="text-danger"> {{ errors.ward[0] }}</small>
                        </div>
                    </div>
                    <h3 style="font-size: 23px;">Thông tin bổ xung </h3>

                    <div class="col mb-4">
                        <span>(*) </span>
                        <span> Ghi chú chi tiết đơn hàng </span>
                        <a-textarea v-model:value="addressDetail"
                            placeholder="Thông tin về thời gian nhận hàng chi tiết. VD : sáng , giao ngoài ruộng"
                            :rows="3" />
                        <div class="w-100"></div>
                        <small v-if="errors.addressDetail" class="text-danger"> {{ errors.addressDetail[0] }}</small>
                    </div>

                    <span>(*) Lưu ý phí ship không trong vùng ship của shop sẽ mặc định 50.000đ</span>


                    <div class="div mt-2"
                        style=" width: 90%; border: 0.5px Dashed blue ; background-color: rgb(9, 246, 234); padding: 50px; margin-left: 60px; margin-bottom: 20px;">


                        <h3 style="font-size: 23px; text-align: center;"> Đơn hàng của bạn</h3>

                        <div class="detai-product" v-for="product in cartStore.products" :key="product.id">
                            <span style="order: -1; margin-right: 15px;"> X </span>
                            <a-avatar shape="square" :size="64">
                                <template #icon>
                                    <UserOutlined />
                                </template>
                            </a-avatar>
                            <span style="margin-left: 15px;">{{ product.name }} X {{ product.quantity }} </span>
                            <span style=" margin-left: auto;"> {{ formatCurrency(product.quantity * product.price) }}</span>
                        </div>
                        <br>
                        <!-- <div class="col detail-total">
                        <span>Tạm tính : </span>
                        <span>{{ formatCurrency(product.quantity * product.price) }}</span>
                    </div> -->
                        <br>

                        <div class="col detail-total">
                            <span>Khuyến mãi : </span>
                            <span>0</span>
                        </div>
                        <br>

                        <div class="col detail-total">
                            <span>Voucher : </span>
                            <span>{{ formatCurrency(voucher) }}</span>
                        </div>
                        <br>

                        <div class="col detail-total">
                            <span>Phí ship : </span>
                            <span>{{ formatCurrency(ship) }}</span>
                        </div>
                        <br>

                        <div class="col detail-total">
                            <span>Tổng : </span>
                            <span>{{ formatCurrency(total - voucher + ship) }}</span>
                        </div>
                        <br>
                        <div class="col">
                            <a-radio-group v-model:value="transaction">
                                <a-radio :style="radioStyle" :value="1">Thanh toán khi nhận hàng</a-radio>
                                <a-radio :style="radioStyle" :value="2">Thanh toán banking</a-radio>
                            </a-radio-group>
                            <div class="w-100"></div>
                            <small v-if="errors.transaction" class="text-danger"> {{ errors.transaction[0] }}</small>
                        </div>
                    </div>

                    <div class="col">
                        <a-button html-type="submit">
                            Đặt hàng
                        </a-button>
                    </div>
                </div>

            </a-card>
        </form>

    </section>
</template>
<script>

import { defineComponent, ref, reactive, toRefs, computed, watch } from 'vue';
// import { axiosWithDifferentBaseURL } from '../../../axios';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons-vue';
import { useCartStore } from '../../../store/use-cart';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { notification } from 'ant-design-vue';



const host = "https://provinces.open-api.vn/api/";



export default defineComponent({
    components: {
        UserOutlined
    },
    setup() {
        const route = useRoute();
        const transaction = ref();
        const ship = ref(0);
        const voucher = ref(0);
        const storeCart = useCartStore();
        const idVoucher = route.params.idVoucher
        const router = useRouter();

        const formatCurrency = (price) => {
            return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }

        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const total = computed(() => {
            return cartStore.products.reduce((acc, product) => {
                return acc + product.price * product.quantity;
            }, 0);
        });

        const cityData = ref([]);
        const districtData = ref([]);
        const wardData = ref([]);

        const wardfee = ref([]);
        const coupons = ref([]);
        const getData = () => {
            axios.get('api/ships/create').then((res) => {
                // console.log(res);
                for (const st of res.data.city) {
                    cityData.value.push({
                        value: st.matp,
                        label: st.name
                    })
                }

                for (const st of res.data.district) {
                    districtData.value.push({
                        value: st.maqh,
                        label: st.name,
                        code: st.matp
                    })
                }

                for (const st of res.data.ward) {
                    wardData.value.push({
                        value: st.xaid,
                        label: st.name,
                        code: st.maqh
                    })
                }

            })

            axios.get('api/ships').then((res) => {
                for (const m of res.data.ship) {
                    wardfee.value.push({
                        ward_id: m.ward,
                        price: m.fee_ship
                    })
                }
            })
            axios.get('api/user/coupon/index').then((res) => {

                const voucherUse = res.data.coupons.find(m => m.id === parseInt(route.params.idVoucher))
                if (voucherUse) {
                    voucher.value = voucherUse.coupons.price_coupon
                }

            })
        }

        const city = ref('')
        const district = ref('')
        const ward = ref('')

        const filteredDistrict = computed(() => {
            return districtData.value.filter(h => h.code === city.value);
        });
        const filteredWard = computed(() => {
            return wardData.value.filter(h => h.code === district.value);
        });


        const cartStore = useCartStore();
        const radioStyle = reactive({
            display: 'flex',
            height: '30px',
            lineHeight: '30px',
        });


        const dataCheckOut = reactive({
            name: '',
            phoneNumber: '',
            email: '',
            address: '',
            addressDetail: '',
            total,
            transaction,
            city,
            district,
            ward,
            ship,
            voucher,
            idVoucher,
            cartStore,

        })

        const errors = ref([])

        const clearError = () => {

            errors.value.name = ''
            errors.value.phoneNumber = ''
            errors.value.email = ''
            errors.value.address = ''
            errors.value.city = ''
            errors.value.district = ''
            errors.value.ward = ''
            errors.value.addressDetail = ''
            errors.value.transaction = ''

        }


        const checkout = () => {

            Swal.fire({
                title: 'Xác nhận đặt đơn hàng',
                showDenyButton: true,
                confirmButtonText: 'Đồng ý',
                denyButtonText: `Quay lại`,
            }).then((result) => {

                if (result.isConfirmed) {
                    axios.post('api/cart/checkout', dataCheckOut).then((res) => {
                        if(res.data.code === 3){
                            Swal.fire(res.data.message , '', 'Thành công') 
                            storeCart.clearCart();
                            router.push({name: 'cart-comple'})
                        }

                    }).catch((error) => {
                        errors.value = error.response.data.errors;
                        if (error) {
                            notification.open({
                                message: 'Thất bại',
                                description: 'Vui lòng thử lại hãy nhập đầy đủ thông tin'
                            });
                        }
                    })
                }
            })


        }


        const changeWard = (ward) => {
            const find = wardfee.value.find(m => m.ward_id === parseInt(ward))
            if (find) {
                ship.value = find.price
            } else {
                ship.value = 50000
            }
        }

        getData()


        return {
            clearError,
            errors,
            wardfee,
            changeWard,
            voucher,
            cityData,
            districtData,
            wardData,
            city,
            district,
            ward,
            districtData,
            wardData,
            filterOption,
            radioStyle,
            cartStore,
            filteredDistrict,
            filteredWard,
            formatCurrency,
            total,
            ship,
            checkout,
            ...toRefs(dataCheckOut),
            coupons,
            transaction


        };
    },
});
</script>

<style>
.detai-product {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.detail-total {
    display: flex;
    justify-content: space-between;
}

.select-danger {
    border: solid red;
}

.input-danger {
    border: solid red;
}
</style>