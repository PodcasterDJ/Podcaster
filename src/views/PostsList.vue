<template lang="en">
<div>
    <b-row> 
        <b-col v-for="(post, index) in posts" :key="index" lg="4">
            <PostTopPicture :post="post"></PostTopPicture>  
        </b-col>
    </b-row> 
</div>
</template>

<script>
import axios from "axios";
import PostTopPicture from "../components/posts/PostTopPicture";

export default {
    name: "PostsList",
    components: {
        PostTopPicture
    },
    data() {
        return {
            posts: []
        };
    },
    async created() {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/en-us/blog/api/posts/
`);

            this.posts = res.data;
            console.log("List of posts on parent", this.posts);
        } catch (e) {
            console.error(e);
        }
    }
};
</script>
