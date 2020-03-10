<template>
  <span>
    <!--拖拽ui用的. 需要继承-->
    <template v-if="_action==='setting'">
      <drag-ui-setting-from
        setting="_setting"
        :value="_uiParam"
        schemas="{'fields':{'model':{'name':'模块名','type':'text','tip':'例如:common.user'}}}"
        v-on="$listeners"
      />
    </template>

    <template v-else>
      <span>
        <chart :options="polar" :theme="theme" auto-resize />
      </span>
    </template>
  </span>
</template>

<style scoped>
    .echarts {
        width: auto !important;
        height: 200px !important;
        min-width: 340px;
    }
</style>

<script>
// import Vue from 'vue';
// Echart https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md
import ECharts from 'vue-echarts/components/ECharts.vue'

import 'echarts/theme/shine'
// import 'echarts/theme/shine';

// 手动引入 EC harts 各模块来减小打包体积
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/tooltip'

import theme from './walden.json'
// import Vue from 'vue'
ECharts.registerTheme('walden', theme)
// 注册组件后即可使用
// console.log(ECharts/nam)
// Vue.component('chart', ECharts)

export default {
  name: 'LarChartSimpleLine',
  components: {
    'chart': ECharts
  },
  props: {
    model: {
      type: String
    },
    module: {
      type: String,
      default: 'chart.line'
    }
  },
  data: function() {
    // let data = []

    return {
      theme: 'walden',
      api: '',
      polar: {
        title: {
          text: '读取中',
          subtext: 'Loadding'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          //                        data:['测试1','测试2']
        },
        // dataZoom: [
        //   {
        //     id: 'dataZoomX',
        //     type: 'slider',
        //     xAxisIndex: [0],
        //     filterMode: 'filter'
        //   }
        // ],
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
            type: 'time'
            //                            data : ['周一','周二','周三','周四','周五','周六','周日']
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
        series: []
      }
    }
  },
  watch: {
    api: function() {
      this.getChartData()
    }
  },
  created: function() {
    this.getSchemas()
  },
  methods: {
    getSchemas() {
      if (!this.model) {
        return ''
      }
      this.loading = true
      this.$http.get('/system/component/' + this.model + '/' + this.module, { ttl: false })
        .then((response) => {
          this.loading = false
          //                            this.Schemas = response.data.data;
          this.initChart(response.data)
          console.log('chart', this.Schemas)
        })
        .catch((error) => {
          this.loading = false
          this.$message.error('请求模块错误')
          console.log(error.response.data)
          // console.log(error);
        })
    },
    getChartData() {
      this.$http.get(this.api)
        .then((response) => {
          //                            console.log(1234,response);
          //                        let data = this.arrayToChartData(response.data);

          let series = this.polar.series
          // 处理返回数据
          series.forEach((y, xkey) => {
            const oneData = []
            for (const key in response.data) {
              const value = response.data[key][xkey]
              oneData.push([key, value])
            }
            series = this.polar.series[xkey]
            series.data = oneData
            //                            this.$debug.log(series);
            this.$set(this.polar.series, xkey, series)
            //                            this.polar.series.push(series);
          })
        }).catch((error) => {
          console.log(error.response.data)
        })
    },

    initChart(data) {
      this.polar.title.text = data.title
      this.polar.title.subtext = data.sub_title
      // 初始化基本的option值
      const legend = []
      data.y.forEach((item) => {
        const y = {
          name: item.name,
          type: 'line',
          data: [
            [
              '0000-00-00',
              '0'
            ]
          ],
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
        }
        legend.push(item.name)
        this.polar.series.push(y)
      })
      this.polar.legend.data = legend
      this.api = data.url
      //
    }
  }

}
</script>
<style>
</style>
