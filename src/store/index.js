import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin'
import tickets from './tickets'
import notices from './notices'
import combain from './combain'
import users from './users'
import shared from './shared'
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        admin,
        combain,
        tickets,
        notices,
        users,
        shared
    }
})
