<template>
  <div style="text-align: center">
    <span v-for="action in schemas.config.action" :key="action.name">
      <el-tooltip
        class="item"
        effect="dark"
        :content="action.html"
        placement="top"
      >
        <el-button
          :type="action.type"
          style="transform: scale(0.8);zoom: 0.99"
          circle
          @click="handleAction(data.$index, data.row, action)"
        >
          {{ action.html.substring(0, 1) }}
        </el-button>
      </el-tooltip>
    </span>
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
  methods: {
    handleAction(index, data, action) {
      this.$emit('handle', {index, data, action});
    }
  },
  created() {
    // debugger;
  }
};
</script>