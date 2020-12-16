<template>
    <div>
        <header>
            <Navbar />
        </header>

        <main>
            <div class="container">
                <RouterView />
            </div>
        </main>

        <Footer />
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { INTERNAL_SERVER_ERROR } from './util'

export default {
    components: {
        Navbar,
        Footer
    },
    // ストアのステートを算出プロパティで参照
    computed: {
        errorCode () {
            return this.$store.state.error.code
        }
    },
    // error モジュールのステートを監視し、INTERNAL_SERVER_ERROR だった場合に先ほど作成したエラーページに移動
    watch: {
        errorCode: {
            handler (val) {
                if (val === INTERNAL_SERVER_ERROR) {
                    this.$router.push('/500')
                }
            },
            immediate: true
        },
        $route () {
            this.$store.commit('error/setCode', null)
        }
    }
}
</script>