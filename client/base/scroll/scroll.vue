<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    mounted() {
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    methods: {
      _initScroll() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: 3,
          click: true
        })

        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })

        this.scroll.on('scrollStart', () => {
          if (this.scroll.y >= (-50)) {
            this.$emit('scrollToStart')
          }
        })
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollBottom() {
        this.scroll && this.scroll.scrollTo(0, this.scroll.maxScrollY)
      },
      scrollTOP() {
        this.scroll && this.scroll.scrollTo(0, 0)
      }
    }
  }
</script>