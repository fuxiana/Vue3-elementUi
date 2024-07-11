
<template>
  <div style="margin:20px">

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
  <CountNumber :tableData @getInput="emitsGetInput"/>

  <div style="margin-top:20px">父级接收子级的参数：{{current2}}</div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, watch } from 'vue';
import CountNumber from './components/count-number'

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

function emitsGetInput(data){
  console.log(data,'父级传过来的参数')
  current2.value = data
}

</script>


<style scoped>
.button-icon-add {
  margin-top: 20px;
}
</style>