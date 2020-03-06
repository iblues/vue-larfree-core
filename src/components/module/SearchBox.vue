<template>
  <div class="search_box">
    <div class="input-group" style="width:100%">
      <form>
        <div v-if="have" class="rows">
          <el-form ref="form">
            <el-row class="schemas-search" :gutter="20">
              <el-col v-for="schema in schemas" :key="schema.key" :lg="4" :md="6" :sm="8" :xs="12" class="form-group form-input">
                <!--<label style="padding-left: 5px">{{schema.name}}</label>-->
                <lar-form-ceil
                  v-if="schema"
                  v-model="searchData[schema.key]['value']"
                  :data="searchData"
                  :schema="schema"
                  action="search"
                  @searchModel="searchData[schema.key]['searchModel'] = $event"
                />
              </el-col>

            </el-row>

            <!--高级搜索模块-->
            <div v-show="showSearch" class="top-search">
              <el-row style="padding:10px 0">
                <el-col :span="24" style="font-size:16px;">高级筛选</el-col>
              </el-row>
              <el-row class="schemas-search" :gutter="20">
                <el-col v-for="schema in advSchemas" :key="schema.key" :lg="4" :md="6" :sm="8" :xs="12" class="form-group form-input">
                  <!--<label style="padding-left: 5px">{{schema.name}}</label>-->
                  <lar-form-ceil
                    v-if="schema"
                    v-model="searchData[schema.key]['value']"
                    :data="searchData"
                    :schema="schema"
                    action="search"
                    @searchModel="searchData[schema.key]['searchModel'] = $event"
                  />
                </el-col>
              </el-row>
            </div>

            <el-col class="form-group form-input">
              <div>
                <slot name="search" />
                <el-button type="primary" class="reset-btn" icon="el-icon-search" size="medium" @click="search()">搜索</el-button>
                <el-button type="default" class="reset-btn" size="medium" @click="clearSearch()">重置</el-button>
                <el-button
                  v-show="advSchemas.length!==0"
                  type="default"
                  size="medium"
                  class="shai-btn"
                  @click="showSearch = !showSearch"
                >
                  高级筛选<i class="el-icon-arrow-down" style="position: relative;left: 6px" />
                </el-button>
                <slot name="btn" />
              </div>
            </el-col>

          </el-form>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'LarSearchBox',
  props: {
    schemas: {
      type: [Object, Array],
      default: function() {
        return []
      }
    },
    advSchemas: {
      type: [Object, Array],
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      searchData: [],
      showSearch: false // 高级搜索
    }
  },
  computed: {
    have() {
      return this.schemas.length !== 0
    }
  },

  watch: {
    schemas: function() {
      this.initData()
    },
    advSchemas: function() {
      this.initData()
    }
  },
  created: function() {
    // this.searchData = this.$store.getters.getPipe(this.pipeName)
  },
  methods: {
    initData() {
      const schemas = {}
      for (const key in this.schemas) {
        const name = this.schemas[key]['key']
        schemas[name] = {}
      }
      if (this.advSchemas) {
        for (const key in this.advSchemas) {
          const name = this.advSchemas[key]['key']
          schemas[name] = {}
        }
      }
      this.searchData = schemas
      this.loading = false
    },
    searchModel(value) {
      console.log(value)
    },

    // 提交搜索
    search() {
      console.log(this.searchData)
      this.$emit('submit', this.searchData)
    },

    // 情况搜索结果
    clearSearch() {
      for (const key in this.searchData) {
        Vue.set(this.searchData[key], 'value', '')
      }
      this.$emit('clear', this.searchData)
    }

  }
}
</script>
<style  scoped>

  .search_box .form-group {
      margin-bottom:16px;
  }

  .top-search{
      overflow: hidden;
      border-radius:4px;
      padding:0 14px;
      border:1px solid rgba(177,217,255,1);
      background-color: rgba(229,242,255,0.2);
      margin-bottom: 10px;
  }
</style>
