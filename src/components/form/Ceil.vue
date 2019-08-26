
<script>
export default {
  inheritAttrs: false,
  props: {
    action: {
      type: String,
      default: 'edit'
    },

    data: Object,
    value: {}

  },
  data() {
    return {
      schema: {},
      temp: '',
      template: function() {
        return null
      }
    }
  },
  computed: {
    errorTip: function() {
      if (typeof this.$attrs['error'] === 'object') {
        return this.$attrs['error'].toString()
      } else {
        return this.$attrs['error']
      }
    }
  },
  created() {
    this.schema = this.$attrs['schema']
    //            this.$debug.log(this.$attrs)//注意这里
    this.Ready()
  },
  methods: {
    Ready() {
      this.temp = this.chooseComponent(this.schema)
      this.init()
    },
    chooseComponent(schema) {
      // console.info('schema',schema);
      var html = ''
      var bind = this.getBind(schema)
      var type = 'input'

      switch (schema.type) {
        // 可以对其他的组建 做特殊化处理
        default :
          type = schema.type
          if (!Vue.component(`lar-field-${type}`)) {
            type = 'input'
          }
          html = `<lar-field-${type}
                            ${bind}
                            :data="data"
                            :action="action"
                            :value="value"
                            v-on = "$listeners">
                        </lar-field-${type}>`
          break
      }
      // console.log(schema, this.data, this.action, this.value, html);
      return html
    },
    // 解析需要额外绑定的参数
    getBind(schema) {
      var bindData = ''
      for (var key in schema) {
        const ukey = key.substring(0, 1).toUpperCase() + key.substring(1)
        bindData += ` :field${ukey}="schema['${key}']"`
      }
      for (var key in this.$attrs) {
        bindData += `  :${key}="$attrs['${key}']"`
      }
      // console.info('bindData',bindData);
      return bindData
    },
    // 渲染模板
    init() {
      const result = Vue.compile(this.temp)
      this.template = result.render
    }
  },
  render(h) {
    return h('div', [this.template()])
  }
}
</script>
