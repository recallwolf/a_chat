import Vue from 'vue'
import Router from 'vue-router'
import Chat from 'components/chat/chat'
import Home from 'components/home/home'
import Setting from 'components/setting/setting'
import Chatroom from 'components/chatroom/chatroom'
import Login from 'components/login/login'
import Regsiter from 'components/register/register'
import Weather from 'components/weather/weather'
import Express from 'components/express/express'
import Daily from 'components/daily/daily'
import News from 'components/news/news'
import Content from 'components/news/content/content'
import Ticket from 'components/ticket/ticket'
import Station from 'components/ticket/station/station'

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
          name: 'Chatroom',
          component: Chatroom,
          props: true
        },
        {
          path: 'robot/:id',
          name: 'Robot',
          component: Chatroom,
          props: true
        }
      ]
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'weather',
          name: 'Weather',
          component: Weather
        },
        {
          path: 'express',
          name: 'Express',
          component: Express
        },
        {
          path: 'daily',
          name: 'Daliy',
          component: Daily
        },
        {
          path: 'ticket',
          name: 'Ticket',
          component: Ticket,
          children: [
            {
              path: 'station',
              name: 'Station',
              component: Station
            }
          ]
        },
        {
          path: 'news',
          name: 'News',
          component: News,
          children: [
            {
              path: 'content',
              name: 'Content',
              component: Content
            }
          ]
        }
      ]
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/private/:id',
      name: 'Private',
      component: Chatroom,
      props: true
    }
  ]
})
