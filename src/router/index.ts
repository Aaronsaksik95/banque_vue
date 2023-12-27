import { createRouter, createWebHistory } from 'vue-router'
import MyAccountsView from '../views/MyAccountsView.vue'
import MyAccountView from '../views/MyAccountView.vue'
import CreateAccountView from '../views/CreateAccountView.vue'
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/myAccounts',
      name: 'my accounts',
      component: MyAccountsView
    },
    {
      path: '/myAccount/:accountId',
      name: 'my account',
      component: MyAccountView
    },
    {
      path: '/createAccount',
      name: 'create account',
      component: CreateAccountView
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
  ]
})

export default router
