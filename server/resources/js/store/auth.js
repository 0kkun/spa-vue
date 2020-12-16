
// 定義したステータスコードをインポート
import { OK } from '../util'

const state = {
    // ログイン済みユーザーを保持する
    user: null,
    // API 呼び出しが成功したか失敗したかを表す
    // コンポーネント側ではこの apiStatus ステートを参照して後続の処理を行うかどうかを判別
    apiStatus: null
}

// ステートそのものではなくステートを元に演算した結果が欲しい場合はゲッターを使う
const getters = {
    // check はログインチェックに使用 確実に真偽値を返すために二重否定
    check: state => !! state.user,
    username: state => state.user ? state.user.name : ''
}

const mutations = {
    // user ステートの値を更新する
    setUser (state, user) {
        state.user = user
    },
    // ステートを更新するため追加
    setApiStatus (state, status) {
        state.apiStatus = status
    }
}

/**
 * 会員登録 API を呼び出し、返却データを渡して setUser ミューテーションを実行することでuser ステートを更新する
 * アクション→コミットでミューテーション呼び出し→ステート更新
 */
const actions = {
    async register (context, data) {
        const response = await axios.post('/api/register', data)
        context.commit('setUser', response.data)
    },
    async login (context, data) {
        // 非同期処理が成功した場合も失敗した場合も同じ変数に結果を代入できる
        // 失敗した場合、responseにはerr.responseが入る
        context.commit('setApiStatus', null) // // 最初はnull
        const response = await axios.post('/api/login', data)
            .catch(err => err.response || err)

        // レスポンスコードによって後続の処理を分岐させる
        if (response.status === OK) {
            // 成功したらtrue
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }
        // 失敗だったらfalse
        context.commit('setApiStatus', false)
        context.commit('error/setCode', response.status, { root: true })
    },
    async logout (context) {
        const response = await axios.post('/api/logout')
        context.commit('setUser', null)
    },
    // アプリ起動時のログインチェック実装
    async currentUser (context) {
        const response = await axios.get('/api/user')
        const user = response.data || null
        context.commit('setUser', user)
    }
}

// ステート・ゲッター・ミューテーション・アクションを定義してストアオブジェクトとしてエクスポートする
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}