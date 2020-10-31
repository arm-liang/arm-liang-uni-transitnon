<template>
  <view id="myTransitionGroup">
    <view>列表动画，appear列表显示，新增和删除</view>
    <view @click="add" style="color: lightskyblue">新增</view>
    <my-transition :key="item.text" :value="item.show" appear destroy-on-hide name="slide-in-left" v-for="item in list">
      <view style="display: flex">
        <view>{{item.text.padEnd(20, '-')}}</view>
        <view @click="remove(item)" style="color:lightcoral">删除</view>
      </view>
    </my-transition>
  </view>
</template>

<script>
  import MyTransition from 'components/arm-liang-transition/arm-liang-transition'

  export default {
    name: 'MyTransitionGroup',
    components: {MyTransition},
    data() {
      return {
        show: false,
        list: new Array(16).fill(0).map(v => ({})).map((v, i) => {
          v.text = String.fromCharCode(65 + i)
          v.show = true
          return v
        }),
      }
    },
    methods: {
      add() {
        let last = this.list[this.list.length - 1]
        let char = last.text.charCodeAt(0) + 1
        this.list.push({
          show: true,
          text: String.fromCharCode(char)
        })
      },
      remove(item) {
        item.show = false
      }
    }
  }
</script>

<style lang="scss">
  @import 'uni';

  #myTransitionGroup {
    @include anim(slide-in-left) {
      transform: translateX(-100%);
    }
  }
</style>

