import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import TabsPage from '@/views/TabsPage.vue';
import ListaPage from '@/views/ListaPage.vue';
import DetalhePage from '@/views/DetalhePage.vue';
import CadastroPage from '@/views/CadastroPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import ResetPasswordPage from '@/views/ResetPasswordPage.vue';
import { usuarioLogado } from '@/composables/useUsers';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/Cadastro',
    name: 'Cadastro',
    component: CadastroPage
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/ResetPassword',
    name: 'ResetPassword',
    component: ResetPasswordPage
  },
  {
    path: '/tabs',
    component: TabsPage,
    children: [
      {
        path: 'tarefas',
        name: 'Tarefas',
        component: ListaPage
      },
      {
        path: 'tarefas/:id',
        name: 'Detalhe',
        component: DetalhePage
      },
      {
        path: 'perfil',
        name: 'Perfil',
        component: () => import('@/views/PerfilPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {

  if (to.path === '/tabs/perfil') {

    if (!usuarioLogado.value || !usuarioLogado.value.nome) {
      next('/tabs/tarefas')
    } else {
      next()
    }

  } else if (to.path.startsWith('/tabs')) {

    if (!usuarioLogado.value) {
      next('/Login')
    } else {
      next()
    }

  } else {
    next()
  }

})

export default router
