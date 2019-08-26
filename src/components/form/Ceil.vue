
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
      let html = ''
      const bind = this.getBind(schema)
      let type = 'input'

      type = schema.type
      const Vue = Window.larfree.vue
      if (!Vue.component('LarField' + this.$larfree.ucfrist(type))) {
        type = 'input'
      }
      html = `<lar-field-${type}
                    ${bind}
                    :data="data"
                    :action="action"
                    :value="value"
                    v-on = "$listeners">
                </lar-field-${type}>`

      // console.log(schema, this.data, this.action, this.value, html);
      return html
    },
    // 解析需要额外绑定的参数
    getBind(schema) {
      var bindData = ''
      for (const key in schema) {
        const ukey = this.$larfree.ucfrist(this.$larfree.toHump(key))
        bindData += ` :field${ukey}="schema['${key}']"`
      }
      for (const key in this.$attrs) {
        bindData += `  :${key}="$attrs['${key}']"`
      }
      // console.info('bindData',bindData);
      return bindData
    },
    // 渲染模板
    init() {
      const Vue = Window.larfree.vue
      const result = Vue.compile(this.temp)
      this.template = result.render
    }
  },
  render(h) {
    return h('div', [this.template()])
  }
}
</script>
