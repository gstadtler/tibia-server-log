<script lang="ts">
import type { Log } from '@/types'
import axios from 'axios'
import EventAnimation from '@/components/EventAnimation.vue'

export default {
  components: {
    EventAnimation
  },
  data() {
    return {
      log: [] as Log[],
      show: false,
      logList: [] as Log[]
    }
  },
  async created() {
    const baseUrl  = "http://localhost:3333"
    const { data } = await axios.get(`${baseUrl}/log`)
    this.log = data
    this.renderEventWithDelay()
  },
  methods: {
    renderEventWithDelay() {
      this.log.forEach((item, index) => {
        setTimeout(() => {
          this.logList.unshift(item)
        }, 1000 * (index + 1))
      })
    }
  }
}
</script>

<template>
  <nav>
    <RouterLink to="/dashboard">Dashboard</RouterLink>
  </nav>
  <div class="container">
    <div class="plataform">
      <img src="@/assets/images/tibia-gif2.webp" alt="gif" />
      <EventAnimation :log="log" />
    </div>
    <div class="log">
      <h1>LOG</h1>
      <p v-for="(event, index) in logList" :key="index">
        {{ event.Description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
  .container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .plataform {
    background: url('@/assets/images/floor-tale.png') repeat;
    position: relative;
  }
  .event-info p {
    position: absolute;
    top: 75px;
    right: 60px;
  }
  .log {
    background: #cccccc;
    border-radius: 4px;
    max-height: 300px;
    overflow-y: auto;
    padding: 20px 40px;
  }
  .evento {
    /* Estilize a aparência dos eventos aqui */
    width: 200px;
    height: 100px;
    background-color: #ccc;
    border: 1px solid #999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>