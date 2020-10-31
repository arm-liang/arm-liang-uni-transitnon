<template>
  <view class="container">
    <view class="tabs" style="margin-bottom: 20px;">
      <view @click="goUrl(0)" class="tab-item">基本动画</view>
      <view @click="goUrl(1)" class="tab-item">仿状态过渡</view>
      <view @click="goUrl(2)" class="tab-item">仿列表动画</view>
      <view @click="goUrl(3)" class="tab-item">高级案例 dialog mask</view>
    </view>
  </view>
</template>

<script>

  import BaseTransition from './base-transition'

  export default {
    name: 'Test',
    components: {BaseTransition},
    data() {
      return {
        list: ['base-transition', 'status-change', 'my-transition-group', 'test-advance']
      }
    },
    methods: {
      goUrl(index) {
        uni.navigateTo({url: this.list[index]})
      }
    }
  }
</script>

<style lang="scss">
  .tabs {
    .tab-item {
      padding: 10px;
      color: deepskyblue;
      transition: opacity .3s;

      &:active {
        opacity: .8;
      }
    }
  }
</style>
