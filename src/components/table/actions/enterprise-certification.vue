<style lang="less" scoped>
.column {
  text-align: center;
}
.btn {
  padding: 5px 0;
  font-size: 14px;
  font-weight: 400;
  color: rgba(25, 137, 250, 1);
  line-height: 20px;
}
.btn-refuse {
  &,
  &:hover {
    color: rgba(241, 47, 29, 1);
  }
}
.btn-pass {
  &,
  &:hover {
    color: rgba(56, 158, 13, 1);
  }
}
.split {
  margin: 0 5px;
  color: rgba(212, 212, 212, 1);
}
</style>


<template>
  <div class="column">
    <el-button class="btn btn-detail" type="text" @click="onViewDetail">{{
      action.detail.html
    }}</el-button>

    <!-- 1-审核中，2-审核通过，3-审核失败 -->
    <div v-if="1 === data.row.status">
      <el-button class="btn btn-refuse" type="text" @click="onRefuse">{{
        action.enterprise_refuse.html
      }}</el-button>
      <span class="split">|</span>
      <el-button class="btn btn-pass" type="text" @click="onPass">{{
        action.enterprise_pass.html
      }}</el-button>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    data: Object,
    schemas: Object
  },
  data() {
    return {};
  },
  computed: {
    action() {
      return this.schemas.config.action;
    }
  },
  methods: {
    handleAction(index, data, action) {
      this.$emit("handle", { index, data, action });
    },
    onViewDetail() {
      this.handleAction(this.data.$index, this.data.row, this.action.detail);
    },
    /**
     * @author: xufei
     * @description: 拒绝通过审核
     */
    onRefuse() {
      this.$router.push({
        path: `/dialog/certify/refuse/${this.data.row.id}`
      });
    },
    /**
     * @author: xufei
     * @description: 允许通过认证
     */
    onPass() {
      this.$confirm("是否通过审核？", "确认信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$http
            .post("user/enterprise_certification/pass", {
              id: this.data.row.id
            })
            .then(response => {
              this.$message({
                message: "认证已通过",
                type: "success"
              });
              this.$emit("closeDialog");
              this.$store.commit("refreshDialog");
            })
            .catch(error => {
              if (error.response.data.msg) {
                this.$message.error(error.response.data.msg);
              } else {
                this.$message.error("请求错误：" + error.response.status);
              }
            });
        })
        .catch(action => {});
    }
  },
  created() {
    // debugger;
  }
};
</script>