<script lang="ts">
import axios from 'axios'
import type { Stats } from '@/types'

import { Bar } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: {
    Bar,
  },
  data() {
    return {
      stats: {} as Stats,
      chartData: {
        labels: ['Dragon', 'Black Knight', 'Scorpion'],
        datasets: [{ data: [190, 20, 98] }]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  async created() {
    const baseUrl  = "http://localhost:3333"
    const { data } = await axios.get(`${baseUrl}/stats`)
    this.stats = data
  }
}
</script>

<template>
  <Bar id="line-chart" :options="chartOptions" :data="chartData" />
</template>
