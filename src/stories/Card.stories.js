import CardBasic from "../components/cards/CardBasic.vue";
import { action } from "@storybook/addon-actions";

export default {
    title: "Card",
    component: CardBasic
};

export const cardBasic = () => ({
    components: { CardBasic },
    template: '<card-basic @click="action"></card-basic>',
    methods: { action: action("clicked") }
});
