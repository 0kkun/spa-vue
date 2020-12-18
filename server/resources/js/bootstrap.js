// bootstrap.js では Ajax 通信で用いる Axios ライブラリの設定を記述しています。

import { getCookieValue } from './util'

window.axios = require('axios');

// Ajaxリクエストであることを示すヘッダーを付与する
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/**
 * Ajaxリクエストであることを示す X-Requested-With ヘッダーを付与し、
 * トークンを X-XSRF-TOKEN ヘッダーに含めることで、
 * Laravel はフォームではなくヘッダーを見て CSRF トークンチェックを行ってくれます。
 */
window.axios.interceptors.request.use(config => {
    // クッキーからトークンを取り出してヘッダーに添付する
    config.headers['X-XSRF-TOKEN'] = getCookieValue('XSRF-TOKEN')

    return config
})

/**
 * 共通しているのでインターセプターにまとめる
 * axios の response インターセプターはレスポンスを受けた後の処理を上書きする
 * 第一引数は成功時の処理 (そのままにしている)
 * 第二引数は失敗時の処理
 */
window.axios.interceptors.response.use(
    response => response,
    error => error.response || error
)