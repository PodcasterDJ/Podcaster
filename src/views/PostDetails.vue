<template>
    <div>
        {{ postDetails.title }}
        <p>
            {{ postDetails.content }}
        </p>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "PostDetails",
    data: function() {
        return { postDetails: {} };
    },
    // mounted() {
    //     const currentPath = this.$route.path;
    //     const requestBuildURL = `${URL}/en-us"${currentPath}`;
    //     console.log(requestBuildURL);
    // },
    async created() {
        const URL = "http://127.0.0.1:8000/";
        try {
            const lang = "en-us";
            // const requestBuildURL = `${URL}${lang}${this.$route.path}`;
            console.log(this.$route.params);
            console.log(
                `${URL}${lang}/blog/api/posts/${this.$route.params.title}`
            );
            const res = await axios.get(
                `${URL}${lang}/blog/api/posts/${this.$route.params.title}`
            );
            // const res = await axios.get(
            //     "http://127.0.0.1:8000/en-us/blog/api/posts/VueJS blog in progress"
            // );

            this.postDetails = res.data[0];
            console.log("POST DETAIL", this.postDetails);
        } catch (e) {
            console.error(e);
        }
    }
};
</script>
