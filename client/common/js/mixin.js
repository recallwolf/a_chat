import {mapGetters, mapMutations} from 'vuex'
import axios from 'axios'

export const Mixin = {
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  mounted() {
    this.checkServerToken()
    this.checkVuex()
  },
  methods: {
    checkServerToken() {
      let info = JSON.parse(localStorage.getItem('userinfo'))
      if (info != null) {
        axios.post('/api/check', {
          token: info.token
        }).then((res) => {
          if (res.data === 'fail') {
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