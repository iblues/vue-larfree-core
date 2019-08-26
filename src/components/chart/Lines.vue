<template>
  <span>
    <chart :options="polar" :theme="theme" auto-resize />
  </span>
</template>

<style scoped>
    .echarts {
        width: 200px !important;
        height: 200px !important;
        padding: 0;
        margin-top: -35px;
        margin-left: -30px;
    }
</style>

<script>
import Vue from 'vue'
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

ECharts.registerTheme('walden', theme)
// 注册组件后即可使用
Vue.component('chart', ECharts)

export default {
  props: {
    model: {
      type: String
    }
  },
  data: function() {
    const data = []

    return {
      theme: 'walden',
      api: '',
      polar: {
        // title: {
        //     text: '读取中',
        //     subtext: 'Loadding'
        // },
        // tooltip: {
        //     trigger: 'axis'
        // },
        //                     legend: {
        // //                        data:['测试1','测试2']
        //                     },
        dataZoom: [
          // {
          //     id: 'dataZoomX',
          //     type: 'slider',
          //     xAxisIndex: [0],
          //     filterMode: 'filter'
          // },
        ],
        // toolbox: {
        //     show: true,
        //     feature: {
        //         mark: {show: true},
        //         magicType: {show: true, type: ['line', 'bar']},
        //         restore: {show: true},
        //         saveAsImage: {show: true}
        //     }
        // },
        // calculable: true,
        color: ['#66bc8b'],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              formatter: ''
            }

            //                            data : ['周一','周二','周三','周四','周五','周六','周日']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: ''
            }
          }
        ],
        series: [{
          data: [0, 820, 352, 450, 724, 800, 600, 500, 600],
          type: 'line',
          areaStyle: {}
        }]
      }
    }
  },
  watch: {
    api: function() {
      // this.getChartData();
    }
  },
  created: function() {
    // this.getSchemas();
  },
  methods: {
    //             getSchemas() {
    //                 if (!this.model)
    //                     return '';
    //                 this.loading = true;
    //                 this.$http.get('/system/component/' + this.model + '/chart.line', {ttl: false})
    //                     .then((response) => {
    //                         this.loading = false;
    //                         if (response.data.status == 1) {
    // //                            this.Schemas = response.data.data;
    //                             this.initChart(response.data.data);
    //                             console.log('chart', this.Schemas);
    //                         } else {
    //                             this.$message.error('Chart模块错误');
    //                         }
    //                     })
    //                     .catch((error) => {
    //                         this.loading = false;
    //                         this.$message.error('Chart模块错误');
    //                         // console.log(error);
    //                     });
    //             },
    //             getChartData() {
    //                 this.$http.get(this.api)
    //                     .then((response) => {
    // //                            console.log(1234,response);
    // //                        let data = this.arrayToChartData(response.data);

    //                         let series = this.polar.series;
    //                         //处理返回数据
    //                         series.forEach((y, xkey) => {
    //                             let oneData = [];
    //                             for (let key in response.data.data) {
    //                                 let value = response.data.data[key][xkey];
    //                                 oneData.push([key, value])
    //                             }
    //                             series = this.polar.series[xkey];
    //                             series.data = oneData;
    // //                            this.$debug.log(series);
    //                             this.$set(this.polar.series, xkey, series);
    // //                            this.polar.series.push(series);
    //                         });

    //                     }).catch((error) => {

    //                 });

    //             },

    //             initChart(data) {
    //                 this.polar.title.text = data.title;
    //                 this.polar.title.subtext = data.sub_title;
    //                 //初始化基本的option值
    //                 let legend = [];
    //                 data.y.forEach((item, index) => {
    //                     let y = {
    //                         name: item.name,
    //                         type: 'line',
    //                         data: [
    //                             [
    //                                 "0000-00-00",
    //                                 "0"
    //                             ],
    //                         ],
    //                         markPoint: {
    //                             data: [
    //                                 {type: 'max', name: '最大值'},
    //                                 {type: 'min', name: '最小值'},
    //                                 {type: 'average', name: '平均值'},
    //                             ]
    //                         },
    //                         markLine: {
    //                             data: [
    //                                 {type: 'average', name: '平均值'}
    //                             ]
    //                         }
    //                     };
    //                     legend.push(item.name);
    //                     this.polar.series.push(y);
    //                 });
    //                 this.polar.legend.data = legend;
    //                 this.api = data.url;
    // //

    //             }
  }

}
</script>
<style>
</style>
