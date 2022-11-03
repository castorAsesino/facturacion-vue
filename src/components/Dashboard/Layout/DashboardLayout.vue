<template>
  <div class="wrapper">
    <side-bar :active-color="activeColor" :background-color="backgroundColor" type="sidebar">
      <user-menu></user-menu>
      <template slot-scope="props" slot="links">
        <sidebar-item :link="{
          name: 'Inicio',
          icon: 'nc-icon nc-shop',
          path: '/admin/overview',
        }">
        </sidebar-item>
        <sidebar-item   :link="{ name: 'Articulos', icon: 'fas fa-cubes' }">
          <sidebar-item :link="{
            name: 'Crear',
            path: '/articulo/crear',
            icon: 'nc-icon nc-money-coins'
          }" />
          <sidebar-item :link="{
            name: 'Listar',
            path: '/articulo/listar',
          }" />
        </sidebar-item>
        <sidebar-item :link="{
          name: 'Clientes',
          path: '/cliente/listar',
          icon: 'fas fa-users',
        }" />
        <sidebar-item :link="{
          name: 'Facturacion',
          path: '/facturacion',
          icon: 'nc-icon nc-money-coins',
        }" />
        <sidebar-item  :link="{ 
          name: 'Informes',
          icon: 'fas fa-clipboard-list' }">
          <sidebar-item :link="{
            name: 'Historico Ventas',
            path: '/informe/historico',
            icon: 'nc-icon nc-money-coins'
          }" />
          <sidebar-item :link="{
            name: 'Ventas Consolidadas',
            path: '/informe/ventas',
          }" />
        </sidebar-item>
      </template>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import UserMenu from "src/components/UIComponents/SidebarPlugin/UserMenu.vue";
import SidebarItem from "../../UIComponents/SidebarPlugin/SidebarItem.vue";
import SideBar from "../../UIComponents/SidebarPlugin/SideBar.vue";
import SidebarLink from "../../UIComponents/SidebarPlugin/SidebarLink.vue";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    UserMenu,
    SidebarItem,
    SideBar,
    SidebarLink
  },
  data() {
    return {
      backgroundColor: "black",
      activeColor: "success",
    };
  },

  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
