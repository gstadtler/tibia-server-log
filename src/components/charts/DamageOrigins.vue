<script lang="ts">
import { Pie } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
  components: {
    Pie,
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
      labels: this.$props.labels,
      datasets: [{ 
        label: 'Total Damage', 
        data: this.$props.value,
        backgroundColor: [
          '#7fc6a4',
          '#564d65',
        ],
      }]
    }
  }
}
</script>

<template>
  <Pie v-if="chartData" id="pie-chart" :options="chartOptions" :data="chartData" />
</template>

