<template>
    <div>
        <NavBarBasic></NavBarBasic>
        <JumbotronBasic></JumbotronBasic>

        <b-container>
            <b-row class="text-center justify-content-center">
                <CardAudio></CardAudio>
                <b-container>
                    <CarouselNew></CarouselNew>
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
