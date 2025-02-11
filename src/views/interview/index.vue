<template>
    <el-anchor :offset="70">
      <!-- <el-anchor-link :href="`#${locale['basic-usage']}`">
        {{ locale['Basic Usage'] }}
      </el-anchor-link>
      <el-anchor-link :href="`#${locale['horizontal-mode']}`">
        {{ locale['Horizontal Mode'] }}
      </el-anchor-link>
      <el-anchor-link :href="`#${locale['scroll-container']}`">
        {{ locale['Scroll Container'] }}
      </el-anchor-link>
      <el-anchor-link :href="`#${locale['anchor-api']}`">
        {{ locale['Anchor API'] }}
        <template #sub-link>
          <el-anchor-link :href="`#${locale['anchor-attributes']}`">
            {{ locale['Anchor Attributes'] }}
          </el-anchor-link>
          <el-anchor-link :href="`#${locale['anchor-events']}`">
            {{ locale['Anchor Events'] }}
          </el-anchor-link>
        </template>
      </el-anchor-link> -->
      <el-anchor-link @click="onClick('javaScript')">
        javaScript
      </el-anchor-link>
      <el-anchor-link @click="onClick('vue')">
        vue
      </el-anchor-link>
    </el-anchor>
  </template>
  <script  setup>
  import { computed } from 'vue'

  const linkList = [
    {
        label:"javaScript",
        key:"",
        childer:[],
    }
  ]

  function onClick(data){
    console.log(1111111,data)
  }
  
  </script>