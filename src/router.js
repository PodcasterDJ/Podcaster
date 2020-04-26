import AddNewPost from './views/AddNewPost.vue';
import BlogPosts from './views/BlogPosts.vue';
import ComponentsOverview from './views/ComponentsOverview.vue';
import Errors from './views/Errors.vue';
import LandingPage from './views/LandingPage.vue';
import PersonalBlog from './views/PersonalBlog.vue';
import Router from 'vue-router';
import Tables from './views/Tables.vue';
import TestingPage from './views/TestingPage.vue';
import UserProfileLite from './views/UserProfileLite.vue';
import Vue from 'vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        };
    },
    routes: [{
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'home',
            component: LandingPage,
            meta: {
                layout: 'landing'
            }
        },
        {
            path: '/blog-overview',
            name: 'blog-overview',
            component: PersonalBlog,
        },
        {
            path: '/user-profile-lite',
            name: 'user-profile-lite',
            component: UserProfileLite,
        },
        {
            path: '/add-new-post',
            name: 'add-new-post',
            component: AddNewPost,
        },
        {
            path: '/errors',
            name: 'errors',
            component: Errors,
        },
        {
            path: '/components-overview',
            name: 'components-overview',
            component: ComponentsOverview,
        },
        {
            path: '/tables',
            name: 'tables',
            component: Tables,
        },
        {
            path: '/blog-posts',
            name: 'blog-posts',
            component: BlogPosts,
        },
        {
            path: '/test',
            name: 'testing-page',
            component: TestingPage,
        }, {
            path: '*',
            redirect: '/errors',
        },
    ],
});