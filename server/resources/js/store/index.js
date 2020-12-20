

import Vue from 'vue'
import Vuex from 'vuex'

// ストアを作成する際に、インポートした auth.js をモジュールとして登録する
import auth from './auth'

// error モジュールを読み込み
import error from './error'

import message from './message'

Vue.use(Vuex)

const store = new Vuex.Store({
    // ストアは種類に応じてモジュールとして分けて作成することができる
    modules: {
        auth,
        error,
        message,
    }
})

export default store