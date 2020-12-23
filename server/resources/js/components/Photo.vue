<template>
    <div class="photo">
        <figure class="photo__wrapper">
        <img
            class="photo__image"
            :src="item.url"
            :alt="`Photo by ${item.owner.name}`"
        >
        </figure>
    </div>
</template>

<script>
export default {
    // 一つ分の写真データとして item という props を受け取る
    props: {
        item: {
        type: Object,
        required: true
        }
    }
}
</script>