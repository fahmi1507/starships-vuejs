<script setup>
import { computed, onMounted, ref } from 'vue';
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

const detailsKeys = computed(() => {
  return Object.keys(detail.value).filter(e => e !== 'name')
})

const capitalizeWords = (str) => {
  return str.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
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
  
        <div class="detail__info">
          <div class="detail__text">
            <div class="info" v-for="desc in detailsKeys">
              <p class="desc__title">{{ capitalizeWords(desc) }}</p>
              <p class="desc">{{ detail[desc] }}</p>
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
  font-size: 30px;
  border: 2px solid #fff;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.detail {
  display: flex;
}

.detail__image {
  max-width: 500px;
  object-fit: cover;
  height: 100%;
}
.detail__info {
  width: 100%;  
}
.detail__text {
  margin-left: 8px;
  color: #fff;
  background-color: #242424;
  height: 100%;
  padding: 12px;
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.desc__title {
  font-size: 20px;
  display: block;
}

.desc {
  color: #FFD523;
  text-align: end;
  max-width: 230px;
}

@media only screen and (max-width: 768px) {
  .detail {
    flex-direction: column;
    padding: 0 10px;
    align-items: center;
  }
}
</style>