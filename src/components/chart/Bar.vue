<template>
  <span>
    <chart :options="polar" :theme="theme" auto-resize />
  </span>
</template>

<style scoped>
    .echarts {
        width: auto !important;
        height: 420px !important;
        min-width: 340px;
    }
</style>

<script>
// Echart https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md
import Chart from 'vue-echarts/components/ECharts.vue'
// import Vue from 'vue'
import 'echarts/theme/shine'
// import 'echarts/theme/shine';

// 手动引入 EC harts 各模块来减小打包体积
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/tooltip'

import theme from './walden.json'

Chart.registerTheme('walden', theme)
// 注册组件后即可使用
// Vue.component('chart', ECharts)

export default {
  components: { Chart },
  data: function() {
    return {
      theme: 'walden',
      polar: {
        title: {
          // text: '统计表报',
          // subtext: '纯属虚构'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['最高气温', '最低气温']
        },
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter'
          }
        ],
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} 元'
            }
          }
        ],
        series: [
          {
            name: '最高气温',
            type: 'line',
            data: [11, 11, 15, 13, 12, 13, 10],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
                { type: 'average', name: '平均值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '最低气温',
            type: 'line',
            data: [1, 5, 2, 5, 3, 2, 5],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      }
    }
  }
}
</script>
<style>
</style>
