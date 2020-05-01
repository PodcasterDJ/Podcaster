import CardAudio from "../components/cards/CardAudio.vue";
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

export const cardAudio = () => ({
    components: { CardAudio },
    template: '<card-audio @click="action"></card-audio>',
    methods: { action: action("clicked") }
});
