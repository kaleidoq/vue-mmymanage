<template>
  <div class="tabs">
    <el-tag
      size="mini"
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="tag.name === $route.name ? 'dark' : 'light'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    ...mapMutations(["closeTag"]),
    handleClose(tag, index) {
      const length = this.tags.length - 1;
      this.closeTag(index);

      if (tag.name == this.$route.name) {
        if (index == length) {
          this.$router.push(this.tags[index - 1].path);
        } else {
          this.$router.push(this.tags[index].path);
        }
      }

      console.log();
    },
    changeMenu(tag) {
      this.$router.push({ name: tag.name });
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  padding-bottom: 0px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>