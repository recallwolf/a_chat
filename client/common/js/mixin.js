import {mapGetters, mapMutations} from 'vuex'
import {check} from 'api/user'

export const Mixin = {
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  activated() {
    this.checkServerToken()
    this.checkVuex()
  },
  mounted() {
    this.checkServerToken()
    this.checkVuex()
  },
  methods: {
    checkServerToken() {
      let info = JSON.parse(localStorage.getItem('userinfo'))
      if (info != null) {
        check(info.username, info.token).then((res) => {
          if (res === 'fail') {
            this.$router.push('/login')
          }
        })
      }
    },
    checkVuex() {
      let info = JSON.parse(localStorage.getItem('userinfo'))
      if (this.userinfo.token === undefined && info != null) {
        this.setUserinfo(info)
      }
      else if (this.userinfo.token === undefined && info === null){
        this.$router.push('/login')
      }
    },
    ...mapMutations({
      setUserinfo: 'SET_USERINFO'
    })
  }
}