<script lang="ts">
import axios from 'axios'
import type { Stats } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'
library.add(faCircleLeft)

import DamagePerCreature from '@/components/charts/DamagePerCreature.vue'
import CreatureLoot from '@/components/charts/CreatureLoot.vue'
import DamageOrigins from '@/components/charts/DamageOrigins.vue'

export default {
  components: {
    FontAwesomeIcon,
    DamagePerCreature,
    CreatureLoot,
    DamageOrigins
},
  data() {
    return {
      showDmgPerCreature: true,
      showCreatureLoot: false,
      showOrigins: false,
      stats: {} as Stats,
      dmgPerCreatureLabels: [] as string[],
      dmgPerCreatureValues: [] as number[],

      creatureLootLabels: [] as string[],
      creatureLootValues: [] as number[],

      damageOriginsLabels: ["Familiar origins", "Unknow origins"],
      damageOriginsValues: [] as number[],
    }
  },
  async created() {
    const baseUrl  = "http://localhost:3333"
    const { data } = await axios.get(`${baseUrl}/stats`)
    this.stats = data
    this.dmgPerCreatureLabels = Object.keys(this.stats.DamageTaken.PerCreatureKind)
    this.dmgPerCreatureValues = Object.values(this.stats.DamageTaken.PerCreatureKind)
    
    this.creatureLootLabels = Object.keys(this.stats.Loot)

    this.damageOriginsValues = [Object.values(this.stats.DamageTaken.PerCreatureKind)
    .reduce((prev, curr) => (
      prev + curr
    )), this.stats.DamageTaken.ByUnknownOriginTotal]

    this.handleLootChartConfig(data)
  },
  methods: {
    handleDamagePerCreatureClick() {
      this.showDmgPerCreature = true
      this.showCreatureLoot = false
      this.showOrigins = false
    },
    handleCretureLootClick() {
      this.showCreatureLoot = true
      this.showDmgPerCreature = false
      this.showOrigins = false
    },
    handleDamageOriginsClick() {
      this.showOrigins = true
      this.showDmgPerCreature = false
      this.showCreatureLoot = false
    },
    handleLootChartConfig(data: Stats) {
      Object.entries(data.Loot).forEach((item) => {
        this.creatureLootValues.push(Object.values(item[1]).length)
      })
    }
  }
}
</script>

<template>
  <aside class="sidenav">
    <nav>
      <div class="nav-items">
        <font-awesome-icon :icon="['fas', 'circle-left']" :style="{ color: 'white' }" />
        <RouterLink to="/" class="nav-link">Voltar</RouterLink>
      </div>
      <button @click="handleDamagePerCreatureClick()">Damage Per Creature</button>
      <button @click="handleCretureLootClick()">Creature Loot Items</button>
      <button @click="handleDamageOriginsClick()">Damage Origins</button>
    </nav>
  </aside>
  <div class="charts">
    <DamagePerCreature v-show="showDmgPerCreature" :labels="dmgPerCreatureLabels" :value="dmgPerCreatureValues" />
    <CreatureLoot v-show="showCreatureLoot" :labels="creatureLootLabels" :value="creatureLootValues" />
    <DamageOrigins v-show="showOrigins" :labels="damageOriginsLabels" :value="damageOriginsValues" />
  </div>
</template>

<style>
  .sidenav {
    width: 200px;
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #7a7978;
    overflow-x: hidden;
    padding-top: 50px;
    border-radius: 0 14px 14px 0;
  }
  .sidenav nav {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
  .sidenav nav .nav-items {
    padding-left: 10px;
  }
  .sidenav .nav-link {
    text-decoration: none;
    color: #f3f3f3f3;
    margin-left: 5px;
  }
  .sidenav button {
    background: none;
    border: none;
    color: #f3f3f3f3;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  .sidenav button:hover {
    font-size: 18px;
    transition: 0.3s;
  }
  .charts {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 60%;
    margin: auto;
  }

  @media (max-width: 1060px) {
    .charts {
      width: 50%;
      margin-left: 300px;
    }
  }
</style>