import APlayer from "../components/player/APlayer.vue";
// import AudioPlayer from "../components/player/AudioPlayer.vue";
import WaveSurferPlayer from "../components/player/WaveSurferPlayer.vue";
import { action } from "@storybook/addon-actions";

export default {
    title: "Audio",
    component: WaveSurferPlayer
};

export const aPlayer = () => ({
    components: { APlayer },
    template: '<a-player @click="action"></a-player>',
    methods: { action: action("clicked") }
});

// export const audioPlayer = () => ({
//     components: { AudioPlayer },
//     template: '<audio-player @click="action"></audio-player>',
//     methods: { action: action("clicked") }
// });

export const waveSurferPlayer = () => ({
    components: { WaveSurferPlayer },
    template: '<wave-surfer-player @click="action"></wave-surfer-player>',
    methods: { action: action("clicked") }
});
