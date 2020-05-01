<template>

  <main
    class="audioPlayer"
    id="app"
  >
    <a
      class="nav-icon"
      v-on:click="isPlaylistActive=!isPlaylistActive"
      :class="{'isActive': isPlaylistActive}"
      title="Music List"
    >
      <span></span>
      <span></span>
      <span></span>
    </a>
    <div
      class="audioPlayerList"
      :class="{'isActive': isPlaylistActive}"
    >
      <div
        class="item"
        v-for="(item,index) in musicPlaylist"
        v-bind:class="{ 'isActive':isCurrentSong(index) }"
        v-on:click="changeSong(index),isPlaylistActive=!isPlaylistActive"
        :key="index"
      >
        <p class="title">{{ item.title }}</p>
        <p class="artist">{{ item.artist }}</p>
      </div>

      <p
        class="debugToggle"
        v-on:click="toggleDebug()"
      >debug: {{ debug }}</p>

    </div>
    <div
      class="audioPlayerUI"
      :class="{'isDisabled': isPlaylistActive}"
    >
      <div class="albumImage">
        <transition
          name="ballmove"
          enter-active-class="animated zoomIn"
          leave-active-class="animated fadeOutDown"
          mode="out-in"
        >
          <!--<transition name="slide-fade" mode="out-in">-->
          <img
            @load="onImageLoaded()"
            :src="musicPlaylist[currentSong].image"
            :key="currentSong"
            ondragstart="return false;"
            id="playerAlbumArt"
          >
        </transition>
        <div
          class="loader"
          :key="currentSong"
        >Loading...</div>
      </div>
      <div class="albumDetails">
        <transition
          name="slide-fade"
          mode="out-in"
        >
          <p
            class="title"
            :key="currentSong"
          >{{ musicPlaylist[currentSong].title }}</p>
        </transition>
        <transition
          name="slide-fade"
          mode="out-in"
        >
          <p
            class="artist"
            :key="currentSong"
          >{{ musicPlaylist[currentSong].artist }}</p>
      </div>

      <div class="playerButtons">
        <a
          class="button"
          :class="{'isDisabled':(currentSong==0)}"
          v-on:click="prevSong()"
          title="Previous Song"
        ><i class="zmdi zmdi-skip-previous"></i></a>
        <a
          class="button play"
          v-on:click="playAudio()"
          title="Play/Pause Song"
        >
          <transition
            name="slide-fade"
            mode="out-in"
          >
            <i
              class="zmdi"
              :class="[currentlyStopped ? 'zmdi-stop' : (currentlyPlaying ? 'zmdi-pause-circle' : 'zmdi-play-circle')]"
              :key="1"
            ></i>
          </transition>
        </a>
        <a
          class="button"
          :class="{'isDisabled':(currentSong==musicPlaylist.length-1)}"
          v-on:click="nextSong()"
          title="Next Song"
        ><i class="zmdi zmdi-skip-next"></i></a>
      </div>

      <div
        class="currentTimeContainer"
        style="text-align:center"
      >
        <span class="currentTime">{{ currentTime | fancyTimeFormat }}</span>
        <span class="totalTime"> {{ trackDuration | fancyTimeFormat }}</span>
        <!--<span style="color:black">({{ currentSong+1 }}/{{ musicPlaylist.length }})</span>-->
      </div>

      <div class="currentProgressBar">
        <div
          class="currentProgress"
          :style="{ width: currentProgressBar + '%' }"
        ></div>
      </div>
    </div>

</template>
<script> 
export default {
 data() {
	return {
		audio: "",
		imgLoaded: false,
		currentlyPlaying: false,
		currentlyStopped: false,
		currentTime: 0,
		checkingCurrentPositionInTrack: "",
		trackDuration: 0,
		currentProgressBar: 0,
		isPlaylistActive: false,
		currentSong: 0,
		debug: false,
		musicPlaylist: [
			{
				title: "Service Bell",
				artist: "Daniel Simion",
				url: "https://soundbible.com/mp3/service-bell_daniel_simion.mp3",
				image: "https://source.unsplash.com/crs2vlkSe98/400x400"
			},
			{
				title: "Meadowlark",
				artist: "Daniel Simion",
				url: "https://soundbible.com/mp3/meadowlark_daniel-simion.mp3",
				image: "https://source.unsplash.com/35bE_njbG9E/400x400"
			},
			{
				title: "Hyena Laughing",
				artist: "Daniel Simion",
				url: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
				image: "https://source.unsplash.com/Esax9RaEl2I/400x400"
			},
			{
				title: "Creepy Background",
				artist: "Daniel Simion",
				url: "http://soundbible.com/mp3/creepy-background-daniel_simon.mp3",
				image: "https://source.unsplash.com/j0g8taxHZa0/400x400"
			}
		],
		audioFile: ""
    }; 
	mounted: function() {
		this.changeSong();
		this.audio.loop = false;
	};
	filters: {
		fancyTimeFormat: function(s) {
			return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
		}
	},
	methods: {
		togglePlaylist: function() {
			this.isPlaylistActive = !this.isPlaylistActive;
		},
		nextSong: function() {
			if (this.currentSong < this.musicPlaylist.length - 1)
				this.changeSong(this.currentSong + 1);
		},
		prevSong: function() {
			if (this.currentSong > 0) this.changeSong(this.currentSong - 1);
		},
		changeSong: function(index) {
			var wasPlaying = this.currentlyPlaying;
			this.imageLoaded = false;
			if (index !== undefined) {
				this.stopAudio();
				this.currentSong = index;
			}
			this.audioFile = this.musicPlaylist[this.currentSong].url;
			this.audio = new Audio(this.audioFile);
			var localThis = this;
			this.audio.addEventListener("loadedmetadata", function() {
				localThis.trackDuration = Math.round(this.duration);
			});
			this.audio.addEventListener("ended", this.handleEnded);
			if (wasPlaying) {
				this.playAudio();
			}
		},
		isCurrentSong: function(index) {
			if (this.currentSong == index) {
				return true;
			}
			return false;
		},
		getCurrentSong: function(currentSong) {
			return this.musicPlaylist[currentSong].url;
		},
		playAudio: function() {
			if (
				this.currentlyStopped == true &&
				this.currentSong + 1 == this.musicPlaylist.length
			) {
				this.currentSong = 0;
				this.changeSong();
			}
			if (!this.currentlyPlaying) {
				this.getCurrentTimeEverySecond(true);
				this.currentlyPlaying = true;
				this.audio.play();
			} else {
				this.stopAudio();
			}
			this.currentlyStopped = false;
		},
		stopAudio: function() {
			this.audio.pause();
			this.currentlyPlaying = false;
			this.pausedMusic();
		},
		handleEnded: function() {
			if (this.currentSong + 1 == this.musicPlaylist.length) {
				this.stopAudio();
				this.currentlyPlaying = false;
				this.currentlyStopped = true;
			} else {
				this.currentlyPlaying = false;
				this.currentSong++;
				this.changeSong();
				this.playAudio();
			}
		},
		onImageLoaded: function() {
			this.imgLoaded = true;
		},
		getCurrentTimeEverySecond: function(startStop) {
			var localThis = this;
			this.checkingCurrentPositionInTrack = setTimeout(
				function() {
					localThis.currentTime = localThis.audio.currentTime;
					localThis.currentProgressBar =
						localThis.audio.currentTime / localThis.trackDuration * 100;
					localThis.getCurrentTimeEverySecond(true);
				}.bind(this),
				1000
			);
		},
		pausedMusic: function() {
			clearTimeout(this.checkingCurrentPositionInTrack);
		},
		toggleDebug: function(){
			this.debug=!this.debug;
			document.body.classList.toggle('debug');
		}
	},
	watch: {
		currentTime: function() {
			this.currentTime = Math.round(this.currentTime);
		}
	},
	beforeDestroy: function() {
		this.audio.removeEventListener("ended", this.handleEnded);
		this.audio.removeEventListener("loadedmetadata", this.handleEnded);

		clearTimeout(this.checkingCurrentPositionInTrack);
	}
</script>
<style>
</style>