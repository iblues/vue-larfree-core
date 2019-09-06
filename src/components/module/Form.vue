
<template>
  <el-form ref="form" v-loading="loading" class="form" label-position="top" style="padding: 5px 10px;" label-width="150px">

    <template v-for="(schema,index) in Schemas.component_fields" v-if="Schemas">
      <span :key="index" class="row-item-span">
        <!--{{schema | result('key',123)}}-->
        <template v-if="!schema.group_children">
          <el-form-item :key="index" :label="schema.name" style="margin-left: 10px;padding:0">
            <lar-form-ceil
              v-if="schema"
              v-model="formData[schema.key]"
              :data="formData"
              :schema="Schemas['fields'][schema.key]"
            />
            <span class="help-block m-b-none" v-html="schema.tip" />
          </el-form-item>
        </template>

        <template v-else>
          <div class="row-title">{{ schema.name }}</div>
          <!--<hr style="margin-bottom: 10px;"/>-->
          <el-row :gutter="20" style="margin: 0">
            <template v-for="(children_schema,index) in schema.group_children">
              <el-col :key="index" :span="12">
                <el-form-item style="top:-5px;position:relative">
                  <strong
                    class="help-block m-b-none"
                    v-html="Schemas['fields'][children_schema.key].name"
                  />
                  <lar-form-ceil
                    v-if="children_schema"
                    v-model="formData[children_schema.key]"
                    style="float:none"
                    :data="formData"
                    :schema="Schemas['fields'][children_schema.key]"
                    @updateData="updateData"
                  />
                  <span
                    class="help-block m-b-none"
                    v-html="Schemas['fields'][children_schema.key].tip"
                  />
                </el-form-item>
              </el-col>
            </template>
          </el-row>
        </template>

        <!--{{schema.key}}-->
        <span v-if="debug">Form:{{ formData[schema.key] }}</span>
      </span>

    </template>

    <div style="text-align: center;margin-top: 20px">
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-form>
</template>
<script>
export default {
  name: 'LarForm',
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
    updateData(data) {
      this.formData = data
    },
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
          this.$message.error(error.response.data.msg)
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
            this.$message.error(error.response.data.msg)
            //                        console.log(error);
          })
      }
    },

    onSubmit() {
      this.$emit('loading')
      this.loading = true
      this.$debug.log(this.formData, 'submit', this)
      let http
      if (this.mode == 'add') { http = this.$http.post(this.api, this.formData) } else { http = this.$http.put(this.api, this.formData) }

      http.then((response) => {
        this.loading = false
        if (response.data.status === 1) {
          this.$message.success(response.data.msg)
          this.formData = response.data.data
          this.$store.commit('refreshEvents', this.model)
          this.$store.commit('refreshDialog')
          this.$emit('back')
        } else {
          this.errors = response.data.data
          this.$message.error(response.data.msg)
          this.$larfree.goToTop()
        }
      }).catch((error) => {
        this.loading = false
        this.$message.error(error.response.data.msg)
        return true
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

<style scoped>
    .el-form-item {
        margin-bottom: 0px;
    }
    .form .row-item-span:first-child .row-title{
        margin-top: 0;
    }
</style>
<style>
    .el-form--label-top .el-form-item__label {
        padding: 0 !important;
        margin-bottom: 0px;
    }
    .row-title{
        /*margin: 10px 10px 0 10px;*/
        font-size: 14px;
        padding: 10px;
        background-color: #eee;
        margin-top: 15px;
    }
    /*.el-form-item__content{*/
    /*line-height: 20px !important;*/
    /*}*/
</style>
