<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar
        cancelButton="none"
        :radius="100"
        @input="inputHandler"
      ></uni-search-bar>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      timer: null,
      suggestions: [],
    };
  },
  methods: {
    inputHandler(value) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.keyword = value;
        this.getSuggestions();
      }, 500);
    },
    async getSuggestions() {
      if (!this.keyword) return;
      const { meta, message } = await this.$http.get("/goods/qsearch", {
        query: this.keyword,
      });
      if (meta.status !== 200) {
        return this.$msg();
      }
      this.suggestions = message;
      console.log(this.suggestions);
    },
  },
};
</script>

<style scoped lang="scss">
// 使用样式穿透：覆盖 uni-search-bar 组件的 .uni-searchbar 背景色
::v-deep .uni-searchbar {
  background-color: #c00000 !important;
}

// 搜索框吸顶
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
