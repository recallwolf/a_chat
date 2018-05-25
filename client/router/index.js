import Vue from 'vue'
import Router from 'vue-router'
import Chat from 'components/chat/chat'
import Home from 'components/home/home'
import Setting from 'components/setting/setting'
import Chatroom from 'components/chatroom/chatroom'
import Login from 'components/login/login'
import Regsiter from 'components/register/register'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Regsiter',
      component: Regsiter
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      children: [
        {
          path: 'chatroom/:id',
          component: Chatroom,
          props: true
        },
        {
          path: 'robot/:id',
          component: Chatroom,
          props: true
        }
      ]
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }
  ]
})
