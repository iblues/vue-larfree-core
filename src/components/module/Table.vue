<template>
  <!--数据表单-->
  <el-table
    class="lar-table"
    :data="data"
    highlight-current-row
    :show-overflow-tooltip="true"
    :header-cell-style="tableHeaderColor"
    style="width: 100%;"
    @selection-change="handleSelectionChange"
    @sort-change="handleSort"
  >
    <!--id的列-->
    <el-table-column v-if="schemas.show&&schemas.show.is_drop.default === '1'" type="expand" width="60">
      <!--<template slot-scope="props">-->
      <!--<slot :name="schemas.show.is_drop.action" :data="{data:props}" />-->
      <!--</template>-->
    </el-table-column>
    <el-table-column
      v-if="schemas.show"
      :sort-change="handleSort"
      type="selection"
      align="center"
      width="36"
    />
    <!--数据的列-->
    <!--sortable-->
    <el-table-column
      v-for="schema in schemas.fields"
      :key="schema.key"
      sortable
      :prop="schema.key"
      :label="schema.name"
      :width="schema.width"
    >
      <template slot-scope="scope">
        <lar-table-ceil
          v-if="schema"
          :data="scope.row"
          :schema="schema"
          :action="'table'"
          @quick-change="quickChange($event,schema.key,scope.row)"
        />
      </template>
    </el-table-column>
    <!--操作的列-->
    <el-table-column
      v-if="hasAction"
      class-name="action-th"
      header-align="center"
      label="操作"
      fixed="right"
      width="80"
    >
      <template slot-scope="scope">
        <slot name="defaultActions">
          <larTableAction :data="scope" :schemas="schemas" @handle="handleAction" />
        </slot>
      </template>
    </el-table-column>
  </el-table>

</template>
<script>
import larTableCeil from '../table/Ceil'
import larTableAction from '../table/Action'

export default {
  name: 'LarTable',
  components: { larTableCeil, larTableAction },
  props: {
    model: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: 'table'
    },
    // 结构蓝图
    schemas: {
      type: Object,
      default: function() {
        return {}
      }
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      isShowCheck: true,
      isShowDrop: true,
      title: '',
      multipleSelection: [],
      zeroing: true,
      pageInfo: {
        per_page: 10,
        total: 0,
        current_page: 1
      },
      canQuickChange: false, // 用于控制当前是否可以开始快速修改. 如果还没有加载完成就可以 会有bug
      loading: true,
      searchQueryCache: {
        data: {},
        time: 0
      }
    }
  },
  computed: {
    hasAction() {
      return this.schemas.config && this.schemas.config.action && Object.keys(this.schemas.config.action).length > 0
    },
    canDel() {
      if (this.schemas.config && this.schemas.config.action.del) {
        return true
      }
      return false
    },
    // dataRefreshEvents() {
    //   return this.$store.getters.getRefreshEvents(this.model)
    // },
    // dataRefreshDialog() {
    //   return this.$store.state.num
    // },

    pipeName() {
      return this.schemas.pipeName ? this.schemas.pipeName : this.model + '.table'
    },

    // 读取vuex的搜索参数进行搜索,  注意pipeName
    searchQuery() {
      // this.zeroing = true
      const data = this.$store.getters.getPipe(this.pipeName)
      console.log(this.$larfree.getSearchQuery(data), 'searchQuery')
      return this.$larfree.getSearchQuery(data)
    },
    searchSchemas: function() {
      if (!this.schemas) { return [] }
      return this.schemas['search']
    },
    advSchemas: function() {
      if (!this.schemas || !this.schemas['adv_search']) { return [] }
      return this.schemas['adv_search']
    }
    // fullApi: function() {
    //   if (!this.api) { return '' }
    //   let query = this.apiQuery
    //   query['pageSize'] = this.pageInfo.per_page * 1
    //   query['page'] = this.pageInfo.current_page
    //   // query = Object.assign(query, this.searchQuery)
    //   if (this.params) {
    //     query = Object.assign(query, this.params)
    //   }
    //   return this.$larfree.httpQuery(query, this.api)
    // }
  },

  watch: {
    // model: function() {
    //   // 清理旧数据
    //   this.apiQuery = {}
    //   this.getSchemas()
    // },
    // dataRefreshEvents: function() {
    //   this.loading = true
    //   this.$emit('change')
    // },
    // dataRefreshDialog: function() {
    //   this.loading = true
    //   this.$emit('change')
    // },
    // 如果api变化就请求数据
    // fullApi: function() {
    //   this.loading = true
    //   this.getData()
    // }
  },

  mounted: function() {
    this.pageInfo = Object.assign(this.pageInfo, this.pageParams)
  },

  methods: {
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #FAFAFA;color: #000;font-weight: 500;height:54px;font-size:14px'
      }
    },
    handelButton(event) {
      if (event.action === 'add') {
        this.add()
      } else if (event.action === 'export') {
        this.export()
      }
      this.$emit('handelButton', event, this.multipleSelection)
    },

    // 渲染操作列
    // actionRender(h){
    //     //如果有操作权限
    //     if(this.schemas.config.button.add)
    //         return <span>操作<span class="add_button"  onClick={this.add}>
    //                     <span>
    //                         <i class="el-icon-plus"></i>
    //                     </span>
    //                 </span></span>;
    //     else
    //         return <span>操作</span>;
    // },
    // 处理下action的触发时间
    handleAction({ index, data, action }) {
      this.$debug.log(action)
      if (action.url) {
        const url = this.$larfree.replaceParm(action.url, data)
        this.$debug.log(url, 'actionUrl', this)
        this.$router.push({ path: url })
      } else if (action.action) {
        const func = this.$larfree.replaceParm(action.action, data)
        action.real_api = this.$larfree.replaceParm(action.api, data)
        if (this[func]) {
          this[func](index, data, action)
        } else {
          this.$emit(action.action, { index, data, action })
        }
      }
    },

    // 第一列选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('SelectionChange', val)
    },

    handleSort(column) {
      let sort = 'desc'
      if (column.order === 'ascending') { sort = 'asc' }
      this.$emit('change-sort', column.column.property + '.' + sort)
    },
    // 批量删除
    delMultiRows() {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 读取操作按钮中的删除操作 如果没有 说明不能删除
        let delAction = this.schemas.config.action.filter((item) => {
          if (item.action === 'delRows') { return item }
        })
        if (delAction.length < 1) {
          this.$message.error('无权删除')
          return false
        }
        delAction = delAction[0]
        this.multipleSelection.forEach((item) => {
          const api = this.$larfree.replaceParm(delAction.api, item)
          this.emitDoApi(api, 'del')
        })
      }).catch(() => {

      })
    },

    // 直接删除
    delRows(index, data, action) {
      this.$confirm('是否删除' + data.id + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((data) => {
        this.emitDoApi(action.real_api, 'del')
      }).catch(() => {
        // 取消
      })
    },

    // 统一提交事件
    emitDoApi(api, action) {
      this.$emit('do-api', { 'api': api, 'action': action })
    },
    // 添加
    add() {
      this.$router.push({ path: this.schemas.config.button.add.url })
    },

    /**
     * 快速修改
     * @param $event
     * @param key
     * @param data
     */
    quickChange($event, key, data) {
      this.$emit('quick-change', { 'key': key, 'data': data, 'value': $event })
      // if (this.canQuickChange) {
      //   const newValue = $event
      //   // this.$debug.log(this.schemas);
      //   const url = this.$larfree.replaceParm(this.schemas.config.quick_change_api, data)
      //   const putData = {}
      //   putData[key] = newValue
      //   this.$api(url, putData)
      //     .then((response) => {
      //       if (response.data.status === 1) {
      //         this.$message.success(response.data.msg)
      //       } else {
      //         this.$message.error(response.data.msg)
      //       }
      //     })
      //     .catch((error) => {
      //       console.log('table.quickChange', error)
      //       this.$message.error('请求数据错误')
      //     })
      // }
    }

  }
}
</script>
