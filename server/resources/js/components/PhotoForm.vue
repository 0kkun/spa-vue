
<template>
    <div v-show="value" class="photo-form">
        <h2 class="title">Submit a photo</h2>
        <form class="form">
            <input class="form__item" type="file">
            <div class="form__button">
                <button type="submit" class="button button--inverse">submit</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    // propsは親コンポーネントから子コンポーネントにデータの受け渡しする時に使う
    // このコンポーネントの表示 / 非表示を（value を渡す）親コンポーネント側で制御できるよう
    props: {
        value: {
            type: Boolean,
            required: true
        }
    }
}
</script>