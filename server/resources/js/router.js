import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'
import SystemError from './pages/errors/System.vue'

// auth ストアの check ゲッターを使用するため追加
import store from './store'

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [
    {
        path: '/',
        component: PhotoList
    },
    {
        path: '/login',
        component: Login,
        // 定義されたルートにアクセスされてページコンポーネントが切り替わる直前に呼び出される関数
        // auth/check ゲッターでログイン状態をチェックし、ログインしていればトップページに切り替え、
        // ログインしていなければそのままログインページを表示する
        beforeEnter (to, from, next) {
            if (store.getters['auth/check']) {
                next('/')
            } else {
                next()
            }
        }
    },
    {
        path: '/500',
        component: SystemError
    }
]

// VueRouterインスタンスを作成する
const router = new VueRouter({
    mode: 'history', // URLの#部分を本来の形にする
    routes
})

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router