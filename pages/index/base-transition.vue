<template>
  <view class="baseTransition">
    <view>基本动画</view>
    <view style="display: flex;align-items: center">
    </view>
    <button @click="show = !show">切换</button>
    <view style="height: 40px;" />
    <view>
      <view
        v-for="item in list"
        :key="item"
        class="item"
      >
        <my-transition
          :value="show"
          :name="item"
          :duration="duration"
        >{{ item }}
        </my-transition>
      </view>
    </view>
  </view>
</template>

<script>
import MyTransition from 'components/arm-liang-transition/arm-liang-transition'

export default {
  name: 'BaseTransition',
  components: { MyTransition },
  data() {
    return {
      duration: 300,
      show: true,
      list: ['fade', 'slide-top', 'slide-bottom', 'slide-left', 'slide-right', 'zoom']
    }
  }
}
</script>

<style lang="scss">
  @import "uni";

  .item {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border: solid 1px #ccc;
    margin-bottom: -1px;
  }

  page {
    @include anim(fade) {
      opacity: 0;
    }

    @include anim(slide-top) {
      opacity: 0;
      transform: translateY(-21px);
    }

    @include anim(slide-bottom) {
      opacity: 0;
      transform: translateY(19px);
    }

    @include anim(slide-right) {
      opacity: 0;
      transform: translateX(19px);
    }

    @include anim(slide-left) {
      opacity: 0;
      transform: translateX(-21px);
    }

    @include anim(zoom) {
      opacity: .3;
      transform: scale(.5);
    }
  }

</style>
