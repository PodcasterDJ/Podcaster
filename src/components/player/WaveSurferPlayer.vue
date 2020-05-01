<template>
  <div>
    <vue-wave-surfer
      :src="file"
      :options="options"
    ></vue-wave-surfer>
  </div>
</template>
<script>
import VueWaveSurfer from 'vue-wave-surfer';

export default { 

  components: {
    VueWaveSurfer
  }
,
  data() {
    return {
      options: {
      },
      file: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3'
    }
  },
}
</script>
