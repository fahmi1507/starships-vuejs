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
    <div>
      <h3 class="title">
        {{ detail.name }}
      </h3>

      <div class="detail">
        <div >
          <img
            :src="imageUrl"
            @error="replaceByDefault"
            class="detail__image"
          />
  
        </div>
  
        <!-- <div class="bar__container">
          <div class="bar"></div>
  
        </div> -->
  
  
        <div class="detail__info">
          <div class="detail__text">
            <div class="text">
              <p class="desc__title">Model</p>
              <p class="desc">{{ detail.model }}</p>
              <p class="desc__title">Manufacturer</p>
              <p class="desc">{{ detail.manufacturer }}</p>
              <p class="desc__title">Starship Class</p>
              <p class="desc">{{ detail.starship_class }}</p>
            </div>
            <div class="text">
              <p class="desc__title">Cargo Capacity</p>
              <p class="desc">{{ detail.cargo_capacity }}</p>
              <p class="desc__title">Passengers</p>
              <p class="desc">{{ detail.passengers }}</p>
              <p class="desc__title">Hyperdrive Rating</p>
              <p class="desc">{{ detail.hyperdrive_rating }}</p>
              <p class="desc__title">Max Atmosphere Speed</p>
              <p class="desc">{{ detail.max_atmosphering_speed }}</p>
            </div>
  
          </div>
        </div>

      </div>
    </div>
  </Layout>
</template>


<style scoped>
.title {
  text-align: center;
  color: #fff;
  padding: 10px;
  font-size: 26px;
  border: 2px solid #fff;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.detail {
  display: flex;
}

.detail__image {
  max-width: 500px;
  object-fit: cover;
  padding: 0 8px;
  height: 100%;
}
.detail__info {
  margin: 0 auto;
}

.detail__text {
  display: flex;
  color: #fff;
  background-color: #242424;
  height: 100%;
  padding: 12px;
}

.desc__title {
  font-size: 20px;
  display: block;
  margin-bottom: 2px 0;
}

.desc {
  margin-bottom: 18px;
  color: #FFD523;
}


.bar__container {
  display: flex;
  justify-content: center;
  padding: 8px 0;
  
}

.bar {
  width: 95%;
  height: 4px;
  margin-bottom: 6px;
  background: #2FF924 ;
  border-radius: 5px;
  box-shadow: 0 0 15px 5px #14f509;
}

@media only screen and (max-width: 768px) {
  .detail {
    flex-direction: column;
    padding: 0 10px;
    align-items: center;
  }
}
</style>