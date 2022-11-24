<template>
  <view>
    <h1>home</h1>
    <button @click="requestFn">发送请求</button>
  </view>
</template>

<script>
export default {
  methods: {
    async requestFn() {
      console.log(this.$http);
      const res = await this.$http.get("/home/swiperdata");
      console.log(res);
    },
  },
};
</script>

<style></style>
