<template>
  <div>
    <nav-bar-basic></nav-bar-basic>
    <jumbotron-basic></jumbotron-basic>
    <b-container>
      <carousel-new></carousel-new>
    </b-container>
    <b-container>
      <b-row class="text-center justify-content-center">
        <card-basic></card-basic>
        <card-basic></card-basic>
        <card-basic></card-basic>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CarouselNew from '@/components/carousel/CarouselNew.vue';
import CardBasic from '@/components/cards/CardBasic.vue';
import NavBarBasic from '@/components/navbars/NavBarBasic.vue';
import JumbotronBasic from '@/components/jumbotrons/JumbotronBasic.vue';

export default {
  components: {
    CarouselNew,
    CardBasic,
    NavBarBasic,
    JumbotronBasic,
  },
};
</script>

