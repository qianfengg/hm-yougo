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
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [],
    };
  },
  methods: {
    async getSwiperList() {
      const { meta, message } = await this.$http.get("/home/swiperdata");
      console.log({ meta, message });
      // 请求失败处理
      if (meta.status !== 200) {
        uni.showToast({
          title: "请求数据失败",
          duration: 1500,
          icon: "none",
        });
        return;
      }
      this.swiperList = message;
    },
  },
  created() {
    this.getSwiperList();
  },
};
</script>

<style lang="scss">
.top-swiper {
  height: 330rpx;

  .swiper-content,
  image {
    width: 100%;
    height: 100%;
  }
}
</style>
