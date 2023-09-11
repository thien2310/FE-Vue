<template>
    <a-card title="Thống kê số liệu">
        <div class="row">
            <div class="col-sm-6">
                <span>Từ ngày </span>
                <a-date-picker v-model:value="startDate" :format="dateFormatList" style="width: 100%; margin-top: 5px;" />
            </div>
            <div class="col-sm-6">
                <span>Đến ngày</span>
                <a-date-picker v-model:value="endDate" :format="dateFormatList" style="width: 100%; margin-top: 5px;" />
            </div>
        </div>
        <div class="row">
            <a-button style="width: 100px; margin-top: 10px; margin-left: 30px;" @click="fitterDate">Lọc kết quả</a-button>
            <a-button style="width: 100px; margin-top: 10px; margin-left: 30px;"> <i
                    class="fa-solid fa-rotate-right me-2"></i> Tải lại</a-button>
        </div>

        <div class="row">
            <BarChart />
        </div>

    </a-card>
</template>


<script>
import { useMenu } from '../../../store/use-menu.js';
import BarChart from '../../../static/BarChart/BarChart.vue'
import dayjs from 'dayjs';
import { ref } from 'vue';
export default {

    components: {
        BarChart
    },

    setup() {
        useMenu().onSlectedKeys(['admin-staticical']);
        const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
        const startDate = ref();
        const endDate = ref();

        const fitterDate = () => {
            console.log(startDate.value.format('DD/MM/YYYY'))
        }

        

        return {
            dateFormatList,
            fitterDate,
            startDate,
            endDate
        }

    },
}

</script>