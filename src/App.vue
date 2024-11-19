<template>
  <Container/>
  <router-view/>
</template>

<style>
*{
  margin: 0px;
  padding: 0px;
}
html,
body,
#app,
.common-layout,
.el-container,
.el-menu
{
  height: 100%;
}
svg{
  height: 1em;
  width: 1em;
}
</style>


<script setup>
  import { ref, onMounted } from 'vue'
  import Container  from  '../src/components/container/src/index.vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();


  const showMenu = ref(false);
  
  onMounted(()=>{
    if(router.options?.history?.location !== '/'){
      showMenu.value = true;
    }
  })
  
</script>