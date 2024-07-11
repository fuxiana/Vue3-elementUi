<script setup>
   import { defineProps, ref, defineEmits} from 'vue';

   const input = ref(1);

   const props = defineProps({
    tableData:[],
   });

   const emits = defineEmits(['getInput']);
   emits('getInput',input.value)

   function getNumber(list) {
     let number = 0;
     list?.forEach(element => {
        number+=Number(element.number)
     });
     return number;
   }

   function onChangeNumber(value){
    emits('getInput',input.value)
   }

   
</script>

<template>
    <div>子级接收父级的参数：{{getNumber(props.tableData)}}</div>
    <el-input-number  v-model="input" @change="onChangeNumber"/>
</template>