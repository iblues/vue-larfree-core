/**
* 渲染表单. 逻辑部分在父组件处理. 此部分只处理渲染.
* @author Blues
* <lar-form v-model="value" :schemas="schemas" />
* 'schemas':{'fields':[{'model':{'name':'模块名','type':'text'}}]}
*
*/
<template>
  <el-form
    v-if="schemas"
    ref="form"
    class="lar-form"
    label-position="top"
    style="padding: 5px 10px;"
    label-width="150px"
  >
    <template v-for="(schema,key) in schemas.fields">
      <transition :key="key" name="fade">

        <!--condition 满足条件才显示. 默认都显示-->
        <span v-show="condition(schema.condition)" :key="key" class="row-item-span">
          <!--{{schema | result('key',123)}}-->
          <template v-if="!schema.group_children">
            <el-form-item :key="key" :label="schema.name" style="margin-left: 10px;padding:0">
              <lar-form-ceil
                v-if="schema"
                v-model="formData[key]"
                :data="formData"
                :schema="fattenFields[key]"
              />
              <span class="help-block m-b-none" v-html="schema.tip" />
            </el-form-item>
          </template>

          <template v-else>
            <div class="row-title">{{ schema.name }}</div>
            <!--<hr style="margin-bottom: 10px;"/>-->
            <el-row :gutter="20" style="margin: 0">
              <template v-for="(children_schema,children_key) in schema.group_children">
                <transition :key="children_key" name="fade">
                  <!--condition 满足条件才显示. 默认都显示-->
                  <el-col v-show="condition(children_schema.condition)" :key="children_key" :span="12">
                    <el-form-item style="top:-5px;position:relative">
                      <span
                        class="help-block m-b-none"
                        v-html="fattenFields[children_key].name"
                      />
                      <lar-form-ceil
                        v-if="children_schema"
                        v-model="formData[children_key]"
                        style="float:none"
                        :data="formData"
                        :schema="fattenFields[children_key]"
                        @updateData="updateData"
                      />
                      <span
                        class="help-block m-b-none"
                        v-html="fattenFields[children_key].tip"
                      />
                    </el-form-item>
                  </el-col>
                </transition>
              </template>
            </el-row>
          </template>

          <!--{{schema.key}}-->
          <span v-if="debug">Form:{{ formData[key] }}</span>
        </span>
      </transition>

    </template>

    <slot name="bottom">
      <div style="text-align: center;margin-top: 20px">
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </slot>
  </el-form>
</template>
<script>
export default {
  name: 'LarForm',
  props: {
    id: {
      type: [Number, String],
      default: null
    },
    action: {
      type: String,
      default: 'edit'
    },
    // 结构蓝图
    schemas: {
      type: Object,
      default: function() {
        return {}
      }
    },
    value: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      debug: false,
      errors: [],
      formData: {},
      tableData: [],
      api: '',
      mode: 'add'
    }
  },

  computed: {
    fattenFields: function() {
      const schemas = this.$larfree.getFlattenColumns(this.schemas['fields'], 'group_children')
      for (const key in schemas) {
        schemas[key]['key'] = key
      }
      return schemas
    }
  },
  watch: {
    readApi: function() {
      // this.getData();
    },
    mode: function() {
      if (this.mode === 'add') {
        this.$emit('title', '添加')
      } else {
        this.$emit('title', '编辑')
      }
    },
    value: {
      handler() {
        this.updateData()
      },
      deep: true
    },

    formData: function(newValue) {
      this.$emit('update', newValue)
    }
  },

  created: function() {
    this.formData = this.value
    this.debug = localStorage.getItem('debug')
    this.$emit('title', '添加')
    // this.dataChange();
  },

  methods: {
    condition(condition) {
      if (condition) {
        return this.$larfree.evil(this.$larfree.replaceParm(condition, this.formData, '"'))
      } else {
        return true
      }
    },
    updateData() {
      this.formData = this.value
    },

    onSubmit() {
      this.$emit('submit', this.formData)
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

    .form .row-item-span:first-child .row-title {
        margin-top: 0;
    }
</style>
<style>
    .lar-form .el-form--label-top .el-form-item__label {
        padding: 0 !important;
        margin-bottom: 0px;
    }

    .lar-form .row-title {
        font-size: 14px;
        padding: 10px;
        background-color: rgba(240, 240, 245, 0.5);
        margin-top: 15px;
    }
</style>
