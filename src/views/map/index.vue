<template>
  <el-card>
    <el-card-header>
      <h3>地图</h3>
    </el-card-header>
    <el-card-body>
      <el-row>
        <el-col :span="24">
          <div id="map" style="width: 100%; height: calc( 100vh - 200px)"></div>
        </el-col>
      </el-row>
    </el-card-body>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts';
import { mapData } from './json.js'

const HoverFillColor = '#01265A' // hover颜色
const boundaryColor = '#fff'
const StrokeColor = 'gray';
const FillColors = { // 填充色5个区间
  'A': '#096DD9',
  'B': '#729DE8',
  'C': '#AEC8F4',
  'D': '#D5E2F9',
  'E': '#E7EEFC',
}

const countryInfo = ref({
  adcode: 100000,
  name: '全国',
  level: 'country'
})

const scoreList =  ref([]);

onMounted(() => {
  getAreaGeoJson([100000])
})

// 加载地图区域
async function getAreaGeoJson(areaCodes) {
  if (!areaCodes) {
    return
  }
  let areaCode = areaCodes.length && areaCodes[areaCodes.length - 1] || countryInfo.value?.adcode
  let codes = ''
  if (areaCodes && areaCodes.length) {
    areaCodes.forEach(item => {
      codes += `/${item}`
    })
  } else {
    codes = '/100000'
  }
  const data = require(`../../assets/mapJSON${codes}.json`);
  mapChart(data, areaCode)
}

function fillColors(currentInfo) {
  if (!currentInfo) {
    return FillColors['E']
  }
  let avgScore = currentInfo?.avgScore
  let scoreInfo = scoreList.value?.find((item) => {
    return item.min <= avgScore && avgScore < item.max
  })

  if (!scoreInfo) {
    return FillColors['E']
  }
  return FillColors[scoreInfo.ratingLev]
}

function mapChart(mapJson, areaCode) {
  const myChart = echarts.init(document.getElementById('map'))
  let mapName = 'zhejiang'//areaCodes && Number(areaCodes[0]) === countryInfo.adcode ? 'china' : 'zhejiang'

  echarts.registerMap(mapName, mapJson);
  let dataList = [];
  if (areaCode === 100000) {
    dataList = mapData;
  }else{
    mapData.forEach(item => {
      if (item.code === areaCode) {
        dataList = item.children;
      }
    })
  }
  const scoreList = dataList.sort((a, b) => {
    return b.value - a.value
  })
  const option = {
    visualMap: {
      min: scoreList[0]?.value,
      max: scoreList[scoreList.length - 1]?.value,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: false,
      orient: 'horizontal',
      inRange: {
        color: ['#e0ffff', '#006edd'],
        symbolSize: [50, 50]
      }
    },
    tooltip: {
      enterable: true,
      trigger: 'item',
      axisPointer: {
        animation: false,
        showContent: false,
      },
      borderWidth: 0,
      padding: [0, 0, 0, 0],
      formatter: function (params) {
        let data = params.data
        if (!params.value) {
          return `
                    <div class="map-info">
                        <div class="map-info-title">${params.name}</div>
                        <div class="map-info-content m-t-12">
                            该地区暂无销售数据
                        </div>
                    </div>
                  `
        }
        return (
          `
              <div class="map-info">
                  <div class="map-info-title">${params.name}</div>
                  <div class="map-info-content">
                      <div class="map-conent-item">
                          <div class="map-conent-item-left"> <i class="item-num-icon"></i>
                              <span class="txt-left">销售数量</span>
                          </div>
                          <div class="map-conent-item-right">${data.value}</div>
                      </div>
                  </div>
              </div>`
        )
      },
      confine: true
    },
    dataZoom: [
      {
        type: 'slider',
        show: false,   // 隐藏数据区域缩放组件
      }
    ],
    geo: {
      label: {
        normal: {
          show: false,
          fontSize: 0
        }
      },
      regions: [
        {
          name: '南海诸岛',
          value: 0,
          itemStyle: {
            normal: {
              opacity: 0,   // 设置透明度为0，隐藏该区域
              label: {
                show: false
              }
            }
          },
        },
      ],
      tooltip: {
        show: false,
      },
      map: mapName,   // 显示中国地图
      zoom: 1.18,
      itemStyle: {
        borderColor: StrokeColor,   // 设置国界线的边框颜色
        borderWidth: 2,   // 设置国界线的边框宽度
        normal: {
          borderColor: StrokeColor,   // 设置国界线的边框颜色
          borderWidth: 3,   // 设置国界线的边框宽度
          shadowColor: 'rgb(51, 102, 255, .4)',
          // shadowColor: '#175D88',
          shadowBlur: 8,
          shadowOffsetX: 0,
          shadowOffsetY: 8
        }
      },
      // 其他配置项...
    },
    series: [
      {
        name: '数据',
        map: mapName,
        type: 'map',
        selectedMode: false,
        zoom: 1.18,
        label: {
          normal: {
            show: false,
            fontSize: 0
          }
        },
        select: {
          // 地图选中区域样式
          label: {
            // 选中区域的label(文字)样式
            color: '#ffffff'
          },
          itemStyle: {
            areaColor: HoverFillColor,
            borderColor: boundaryColor,
            borderWidth: 2,
            shadowColor: boundaryColor,
            shadowBlur: 10
          }
        },
        mapType: mapName, // 自定义扩展图表类型
        itemStyle: {
          color: 'blue',
          borderColor: boundaryColor,
          borderWidth: 2,
          areaStyle: {
            shadowBlur: 10,
            shadowColor: boundaryColor,
            borderColor: boundaryColor,
            borderWidth: 2,
          },
          emphasis: {
            label: {
              show: true,
              color: '#ffffff'
            },
            borderColor: boundaryColor,
            borderWidth: 2,
            shadowColor: boundaryColor,
            shadowBlur: 10,
            areaColor: HoverFillColor
          },
          normal: {
            borderColor: StrokeColor,
            borderWidth: 1,
            areaColor: '#ffffff'
          }
        },
        data: dataList
      }
    ]
  }
  myChart.setOption(option)
  myChart.on('click', function (params) {
    console.log(params)
    // 获取点击的省份信息
    if (params.data) {
      getAreaGeoJson([params.data.code])
    }

  });
  window.addEventListener("resize", ()=>{
    myChart.resize()
  }); // 监听窗口大小变化
}
</script>

<style>
    /* .map-info{
      padding: 20px 10px;
    } */
    .map-info-title {
      height: 24px;
      line-height: 24px;
      font-size: 14px;
      color: #333;
      background-color: #F3F5F5;
      padding: 0 12px;
      border-bottom: 1px solid #E4E6E7;
      border-radius: 5px 5px 0 0;
    }
  
    .map-info-content {
      padding: 0 12px 10px 10px
    }
  
    .map-conent-item {
      margin-top: 4px;
      line-height: 18px;
      height: 18px;
      font-size: 12px;
      color: #333;
      overflow: hidden;
    }
  
    .map-conent-item-left {
      display: inline-block;
      width: 80px;
      text-align: left;
      white-space: nowrap;
    }
  
    .map-conent-item-left-greenScreen {
      display: inline-block;
      width: 100px;
      text-align: left;
      white-space: nowrap;
    }
  
    .map-conent-item-right {
      display: inline-block;
      margin-left: 4px;
      text-align: left;
      width: 80px;
    }
  
    .map-conent-txt-right {
      display: inline-block;
      text-align: justify;
    }
  
    .map-conent-item .txt-left {
      display: inline-block;
      vertical-align: middle;
    }
  
    .map-conent-item .txt-right {
      display: inline-block;
      vertical-align: middle;
    }
  
    .map-conent-item .item-num-icon {
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #3367FF;
      border-radius: 50%;
      margin-right: 8px;
      vertical-align: middle;
    }
  
    .map-conent-item .item-avg-icon {
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #4FABFF;
      border-radius: 50%;
      margin-right: 8px;
      vertical-align: middle;
    }
  
    .map-conent-item .item-mid-icon {
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #FFC600;
      border-radius: 50%;
      margin-right: 8px;
      vertical-align: middle;
    }

</style>