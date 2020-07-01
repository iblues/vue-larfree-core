<template>
  <span>
    <template v-if="action == 'table'">
      <ul style="list-style: none;padding:0">
        <li
          v-for="(button,key) in show"
          :key="key"
          style="display: inline-block"
        >

          <template v-if="key!=0"> , </template>
          <el-tooltip
            class="item"
            effect="dark"
            :content="button.show"
            placement="top"
            type="text"
          >
            <span @click="goToEdit(fieldLink.show,button.value)">  {{ button.show }}</span>
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

        <el-option-group v-if="fieldComponentParam.api" label="请输入关键词获取更多" />
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
  name: 'LarFieldSelectRemoteMultiSelect',
  extends: base,
  props: {
    fieldLink: {
      // 连表的相关结构
      type: Object,
      require: true,
      default: function() {
        return {}
      }
    },
    fieldOption: {
      // 如果不远程连表的话,这个代表备选数据
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      option: [], // 远程调用存储数据的地方,
      optionHash: {},
      multiple: true,
      searchModel: 'link',
      oldOption: [], // 存储之前选择的.否则可能不显示
      remote: true
    }
  },
  computed: {
    show() {
      // 链表多选
      const name = []
      this.value.forEach(value => {
        // 支持larfree拼接语法
        const tmpValue = this.$larfree.replaceParm(this.fieldComponentParam.name || '{缺失name}', value)
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
              const key = this.fieldComponentParam.key || 'id'
              if (item[key]) {
                // 作为备选option
                this.setOption(
                  item[key],
                  item,
                  this.fieldComponentParam.name
                )
                this.value.splice(index, 1, item[key]) // 矫正value值
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
    // setTimeout(() => {
    //   localStorage.removeItem(this.fieldLink.url)
    // }, 20000)
    if (this.action !== 'table') {
      // 缓存
      this.remoteMethod()
    }
    this.$emit('searchModel', this.searchModel)// 重新声明下
  },
  methods: {
    goToEdit(url, data) {
      this.$router.push(this.$larfree.replaceParm(url, data))
    },
    // 初始化下拉框
    initOption() {
      // this.setOption(0, '全部');

      // 只有编辑模式不需要option
      if (this.action !== 'edit') {
        return false
      }
    },

    // 添加新的option
    setOption(key, data, schema) {
      // 如果是数字 就改成数字
      if (!isNaN(key)) key = key * 1

      // 支持larfree拼接语法
      const value = this.$larfree.replaceParm(schema || '{缺失name}', data)

      const item = { value: key, label: value }
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
    /**
     * 情况其他的备选项, 但是已选择的不能清理
     */
    clearOption() {
      // console.log("clearOption");
      const selectedOption = []
      const optionHash = {}
      this.value.forEach((v) => {
        this.option.forEach((o) => {
          if (v === o.value) {
            selectedOption.push(o)
            optionHash[o.value] = o
          }
        })
      })
      this.option = selectedOption
      this.optionHash = optionHash
    },

    // 远程读取数据,供给下拉
    remoteMethod(query) {
      //                if (query !== '') {
      this.loading = true
      let api = this.fieldComponentParam.api
      if (!api) {
        console.log('remoteMethod:路径错误')
      }

      const key = this.fieldComponentParam.key || 'id'

      if (query) {
        // 有搜索条件的时候,api拼接
        const field = this.fieldComponentParam.search_key || this.$larfree.getParamKey(this.fieldComponentParam.name).splice(0).join('|')
        const keyword = query
        query = {}
        query[field] = '$%' + keyword + '%'
        api = this.$larfree.httpQuery(query, api)
        this.clearOption()
      }

      this.$http
        .get(api)
        .then(response => {
          // console.log("remoteMethod:", this.fieldLink, response.data.data);
          // localStorage.setItem(api, JSON.stringify(response.data.data))
          response.data.map(item => {
            this.setOption(
              item[key],
              item,
              this.fieldComponentParam.name
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
