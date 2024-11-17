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
      <el-table-column label="作者" prop="author">
        <template #default="scope">
          <el-input
            placeholder="Please input"
            v-model="tableData[scope.$index].author"
          />
        </template>
      </el-table-column>
      <el-table-column label="主角" prop="protagonist">
        <template #default="scope">
          <el-input
            placeholder="Please input"
            v-model="tableData[scope.$index].protagonist"
          />
        </template>
      </el-table-column>
      <el-table-column label="年份" prop="year">
        <template #default="scope">
          <el-input
            placeholder="Please input"
            v-model="tableData[scope.$index].year"
          />
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="handleSubmit(scope.$index, scope.row)"
          >
            提交
          </el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="primary"
            @click="handleAdd(scope.$index)"
          >
            新增
          </el-button>
        </template>
      </el-table-column>
   </el-table>

   <!-- <el-button type="primary" style="margin-top: 10px; text-align: end;">表单提交</el-button> -->
   
   <!-- <div style="margin-top: 20px;">正则优化</div> -->
 </template>
 
 <script setup>
 import { ref, onMounted ,h } from 'vue';
 import { ElNotification } from 'element-plus';
 import request from '../../api/request.js';
    const tableData = ref([]);

    onMounted(()=>{
      getTableData()
    })

    async function getTableData(){
        request.get('/book/list')
        .then((res)=>{
          tableData.value = res;
        })
    }
   

    const handleDelete = (index) => {
      const _tableData = tableData.value
      _tableData.splice(index, 1)
    }

    function handleSubmit(index, row){
      request.post('/book/submit',{...row})
        .then((res)=>{
          getTableData();
          ElNotification({
            title: '提示',
            message: h('i', { style: 'color: teal' }, '提交成功'),
          })
        })
    }

    function handleAdd(index){
      const _tableData = tableData.value
      _tableData.splice(index+1, 0 , {})
    }

 </script>
 
 <style lang="stylus">
 
 </style>
 