import Vue from 'vue'
import Router from 'vue-router'

import Inicio from './components/Inicio.vue'
import Home from './components/Home.vue'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/settings",
        name: "nuevo",
        component: Inicio
      },
    ]
  });