<script setup>
import { onMounted, ref, onUnmounted, computed } from 'vue';
import Starship from './Starship.vue';
import { getStarships } from '../api/getStarships';
import Layout from './Layout.vue';

const starships = ref([])
const listEl = ref(null)
const count = ref(1)
const userInput = ref('')

const filteredStarhips = computed(() => {
  let filter = userInput.value

  if (!filter.length) return starships.value
  return starships.value.filter(s => {
      return `${s.name} ${s.model}`.toLowerCase().includes(filter.toLowerCase())
    }
  )
})


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
    <div class="group">      
      <input type="text" v-model="userInput">
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Search Name or Model</label>
    </div>
    <div ref="listEl">
      <Starship
        v-for="(starship) in filteredStarhips"
        :starship="starship"
        :key="starship.model"
      />
    </div>
  </Layout>
</template>


<style scoped>


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
  color: #fff;

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