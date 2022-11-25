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
    <!-- 搜索建议列表 -->
    <view class="sugg-list">
      <view
        class="sugg-item"
        v-for="(item, index) in suggestions"
        :key="index"
        @click="gotoProductDetail(item)"
      >
        <view class="goods-name">{{ item.goods_name }}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
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
    gotoProductDetail(item) {
      uni.navigateTo({
        url: `/pages_sub1/product-detail/product-detail?pid=${item.goods_id}`,
      });
    },
    inputHandler(value) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.keyword = value;
        this.getSuggestions();
      }, 500);
    },
    async getSuggestions() {
      if (!this.keyword) {
        this.suggestions = [];
        return;
      }
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
// 搜索建议列表
.sugg-list {
  padding: 0 10rpx;

  .sugg-item {
    font-size: 24rpx;
    padding: 26rpx 0;
    border-bottom: 1rpx solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      margin-right: 6rpx;

      // 溢出部分隐藏
      overflow: hidden;

      // 文字不允许换行
      white-space: nowrap;

      // 文字溢出后使用省略号表示
      text-overflow: ellipsis;
    }
  }
}
</style>
