<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper
      class="top-swiper"
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      :circular="true"
    >
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator
          :url="`/pages_sub1/product-detail/product-detail?pid=${item.goods_id}`"
          class="swiper-content"
        >
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view
        @click="jump(item)"
        class="nav-item"
        v-for="(item, index) in navList"
        :key="index"
      >
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [],
      navList: [],
    };
  },
  methods: {
    jump(item) {
      if (item.name) {
        uni.switchTab({
          url: "/pages/category/category",
        });
      }
    },
    async getNavList() {
      const { meta, message } = await this.$http.get("/home/catitems");

      // 请求失败处理
      if (meta.status !== 200) {
        return this.$msg();
      }

      this.navList = message;
    },
    async getSwiperList() {
      const { meta, message } = await this.$http.get("/home/swiperdata");
      // 请求失败处理
      if (meta.status !== 200) {
        this.$msg();
        return;
      }
      this.swiperList = message;
      // this.$msg("获取轮播图数据成功");
    },
  },
  created() {
    this.getSwiperList();
    this.getNavList();
  },
};
</script>

<style lang="scss">
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 30rpx 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
.top-swiper {
  height: 330rpx;

  .swiper-content,
  image {
    width: 100%;
    height: 100%;
  }
}
</style>
