<template>
  <!--如果传入了 destroyOnHide 使用v-if 替代v-show-->
  <view
    :class="[comClass]"
    :style="[customStyle]"
    v-if="!destroyOnHide || innerShow"
    v-show="destroyOnHide ? true : innerShow"
  >
    <slot/>
  </view>
</template>

<script>
  export default {
    name: 'MyTransition',
    props: {
      appear: {
        type: Boolean,
        default: false
      },
      value: {
        type: Boolean,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      customClass: {
        type: String,
        default: ''
      },
      duration: {
        type: Number,
        default: 300
      },
      customStyle: {
        type: Object,
        default: () => ({})
      },
      // 是否使用v-if 替代 v-show
      destroyOnHide: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        innerShow: this.value,
        // 保存 动态状态 enter 、 enter-active, leave 、leave-active
        innerClass: '',
      }
    },
    computed: {
      // 组合之后的class
      // enter-active enter-to => name-enter-active name-enter-to
      comClass() {
        return this.innerClass.split(' ').filter(Boolean).map(state => this.name + '-' + state).join(' ') +
          ' ' + this.customClass + ' '
      },
    },
    created() {
      this.$watch('value', this.handler)

      // appear 出现动画
      if (this.appear) {
        if (this.value) {
          this.__appearing = true
          this.handler(this.value)
        }
      }
    },
    methods: {
      async delay(cb) {
        // 不是小程序直接setTimeout 20
        // #ifndef  MP
        setTimeout(cb, 20)

        // #endif
        // #ifdef  MP
        const start = Date.now()

        // 阻塞微任务队列延迟 50 毫秒比较好
        // eslint-disable-next-line no-constant-condition
        for (; true;) {
          if (Date.now() - start >= 50) {
            break
          } else {
            await this.$nextTick()
          }
        }
        cb()
        // #endif
      },
      handler(val) {
        if (val) {
          // hide => show
          this.innerShow = true
          this.innerClass = 'enter'
          this.$emit('before-' + (this.__appearing ? 'appear' : 'enter'))
        } else {
          // show => hide
          this.innerClass = 'leave'
          if (this.__appearing) {
            this.$emit('appear-cancel')
            this.__appearing = false
          } else {
            this.$emit('before-leave')
          }
        }

        this.delay(() => {
          this.innerClass = val ? 'enter-active enter-to' : 'leave-active leave-to'

          // 以最新的状态作为动画结束状态，清除之前的动画结束函数
          if (this.__timerId) {
            this.$emit(val ? 'leave' : 'enter' + '-cancelled')

            clearTimeout(this.__timerId)
          } else {
            this.$emit(val ? (this.__appearing ? 'appear' : 'enter') : 'leave')
          }

          this.__timerId = setTimeout(() => {
            // 等待动画完成修改 innerShow
            this.innerClass = ''
            this.innerShow = val

            this.$emit('after-' + (this.__appearing ? 'appear' : 'enter'))

            this.__timerId = null
            this.__appearing = null
          }, this.duration)
        })
      }
    }
  }
</script>
