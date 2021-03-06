import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import VueMeta from 'vue-meta'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localisze.filter'
import tooltipDirective from '@/directives/tooltipe.directive'
import messagePlugin from '@/utilits/message.plugin'
import titlePlugin from '@/utilits/title.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import * as firebase from 'firebase'
import 'firebase/firestore'

// import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltipe', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

const firebaseConfig = {
  apiKey: 'AIzaSyDz3l0AtfoUuGikT1Ee0mqXI4irJD8wafM',
  authDomain: 'vue-crm-2.firebaseapp.com',
  databaseURL: 'https://vue-crm-2.firebaseio.com',
  projectId: 'vue-crm-2',
  storageBucket: 'vue-crm-2.appspot.com',
  messagingSenderId: '328317453493',
  appId: '1:328317453493:web:a28a42f0cddc9fbaa02afc',
  measurementId: 'G-2LZN04YX43'
}
firebase.initializeApp(firebaseConfig)
firebase.analytics()

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
