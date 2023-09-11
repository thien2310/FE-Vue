<template>
    <a-card title="Mã giảm giá của tôi" :bordered="false" style="width: 100% ,">

        <div class="row d-flex justify-content-space-between align-items-center">
            <div class="col-12 d-flex align-items-center flex-direction-column ">

                <span style="width: 20%">Mã Voucher : </span>
                <a-input style="width: 60% ; margin-right: 20px;" v-model:value="coupon_code"
                    placeholder="Nhập mã voucher tại đây "></a-input>
                <a-button style="width: 15%;" @click="handVoucher">LƯU</a-button>

            </div>
        </div>
        <br>
        <br>
        <div class="row">
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="Voucher của tôi">
                    <a-list>
                        <div class="row">
                            <div class="col-md-6" v-for="m of coupons">
                                <a-card style="width: 100%">
                                    <div class="d-flex align-items-center flex-direction-column">
                                        <i class="fa-solid fa-ticket fa-xl " style="width: 10%;"></i>
                                        <div style="width: 60%;">
                                            <h3>{{ m.coupons.name }}</h3>
                                            <p>Trị giá: {{ formatCurrency(m.coupons.price_coupon) }}</p>
                                            <p>Mã voucher: {{ m.coupons.coupon_code }}</p>
                                        </div>
                                        <a-button style="width: 30%;"> Dùng ngay</a-button>
                                    </div>
                                </a-card>
                            </div>
                        </div>
                    </a-list>
                </a-tab-pane>
                <a-tab-pane key="2" tab="Nhận Voucher" force-render>
                    Voucher mới sẽ được cập nhật tại đây
                </a-tab-pane>

            </a-tabs>
        </div>



    </a-card>
</template>


<script>
import axios from 'axios';
import { useMenu } from '../../../store/use-menu.js';
import { defineComponent, ref } from 'vue';
import { notification } from 'ant-design-vue';
export default defineComponent({
    setup() {
        useMenu().onSlectedKeys(['profile-coupons'])
        activeKey: ref('1')
        const coupons = ref([])
        const getData = () => {
            axios.get('api/user/coupon/index').then((res) => {
                coupons.value = res.data.coupons
            })
        }
        const formatCurrency = (price) => {
            return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }
        const coupon_code = ref('');

        const handVoucher = () => {
            axios.post('api/user/coupon/findcode', { coupon_code: coupon_code.value }).then((res) => {
                if (res.data.code === 4) {
                    notification.open({
                        message: 'Thất bại',
                        description: res.data.message,
                        class: 'notification-custom-class',
                    });
                }
                if (res.data.code === 3) {
                    notification.open({
                        message: 'Thành công',
                        description: res.data.message,
                        class: 'notification-custom-class',
                    });
                }

            })
        }


        getData();

        return {
            handVoucher,
            coupons,
            formatCurrency,
            coupon_code
        }

    },
})

</script>