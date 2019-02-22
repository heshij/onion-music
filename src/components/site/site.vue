<template>
  <transition name="slide">
    <div class="site">
      <div class="back" @click="back">
        <i class="icon-back" :style="{color: skinColor}"></i>
      </div>
      <h1 class="title">设置</h1>
      <div class="bg-image">
        <div class="play-wrapper">
          <!--<div ref="playBtn" class="play">
            <i class="icon-play"></i>
            <span class="text">随机播放全部</span>
          </div>-->
        </div>
        <!--<div class="filter" ref="filter"></div>-->
      </div>
      <div class="theme">
        <i class="icon-prev"></i>
        <span class="text">个性主题</span>
      </div>
      <ul class="color">
        <li @click="setSkinColor('#D43C33')">红</li>
        <li @click="setSkinColor('#0099CC')">蓝</li>
        <li @click="setSkinColor('#58D68D')">绿</li>
      </ul>
      <!--<div class="bg-layer" ref="layer"></div>-->
    </div>
  </transition>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: "site",
    computed: {
      ...mapGetters([
        'skinColor'
      ])
    },
    methods: {
      back() {
        this.$router.back()
      },
      ...mapMutations({
        setSkinColor: 'SET_SKIN_COLOR'
      })
    },
    watch: {
      skinColor(val) {
        localStorage.skinColor = val;
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .site
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(-100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      background-image: url("./iseeyou.jpg")
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .color
      display flex
      justify-content space-around
      margin-top: 20px
      li
        width: 25%
        height: 30px
        text-align center
        line-height: 30px
</style>
