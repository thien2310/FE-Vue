<template>
    <form @submit.prevent="create()">
        <a-card title="Thêm mới danh mục" style="width: 100%">

            <div class="row mb-3">
                <div class="col-12 text-start mb-2">
                    <label for="">
                        <span class="text-danger me-1">*</span>
                        <span> Chọn tỉnh/ Thành phố </span>
                    </label>
                </div>

                <div class="col-12 ">
                    <a-select v-model:value="city" show-search placeholder="Chọn tỉnh/ Thành phố" style="width: 100%"
                        :options="cityData" :filter-option="filterOption">
                    </a-select>
                    <div class="w-100"></div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-12 text-start mb-2">
                    <label for="">
                        <span class="text-danger me-1">*</span>
                        <span> Chọn Huyện/Quận </span>
                    </label>
                </div>

                <div class="col-12 ">
                    <a-select v-model:value="district" show-search placeholder="Danh mục cha" style="width: 100%"
                        :options="filteredDistrict" :filter-option="filterOption">
                    </a-select>
                    <div class="w-100"></div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-12 text-start mb-2">
                    <label for="">
                        <span class="text-danger me-1">*</span>
                        <span> Chọn xã / phường </span>
                    </label>
                </div>

                <div class="col-12 ">
                    <a-select v-model:value="ward" show-search placeholder="Danh mục cha" style="width: 100%"
                        :options="filteredWard" :filter-option="filterOption">
                    </a-select>
                    <div class="w-100"></div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-12 text-start mb-2">
                    <label for="">
                        <span class="text-danger me-1">*</span>
                        <span> Phí vận chuyển </span>
                    </label>
                </div>

                <div class="col-12 ">
                    <a-input v-model:value="shippingFee" show-search placeholder="Nhập phí vận chuyển" style="width: 100%">
                    </a-input>
                    <div class="w-100"></div>
                </div>
            </div>




            <div class="row">
                <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
                    <a-button type="primary" ghost class="me-0 me-sm-2 mb-3 mb-sm-0" html-type="submit">Lưu</a-button>
                    <a-button type="primary" danger ghost>
                        <router-link :to="{ name: 'admin-ships' }">
                            <span>Hủy</span>
                        </router-link>
                    </a-button>
                </div>

            </div>


        </a-card>
    </form>
</template>
<script>
import { defineComponent, ref, computed,reactive , toRefs } from 'vue';
import { useMenu } from '../../../store/use-menu.js';
import axios from 'axios';
export default defineComponent({
    setup() {
        useMenu().onSlectedKeys(['admin-ships']);
        const cityData = ref([]);
        const districtData = ref([]);
        const wardData = ref([]);
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
        }
        // console.log(cityData);
        const city = ref('')
        const district = ref('')
        const ward = ref('')

        const filteredDistrict = computed(() => {
            return districtData.value.filter(h => h.code === city.value);
        });
        const filteredWard = computed(() => {
            return wardData.value.filter(h => h.code === district.value);
        });

        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const Senddata = reactive({
           city,
           district,
           ward,
           shippingFee: ''
        });

        const create = () => {
            axios.post('api/ships/create/store', Senddata).then((res) => {
                console.log(res);
            })
        }

        getData();

        return {
            cityData,
            filteredDistrict,
            city,
            district,
            ward,
            districtData,
            wardData,
            filteredWard,
            filterOption,
            create,
            ...toRefs(Senddata)

        }

    }
})
</script>