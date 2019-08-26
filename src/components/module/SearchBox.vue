<template>
  <div class=" search_box">
    <div class="input-group" style="width:100%">

      <form _lpchecked="1">
        <div class="rows">
          <el-form v-if="searchData && have" ref="form">
            <el-row class="schemas-search">
              <el-col v-for="schema in schemas" :key="schema.key" style="width: 16%;" class="form-group form-input">
                <!--<label style="padding-left: 5px">{{schema.name}}</label>-->
                <lar-form-ceil
                  v-if="schema"
                  v-model.lazy="searchData[schema.key]['value']"
                  :data="searchData"
                  :schema="schema"
                  action="search"
                  @searchModel="searchData[schema.key]['searchModel'] = $event"
                />
              </el-col>
              <el-col :span="24" class="form-group">
                <div>
                  <!--<label>&nbsp;</label>-->
                  <!--<el-button type="primary" size="medium" @click="toSearch()">搜 索</el-button>-->
                  <slot name="search" />
                  <el-button type="default" size="mini" class="reset-btn" @click="clearSearch()">重 置</el-button>
                  <el-button
                    v-show="advSchemas.length!==0"
                    type="default"
                    size="mini"
                    class="shai-btn"
                    @click="showSearch = !showSearch"
                  >
                    高级筛选<i class="el-icon-arrow-down" style="position: relative;left: 6px" />
                  </el-button>
                </div>
              </el-col>
            </el-row>
            <div v-show="showSearch" class="top-search">
              <el-row style="padding:10px 0">
                <el-col :span="24" style="font-size:16px;">高级筛选</el-col>
              </el-row>
              <el-row>
                <el-col v-for="schema in advSchemas" :key="schema.key" style="width: 16%;overflow: hidden;" class="form-group form-inputs">
                  <!--<label style="padding-left: 5px">{{schema.name}}</label>-->
                  <lar-form-ceil
                    v-if="schema"
                    v-model.lazy="searchData[schema.key]['value']"
                    :data="searchData"
                    :schema="schema"
                    action="search"
                    @searchModel="searchData[schema.key]['searchModel'] = $event"
                  />
                </el-col>
              </el-row>
            </div>

          </el-form>
          <div v-else>
            <slot name="search" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    model: {
      type: String
    },
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
    },
    pipeName: { String }
  },
  data() {
    return {
      searchData: [],
      showSearch: false,
      delay: 2000, // 毫秒,延迟执行
      timeout: null
    }
  },
  computed: {
    have() {
      return this.schemas.length !== 0
    }
    //            pipe() {
    //                return this.$store.getters.getPipe(this.pipeName);
    //            },
  },

  watch: {
    schemas: function() {
      this.initData()
    },
    advSchemas: function() {
      this.initData()
    },
    model: function() {
      this.initData()
    },
    //            pipe(){
    //                this.searchData = this.pipe;
    //            },
    searchData: {
      handler(newValue) {
        // console.info('newValue',newValue)
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.update(newValue)
        }, 500)
      },
      deep: true
    }
  },
  created: function() {
    //          this.initData();
    //             console.info(this.searchData);
    this.searchData = this.$store.getters.getPipe(this.pipeName)
  },
  methods: {
    update(newValue) {
      let data
      if (newValue) {
        data = JSON.parse(JSON.stringify(newValue))
      } else {
        data = []
      }
      // console.info('data',data);
      this.$store.commit('pipe', { 'value': data, 'name': this.pipeName })
      // this.$emit('input', data);
    },
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
    toSearch() {
    }, // 去搜索
    clearSearch() { // 去清空
      for (const key in this.searchData) {
        Vue.set(this.searchData[key], 'value', null)
      }
      this.update(this.searchData)
    }

    // 获取配置

  }
}
</script>
<style lang="less">
    .schemas-search .form-input:nth-of-type(5n + 2){
        margin:0 5%;
    }
    .schemas-search .form-input:nth-of-type(5n + 4){
        margin:0 5%;
    }
    .top-search .form-inputs:nth-of-type(5n + 2){
        margin:0 5%;
    }
    .top-search .form-inputs:nth-of-type(5n + 4){
        margin:0 5%;
    }
</style>
<style lang="less" scoped>
        .reset-btn{
            background: rgba(0,150,136,0.05);
            border: 1px solid #009688;
            color: #009688;
        }
        .reset-btn:hover{
            color: #5FB878;
            border: 1px solid #5FB878;
        }
        /*.shai-btn{*/
            /*border: 1px solid #999;*/
        /*}*/
        .shai-btn:hover{
            color: #5FB878;
            border: 1px solid #5FB878;
        }
    .search_box .form-group {
        margin-bottom:16px;
    }

    .search_box .el-form-item__content {
        margin-left: 0 !important;
    }

    .search_box .help-block {
        display: none;
    }
    .top-search{
        overflow: hidden;
        border-radius:4px;
        padding:0 14px;
        border:1px solid rgba(0,150,136,1);
        background-color: rgba(95,184,120,0.02);
        margin-bottom: 20px;
    }
    /*@media screen and (max-width: 1400px) {*/
        /*.search_box .form-group {*/
            /*margin-right: 6px;*/
        /*}*/
    /*}*/
</style>
