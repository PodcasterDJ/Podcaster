// Styles
import "bootstrap/dist/css/bootstrap.css";
import "../src/assets/scss/date-range.scss";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import Vue from "vue";
import { configure } from "@storybook/vue";

// import "@/scss/shards-dashboards.scss";

// import 'element-ui/lib/theme-chalk/index.css';

// import ElementUI from "element-ui";
// import locale from "element-ui/lib/locale/lang/en";
// import "@/styles/element-variables.scss";

// Install Vue plugins.
// Vue.use(ElementUI, { locale });
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

configure(require.context("../src", true, /\.stories\.js$/), module);
