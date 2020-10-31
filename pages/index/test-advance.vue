<template>
  <view>
    <my-transition-dialog :visible.sync="show" is-animation>
      <view style="padding: 20px;">
        <view>hello world</view>
        <view>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, voluptas.</view>
        <button @click="show = false">close</button>
      </view>
    </my-transition-dialog>

    <view @click="show = !show" class="fake-btn" style="">toggle</view>

  </view>
</template>

<script>
  import MyTransitionDialog from './my-transition-dialog'

  export default {
    name: 'TestAdvance',
    components: { MyTransitionDialog},
    data() {
      return {
        show: false
      }
    }
  }
</script>

<style lang="scss">
  .fake-btn {
    background-color: lightskyblue;
    color: #fff;
    padding: 10px;
    font-size: 24px;
    text-align: center;
    transition: opacity .3s;
    &:active {
      opacity: .5;
    }
  }
</style>
