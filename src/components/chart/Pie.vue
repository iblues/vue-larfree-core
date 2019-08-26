<!--
@wyq  饼状图
<lar-chart-pie ></lar-chart-pie>
-->
<template>
  <div>
    <chart :options="polar" :theme="theme" auto-resize />
  </div>
</template>

<style scoped>
    .echarts {
        width: auto !important;
        height: 400px !important;
        min-width: 340px;
    }
</style>

<script>
// Echart https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md
import Chart from 'vue-echarts/components/ECharts.vue'

import 'echarts/theme/shine'
// import 'echarts/theme/shine';

// 手动引入 EC harts 各模块来减小打包体积
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/tooltip'

import theme from './walden.json'

Chart.registerTheme('walden', theme)
// 注册组件后即可使用
// Vue.component('chart', ECharts)

export default {
  components: { Chart },
  props: {
    orderData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: function() {
    return {
      theme: 'walden',
      polar1: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['当日完成单', '当日未完成', '未延迟', '延迟', '企业大客户单量', '普通商户单量', '个人用户单量', '自营运力单量', '第三方运力单量']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['60%', '60%'],
            data: [
              { value: 10, name: '当日完成单' },
              { value: 20, name: '当日未完成' },
              { value: 30, name: '未延迟' },
              { value: 80, name: '延迟' },
              { value: 20, name: '企业大客户单量' },
              { value: 10, name: '普通商户单量' },
              { value: 9, name: '个人用户单量' },
              { value: 8, name: '自营运力单量' },
              { value: 7, name: '第三方运力单量' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      polar2: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '直达', selected: true },
              { value: 679, name: '营销广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              normal: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: '#aaa',
                    width: '80%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              { value: 335, name: '直达' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1048, name: '百度' },
              { value: 251, name: '谷歌' },
              { value: 147, name: '必应' },
              { value: 102, name: '其他' }
            ]
          }
        ]
      },
      polar: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 0,
          top: 20,
          bottom: 20,
          data: ['当日下单期望当日配送数', '当日下单期望次日配送数', '当日下单期望其他时间配送数']
        },
        series: [
          {
            name: '数据统计',
            type: 'pie',
            radius: '70%',
            center: ['40%', '45%'],
            selectedMode: 'single',
            label: {
              normal: {
                show: true,
                position: 'outside'
              }
            },
            data: [
              // {value: self.orderData.order, name: `当日下单数`},
              // {value: self.orderData.order, name: `当日下单期望当日配送数`},
              // {value: self.orderData.order, name: `当日下单期望次日配送数`},
              // {value: self.orderData.order, name: `当日下单期望其他时间配送数`}
            ]
          }
        ]
      }

    }
  },
  watch: {
    orderData: function(val) {
      this.polar.series[0].data = [
        { value: val.today_send, name: `当日下单期望当日配送数` },
        { value: val.tomorrow_send, name: `当日下单期望次日配送数` },
        { value: val.other_send, name: `当日下单期望其他时间配送数` }
      ]
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
