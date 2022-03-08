<template>
  <div class="singer-detail">
    <music-list :songs="songs" :title="title" :pic="pic" :loading="loading"></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from "@/service/singer";
import { processSongs } from "@/service/song";
import { MusicList } from "@/components/music-list";
import storage from 'good-storage'
import {SINGER_KEY} from '@/assets/js/constant'
export default {
  name: "singer-detail",
  props: {
    singer: Object,
  },
  components: {
    MusicList,
  },
  data() {
    return {
      songs: [],
      loading: true,
    };
  },
  computed: {
    computedSinger(){
      let ret=null
      const singer=this.singer
      if(singer){
        ret=singer
      }else{
        const cachedSinger=storage.session.get(SINGER_KEY)
        if(cachedSinger&&cachedSinger.mid==this.$route.params.id){
          ret=cachedSinger
        }
      }
      return ret
    },
    pic() {
      const singer=this.computedSinger
      return this.singer && this.singer.pic;
    },
    title() {
      const singer=this.computedSinger
      return this.singer && this.singer.name;
    },
  },
  async create() {
    if(this.computedSinger){
      const path=this.$route.matched[0].path
      this.$router.push({path})
      return 
    }
    const result = await getSingerDetail(this.computedSinger);
    this.songs = await processSongs(result.songs);
    this.loading = false;
  },
};
</script>

<style></style>
