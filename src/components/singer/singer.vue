<template>
    <div class="singer" ref="singer">
        <listview :data="singers" @select="selectSinger" ref="list"></listview>
        <router-view></router-view>
    </div>
</template>


<script src="./singer.js">

</script>


<style lang="stylus" scoped>
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>
