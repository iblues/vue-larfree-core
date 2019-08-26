
<style>
.inline-multi .el-select__tags {
  display: inline-block;
  white-space: nowrap;
  overflow-x: hidden;
}
</style>
<style scoped>
.button {
  border: 1px solid #dcdfe6;
  padding: 3px;
  padding-left: 4px;
  border-radius: 5px;
  background: white;
  margin-bottom: 2px;
  text-align: center;
}

.button a {
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #606266;
}

.button a:hover {
  color: #409eff;
}

img {
  width: 50px;
}

.el-select {
  width: 220px;
}
</style>
<template>
  <span>
    <template v-if="action == 'table'">
      <!--<el-button v-for="button in show">-->
      <!--{{button}}-->
      <!--</el-button>-->
      <ul style="list-style: none;padding:0">
        <li v-for="button in show" class="button">
          <el-tooltip
            class="item"
            effect="dark"
            :content="button.show"
            placement="top"
          >
            <router-link :to="getShowUrl(fieldLink.show, button.value)">
              {{ button.show }}
            </router-link>
          </el-tooltip>
        </li>
      </ul>
    </template>
    <template v-if="action == 'search'">
      <el-select
        ref="selectComponent"
        style="width:100%"
        :value="value"
        class="RemoteMultiSelect inline-multi"
        :multiple="true"
        :loading="loading"
        :placeholder="fieldName"
        v-on="$listeners"
      >
        <el-option
          v-for="item in option"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
        <!-- <el-option-group v-if="fieldLink.model"
                                 label="请输入关键词获取更多">
                </el-option-group> -->
      </el-select>
    </template>
    <template v-if="action == 'edit'">
      <el-select
        ref="selectComponent"
        style="width:100%"
        :value="value"
        filterable
        class="RemoteMultiSelect"
        :multiple="true"
        reserve-keyword
        :loading="loading"
        :remote="remote"
        :remote-method="remoteMethod"
        :placeholder="fieldName"
        v-on="$listeners"
      >
        <el-option
          v-for="item in option"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />

        <el-option-group v-if="fieldLink.model" label="请输入关键词获取更多" />
      </el-select>
    </template>
  </span>
</template>
<script>
// 流程
// 1.先初始化下option下拉
// 2.如果已经有选中的. 先把他的值往option里面填充下(避免没有对应的option),然后选中.
// 3.搜索的时候  动态加载远程更多
import base from '../base.js'

export default {
  extends: base,
  props: {
    fieldLink: {
      // 连表的相关结构
      type: Object,
      require: true
    },
    fieldName: {
      // 连表的相关结构
      type: String
    },
    fieldOption: {
      // 如果不远程连表的话,这个代表备选数据
      type: Array,
      default: function() {
        return []
      }
    },
    fieldKey: String
  },
  data() {
    return {
      loading: false,
      option: [], // 远程调用存储数据的地方,
      optionHash: {},
      multiple: true,
      remote: true
    }
  },
  computed: {
    show() {
      // 链表多选
      const name = []
      this.value.forEach(value => {
        let tmpValue = ''
        this.fieldLink.select.forEach((v, k) => {
          if (k > 0 && v && value[v]) {
            tmpValue += value[v] + ' '
          }
        })
        name.push({ show: tmpValue, value: value })
      })
      return name
    }
  },
  watch: {
    data: function() {
      this.initOption()
    },
    value: {
      handler() {
        if (this.action !== 'table') {
          // let selected = [];
          // 有值的话
          if (
            typeof this.value === 'object' &&
            typeof this.value[0] === 'object'
          ) {
            // let option = [];
            // console.log(
            //   "watch: value:",
            //   this.value,
            //   "fieldLink:",
            //   this.fieldLink
            // );

            this.value.forEach((item, index) => {
              if (item[this.fieldLink.select[0]]) {
                // 作为备选option
                this.setOption(
                  item[this.fieldLink.select[0]],
                  item,
                  this.fieldLink.select
                )
                this.value.splice(index, 1, item[this.fieldLink.select[0]]) // 矫正value值
                // 选中的
                // selected.push(value[this.fieldLink.select[0]]);
              }
              // this.myValue = selected;
            })
          }
        }
      },
      deep: true
    }
  },
  created() {
    //            this.remote = this.fieldLink?true:false;
    //            this.multiple=this.fieldMulti?true:false;
  },
  mounted() {
    // this.myValue = [];
    // 查看模式 ,不需要初始化了.编辑模式才需要option
    setTimeout(() => {
      localStorage.removeItem(this.fieldLink.url)
    }, 20000)
    if (this.action !== 'table') {
      if (localStorage.getItem(this.fieldLink.url)) {
        JSON.parse(localStorage.getItem(this.fieldLink.url)).map(item => {
          this.setOption(
            item[this.fieldLink.select[0]],
            item,
            this.fieldLink.select
          )
        })
      } else {
        this.remoteMethod()
      }
    }
  },
  methods: {
    // 初始化下拉框
    initOption() {
      // this.setOption(0, '全部');

      // 只有编辑模式不需要option
      if (this.action !== 'edit') {
        return false
      }
    },

    getShowUrl(url, data) {
      return this.$larfree.replaceParm(url, data)
    },

    // 添加新的option
    setOption(key, data, schema) {
      // 如果是数字 就改成数字
      if (!isNaN(key)) key = key * 1

      // 如果schema存在,那就可能字段备选.
      let label = ''
      if (schema) {
        schema.forEach((v, k) => {
          if (k > 0 && v && data[v]) {
            label += data[v] + ' '
          }
        })
      }
      // console.log(
      //   `setOption: value: ${key}, label:${label}, schema:${schema}`,
      //   data
      // );

      const item = { value: key, label: label }
      // 检查是否重复了
      if (this.optionHash[key]) {
        return item
      } else {
        this.option.push(item)
        this.optionHash[key] = {
          option: item,
          orgData: data
        }
      }
    },
    clearOption() {
      // console.log("clearOption");
      this.option = []
      this.optionHash = {}
    },

    // 远程读取数据,供给下拉
    remoteMethod(query) {
      //                if (query !== '') {
      this.loading = true
      let api = this.fieldLink.url
      if (!api) {
        console.log('remoteMethod:路径错误')
      }

      const preHash = this.optionHash
      if (query) {
        // 有搜索条件的时候,api拼接
        const field = this.fieldLink.select.slice(0)
        const name = field.splice(1).join('|') + '$'
        const keyword = query
        query = {}
        query[name] = '%' + keyword + '%'
        api = this.$larfree.httpQuery(query, api)
        this.clearOption()
      }

      // 保留上一次选中项,作为待选项
      this.$refs.selectComponent.selected.forEach(item => {
        this.setOption(item.value, preHash[item.value].orgData, this.fieldLink.select)
      })

      this.$http
        .get(api)
        .then(response => {
          // console.log("remoteMethod:", this.fieldLink, response.data.data);
          localStorage.setItem(api, JSON.stringify(response.data.data))
          response.data.data.map(item => {
            this.setOption(
              item[this.fieldLink.select[0]],
              item,
              this.fieldLink.select
            )
          })
          this.loading = false
          //                      this.debug.log(this.option);
        })
        .catch(error => {
          console.log(error, 'remoteMethod')
        })
    }
  }
}
</script>
