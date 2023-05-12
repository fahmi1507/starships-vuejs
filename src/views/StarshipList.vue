<script setup>
import { onMounted, ref } from 'vue';
import Layout from '../components/Layout.vue';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { debounce } from 'debounce'
import Starship from '../components/Starship.vue';
import { getStarships, getStarshipByKeyword } from '../api/getStarships';

const starships = ref([])
const count = ref(2)
const noMoreData = ref(false)
const userInput = ref('')
const noResults = ref(false)

onMounted(() => {
  getStarships()
  .then(data => updateStarships(data))
})

const updateStarships = (data) => {
  if (data.length === 0) noMoreData.value = true
  starships.value.push(...data)
}

const getMoreStarships = async () => {
  if (userInput.value) {
    getStarshipByKeyword(userInput.value, count.value)
    .then(data => {
      updateStarships(data)
    })
  } else {
    getStarships(count.value)
    .then(data => {
      updateStarships(data)
    })
  }
  count.value++
}

const loadData = () => {
  if (starships.value.length === 0) return 
  if (noMoreData.value) return
  getMoreStarships(count.value)
}

const searchInput = debounce((e) => {
  noMoreData.value = false
  count.value = 2
  noResults.value = false
  getStarshipByKeyword(e.target.value)
  .then(data => {
    if (data.length === 0) noResults.value = true
    starships.value = data
  })
}, 800)
</script>

<template>
  <Layout>
    <div class="group">      
      <input type="text" @input="searchInput" v-model="userInput">
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Search by Name or Model</label>
    </div>
    <div>
      <Starship
        v-for="(starship) in starships"
        :starship="starship"
        :key="starship.model"
      />
      <div class="loading">
        <InfiniteLoading 
          @infinite="loadData"
          v-if="!noMoreData && !noResults"
        />
        <p v-if="starships.length >= 10 && noMoreData">
          That's all!
        </p>
        <p v-if="noResults">
          No results found.
        </p>
      </div>
    </div>
  </Layout>
</template>


<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
}
/* form starting stylings ------------------------------- */
.group 			  { 
  position: relative; 
  margin-bottom: 20px;
  padding-left: 10px;
}

input 				{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  border:none;
  border-bottom:1px solid #757575;
  background: transparent;
  color: #FFEA00;

}
input:focus 		{ outline:none; }

input:focus, input:active {
    background: transparent;
}

/* LABEL ======================================= */
label 				 {
  color:#fff; 
  padding-left: 8px;

  font-size:26px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  left:5px;
  top:10px;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}

/* active state */
input:focus ~ label, input:valid ~ label 		{
  top:-20px;
  font-size:18px;
  color:#fff;
}

/* BOTTOM BARS ================================= */
.bar 	{ position:relative; display:block; width:300px; }
.bar:before, .bar:after 	{
  content:'';
  height:2px; 
  width:0;
  bottom:1px; 
  position:absolute;
  background:#e3e3e3; 
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%; 
}

/* active state */
input:focus ~ .bar:before, input:focus ~ .bar:after {
  width:50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position:absolute;
  height:60%; 
  width:100px; 
  top:25%; 
  left:0;
  pointer-events:none;
  opacity:0.5;
}

/* active state */
input:focus ~ .highlight {
  -webkit-animation:inputHighlighter 0.3s ease;
  -moz-animation:inputHighlighter 0.3s ease;
  animation:inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
	from { background:#e3e3e3; }
  to 	{ width:0; background:transparent; }
}
@-moz-keyframes inputHighlighter {
	from { background:#e3e3e3; }
  to 	{ width:0; background:transparent; }
}
@keyframes inputHighlighter {
	from { background:#e3e3e3; }
  to 	{ width:0; background:transparent; }
}

</style>