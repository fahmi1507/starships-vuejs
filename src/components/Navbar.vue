<script setup>
import logo from '../assets/images/logo.jpg'
</script>

<template>
  <nav class="navbar">
    <div class="nav-menu">
      <img :src="logo" alt="logo" width="120">

      <div class="nav-items">
        <router-link to="/">home</router-link>
        <router-link to="/about">about</router-link>
        <router-link to="/contact">contact</router-link>
      </div>
    </div>
  </nav>
</template>


<style scoped>
.navbar {
  width: 100%;
  background-color: #000;
  height: 100%;
  padding: 16px;
}

.nav-menu {
  max-width: 1024px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}

.nav-items {
  display: flex;
  width: 210px;
  justify-content: space-between;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
}
</style>