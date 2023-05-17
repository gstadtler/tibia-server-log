<script lang="ts">
import type { Log } from '@/types'
import axios from 'axios'
import type { StyleValue } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpLong, faFlask, faHeartCrack, faDiamondTurnRight } from '@fortawesome/free-solid-svg-icons'
library.add(faUpLong, faFlask, faHeartCrack, faDiamondTurnRight)

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      isLoading: true,
      loadingMessage: 'Wait a second, we are rescuing the mage',
      log: [] as Log[],
      eventInfo: {} as Log,
    }
  },
  async created() {
    const baseUrl  = "http://localhost:3333"
    const { data } = await axios.get(`${baseUrl}/log`)
    this.handleLoading(data)
  },
  methods: {
    handleLoading(data: Log[]) {
      setTimeout(() => {
        this.loadingMessage = 'Entering Calmera...'
      }, 2000)
      setTimeout(() => {
        this.isLoading = false
        this.renderEventWithDelay(data)
      }, 4000)
    },
    renderEventWithDelay(logData: Log[]) {
      logData.forEach((item, index) => {
        setTimeout(() => {
          this.log.unshift(item)
          this.eventInfo = item
        }, 2000 * (index + 1))
      })
    },
    eventBasedStyle(eventInfo: Log) {
      let style = {} as StyleValue
        switch (eventInfo.Type) {
          case "heal":
            style = {
              background: "#7fc6a4"
            }
            break
          case "damage":
            style = {
              background: "#C3041E"
            }
            break
          case "experience":
            style = {
              background: "#5ab1bb"
            }
            break
          default:
            style = {
              border: "none"
            }
        }
      return style
    }
  }
}
</script>

<template>
  <div v-show="!isLoading" :style="eventBasedStyle(eventInfo)">
    <nav>
      <RouterLink to="/dashboard" class="nav-link">Enter Dashboard Village</RouterLink>
      <font-awesome-icon :icon="['fas', 'diamond-turn-right']" />
    </nav>
    <div class="log-wrapper">
      <div class="plataform">
        <img src="@/assets/images/tibia-gif2.webp" alt="gif" />
        <div class="event-info">
          <p :style="eventBasedStyle(eventInfo)">
            <font-awesome-icon v-if="eventInfo.Type === 'heal'" :icon="['fas', 'flask']" />
            <font-awesome-icon v-if="eventInfo.Type === 'damage'" :icon="['fas', 'heart-crack']" />
            <font-awesome-icon v-if="eventInfo.Type === 'experience'" :icon="['fas', 'up-long']" />
            {{ eventInfo.Value }}
            <span v-if="eventInfo.Type === 'heal'">life</span>
            <span v-if="eventInfo.Type === 'damage'">dmg</span>
            <span v-if="eventInfo.Type === 'experience'">xp</span>
          </p>
        </div>
      </div>
      <div class="log">
        <h1>Event Log</h1>
        <p v-for="(event, index) in log" :key="index">
          {{ event.Description }}
        </p>
      </div>
    </div>
  </div>
  <div v-show="isLoading" class="loading-message">
    <p>{{ loadingMessage }}</p>
  </div>
</template>

<style scoped>
  .loading-message {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 24px;
    font-weight: 300;
  }

  nav {
    padding: 20px;
  }
  .nav-link {
    text-decoration: none;
    color: #111111;
    font-size: 20px;
    margin-right: 5px;
  }

  .nav-link:hover {
    font-size: 22px;
    transition: 0.3s;
  }
  .log-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .plataform {
    background: url('@/assets/images/floor-tale.png') repeat;
    position: relative;
  }
  .event-info {
    top: 75px;
    right: 40px;
    position: absolute;
  }
  .event-info p {
    font-weight: 500;
    font-size: 18px;
    padding: 10px;
    border-radius: 4px;
    opacity: 85%;
  }
  .event-info span {
    font-weight: 600;
  }
  .log {
    width: 50%;
    height: 360px;
    background: #cccccc;
    border-radius: 4px;
    max-height: 300px;
    overflow-y: auto;
    padding: 10px 40px;
  }
  @media (max-width: 940px) {
    .log-wrapper {
      flex-direction: column;
      min-height: auto;
      gap: 40px;
      padding-bottom: 50px;
    }
  }
</style>