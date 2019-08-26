<script>
import Vue from 'vue'
export default {
  name: 'LarTableCeil',
  props: {
    data: Object,
    schema: Object,
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
  watch: {
    data: function() {
      //                this.$debug.log(this.formData,'datas');
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
    chooseComponent(schema) {
      var html = ''
      var bind = this.getBind(schema)
      var type = 'input'
      switch (schema.type) {
        default :
          type = schema.type
          if (!Vue.component(`lar-field-${type}`)) {
            type = 'input'
          }
          html = `<span>
${schema.type}
                            <lar-field-${type}
                                :data="data"
                                ${bind}
                                :action="action"

                                v-on = "$listeners"
                                v-model="data[schema['key']]"
                            >
                            </lar-field-${type}>
                            </span>
                         `
          break
      }
      return html
    },

    getBind(schema) {
      var bindData = ''
      for (var key in schema) {
        const ukey = key.substring(0, 1).toUpperCase() + key.substring(1)
        bindData += ` :field${ukey}="schema['${key}']"`
      }
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
