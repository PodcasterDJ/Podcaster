<template>
    <div>
        <nav-bar-basic></nav-bar-basic>
        <jumbotron-basic></jumbotron-basic>

        <b-container>
            <b-row class="text-center justify-content-center">
                <card-audio></card-audio>
                <b-container>
                    <carousel-new></carousel-new>
                </b-container>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import CarouselNew from "@/components/carousel/CarouselNew.vue";
import CardAudio from "@/components/cards/CardAudio.vue";
import NavBarBasic from "@/components/navbars/NavBarBasic.vue";
import JumbotronBasic from "@/components/jumbotrons/JumbotronBasic.vue";

export default {
    components: {
        CarouselNew,
        CardAudio,
        NavBarBasic,
        JumbotronBasic
    }
};
</script>
