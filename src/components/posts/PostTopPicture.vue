<template>
    <d-card class="card-small card-post card-post--1">
        <div
            class="card-post__image"
            :style="{
                backgroundImage: 'url(\'' + post.thumbnail + '\')'
            }"
        >
            <d-badge
                pill
                :class="['card-post__category', 'bg-' + post.categoryTheme]"
                >{{ post.category }}</d-badge
            >
            <div class="card-post__author d-flex">
                <a
                    href="#"
                    class="card-post__author-avatar card-post__author-avatar--small"
                    :style="{
                        backgroundImage: 'url(\'' + post.thumbnail + '\')'
                    }"
                    >Written by {{ post.author }}</a
                >
            </div>
        </div>
        <d-card-body>
            <h5 class="card-title">
                <a href="#" class="text-fiord-blue">{{ post.title }}</a>
            </h5>
            <p class="card-text d-inline-block mb-3" v-html="post.content"></p>
            <span class="text-muted">{{ post.publish }}</span>
        </d-card-body>
    </d-card>
</template>

<script>
export default {
    name: "PostTopPicture",
    props: ["post"],
    data() {
        return {};
    },
    created() {
        console.log("List of post on child", this.post);
    },
    mounted() {
        console.log("List of post on mounted child", this.post);
    }
};
</script>
