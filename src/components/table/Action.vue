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
          circle
          size="mini"
          style="margin-right: 2px"
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
  name: 'LarTableAction',
  props: {
    data: Object,
    schemas: Object
  },
  data() {
    return {}
  },
  computed: {

  },
  created() {
    // debugger;
  },
  methods: {
    handleAction(index, data, action) {
      this.$emit('handle', { index, data, action })
    }
  }
}
</script>
