<template>
   <el-table :data="tableData">
      <el-table-column prop="title" label="书名">
        <template #default="scope">
          <el-input
            placeholder="Please input"
            v-model="tableData[scope.$index].title"
          />
        </template>
      </el-table-column>
      <el-table-column label="作者" prop="author"/>
      <el-table-column label="年份" prop="year"/>
   </el-table>

   <el-button type="primary" style="margin-top: 10px; text-align: end;">表单提交</el-button>
   
   <div style="margin-top: 20px;">正则优化</div>
 </template>
 
 <script setup>
 import { ref } from 'vue';
 import request from '../../api/request.js';
    const tableData = ref([]);
    async function getTableData(){
        request.get('/logistics/list')
        .then((res)=>{
          tableData.value = res;
        })
    }
    getTableData()
    function getData(data){
      // 地址处理
      // return  url.replace(/(\w+)=(\w+)&?/g, function(match, matchKey, matchValue) {   
      //   console.log(match,matchKey,matchValue)
      // })
     return data.replace(/\s/g,(e)=>{
      return "e"
     });
    }
   console.log(getData("/sasa\n/sas./sa/测试"))
 </script>
 
 <style lang="stylus">
 
 </style>
 