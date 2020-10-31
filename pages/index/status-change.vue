<template>
  <view id="statusChange">
    <view>状态过渡</view>
    <view>当前模式：{{mode}} (ps:红色退出，蓝色进入)</view>
    <button @click="changeMode">改变模式</button>

    <view style="height: 10px;"/>

    <view style="display: flex">
      <button :disabled="currentShowIndex < 1" @click="safeChangeCurrent(false)">上一步</button>
      <button :disabled="currentShowIndex >= list.length" @click="safeChangeCurrent(true)">下一步</button>
    </view>
    <my-transition :duration="duration" :key="index" :value="list[index]" name="slide" v-for="(_,index) in list">
      <view style="height: 80px;border: solid 1px #ccc;">
        <button>当前index：{{index}}</button>
      </view>
    </my-transition>
  </view>
</template>

<script>
  import MyTransition from 'components/arm-liang-transition/arm-liang-transition'

  export default {
    name: 'StatusChange',
    components: {MyTransition},
    data() {
      const list = new Array(5).fill(false)

      // 默认显示
      const currentShowIndex = 0
      list[currentShowIndex] = true


      return {
        duration: 1000,
        // 默认激活0
        currentShowIndex,
        list,

        modeIndex: 0,
        modeList: ['default', 'out-in', 'in-out']
      }
    },
    computed: {
      mode() {
        return this.modeList[this.modeIndex]
      }
    },
    watch: {
      async currentShowIndex(newIndex, oldIndex) {
        // 如果newIndex大于原来的index循环就正向
        let isForward = newIndex > oldIndex
        // 如果莫得等于 in-out isForward 还需要再进行反向
        if(this.mode === 'in-out') {
          isForward = !isForward
        }

        let list = this.list;
        let length = list.length;
        let i = isForward ? 0 : length - 1

        while(isForward ? i < length : i >= 0){
          const flag = i === newIndex
          if (this.mode === 'default') {
            // 不做特殊处理进行延迟
          } else if (this.mode === 'out-in') {
            // 当前 list item 为显示，并且需要切换 为隐藏
            if (!flag && list[i]) {
              // 先直接隐藏
              this.$set(list, i, false)
              // 然后等待duration再进行循环
              await this.delay()
            }
          } else if (this.mode === 'in-out') {
            // 当前 list item 为隐藏，并且需要切换为显示
            if (flag && !list[i]) {
              // 先设置显示
              this.$set(list, i, true)
              // 然后直接等待 duration 再进行循环
              await this.delay()
            }
          }
          // 不延迟直接设置
          this.$set(list, i, flag)

          // 循环变量自增或者自减
          i = isForward ? i + 1 : i - 1

        }
      }
    },
    methods: {
      // 安全修改current，在动画过程中无法继续操作
      safeChangeCurrent(isAdd) {
        if(this.__transitionLockId) return

        this.currentShowIndex = isAdd ? this.currentShowIndex + 1 : this.currentShowIndex - 1
        this.__transitionLockId = setTimeout(()=>{
          this.__transitionLockId = undefined
        }, this.duration)
      },
      changeMode() {
        this.modeIndex = (this.modeIndex + 1) % this.modeList.length
      },
      delay() {
        return new Promise(resolve => {
          setTimeout(resolve, this.duration)
        })
      },
      getNow() {
        return Date.now().toString().substr(9)
      },
      async setListTrue(index) {

      }
    }
  }
</script>

<style lang="scss">
  #statusChange {
    .slide {
      &-enter {
        transform: translateX(-100%);
      }

      &-leave-to {
        transform: translateX(100%);
      }

      &-enter-active {
        background-color: lightskyblue;
      }

      &-leave-active {
        background: lightcoral;
      }

      &-enter-active,
      &-leave-active {
        transition: transform 1s, background-color 1s;
      }
    }
  }
</style>
