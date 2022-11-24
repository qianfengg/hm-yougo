import Vue from "vue";
import App from "./App";
import http from "./utils/request";
import { showMessage } from "./utils/message";

Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$msg = showMessage;

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
