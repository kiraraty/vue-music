<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <dir v-show="songs.length>0" class="play-btn" @click="random">
            <i class="icon-play"></i>
            <span class="text">随机播放全部</span>
        </dir>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      class="list"
      :style="scrollStyle"
      v-loading="loading"
      v-no-result:[noResultText]="noResult"
      :prop-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"> </song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from "@/components/base/song-list";
import Scroll from "@/components/base/scroll";
import {mapActions} from 'vuex'
const TITLE_HEIGHT = 40;
export default {
  name: "music-list",
  components: {
    SongList,
    Scroll,
  },
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: String,
    pic: String,
    loading: Boolean,
    noResultText:{
      type:String,
      default:'抱歉，没有找到可播放的歌曲'
    }
  },
  data() {
    return {
      imageHeight: 0,
      scrollY: 0,
      maxTranslateY: 0,
    };
  },
  computed: {
    noResult(){
      return !this.loading&&!this.songs.length
    },
    playBtnStyle(){
      let display=''
      if(this.scrollY>=this.maxTranslateY){
        display='none'
      }
      return display
    },
    bgImageStyle() {
      const scrollY = this.scrollY;
      let zIndex = 0;
      let paddingTop = "70%";
      let height = 0;
			let translateZ=0

      if (scrollY > this.maxTranslateY) {
        zIndex = 10
				paddingTop=0
				height=`${ TITLE_HEIGHT }px`
				translateZ=1
      }
			let scale=1
			if(scrollY<0){
				scale=1+Math.abs(scrollY/this.imageHeight)
			}
      return {
        backgroundImage: `url(${this.pic})`,
				zIndex,
				paddingTop,
				height,
				   transform:`scale(${scale})translateZ(${translateZ}px)` 
      };
    },
    scrollStyle() {
      return {
        top: `${this.imageHeight}px`,
      };
    },
		filterStyle(){
			let blur =0
			const scrollY=this.scrollY
			const imageHeight=this.imageHeight
			if(scrollY>=0){
				blur=Math.min(this.maxTranslateY/imageHeight, (scrollY/imageHeight)*20)       
			}
			return {
				backdropFilter:`blur(${blur}px)`
			}
		}
  },
  mounted() {
    this.imageHeight == this.$refs.bgImage.clientHeight;
    this.maxTranslateY = this.imageHeight - TITLE_HEIGHT;
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    onScroll(pos) {
      this.scrollY = -pox.y;
    },
    selectItem({song,index}){
      this.selectPlay({
        list:this.songs,
        index
      })
    },
    random(){
      this.randomPlay(this.songs)
    },
    ...mapActions(['selectPlay','randomPlay']),

    },
};
</script>

<style></style>
