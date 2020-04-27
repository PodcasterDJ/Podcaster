import Welcome from "./Welcome";
import { linkTo } from "@storybook/addon-links";

export default {
    title: "Welcome",
    component: Welcome
};

export const ToStorybook = () => ({
    components: { Welcome },
    template: '<welcome :showApp="action" />',
    methods: { action: linkTo("Button") }
});

ToStorybook.story = {
    name: "to Storybook"
};
