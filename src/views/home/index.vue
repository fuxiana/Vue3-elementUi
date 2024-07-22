<template>
   <el-table :data="tableData">
      <el-table-column prop="date" label="测试数据1">
        <template #default="scope">
          <el-input-number
            placeholder="Please input"
            v-model="tableData[scope.$index].label"
          />
        </template>
      </el-table-column>
      <el-table-column label="测试数据2" prop="label"/>
   </el-table>
 </template>
 
 <script setup>
 import { ref } from 'vue';
 import request from '../../api/request.js';
    const tableData = ref([{label:"1111"}]);
    async function getTableData(){
        // const data = await fetch('http://localhost:3000/users/test')
        // console.log(data)
        request.get('/test')
        .then((res)=>{
            console.log(res,11111)
        })
    }
    getTableData()
 </script>
 
 <style lang="stylus">
 
 </style>
 