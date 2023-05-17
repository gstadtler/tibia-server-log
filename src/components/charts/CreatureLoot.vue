<script lang="ts">
import { Bar } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: {
    Bar,
  },
  props: {
    labels: {
      type: Array as () => string[]
    },
    value: {
      type: Array as () => number[]
    },
  },
  data() {
    return {
      chartData: null as any,
      chartOptions: {
        responsive: true
      }
    }
  },
  beforeUpdate() {
    this.chartData = {
      labels: this.$props.labels?.map((element) => element),
      datasets: [{ 
        label: 'Loot Items Amount', 
        data: this.$props.value,
        backgroundColor: '#75468C',
      }]
    }
  }
}
</script>

<template>
  <Bar v-if="chartData" id="bar-chart" :options="chartOptions" :data="chartData" />
</template>


