
<template>
  <div style="margin:20px" id="content">

    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="Date"
        width="180"
      >
        <template #default="scope">
          <el-input-number
            placeholder="Please input"
            v-model="tableData[scope.$index].number"
          />
        </template>

      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="180"
      />
      <el-table-column
        prop="address"
        label="Address"
      />
      <el-table-column align="right">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="button-icon-add">
      <el-button
        type="primary"
        icon='el-icon-plus'
        @click="addData"
      >
        新增一条
      </el-button>
    </div>
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
    /> -->
  </div>
  <CountNumber :tableData="tableData" @getInput="emitsGetInput"/>

  <div style="margin-top:20px">父级接收子级的参数：{{current2}}</div>
  <el-button
    class="button-icon-add"
    type="primary"
    @click="getPDFData"
  >
    下载PDF
  </el-button>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onBeforeMount } from 'vue';
import CountNumber from './components/count-number';

const input = ref('')
const pageSize = ref(20)
const current1 = ref(3)
const current2 = ref(4)
const tableData = ref([
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    number: 111,
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    number: 222,
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    number: 333,
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    number: '1212',
  },
])

onBeforeMount(()=>{
    // 创建一个新的script标签
    var script = document.createElement('script');
    // 设置script标签的type和src属性
    script.type = 'text/javascript';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';

    // 将script标签添加到head中
    document.head.appendChild(script);
})

const handleDelete = (index: number, row: any) => {
  const _tableData = tableData.value
  _tableData.splice(index, 1)
}
const onShowSizeChange = (current: number, pageSize: number) => {
  console.log(current, pageSize)
}

const addData = () => {
  const _tableData = tableData.value
  _tableData.push({
    date: '',
    name: '',
    address: '',
    number: null,
  })
}

function getPDFData(){
  const element = document.getElementById('content');
  var options = {
      margin: 10,
      filename: 'mypdf.pdf',
      html2canvas: {
          scale: 2  // 2倍的缩放
      },
      // jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf()
      .from(element)
      .set(options)
      .save();
}

function emitsGetInput(data: any){
  console.log(data,'父级传过来的参数')
  current2.value = data
}

</script>


<style scoped>
  .button-icon-add {
    margin-top: 20px;
  }
</style>