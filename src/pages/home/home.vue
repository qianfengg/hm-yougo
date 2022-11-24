<template></template>

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

<style></style>
