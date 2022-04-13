<template>
 <div class="common-layout">
    <el-container>
      <el-container>
        <el-aside :width="isCollapse? '64px' : '200px'" style="transition: all 0.5s 0.1s ease-out">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                router
               
            >
                <li v-for="item,index in containerRouter"  :key="index">
                    <el-menu-item  v-if="!item.children || item.children.length<=0" :index='item.url'>
                        <component style="marginRight:5px" :is="item.icon"></component>
                        <template   #title>{{item.title}}</template>
                    </el-menu-item>
                    <el-sub-menu  v-if="item.children && item.children.length>0" :index='item.url' >
                        <template #title >
                            <component style="marginRight:5px" :is="item.icon"></component>
                            <span v-if='!isCollapse'>{{item.title}}</span>
                        </template>
                        <div  v-for="items,index in item.children"  :key="index" >
                            <el-menu-item  v-if="!items.children || items.children.length<=0" :index='items.url'>
                                <component style="marginRight:5px" :is="items.icon"></component>
                                <template   #title>{{items.title}}</template>
                            </el-menu-item>
                        </div>
                    </el-sub-menu>
                </li>
            </el-menu>
        </el-aside>
        <el-main>
            <el-header class="el-main-header" style="transition: all .5s .15s ease-out">
                <div class="container_header">
                    <span @click="collect" class="header_icon">
                        <el-icon-arrowleftbold v-if='!isCollapse' />
                        <el-icon-arrowrightbold v-if='isCollapse' />
                    </span>
                </div>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {containerRouter}  from '../url/index'
console.log(containerRouter)
let isCollapse = ref(false);

function collect(){
   isCollapse.value=!isCollapse.value
}
</script>

<style>
main,
.el-main,
.el-header{
    margin: 0px !important;
    padding: 0px !important
}
.el-menu{
    border-right-color: darkgray;
}
.el-main-header{
    line-height: 60px;
}
.container_header{
    border-bottom: 1px solid rgba(82, 83, 82, 0.133);
}
.header_icon{
    width: 10px;
}
</style>
