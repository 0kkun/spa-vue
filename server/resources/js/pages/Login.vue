<template>
    <div class="container--small">
        <ul class="tab">
            <!-- tab===1 の時に tab__item--active クラスに変更される -->
            <li 
                class="tab__item"
                :class="{'tab__item--active': tab === 1 }"
                @click="tab = 1"
            >Login</li>

            <li
                class="tab__item"
                :class="{'tab__item--active': tab === 2 }"
                @click="tab = 2"
            >Register</li>
        </ul>

        <!-- ログインフォーム -->
        <div class="panel" v-show="tab === 1">
            <!-- submit イベントのハンドラとしてloginメソッドを指定 -->
            <form class="form" @submit.prevent="login">

                <!-- エラーメッセージ表示用 -->
                <div v-if="loginErrors" class="errors">
                    <ul v-if="loginErrors.email">
                        <li v-for="msg in loginErrors.email" :key="msg">{{ msg }}</li>
                    </ul>
                    <ul v-if="loginErrors.password">
                        <li v-for="msg in loginErrors.password" :key="msg">{{ msg }}</li>
                    </ul>
                </div>

                <label for="login-email">Email</label>
                <input type="text" class="form__item" id="login-email" v-model="loginForm.email">

                <label for="login-password">Password</label>
                <input type="password" class="form__item" id="login-password" v-model="loginForm.password">

                <div class="form__button">
                    <button type="submit" class="button button--inverse">login</button>
                </div>
            </form>
        </div>

        <!-- 新規会員登録フォーム -->
        <div class="panel" v-show="tab === 2">
            <form class="form" @submit.prevent="register">

                <!-- エラーメッセージ表示用 -->
                <div v-if="registerErrors" class="errors">
                    <ul v-if="registerErrors.name">
                        <li v-for="msg in registerErrors.name" :key="msg">{{ msg }}</li>
                    </ul>
                    <ul v-if="registerErrors.email">
                        <li v-for="msg in registerErrors.email" :key="msg">{{ msg }}</li>
                    </ul>
                    <ul v-if="registerErrors.password">
                        <li v-for="msg in registerErrors.password" :key="msg">{{ msg }}</li>
                    </ul>
                </div>

                <label for="username">Name</label>
                <input type="text" class="form__item" id="username" v-model="registerForm.name">

                <label for="email">Email</label>
                <input type="text" class="form__item" id="email" v-model="registerForm.email">

                <label for="password">Password</label>
                <input type="password" class="form__item" id="password" v-model="registerForm.password">

                <label for="password-confirmation">Password (confirm)</label>
                <input type="password" class="form__item" id="password-confirmation" v-model="registerForm.password_confirmation">

                <div class="form__button">
                    <button type="submit" class="button button--inverse">register</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tab: 1,
            loginForm: {
                email: '',
                password: ''
            },
            registerForm: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            }
        }
    },
    // apiStatus が false の場合にはトップページへの移動処理を行わないように制御を加える
    // 算出プロパティで auth モジュールの apiStatus ステートを参照
    computed: {
        apiStatus () {
            return this.$store.state.auth.apiStatus
        },
        loginErrors () {
            return this.$store.state.auth.loginErrorMessages
        },
        registerErrors () {
            return this.$store.state.auth.registerErrorMessages
        }
    },
    methods: {
        async login () {
            // authストアのloginアクションを呼び出す
            await this.$store.dispatch('auth/login', this.loginForm)

            // computedプロパティで取得したapiStatusがtrueなら
            if (this.apiStatus) {
                // トップページに移動する
                this.$router.push('/')
            }
        },
        async register () {
            // authストアのresigterアクションを呼び出す
            // await で非同期なアクションの処理が完了するのを待ってから実行させる
            await this.$store.dispatch('auth/register', this.registerForm)

            if (this.apiStatus) {
                // トップページに移動する
                this.$router.push('/')
            }
        },
        async logout (context) {
            const response = await axios.post('/api/logout')
            // ログアウト処理が完了したあとは user ステートを null で更新
            context.commit('setUser', null)
        },
        clearError () {
            this.$store.commit('auth/setLoginErrorMessages', null)
            this.$store.commit('auth/setRegisterErrorMessages', null)
        }
    },
    created () {
        this.clearError()
    }
}
</script>