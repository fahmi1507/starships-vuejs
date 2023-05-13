<script setup>
import StarshipDetail from '../components/StarshipDetail.vue';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <StarshipDetail/>
      </template>
      <template #fallback>
        <div class="loading">
          <clip-loader color="#a1a1a1"></clip-loader>
        </div>
      </template>
    </Suspense>
  </div>
</template>


<style scoped>
.loading {
  height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
}
</style>