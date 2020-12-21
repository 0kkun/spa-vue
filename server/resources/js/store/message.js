const state = {
    content: ''
}

const mutations = {
    // メッセージが一定時間経過後に自動的にクリアされる
    setContent (state, { content, timeout }) {
        state.content = content

        if (typeof timeout === 'undefined') {
            timeout = 3000
        }

        setTimeout(() => (state.content = ''), timeout)
    }
}

export default {
    namespaced: true,
    state,
    mutations
}