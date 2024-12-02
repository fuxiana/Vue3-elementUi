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
      // getQueryUrlObject('https://www.baidu.com/s?a=1?ie=utf-8&tn=25017023_17_dg&wd=es6+map%E5%AF%B9%E8%B1%A1');
      // getData();
      // 每隔1秒，60秒后开始抢购
      // updataTime(1000, 10);
      // 用户开始抢购
      // userParticipateInPurchase(123);
    })

    function updataTime(timeout, time){
      if(time < 0 ){
        console.log('开始抢购');
        return 
      }else{
        console.log('还剩' + time + '开始抢购')
        setTimeout(() => {
          updataTime(timeout, time - 1)
        }, timeout);
      }
    }
    // 模拟抢购成功的函数
    function mockSuccessfulPurchase() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = Math.random() >= 0.5; // 模拟随机结果
                if (success) {
                    resolve('购买成功！');
                } else {
                    reject('购买失败，服务器繁忙或者网络问题。');
                }
            }, 1000); // 模拟异步操作耗时1秒
        });
    }
 
    // 模拟抢购失败的函数
    function mockFailedPurchase() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('购买失败，库存不足。');
            }, 1000); // 模拟异步操作耗时1秒
        });
    }
    
    // 模拟用户参与抢购
    function userParticipateInPurchase(itemId) {
        console.log(`用户开始抢购编号为${itemId}的商品。`);
        console.log(Math.random() ,11111)
        const promise = Math.random() >= 0.5 ? mockSuccessfulPurchase() : mockFailedPurchase();
        promise
            .then(message => console.log(message))
            .catch(error => console.error(error));
    }
 

    

    function getData(){
      let map = new Map([[1,2]]);
      map.set(2,3)
      console.log(map.get(1),[...map]);
    }

    function getQueryUrlObject(url){
      let obj = {};
      url.replace(/(\w+)=(\w+)?/g, function(match, matchKey, matchValue) {   
        console.log(match,matchKey,matchValue)
      })
      console.log(obj,'obj=>>>>>>>')
    }

    async function getTableData(){
        request.get('/book/list')
        .then((res)=>{
          if(res.data){
            tableData.value = res.data;
          }
        })
    }
   

    const handleDelete = (index) => {
      const _tableData = tableData.value
      _tableData.splice(index, 1)
    }

    function handleSubmit(index, row){
      request.post('/book/submit',{...row})
        .then((res)=>{
          if(res.data){
            getTableData();
            ElNotification({
              title: '提示',
              message: h('i', { style: 'color: teal' }, '提交成功'),
            })
          }
        })
    }

    function handleAdd(index){
      const _tableData = tableData.value
      _tableData.splice(index+1, 0 , {})
    }

 </script>
 
 <style lang="stylus">
 
 </style>
 