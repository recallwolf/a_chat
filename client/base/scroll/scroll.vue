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
        
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollBottom() {
        this.scroll && this.scroll.scrollTo(0, this.scroll.maxScrollY)
      },
      scrollTop() {
        this.scroll && this.scroll.scrollTo(0, 0)
      },
      scrollTo_El(el) {
        this.scroll && this.scroll.scrollToElement(el)
      }
    }
  }
</script>