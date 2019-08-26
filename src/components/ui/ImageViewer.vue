<style lang="less" scoped>
.viewer {
  .hidden-image {
    display: none;
    width: 0;
    height: 0;
  }
}
</style>

<template>
  <viewer class="viewer" :images="images" @inited="onInitedViewer">
    <template slot-scope="scope">
      <div @click="onClickViewPic">
        <slot></slot>
        <!-- 111111 -->
        <img class="hidden-image" v-for="src in images" :src="src" :key="src" />
      </div>
    </template>
  </viewer>
</template>

<script>
export default {
  props: {
    images: {
      type: Array
    }
  },
  data() {
    return {
      viewer: {}
    };
  },
  methods: {
    onInitedViewer(viewer) {
      this.viewer = viewer;
    },
    onClickViewPic() {
      this.viewer.show();
    }
  }
};
</script>