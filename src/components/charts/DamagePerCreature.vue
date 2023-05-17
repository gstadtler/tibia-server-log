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
        label: 'Total Damage per Creature', 
        data: this.$props.value?.map((element) => element),
        backgroundColor: '#C3041E',
      }]
    }
  }
}
</script>

<template>
  <Bar v-if="chartData" id="line-chart" :options="chartOptions" :data="chartData" />
</template>

