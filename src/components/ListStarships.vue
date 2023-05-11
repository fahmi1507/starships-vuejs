<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import Starship from './Starship.vue';
import { getStarships } from '../api/getStarships';
import Layout from './Layout.vue';

const starships = ref([])
const listEl = ref(null)
const count = ref(1)

onMounted(() => {
  getStarships()
  .then(data => starships.value.push(...data))
})

const getMoreStarships = async () => {
  count.value++
  getStarships(count.value)
  .then(data => starships.value.push(...data))
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.addEventListener('scroll', handleScroll)
})

const handleScroll = (e) => {
  let element = listEl.value

  if (element && element.getBoundingClientRect().bottom === window.innerHeight) {
    getMoreStarships()
  }
}

</script>

<template>
  <Layout>
    <div class="starship-container" ref="listEl">
      <Starship
        v-for="(starship) in starships"
        :starship="starship"
        :key="starship.model"
      />
    </div>
  </Layout>
</template>


<style scoped>
.starship-container {
  display: grid;
  grid-template-columns: 1fr;
}
</style>