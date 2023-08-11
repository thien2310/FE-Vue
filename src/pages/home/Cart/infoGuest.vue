<template>
    <div class="thongtin" style="margin-left: 77px; margin-right: 77px;">
        <h4>Thông tin vận chuyển</h4>

        <div class="row mb-4 mt-3">
            <div class="col-sm-4">
                <a-input v-model:value="value" placeholder="Họ tên" />
            </div>
            <div class="col-sm-4">
                <a-input v-model:value="value" placeholder="SĐT" />
            </div>
        </div>

        <div class="col mb-4">
            <a-textarea v-model:value="value" placeholder="Địa chỉ nhận hàng" :rows="4" />
        </div>
        <div class="row mb-4">
            <div class="col-sm-4">
                <a-select v-model:value="selectedTinh" :options="tinhtpData" @change="onTinhChange" show-search
                    placeholder="--Chọn Tỉnh--" style="width: 100%" :filter-option="filterOption"></a-select>
            </div>
            <div class="col-sm-4">
                <a-select v-model:value="selectedHuyen" :options="filteredHuyen" show-search
                    placeholder="--Chọn Quận/Huyện--" style="width: 100%" :filter-option="filterOption">
                </a-select>
            </div>
            <div class="col-sm-4">
                <a-select v-model:value="selectedXa" :options="filteredXa" show-search placeholder="--Chọn Xã/Phường--"
                    style="width: 100%" :filter-option="filterOption"></a-select>
            </div>
        </div>

        <div class="col">
            <a-button>
                Đặt hàng
            </a-button>
        </div>
    </div>
</template>
<script>

import { defineComponent, ref, reactive, toRefs, computed, watch } from 'vue';
// import { axiosWithDifferentBaseURL } from '../../../axios';
import axios from 'axios';
const host = "https://provinces.open-api.vn/api/";

export default defineComponent({
    components: {

    },
    setup() {

        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const tinhtpData = ref([
            {
                value: '0',
                label: '--Chọn Tỉnh--',
            },
        ]);

        const quanhuyenData = ref([
            {
                value: '0',
                label: '--Chọn Quận/Huyện--',
                code: '0'
            }
        ])

        const xaphuongData = ref([
            {
                value: '0',
                label: '--Chọn Xã/Phường--',
                code: '0'
            }
        ])

        const getData = () => {
            axios.get('http://localhost:3000/src/Data/quanhuyen.js').then((res) => {
                // console.log(res);
                for (const t of res.data) {
                    tinhtpData.value.push({
                        value: t.code,
                        label: t.name
                    })

                    for (const qh of t.districts) {
                        quanhuyenData.value.push({
                            value: qh.code,
                            label: qh.name,
                            code: qh.province_code
                        })
                    }
                }
            })


            axios.get('http://localhost:3000/src/Data/xaphuong.js').then((res) => {
                // console.log(res)
                for (const t of res.data) {
                    for (const d of t.districts) {
                        for (const c of d.wards) {
                            xaphuongData.value.push({
                                value: c.code,
                                label: c.name,
                                code: d.code
                            })
                        }
                    }
                }
            })

        }




        const selectedTinh = ref(tinhtpData.value[0].value);
        const selectedHuyen = ref(quanhuyenData.value[0].value);
        const selectedXa = ref(xaphuongData.value[0].value);


        const filteredHuyen = computed(() => {
            return quanhuyenData.value.filter(h => h.code === selectedTinh.value);
        });
        const filteredXa = computed(() => {
            return xaphuongData.value.filter(h => h.code === selectedHuyen.value);
        });
        const onTinhChange = () => {
            selectedHuyen.value = filteredHuyen.value[0].value;
        };


        getData();
        return {
            getData,
            tinhtpData,
            quanhuyenData,
            selectedTinh,
            selectedHuyen,
            filteredHuyen,
            onTinhChange,
            xaphuongData,
            selectedXa,
            filteredXa,
            filterOption



        };
    },
});
</script>