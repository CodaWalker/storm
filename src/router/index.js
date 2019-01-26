import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/Home.vue'
import Login from './../components/Auth/Login.vue'
import Registration from './../components/Auth/Registration.vue'
import Admin from './../components/Admin/Admin.vue'
import Ticket from './../components/Tickets/Ticket.vue'
import NewTicket from './../components/Tickets/NewTicket.vue'
import Notices from '../components/User/Notices.vue'
import MyTickets from './../components/Tickets/MyTickets.vue'
import UserPage from './../components/User/UserPage.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name:'login',
      component: Login
    },
    {
      path: '/registration',
      name:'registration',
      component: Registration
    },
    {
      path: '/newTicket',
      name: 'newTicket',
      component: NewTicket
    },
    {
        path: '/ticket/:tid&:uid?',
        props:true,
        name: 'ticket',
        component: Ticket
    },
    {
      path: '/notices',
      name:'notices',
      component: Notices
    },
    {
      path: '/myTickets',
      name:'myTickets',
      component: MyTickets
    },
    {
      path: '/userPage/:uid?',
        props:true,
      name: 'userPage',
      component: UserPage
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin
    }
  ]
})
