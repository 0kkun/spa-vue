
import './bootstrap'

import Vue from 'vue'
// ルーティングの定義をインポートする
import router from './router'
// VuexのStoreをインポートする
import store from './store'
// ルートコンポーネントをインポートする
import App from './App.vue'


const createApp = async () => {
    await store.dispatch('auth/currentUser')

    new Vue({
        el: '#app',
        router, // ルーティングの定義を読み込む
        store,  // VuexのStoreを使用する準備
        components: { App }, // ルートコンポーネントの使用を宣言する
        template: '<App />'  // ルートコンポーネントを描画する
    })
}

// アプリ起動時、Vue インスタンス生成前に currentUser アクション呼び出し
createApp()