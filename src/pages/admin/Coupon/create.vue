<template>
    <form @submit.prevent="create()">
        <a-card title="Thêm mã giảm giá" style="width: 100%">



            <div class="row mb-3">
                <div class="col-12 text-start mb-2">
                    <label for="">
                        <span class="text-danger me-1">*</span>
                        <span> Tên mã giảm giá </span>
                    </label>
                </div>

                <div class="col-12 ">
                    <a-input v-model:value="name" show-search placeholder="Nhập tên mã giảm giá" style="width: 100%">
                    </a-input>
                    <div class="w-100"></div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-12 text-start mb-2">
                    <label for="">
                        <span class="text-danger me-1">*</span>
                        <span> Số lượng mã </span>
                    </label>
                </div>

                <div class="col-12 ">
                    <a-input-number v-model:value="number" show-search placeholder="Nhập số lượng mã" style="width: 100%">
                    </a-input-number>
                    <div class="w-100"></div>
                </div>
            </div>


            <div class="row mb-3">
                <div class="col-12 text-start mb-2">
                    <label for="">
                        <span class="text-danger me-1">*</span>
                        <span> Tính năng của vouchor</span>
                    </label>
                </div>

                <div class="col-12 ">
                    <a-select v-model:value="feature" show-search placeholder="Chọn tính năng" style="width: 100%"
                        :options="option" :filter-option="filterOption">
                    </a-select>
                    <div class="w-100"></div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-12 text-start mb-2">
                    <label for="">
                        <span class="text-danger me-1">*</span>
                        <span> Trị giá voucher hoặc % </span>
                    </label>
                </div>

                <div class="col-12 ">
                    <a-input-number v-model:value="price_coupon" show-search placeholder="Nhập số tiền hoặc %"
                        style="width: 100%">
                    </a-input-number>
                    <div class="w-100"></div>
                </div>
            </div>




            <div class="row">
                <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
                    <a-button type="primary" ghost class="me-0 me-sm-2 mb-3 mb-sm-0" html-type="submit">Lưu</a-button>
                    <a-button type="primary" danger ghost>
                        <router-link :to="{ name: 'admin-coupons' }">
                            <span>Hủy</span>
                        </router-link>
                    </a-button>
                </div>

            </div>


        </a-card>
    </form>
</template>
<script>
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { useMenu } from '../../../store/use-menu.js';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        useMenu().onSlectedKeys(['admin-ships']);

       

        const option = ref([
            {
                value: 1,
                label: 'Giảm giá theo % của sản phẩm'
            },
            {
                value: 2,
                label: 'Giảm theo trị giá của sản phẩm'
            }
        ])
        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const Senddata = reactive({
            name: '',
            number: '',
            feature: '',
            price_coupon: ''

        });
        const router = useRouter();
        const create = () => {
            axios.post('api/coupon/create', Senddata).then((res) => {
                if (res.data.code == 3) {
                    
                    router.push({name: "admin-coupons"})

                    notification.open({
                        message: 'Thông báo',
                        description: res.data.message,
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });

                }
            })
        }

        // getData();

        return {
            option,
            filterOption,
            create,
            ...toRefs(Senddata)

        }

    }
})
</script>