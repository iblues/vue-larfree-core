<script>

export default {
  name: 'LarTableCeil',
  props: {
    // 整列的数据
    data: {
      type: Object,
      default: function() {
        return {}
      }
    },
    schema: {
      type: Object,
      default: function() {
        return {}
      }
    },
    action: {
      type: String,
      default: 'table'
    }
  },
  data() {
    return {
      temp: '',
      template: function() {
        return null
      }
    }
  },

  computed: {
    componentValue: function() {
      return this.$larfree.arrayGet(this.data, this.schema['key'])
    }
  },
  watch: {
    data: function() {
      this.Ready()
    },
    schema: function() {
      this.Ready()
    }

  },
  created() {
    this.Ready()
  },
  methods: {
    Ready() {
      this.temp = this.chooseComponent(this.schema)
      this.init()
    },
    // 生成模板
    chooseComponent(schema) {
      var html = ''
      var bind = this.getBind(schema)
      var type = 'input'
      type = schema.type

      const Vue = Window.larfree.vue
      if (!Vue.component('LarField' + this.$larfree.ucfrist(type))) {
        type = 'input'
      }

      html = `<span>
                <lar-field-${type}
                    :data="data"
                    ${bind}
                    :action="action"

                    v-on = "$listeners"
                    :value="componentValue"
                >
                </lar-field-${type}>
              </span>
             `
      return html
    },

    getBind(schema) {
      var bindData = ''
      for (const key in schema) {
        const ukey = this.$larfree.ucfrist(this.$larfree.toHump(key))
        bindData += ` :field${ukey}="schema['${key}']"`
      }
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
