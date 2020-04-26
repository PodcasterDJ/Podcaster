<template>
  <div :style="{ backgroundImage: 'url(' + image + ')' }">
    <b-container>
      <b-jumbotron
        lead="Bootstrap v4 Components for Vue.js 2"
        :style="{ backgroundColor: 'transparent', color: 'white' }"
        class="white"
      >
        <p>For more information visit website </p>
        <b-button
          variant="white"
          href="#"
        >More Info</b-button>
      </b-jumbotron>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      image:
        'https://images.unsplash.com/photo-1550645612-83f5d594b671?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    };
  },
};
</script>
