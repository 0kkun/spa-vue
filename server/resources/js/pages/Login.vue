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
                <label for="login-email">Email</label>
                <input type="text" class="form__item" id="login-email" v-model="loginForm.email">

                <label for="login-password">Password</label>
                <input type="password" class="form__item" id="login-password" v-model="loginForm.password">

                <div class="form__button">
                    <button type="submit" class="button button--inverse">login</button>
                </div>
            </form>
        </div>

        <div class="panel" v-show="tab === 2">Register Form</div>
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
        }
    },
    methods: {
        login () {
            console.log(this.loginForm)
        }
    }
}
</script>