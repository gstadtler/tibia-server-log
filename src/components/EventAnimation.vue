<script lang="ts">
import type { StyleValue } from 'vue'
import type { Log } from '@/types'

export default {
  props: {
    log: {
      type: Array as () => Log[]
    }
  },
  data() {
    return {
      intervalo: 2000, 
      duracao: 5000, 
    };
  },
  methods: {
    getEventoStyle(index: number) {
      const zIndex = 5
      const delay = index * this.intervalo

      return {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: zIndex,
        animation: `fadeIn ${this.duracao}ms linear ${delay}ms forwards`,
      } as StyleValue
    },
  },
};
</script>

<template>
  <div>
    <div v-for="(event, index) in log" :key="index">
      <div class="event" :style="getEventoStyle(index)">
        {{ event.Value }}
      </div>
    </div>
  </div>
</template>

<style>
.event {
  width: 200px;
  height: 100px;
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
