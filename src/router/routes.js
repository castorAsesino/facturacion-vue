import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'

//import middleware
import auth from "@/middleware/auth";
import guest from "@/middleware/guest";

// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
// Dashboard pages
const Overview = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Dashboard/Overview.vue')
const Widgets = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Dashboard/Widgets.vue')

// Pages


import Login from 'src/components/Dashboard/Views/Pages/Login.vue'
import Register from 'src/components/Dashboard/Views/Pages/Register.vue'
import Lock from 'src/components/Dashboard/Views/Pages/Lock.vue'

import PasswordReset from "src/components/Dashboard/Views/Password/Reset.vue";
import PasswordEmail from "src/components/Dashboard/Views/Password/Email.vue";

// Components pages
import Buttons from 'src/components/Dashboard/Views/Components/Buttons.vue'
import GridSystem from 'src/components/Dashboard/Views/Components/GridSystem.vue'
import Panels from 'src/components/Dashboard/Views/Components/Panels.vue'
import Facturacion from 'src/components/Dashboard/Views/Components/Facturacion.vue'
import Clientes from 'src/components/Dashboard/Views/Components/Clientes.vue'
import Articulos from 'src/components/Dashboard/Views/Components/Articulos/ListaArticulos.vue'
import CrearArticulo from 'src/components/Dashboard/Views/Components/Articulos/CrearArticulo.vue'
import ListaVentas from 'src/components/Dashboard/Views/Components/Ventas/ListaVentas.vue'


const Charts = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Charts.vue')


let componentsMenu = {
  path: '/',
  component: DashboardLayout,
  redirect: '/',
  children: [
    {
      path: 'facturacion',
      name: 'Facturacion',
      component: Facturacion
    }
  ]
};
let cliente = {
    path: '/cliente',
    name: 'Clientes',
    component: DashboardLayout,
    redirect: '/cliente/listar',
    children: [
      {
        path: 'listar',
        name: 'Listar Clientes',
        component: Clientes,
      }
    ]
};

let articulo = {
  path: '/articulo',
  name: 'Articulos',
  component: DashboardLayout,
  redirect: '/articulo/listar',
  children: [
    {
      path: 'listar',
      name: 'Listar Articulo',
      component: Articulos,
    },
    {
      path: 'crear',
      name: 'Crear Articulo',
      component: CrearArticulo
    },
    {
      path: 'editar/:id',
      name: 'Editar Articulo',
      component: CrearArticulo
    }
  ]
};

let informe = {
  path: '/informe',
  name: 'Informe',
  component: DashboardLayout,
  redirect: '/informe/historico',
  children: [
    {
      path: 'historico',
      name: 'Lista de Ventas',
      component: ListaVentas,
    },
    {
      path: 'ventas',
      name: 'Ventas Consolidadas',
      component: GridSystem
    }
  ]
};


let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: { middleware: guest }
}


const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'charts',
        name: 'Charts',
        component: Charts
      }
    ]
  },
  componentsMenu,
  loginPage,
  cliente,
  articulo,
  informe,
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    meta: { middleware: auth },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview,
        meta: { middleware: auth },
      },
      {
        path: 'widgets',
        name: 'Widgets',
        component: Widgets,
        meta: { middleware: auth },
      }
    ]
  },
  { path: '*', component: NotFound }
];

export default routes
