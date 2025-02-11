<template>
  <div class="common-layout">
    <div class="common-layout">
      <el-container>
        <el-aside
          class="el-menu-vertical-demo"
          v-if="showMenu"
        >
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <template
              v-for="item,index in containerRouter"
              v-bind="index"
            >
              <el-menu-item
                v-if="!item.children || item.children.length<=0"
                :index='item.url'
              >
                <component
                  style="marginRight:5px"
                  :is="item.icon"
                ></component>
                <template #title>{{item.title}}</template>
              </el-menu-item>
              <el-sub-menu
                v-if="item.children && item.children.length>0"
                :index='item.url'
              >
                <template #title>
                  <component
                    style="marginRight:5px"
                    :is="item.icon"
                  ></component>
                  <span v-if='!store.state.isCollapse'>{{item.title}}</span>
                </template>
                <div
                  v-for="items,index in item.children"
                  :key="index"
                >
                  <el-menu-item
                    v-if="!items.children || items.children.length<=0"
                    :index='items.url'
                  >
                    <component
                      style="marginRight:5px"
                      :is="items.icon"
                    ></component>
                    <template #title>{{items.title}}</template>
                  </el-menu-item>
                </div>
              </el-sub-menu>            
            </template>
          </el-menu>
          <div style="margin: 20px;">
            <router-view />
          </div>
        </el-aside>
      </el-container>
     
    </div>
  </div>
</template>
<script setup >
  import { ref, onMounted } from 'vue'
  import { containerRouter } from '../url/index';
  import store from '@/store';

  import { useRouter } from 'vue-router';
  const router = useRouter();


  const showMenu = ref(false);
  
  onMounted(()=>{
    if(!['/','/register'].includes(router.options?.history?.location)){
      showMenu.value = true;
    }
  })

  function handleSelect(data){
    router.push(data)
  }
</script>

<style>
  main,
  .el-main,
  .el-header {
    margin: 0px !important;
    padding: 0px !important;
  }
  .el-menu {
    border-right-color: darkgray;
  }
  .el-main-header {
    line-height: 60px;
  }
  .container_header {
    border-bottom: 1px solid rgba(82, 83, 82, 0.133);
  }
  .header_icon {
    width: 10px;
  }
  .el-container-rigth {
    height: calc(100% - 100px);
    width: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
  }
</style>
