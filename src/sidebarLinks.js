export default [
  {
    name: 'Inicio',
    icon: 'nc-icon nc-shop',
    path: '/admin/overview'
  },
  {
    name: 'Articulos',
    icon: 'nc-icon nc-book-bookmark',
    children: [
      {
        name: 'Listar Articulo',
        path: '/articulo/listar',
      },
      {
        name: 'Crear Articulo',
        path: '/articulo/crear',
      }
    ]
  },
  {
    name: 'Clientes',
    icon: 'fas fa-users',
    children: [
      {
        path: '/cliente/listar',
        name: 'Listar Cliente',
      }
    ]
  },
  {
    name: 'Facturacion',
    icon: 'nc-icon nc-money-coins',
    path: '/facturacion',
  },
  {
    name: 'Informes',
    icon: 'fas fa-clipboard-list',
    children: [
      {
        name: 'Historico Ventas',
        path: '/informe/historico',
      },
      {
        name: 'Ventas Consolidadas',
        path: '/informe/ventas',
      }
    ]
  },
]
