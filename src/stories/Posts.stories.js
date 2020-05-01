import PostTopPicture from "../components/posts/PostTopPicture.vue";
import { action } from "@storybook/addon-actions";

export default {
    title: "Posts",
    component: PostTopPicture
};

export const postTopPicture = () => ({
    components: { PostTopPicture },
    data() {
        return {
            post: post
        };
    },
    template:
        '<d-row class="m-3"><d-col lg="6" sm="12" class="mb-4"><post-top-picture @click="action" :post=post /></d-row></d-col>',
    methods: { action: action("clicked") }
});

const post = {
    backgroundImage: require("@/assets/images/content-management/4.jpeg"),
    category: "Business",
    categoryTheme: "warning",
    author: "John James",
    thumbnail: "",
    title: "It so numerous if he may outlived disposal",
    content:
        "How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved ready road market resolution...",
    publish: "29 February 2019"
};
