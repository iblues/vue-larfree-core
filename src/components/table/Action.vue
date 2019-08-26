<style lang="less" scoped>
</style>

<template>
  <component :is="currentComponent" :data="data" :schemas="schemas" @handle="handleAction" />
</template>

<script>
import ActionDefault from '@/components/table/actions/default.vue'
import ActionEnterpriseCertification from '@/components/table/actions/enterprise-certification.vue'

export default {
  components: {
    ActionDefault,
    ActionEnterpriseCertification
  },
  props: {
    data: Object,
    schemas: Object
  },
  data() {
    return {}
  },
  computed: {
    currentComponent() {
      switch (this.schemas.config['action-type']) {
        case 'enterprise-certification':
          return 'ActionEnterpriseCertification'
        default:
          return 'ActionDefault'
      }
    }
  },
  created() {
    // debugger;
  },
  methods: {
    handleAction(args) {
      this.$emit('handle', args)
    }
  }
}
</script>
