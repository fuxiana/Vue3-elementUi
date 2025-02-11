<script setup>
   import { ref, onMounted} from  'vue';
   import QRCode from 'qrcode';

   const targetUrl = ref('https://www.baidu.com/');
   const value1  =ref("2024-12-31");

   function crearteQrcode() {
    const canvas = document.getElementById('canvas');
    QRCode?.toCanvas(canvas, targetUrl.value, {
      width: 250,
    }, (error) => {
      if (error) {
       console.error(error);  
      } else {
        console.log('success!');
      }
    });
  }

  function getTime(){
    console.log(value1.value,111111)
  }

  // 组件视图渲染之后 生成二维码
  onMounted(()=>{
    crearteQrcode()
  })
  
</script>

<template>
    <div style="{width:300px; heigth:300px}">
        <div style="margin-top:10px; ">
          <canvas id="canvas" ></canvas>
        </div>
    </div>
    <el-input  v-model="targetUrl" style="width:250px" />
    <el-button @click="crearteQrcode">生成二维码</el-button>
    <div style="margin-top:20px">
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="Pick a day"
        size="default"
      />
    </div>
  <el-button style="margin-top:20px" @click="getTime">提交</el-button>
</template>