<template>
  <view>
    <my-search @click="goSearch"></my-search>
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
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        楼层标题
        <image :src="item.floor_title.image_src" class="floor-title"></image>

        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧 1 个大图 -->
          <view class="left-img-box">
            <image
              :src="item.product_list[0].image_src"
              :style="{ width: item.product_list[0].image_width + 'rpx' }"
              mode="widthFix"
              @click="goToProductList(item.product_list[0])"
            ></image>
          </view>

          <!-- 右侧 4 个小图 -->
          <view class="right-img-box">
            <block v-for="(product, idx) in item.product_list" :key="idx">
              <view class="right-img-item" v-if="idx !== 0">
                <image
                  :src="product.image_src"
                  :style="{ width: product.image_width + 'rpx' }"
                  mode="widthFix"
                  @click="goToProductList(product)"
                ></image>
              </view>
            </block>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MySearch from "@/components/my-search";
export default {
  components: {
    MySearch,
  },
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: [],
    };
  },
  methods: {
    goSearch() {
      uni.navigateTo({
        url: "/pages_sub1/search/search",
      });
    },
    goToProductList(product) {
      // 从后端返回字段中提取出需要的跳转参数
      const str = product.navigator_url.split("?")[1];

      uni.navigateTo({
        url: "/pages_sub1/product-list/product-list?" + str,
      });
    },
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
    async getFloorList() {
      const { meta, message } = await this.$http.get("/home/floordata");

      // 请求失败处理
      if (meta.status !== 200) {
        return this.$msg();
      }

      this.floorList = message;
    },
  },
  created() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
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
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
.floor-title {
  display: flex;
  width: 100%;
  height: 60rpx;
}
</style>
