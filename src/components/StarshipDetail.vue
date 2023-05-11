<script setup>
import { onMounted, ref } from 'vue';
import { getStarshipDetail } from '../api/getStarships';
import defaultImg from '../assets/images/default.jpg'
import Layout from './Layout.vue';
import { useRoute } from 'vue-router'

const detail = ref({})
const route = useRoute()
const { id } = route.params

const imageUrl = ref(`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`)

onMounted(() => {
  getStarshipDetail(id)
  .then(data => detail.value = data)
})

const replaceByDefault = (e) => {
  e.target.src = defaultImg
}
</script>

<template>
  <Layout>
    <div class="detail">
      <img
        :src="imageUrl"
        @error="replaceByDefault"
        class="detail__image"
      />

      <div class="detail__info">
        <h3 class="title">
          {{ detail.name }}
        </h3>
        <div class="detail__text">
          <div class="text">
            <p>Model: {{ detail.model }}</p>
            <p>Manufacturer: {{ detail.manufacturer }}</p>
            <p>Starship Class: {{ detail.starship_class }}</p>
          </div>
          <div class="text">
            <p>Cargo Capacity: {{ detail.cargo_capacity }}</p>
            <p>Passengers: {{ detail.passengers }}</p>
            <p>Hyperdrive Rating: {{ detail.hyperdrive_rating }}</p>
            <p>Max Atmosphere Speed: {{ detail.max_atmosphering_speed }}</p>
          </div>

        </div>
      </div>
    </div>
  </Layout>
</template>


<style scoped>
.detail {
  color: red;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  color: #fff;
  font-size: 26px;
  font-weight: bold;
}

.detail__image {
  width: 100%;
  height: 350px;
  object-fit: contain;
}

.detail__info {
  padding: 18px;
  background-color: #242424;
}

.detail__text {
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  justify-content: center;
}

.text > p {
  margin: 12px 0;
  color: #F1F6F9;
}
</style>