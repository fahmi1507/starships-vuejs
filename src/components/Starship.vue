<script setup>
  defineProps({
    starship: Object
  })
</script>

<template>
  <router-link :to="starship.url.slice(22)">
    <div class="starship">
      <div>
        <p class="name">{{ starship.name }}</p>
        <p class="model">{{ starship.model }}</p>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.starship {
  height: 75px;
  background-color: #151515;
  color: #FFD523;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition:0.3s;
}

.starship:hover p {
  transform: scaleY(1.02)
}

.starship:hover {
  transform: scale(1.02);
  transform-origin: bottom;
  background-color: #232323;

}

.name {
  font-weight: 600;
  font-size: 20px;
}

.model {
  color: #FCF55F
}
</style>