<template>
  <div class="common-layout">
    <div class="common-layout">
      <el-container>
        <el-aside
          class="el-menu-vertical-demo"
          style="width:auto"
          v-if="showMenu"
        >
        {{ console.log(store, this, this, this?.$store) }}
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="store.state.isCollapse"
            router
            unique-opened
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
        </el-aside>
        <el-container class="el-container-rigth">
          <el-header class="el-main-header" v-if="showMenu">
            <div class="container_header">
              <span
                @click="store.commit('collapserMenu')"
                class="header_icon"
              >
                <el-icon-arrowleftbold v-if='!store.state.isCollapse' />
                <el-icon-arrowrightbold v-if='store.state.isCollapse' />
              </span>
            </div>
          </el-header>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
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
    width: calc(100% - 100px);
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>
