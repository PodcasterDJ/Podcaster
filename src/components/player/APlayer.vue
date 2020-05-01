<template>
    <div>
        <Aplayer
            autoplay
            :music="{
                title: 'My song',
                artist: 'Silent Siren',
                src:
                    'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3',
                pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
            }"
        />
    </div>
</template>
<script>
import Aplayer from "vue-aplayer";

export default {
    components: {
        Aplayer
    }
};
</script>
