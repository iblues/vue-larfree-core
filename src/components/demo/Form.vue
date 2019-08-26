<template>
  <span>
    <el-form ref="form" v-loading="loading" label-position="top" style="padding: 5px 10px;" label-width="150px">

      <el-form-item label="测试" :error="schemas['id']['error']" style="margin-left: 10px;padding:0">
        <lar-form-ceil
          v-model="data['id']"
          :data="data"
          :schema="schemas['id']"
        />
      </el-form-item>

      <el-form-item label="测试" style="margin-left: 10px;padding:0">
        <lar-form-ceil
          v-model="data['title']"
          :data="data"
          :schema="schemas['title']"
        />
        <span class="help-block m-b-none">提示信息</span>
      </el-form-item>

      <el-form-item label="测试" style="margin-left: 10px;padding:0">
        {{ data['has_many'] }}
        <lar-form-ceil
          v-model="data['has_many']"
          :data="data"
          :schema="schemas['has_many']"
        />
        <span class="help-block m-b-none">提示信息</span>
      </el-form-item>

      <el-form-item label="测试" style="margin-left: 10px;padding:0">
        {{ data['has_many'] }}
        <lar-form-ceil
          v-model="data['has_many']"
          :data="data"
          :schema="schemas['has_many']"
        />
        <span class="help-block m-b-none">提示信息</span>
      </el-form-item>

      <el-form-item label="belongsToMany连表" style="margin-left: 10px;padding:0">
        {{ data['select'] }}
        <lar-form-ceil
          v-model="data['select']"
          :data="data"
          :schema="schemas['select']"
        />
        <span class="help-block m-b-none">提示信息</span>
      </el-form-item>

      <div style="text-align: center;">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </div>

    </el-form>
  </span>

</template>
<script>
export default {
  data() {
    return {
      'loading': false,
      'api': '',
      'data': {
        'id': 1,
        'title': 123,
        'has_many': 2,
        'select': {}
      },
      'schemas': {
        'id': {
          'name': 'id',
          'tip': '主键',
          'type': 'text',
          'pk': true,
          'key': 'id',
          'error': '错误测试'
        },
        'title': {
          'name': '标题',
          'tip': '<span style="color:red">测试HTML</span>',
          'type': 'text',
          'rule': {
            '0': 'required_with:select',
            'min:2': '最小2位',
            'max:10': '最大10位'
          },
          'key': 'title'
        },
        'has_many': {
          'name': '商品',
          'tip': '',
          'type': 'select',
          'link': {
            'model': ['hasMany', 'App\\Models\\Test\\TestTestDetail'],
            'field': ['id', 'uid', 'content', 'test_test_id'],
            'select': ['id', 'uid', 'content'],
            'url': 'http://vue.lar/api/manager/test/test_detail?pageSize=30',
            'show': 'edit/test.test_detail/{{id}}'
          },
          'key': 'has_many'
        },
        'user_id': {
          'name': '用户id',
          'tip': '用户信息',
          'type': 'select',
          'link': {
            'model': ['belongsTo', 'App\\Models\\Common\\CommonUser', 'user_id', 'id'],
            'as': 'user',
            'select': ['id', 'name', 'phone'],
            'field': ['id', 'name', 'phone'],
            'url': 'http://vue.lar/api/manager/common/user?pageSize=30',
            'show': 'edit/common.user/{{id}}'
          },
          'key': 'user_id'
        },
        'select': {
          'name': 'belongsToMany连表',
          'tip': '',
          'type': 'select',
          'td_width': '200',
          'link': {
            'select': ['id', 'name', 'phone'],
            'field': ['id', 'name', 'phone'],
            'url': 'http://vue.lar/api/manager/common/user?pageSize=30',
            'show': 'edit/common.user/{{id}}'
          },
          'multi': true,
          'key': 'select'
        },
        'upload': {
          'name': 'upload',
          'tip': '',
          'type': 'image',
          'key': 'upload'
        },
        'file': {
          'name': '文件',
          'tip': '',
          'type': 'image',
          'multi': true,
          'key': 'file',
          'cast': 'array'
        }

      }

    }
  },
  methods: {
    onSubmit() {
      this.$emit('loading')
      this.loading = true
      this.$debug.log(this.formData, 'submit', this)
      var http = this.$http.post(this.api, this.formData)
      //                    var http = this.$http.put( this.api ,this.formData);
      http.then((response) => {
        this.loading = false
        if (response.data.status === 1) {
          this.$message.success(response.data.msg)
          this.formData = response.data.data
          //                        this.$store.commit('refreshEvents',this.model);
          this.$emit('back')
        } else {
          this.errors = response.data.data
          this.$message.error(response.data.msg)
          this.$larfree.goToTop()
        }
      }).catch(() => {
        this.loading = false
        this.$message.error('请求错误')
      })
      //            this.$debug.log(this.formData,'test');
    }
  }
}
</script>
<style>
</style>
