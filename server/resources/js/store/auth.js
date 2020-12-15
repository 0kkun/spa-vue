
const state = {
    // ログイン済みユーザーを保持する
    user: null
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
        const response = await axios.post('/api/login', data)
        context.commit('setUser', response.data)
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