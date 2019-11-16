import Vue from 'vue';


Vue.component('v-header', require('./components/VHeader').default);
Vue.component('v-footer', require('./components/VFooter').default);
Vue.component('v-checkbox', require('./components/VCheckbox').default);
Vue.component('state-select', require('./components/StateSelect').default);

Vue.component('general-settings', require('./components/GeneralSettings').default);
Vue.component('stripe-settings', require('./components/StripeSettings').default);
Vue.component('shopify-settings', require('./components/ShopifySettings').default);
Vue.component('supreme-settings', require('./components/SupremeSettings').default);
