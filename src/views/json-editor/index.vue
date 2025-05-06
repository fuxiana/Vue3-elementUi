<template>
   <div style="padding: 20px;">
      <div>
            请输入你需要转换的数据
      </div>
      <div style="margin-top: 20px;">
        <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8}"
            placeholder="请输入内容"
            v-model="jsonData">
        </el-input>   
        <el-button
            type="primary"
            @click="jsonConvert"
            style="margin-top: 10px;"
        >
            正向转换
        </el-button>
        <el-button
            type="primary"
            @click="reverseJsonConvert"
            style="margin-top: 10px;"
        >
            反向转换
        </el-button>
        <el-button
            type="primary"
            @click="drugConversion"
            style="margin-top: 10px;"
        >
            药品转换
        </el-button>
      </div>
       <el-button
            type="primary"
            @click="jsonTypeChange('code')"
            style="margin-top: 40px;"
        >
            展开
        </el-button>
        <el-button
            type="primary"
            @click="jsonTypeChange('form')"
            style="margin-top: 40px;"
        >
            折叠
        </el-button>
        <el-button
            type="primary"
            @click="jsonTypeChange('text')"
            style="margin-top: 40px;"
        >
            文本
        </el-button>
        <el-button
            type="primary"
            @click="impotExcel"
            style="margin-top: 40px;"
        >
            导出Excel
        </el-button>
        <div style="margin-top: 5px;" id="jsoneditor" class="jsoneditor-div"></div>
   </div>
</template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    import JSONEditor from 'jsoneditor';
    import 'jsoneditor/dist/jsoneditor.css';
    import { ElNotification } from "element-plus";
    import request from '@/api/request';
    import axios from 'axios';
    
    const jsonData = ref('{}');
    const changeJsonData = ref()
    const jsonType = ref('code');
    const allChangeJsonData = ref();

    onMounted(()=>{
        const element = document.getElementById('jsoneditor');
        // 创建编辑器实例
        const editor = new JSONEditor(element, {
            mode: jsonType.value, // 可以是 'code'、'form' 或 'text' 来指定编辑器模式
            onError: function (err) {
                // 处理错误
                console.error(err.toString());
            }
        });
        editor.set(JSON.parse(jsonData.value));
        changeJsonData.value = editor;
    })

    function jsonTypeChange(type){
        jsonType.value = type;
        changeJsonData.value.setMode(type);
        changeJsonData.value.refresh()
    }

    function jsonConvert(){
      // 设置编辑器的JSON数据
      try{
        let data =  JSON.parse(jsonData.value)
        changeJsonData.value?.update(data)
      }
      catch{
        ElNotification({
            title: '转换失败',
            message: `‘${jsonData.value}’数据不符合规范`,
            type:"error"
        });
      }
    }

    function reverseJsonConvert(){
        const data = changeJsonData.value.getText();
        
        jsonData.value = data;
    }

    function drugConversion(){
        // 设置编辑器的JSON数据
      try{
        let data =  JSON.parse(jsonData.value)
        getAllChangeJsonData(data);
      }
      catch{
        ElNotification({
            title: '转换失败',
            message: `‘${jsonData.value}’数据不符合规范`,
            type:"error"
        });
      }
    }

    function getAllChangeJsonData(data2){
       let data1 = JSON.parse(JSON.stringify(allChangeJsonData.value ||{}));
       Object.keys(data2).forEach(key=>{
           if(data1[key]){
              data1[key] = {...data1[key],...data2[key]}
           }else{
               data1[key] = data2[key]
           }
       })
       allChangeJsonData.value = data1;
       changeJsonData.value.set(data1);
    }

    function impotExcel(){
        request.post(
            '/book/generateExcel',
            {resultData:allChangeJsonData.value},
            {
               responseType: 'blob' // 关键配置
            }
        )
       .then(response => {
            if(response.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
                const blob = response; // Axios 中数据在 response.data
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = '汇丰4.14-4.20纯销.xlsx';
                a.click();
                window.URL.revokeObjectURL(url);
                ElNotification({
                    title: '下载成功',
                    type:"sucess"
                });
            }else{
                 ElNotification({
                    title: '下载失败',
                    message: "请检查数据是否正确",
                    type: "error"
                });
            }
        })
    }
  </script>
  
  <style>
     .jsoneditor{
       height: 600px !important
     }
    
  </style>
  