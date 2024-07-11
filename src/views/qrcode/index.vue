<script setup>
   import { ref, onMounted} from  'vue';
   import QRCode from 'qrcode';

   const targetUrl = ref('https://www.baidu.com/');

   function crearteQrcode() {
    const canvas = document.getElementById('canvas');
    console.log(canvas,111111)
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

  // 组件视图渲染之后 生成二维码
  onMounted(()=>{
    crearteQrcode()
  })
  
</script>

<template>
    <div style="{width:300px,heigth:300px}">
        <div>
          <canvas id="canvas" ></canvas>
        </div>
    </div>
    <el-input  v-model="targetUrl" />
    <el-button @click="crearteQrcode">生成二维码</el-button>
</template>