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
  /* width: 80%; */
  height: 75px;
  background-color: #151515;
  color: #FFD523;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.name {
  font-weight: 600;
  font-size: 18px;
}

.model {
  color: #b59819;
}
</style>