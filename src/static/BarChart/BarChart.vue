<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios';
import { ref, onMounted } from 'vue';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },

  setup() {
    const labels = ref([])
    const data = ref([]);
    const data2 = ref([]);
    const chartData = ref({
      labels: [],
      datasets: [
        {
          label: 'Doanh thu',
          data: [],
          backgroundColor: '#ff0000',
        },
      ],
    })
    const chartOptions = ref({
      responsive: true
    })
    const getData = () => {
      axios.get('api/staticical').then((res) => {

        labels.value = res.data.staticsical.map((i) => i.order_date);
        data.value = res.data.staticsical.map((i) => i.sales);
        data2.value = res.data.staticsical.map((i) => i.profit);
        chartData.value = {
          labels: labels.value,
          datasets: [
            {
              label: 'Doanh thu', // 
              data: data.value,
              backgroundColor: '#ff0000',
            },
            {
              label: 'lợi nhuận', // 
              data: data2.value,
              backgroundColor: '#808000',
            },
          ],
        }
      })
    }
    onMounted(() => {
      getData();
    });


    return {
      chartData,
      chartOptions
    }
  }


}


</script>