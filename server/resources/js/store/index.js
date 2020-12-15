// ストアを作成する際に、インポートした auth.js をモジュールとして登録する

import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'

Vue.use(Vuex)

const store = new Vuex.Store({
    // ストアは種類に応じてモジュールとして分けて作成することができる
    modules: {
        auth
    }
})

export default store