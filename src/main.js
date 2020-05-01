// Styles
import "bootstrap/dist/css/bootstrap.css";
import "@/scss/shards-dashboards.scss";
import "@/assets/scss/date-range.scss";
import "element-ui/lib/theme-chalk/index.css";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Core
import App from "./App.vue";
// Layouts
import Default from "@/layouts/Default.vue";
import Main from "./layouts/Main.vue";
// import ElementUI from 'element-ui';
import ShardsVue from "shards-vue";
/* eslint-disable */
import Vue from "vue";
import VueWaveSurfer from "vue-wave-surfer";
import router from "./router";

Vue.use(VueWaveSurfer);

ShardsVue.install(Vue);

Vue.component("main-layout", Main);
Vue.component("default-layout", Default);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// Vue.use(ElementUI);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
