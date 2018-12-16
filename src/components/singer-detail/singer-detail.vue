<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from "../../api/singer";
  import {ERR_OK} from "../../api/config";
  import {createSong} from "../../common/js/song";
  import {getVkey} from "../../api/song";
  import MusicList from "../music-list/music-list";

  export default {
    components: {MusicList},
    data() {
      return {
        songs: [],
        newSongs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getDetail()
      //console.log(this.singer);
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
            // console.log(this.songs);
          }
        })
      },
      _normalizeSongs(list) {
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            getVkey(musicData.songmid).then(res => {
              if (res.code === ERR_OK) {
                let data = res.data.items[0]
                let url = `http://dl.stream.qqmusic.qq.com/${data.filename}?vkey=${data.vkey}&guid=7332953645&fromtag=66`
                this.newSongs.push(createSong(musicData, url))
              }
            })
          }
        })
        return this.newSongs
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* @import "~common/stylus/variable"
   .singer-detail
     position: fixed
     z-index: 100
     top: 0
     left: 0
     right: 0
     bottom: 0
     background: $color-background
     */
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
