<template>
    <div class="m-header">
         <div class="icon"></div>
         <div class="text">Chicken Music</div>
         <router-link to="/user" class="mine" tag="div">
            <i class="icon-mine"></i>
         </router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
    @import "../../common/stylus/variable"
    @import "../../common/stylus/mixin"

    .m-header
        position: relative
        height: 44px
        text-align: center
        color: $color-theme
        font-size: 0
        .icon
          display: inline-block
          vertical-align: middle
          width: 30px
          height: 32px
          line-height :44px
          margin-right: 9px
          bg-image('logo')
          background-size: 30px 32px
        .text
          display: inline-block
          vertical-align: middle
          line-height: 44px
          font-size: $font-size-large
        .mine
          position: absolute
          top: 0
          right: 0
          .icon-mine
            display: block
            width:44px
            line-height: 44px
            text-align:center
            font-size: 20px
            color: $color-theme

</style>
