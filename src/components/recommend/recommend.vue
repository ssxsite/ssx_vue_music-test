<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
              <!-- v-if="recommends.length" 跨域让数据到来之后才去渲染slider 组件，因为slider里面有dom操作-->
                <div v-if="recommends.length" class="slide-wrapper">
                    <slider>
                        <div v-for="(item, index) in recommends" :key="index">
                            <a :href="item.linkUrl">
                                <img class="needsclick" :src="item.picUrl"  @load="loadImage">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li @click="selectItem(item)" v-for="(item, index) in discList" :key="index" class="item">
                            <div class="icon">
                                <img v-lazy="item.imgurl" width="60" height="60">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div>
        </scroll>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

    </div>
</template>


<script>
import Scroll from '@/baseComponents/scroll/scroll'
import {getRecommend,getDiscList} from '@/api/recommend'
import {ERR_OK} from '@/api/config'
import Slider from '@/baseComponents/slider/slider'
import Loading from '@/baseComponents/loading/loading'
import {playlistMixin} from '@/common/js/mixin'
import {mapMutations} from 'vuex'

export default {
    mixins: [playlistMixin],
    components: {
       Slider,
       Scroll,
       Loading
    },
    data() {
        return {
            recommends: [],
            discList: []
        }
    },
    created() {
      console.log("created")
        this._getRecommend();
        this._getDiscList();
    },
  mounted(){
      console.log("mounted")
  },
  destroyed(){
    console.log("destroyed")
  },
  beforeUpdate(){
    console.log("beforeUpdate")
  },
  updated(){
    console.log("updated")
  },
    methods: {
        handlePlaylist(playlist){
             const bottom = playlist.length > 0 ? '60px' : ''
             this.$refs.recommend.style.bottom = bottom //底部播放器适配
             this.$refs.scroll.refresh() //强制scroll重新计算
        },
        loadImage() {
            if(!this.checkloaded){
                this.checkloaded = true
                this.$refs.scroll.refresh()
            }
        },
        selectItem (item) {
            this.$router.push({
                path: `/recommend/${item.dissid}`
            })
             this.setDisc(item)
        },
        _getRecommend() {
            getRecommend().then((res) => {
                if(res.code === ERR_OK) {
                    // console.log(res.data.slider)
                    this.recommends = res.data.slider
                }
            })
        },
        _getDiscList() {
            getDiscList().then((res) => {
                if(res.code === ERR_OK) {
                    // console.log(res.data.list)
                    this.discList = res.data.list
                }
            })
        },
        ...mapMutations({
            setDisc: 'SET_DISC'
        })
    }
}
</script>


<style lang="stylus" scoped>
@import "../../common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center //水平方向居中
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column  //纵向排列
            justify-content: center  //垂直居中
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
          position: absolute
          width: 100%
          top: 50%
          transform: translateY(-50%)
</style>
