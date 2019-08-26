<template>
  <el-form ref="form" v-loading="loading" label-width="150px">

    <template v-for="schema in Schemas.fields" v-if="Schemas">
      <lar-form-ceil
        v-if="schema"
        v-model="formData[schema.key]"
        :data="formData"
        :schema="schema"
        :error="errors[schema.key]"
        :action="`table`"
      />
      {{ schema.key }}
      <span v-if="debug">Form:{{ formData[schema.key] }}</span>

    </template>

    <div style="text-align: center;">
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-form>
</template>
<script>
export default {
  props: {
    id: String,
    model: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      debug: false,
      errors: [],
      formData: {},
      tableData: [],
      api: '',
      Schemas: [],
      mode: 'add',
      loading: true
    }
  },

  watch: {
    id: function() {
      this.loading = true
      this.getSchemas()
    },
    model: function() {
      // this.loading=true;
      // this.getSchemas();
    },
    readApi: function() {
      // this.getData();
    },
    mode: function() {
      if (this.mode == 'add') { this.$emit('title', '添加') } else { this.$emit('title', '编辑') }
    }
  },

  created: function() {
    this.getSchemas()
    this.debug = localStorage.getItem('debug')
    this.$emit('title', '添加')
    // this.dataChange();
  },

  methods: {
    getSchemas() {
      if (this.id) {
        this.mode = 'edit'
      }

      this.$http.get('/system/component/' + this.model + '/base.' + this.mode + '?mode=' + this.mode, { ttl: 3600 })
        .then((response) => {
          this.Schemas = response.data.data
          if (this.mode == 'edit') {
            // 编辑模式,需先读取数据
            this.readApi = this.$larfree.replaceParm(response.data.data.config.readApi, this)
            this.getData()
          } else {
            // this.getData();
            this.readApi = ''
            // 添加模式 直接加载完成
            this.loading = false
            this.$emit('loaded')
          }
          // 更新接口
          this.api = this.$larfree.replaceParm(response.data.data.config.api, this)
        })
        .catch((error) => {
          this.$message.error('请求错误,或不存在该模块')
          //                    console.log(error);
        })
    },

    getData() {
      // 根据配置 初始化添加的数据结构
      if (this.mode == 'add') {
        const Schemas = {}
        for (var key in this.Schemas['fields']) {
          const name = this.Schemas['fields'][key]['key']
          Schemas[name] = ''
        }
        this.formData = Schemas
        this.loading = false
      } else {
        this.$http.get(this.readApi)
          .then((response) => {
            this.loading = false
            if (response.data.status === 1) {
              this.$emit('loaded')
              this.$debug.log(response.data.data, this.api, this)
              this.formData = response.data.data
            } else {
              this.$message.error('数据错误')
            }
          })
          .catch((error) => {
            this.loading = false
            this.$message.error('请求错误,数据不存在')
            //                        console.log(error);
          })
      }
    },

    onSubmit() {
      this.$emit('loading')
      this.loading = true
      this.$debug.log(this.formData, 'submit', this)
      if (this.mode == 'add') { var http = this.$http.post(this.api, this.formData) } else { var http = this.$http.put(this.api, this.formData) }

      http.then((response) => {
        this.loading = false
        if (response.data.status === 1) {
          this.$message.success(response.data.msg)
          this.formData = response.data.data
          this.$store.commit('refreshEvents', this.model)
          this.$emit('back')
        } else {
          this.errors = response.data.data
          this.$message.error(response.data.msg)
          this.$larfree.goToTop()
        }
      }).catch((error) => {
        this.loading = false
        this.$message.error('请求错误')
      })
      //            this.$debug.log(this.formData,'test');
    },

    cancel() {
      this.$emit('back')
    },

    dataChange() {
      this.$emit('change')
    }
  }
}
</script>
