<script setup>
   import { ref, onMounted} from  'vue';
   import JsBarcode from 'jsbarcode';

   const targetCode = ref('test123456');

   function crearteBarCode() {
        JsBarcode('.canvas', targetCode.value, {
            displayValue: false,
            height: 58,
        });
       
    }

  // 组件视图渲染之后 生成条形码
  onMounted(()=>{
    crearteBarCode()
  })
</script>


<template>
    <div style="margin-top:20px">
        <canvas class="canvas" ></canvas>
    </div>
    <el-input  v-model="targetCode" style="width:250px" />
    <el-button @click="crearteBarCode">生成条形码</el-button>
</template>