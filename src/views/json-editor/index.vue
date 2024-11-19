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
        <div style="margin-top: 5px;" id="jsoneditor" class="jsoneditor-div"></div>
   </div>
</template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    import JSONEditor from 'jsoneditor';
    import 'jsoneditor/dist/jsoneditor.css';
    import { ElNotification } from "element-plus";
    
    const jsonData = ref('{"text":"text"}');
    const changeJsonData = ref()
    const jsonType = ref('code')

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
  
  </script>
  
  <style>
     .jsoneditor{
       height: 600px !important
     }
    
  </style>
  