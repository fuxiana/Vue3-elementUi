<template>
  <router-view />
</template>

<style>
* {
  margin: 0px;
  padding: 0px;
}
html,
body,
#app,
.common-layout,
.el-container,
.el-menu {
  height: 100%;
}
svg {
  height: 1em;
  width: 1em;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import Container from "../src/components/container/src/index.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const showMenu = ref(false);

onMounted(() => {
  if (router.options?.history?.location !== "/") {
    showMenu.value = true;
  }
  document.title = "图书管理系统";

  getServiceWorker();
});

function getServiceWorker(){
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('Service Worker Registered:', registration,111111);
      }).catch(function(error) {
        console.log('Registration failed with ', error,2222);
      });
    });
  }
}
</script>
