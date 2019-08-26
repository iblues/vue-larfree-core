<script>
export default {
  data() {
    return {
      test: '测试2',
      content: 3333,
      schemas: {
        region: {
          component: 'select',
          name: '活动区域',
          option: {
            1: 'test1',
            2: 'test2'
          }
        },
        desc: {
          component: 'textarea',
          name: '描述'
        }
      },
      name: '12344',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      temp: '',
      template: function() {
        return null
      }
    }
  },
  created() {
    const _this = this
    setTimeout(function() {
      _this.AjaxReady()
    }, 2000)// 模拟ajax
  },
  methods: {
    AjaxReady() {
      this.temp = '<a><div>123<h1>233</h1><el-input v-model="name" placeholder="请输入内容"></el-input></div>{{name}}<el-button>取消</el-button></a>'
      this.init()
      console.log('submit!')
    },
    // 渲染模板
    init() {
      const result = Vue.compile(this.temp)
      this.template = result.render
      console.log(result)
    }
  },
  render(h) {
    return h('div', [this.template()])
  }
}
</script>
