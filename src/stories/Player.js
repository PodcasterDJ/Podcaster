import AudioPlayer from "../components/player/AudioPlayer.vue";
import { action } from "@storybook/addon-actions";

export default {
    title: "AudioPlayer",
    component: AudioPlayer
};

export const audioPlayer = () => ({
    components: { AudioPlayer },
    template: '<audio-player @click="action"></audio-player>',
    methods: { action: action("clicked") }
});
