# ssx_vue_music-test

> vue2 + vue-router2 +vuex + jsonp + es6 +webpack 抓取QQ音乐真实数据的移动端音乐WebApp

# 技术栈

【前端】

- Vue：用于构建用户界面的 MVVM 框架。它的核心是响应的数据绑定和组系统件
- vue-router：为单页面应用提供的路由系统，项目上线前使用了路由懒加载技术来实现异步加载优化性能
- vuex：Vue 集中状态管理，在多个组件共享某些状态时非常便捷
- vue-lazyload：第三方图片懒加载库，优化页面加载速度，减少网络资源浪费
- better-scroll：iscroll 的优化版，使移动端滑动体验更加流畅
- stylus：css 预编译处理器
- ES6：ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等方法非常好用

【通信方式】

- jsonp：抓取 QQ音乐(移动端)数据
- axios：抓取 QQ音乐(PC端)数据

【自动化构建及其他工具】VConsole

- vue-cli：Vue 脚手架工具，快速搭建项目
- eslint：代码风格检查工具，规范代码格式
- vConsole：移动端调试工具，在移动端输出日志

# 项目搭建

1.npm install -g vue-cli

2.vue init webpack ssx_vue_music-test


# 安装与运行

npm install //安装依赖

npm run dev //服务端运行 访问 http://localhost:8080

npm run build  //项目打包
```

# 相关依赖安装

1.babel-runtime —— 对es6语法做一些转义

npm install babel-runtime --save

2.fastclick —— 解决部分移动端浏览器点击延迟300ms的问题

npm install fastclick --save

3.babel-polyfill —— 【补丁】 对es6中promise等API的转义

npm install babel-polyfill --save

4.stylus

npm install stylus stylus-loader --save

5.JSONP 插件

npm install jsonp --save

6.axios
npm install axios --save

7. vconsole 在移动端console.log (https://github.com/Tencent/vConsole)
npm install vconsole -D




# 实现页面

主要页面：播放器内核页、推荐页、歌单详情页、歌手页、歌手详情页、排行页、搜索页、添加歌曲页、个人中心页等。

核心页面：播放器内核页

## 推荐页

上部分是一个轮播图组件，使用第三方库 `better-scroll` 辅助实现，使用 `jsonp` 抓取 QQ音乐(移动端)数据

下部分是一个歌单推荐列表，使用 `axios` +` Node.js` 代理后端请求，绕过主机限制 (伪造 headers)，抓取 QQ音乐(PC端)数据

歌单推荐列表图片，使用图片懒加载技术 `vue-lazyload`，优化页面加载速度

为了更好的用户体验，当数据未请求到时，显示 `loading` 组件

## 推荐页 -> 歌单详情页

由于歌手的状态多且杂，这里使用 `vuex` 集中管理歌手状态

这个组件更加注重 UX，做了很多类原生 APP 动画，如下拉图片放大、跟随推动、ios 渐进增强的高斯模糊效果 `backdrop-filter` 等

## 歌手页

左右联动是这个组件的难点

左侧是一个歌手列表，使用 `jsonp` 抓取 QQ音乐(PC端)歌手数据并重组 JSON 数据结构

列表图片使用懒加载技术 `vue-lazyload`，优化页面加载速度

右侧是一个字母列表，与左侧歌手列表联动，滚动固定标题实现

## 歌手页 -> 歌手详情页

复用歌单详情页，只改变传入的参数，数据同样爬取自 QQ音乐

播放器内核页

核心组件。用 `vuex` 管理各种播放时状态，播放、暂停等功能调用 audio API

播放器可以最大化和最小化

中部唱片动画使用第三方 JS 动画库 `create-keyframe-animation` 实现

底部操作区图标使用 `iconfonts`。

抽象了一个横向进度条组件和一个圆形进度条组件，横向进度条可以拖动小球和点击进度条来改变播放进度，圆形进度条组件使用 `SVG <circle>` 元素

播放模式有：顺序播放、单曲循环、随机播放，原理是调整歌单列表数组

歌词的爬取利用 `axios` 代理后端请求，伪造 `headers` 来实现，先将歌词 `jsonp` 格式转换为 `json` 格式，再使用第三方库 `js-base64` 进行 `Base64` 解码操作，最后再使用第三方库 `lyric-parser` 对歌词进行格式化

实现了侧滑显示歌词、歌词跟随进度条高亮等交互效果

增加了当前播放列表组件，可在其中加入/删除歌曲

## 排行页

普通组件

## 排行页 -> 歌单详情页

复用歌单详情页

## 搜索页

抓数据，写组件，另外，根据抓取的数据特征，做了上拉刷新的功能

考虑到数据量大且频繁的问题，对请求做了节流处理

考虑到移动端键盘占屏的问题，对滚动前的 `input` 做了 `blur()` 操作

对搜索历史进行了 `localstorage` 缓存，清空搜索历史时使用了改装过的 `confirm` 组件

支持将搜索的歌曲添加到播放列表

## 个人中心

将 `localstorage` 中 “我的收藏” 和 “最近播放” 反映到界面上

## 其他

此应用的全部数据来自 QQ音乐，推荐页的歌单列表及歌词是利用 `axios` 结合 `node.js` 代理后端请求抓取的。

全局通用的应用级状态使用 `vuex` 集中管理

全局引入 `fastclick` 库，消除 `click` 移动浏览器300ms延迟

页面是响应式的，适配常见的移动端屏幕，采用 `flex` 布局

# 注意
此音乐播放器数据全部来自 QQ 音乐，接口改变了就需要修改 jsonp 和 axios 代码

#路由
本项目使用路由懒加载，来减小首屏文件的大小，也便于缓存处理。




# 收获
1. 合理的项目文件划分，便于后期维护(api、common、router、store、baseComponents、component等)
2. 拓展性良好，合理划分的css文件，包括base,reset,mixin,variabel等基本文件，便于复用和批量修改。
3. 学习了一些移动端常用插件，比如fastclick，better-scroll等。
4. 使用promise封装jsonp请求 （jsonp.js）
5. 使用keep-alive缓存DOM，然tab切换页面无闪动，并且减少网络请求
6. vue 的一些高级用法，比如 ref,slot,mixins,nextTick,computed,watch等的用法
7. vue-lazyload插件 解决图片懒加载 的问题，减少网络请求
8. vuex 控制播放器播放歌曲
9. 总结出一套适用于 Vue项目的通用组件，SCSS mixin 库，JS 工具函数库
10.v-show 和 v-if的 合理使用
11.vue transition的用法


##爬坑记录：
1. 然一个组件在数据到来后才渲染，可以用v-if控制
2. 当组件中有定时器，记得在destroyed的时候清理掉这些定时器

