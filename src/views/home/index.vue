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
   
   <div style="margin-top: 20px;">正则优化</div>
 </template>
 
 <script setup>
 import { ref } from 'vue';
 import request from '../../api/request.js';
    const tableData = ref([{label:"1111"}]);
    // async function getTableData(){
    //     request.get('/api/users/test')
    //     .then((res)=>{
    //         console.log(res,11111)
    //     })
    // }
    // getTableData()
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
 