<!--
@wyq 漏斗图
<lar-chart-funnel ></lar-chart-funnel>
-->
<template>
  <div>
    <chart :options="polar" :theme="theme" auto-resize />
  </div>
</template>

<style scoped>
    .echarts {
        width: auto !important;
        height: 500px !important;
        min-width: 340px;
    }
</style>

<script>
// Echart https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md
import Chart from 'vue-echarts/components/ECharts.vue'

import 'echarts/theme/shine'
// import 'echarts/theme/shine';

// 手动引入 EC harts 各模块来减小打包体积
import 'echarts/lib/chart/funnel'
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
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        // toolbox: {
        //     show: true,
        //     feature: {
        //         mark: {show: true},
        //         // magicType: {show: true, type: ['pie', 'funnel']},
        //         restore: {show: true},
        //         saveAsImage: {show: true}
        //     }
        // },
        legend: {
          data: ['展现', '点击', '访问', '咨询', '订单']
        },
        series: [
          {
            name: '预期',
            type: 'funnel',
            left: '12%',
            width: '76%',
            label: {
              normal: {
                formatter: '{b}预期'
              },
              emphasis: {
                position: 'inside',
                formatter: '{b}预期: {c}%'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.7
              }
            },
            data: [
              { value: 60, name: '访问' },
              { value: 40, name: '咨询' },
              { value: 20, name: '订单' },
              { value: 80, name: '点击' },
              { value: 100, name: '展现' }
            ]
          },
          {
            name: '实际',
            type: 'funnel',
            left: '10%',
            width: '80%',
            maxSize: '80%',
            label: {
              normal: {
                position: 'inside',
                formatter: '{c}%',
                textStyle: {
                  color: '#fff'
                }
              },
              emphasis: {
                position: 'inside',
                formatter: '{b}实际: {c}%'
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.5,
                borderColor: '#fff',
                borderWidth: 2
              }
            },
            data: [
              { value: 30, name: '访问' },
              { value: 10, name: '咨询' },
              { value: 5, name: '订单' },
              { value: 50, name: '点击' },
              { value: 80, name: '展现' }
            ]
          }
        ]
      }
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style>
</style>
