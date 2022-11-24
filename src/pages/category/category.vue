<template>
  <view>
    <!-- 预留出的搜索区域 -->

    <view class="scroll-view-container">
      <!-- 左侧的滚动区域 -->
      <scroll-view
        class="left-scroll-view"
        scroll-y
        :style="{ height: wh + 'px' }"
      >
        <view
          v-for="(item, index) in categoryList"
          :key="index"
          class="left-scroll-view-item"
          :class="{ active: selectedCategory === index }"
          @click="changeSelected(index)"
          >{{ item.cat_name }}</view
        >
      </scroll-view>

      <!-- 右侧的滚动区域 -->
      <scroll-view
        class="right-scroll-view"
        scroll-y
        :style="{ height: wh + 'px' }"
      >
        <view class="left-scroll-view-item">zzz</view>
        <view class="left-scroll-view-item">zzz</view>
        <view class="left-scroll-view-item">zzz</view>
        <view v-for="item in 30" :key="item" class="left-scroll-view-item"
          >zzz</view
        >
        <view class="left-scroll-view-item"
          >多复制一些节点，演示纵向滚动效果</view
        >
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      wh: 0,
      categoryList: [],
      selectedCategory: 0,
    };
  },

  created() {
    // 动态获取窗口可用高度，以便让页面中的左右两块滚动区域的高度撑满屏幕
    // 1. 获取当前系统信息
    const sysInfo = uni.getSystemInfoSync();

    // 2. 从系统信息中获取窗口可用高度并赋值给 wh
    // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度
    this.wh = sysInfo.windowHeight;
    this.getCategoryList();
  },
  methods: {
    changeSelected(index) {
      this.selectedCategory = index;
    },
    async getCategoryList() {
      const { meta, message } = await this.$http.get("/categories");

      // 请求失败处理
      if (meta.status !== 200) {
        return this.$msg();
      }

      this.categoryList = message;
    },
  },
};
</script>

<style scoped lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 240rpx;

    .left-scroll-view-item {
      line-height: 120rpx;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 24rpx;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: " ";
          display: block;
          width: 6rpx;
          height: 60rpx;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
