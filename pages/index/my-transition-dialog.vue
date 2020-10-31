<template>
  <view class="my-transition-dialog">
    <my-transition
      :value="visible"
      appear
      destroy-on-hide
      name="dialog-bounce"
      ref="myTransition">
      <view @click="$emit('update:visible', false)" class="dialog-wrap">
        <view :style="{'margin-top': top}" class="dialog-body">
          <slot/>
        </view>
      </view>
    </my-transition>
    <my-transition :value="visible" appear name="mask-fade">
      <view @click="$emit('update:visible', false)" class="mask"/>
    </my-transition>
  </view>
</template>

<script>
  import MyTransition from 'components/arm-liang-transition/arm-liang-transition'

  export default {
    // 使用transition的高级动画，实现一个dialog模态框
    name: 'MyTransitionDialog',
    components: {MyTransition},
    props: {
      // 是否启动animation动画 真实的 bounce动画
      isAnimation: {
        type: Boolean,
        default: false
      },
      visible: {
        type: Boolean,
        required: true
      },
      top: {
        type: String,
        default: '10vh'
      }
    },
    data() {
      return {}
    },
    created() {
      if (this.isAnimation) {
        this.animation = uni.createAnimation({
          duration: 300,
          timingFunction: 'ease',
        })
      }
    },
    methods: {}
  }
</script>

<style lang="scss">
  @import "uni";

  .dialog-wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999 + 20;

    // 让body水平居中
    .dialog-body {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fff;
    }

    // 动画不知道为什么写在了样式写在了组件里面就会失效
    // 建议现在 app.vue 里面或者 页面里面，不要写在自定义组件
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background-color: rgba(#000, .3);
  }


</style>
