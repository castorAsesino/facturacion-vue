<template class="col-scroll">
  <el-row :gutter="5">
    <el-col :xs="24" :sm="8">
      <el-card class="col-scroll1">
        <el-row :gutter="24">
          <el-col :xs="20" :sm="20">
            <el-select class="select-primary" filterable placeholder="Cliente"
              no-data-text="No se encontraron resultados." v-model="clienteInput" value-key="id"
              @change="setearCliente($event)">
              <el-option v-for="item in clientes" :key="item.id" :label="item.nombreCompleto" :value="item.id"
                class="select-primary">
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="4" :sm="4">
            <p-button @click.native="modals.buscarCliente = true" type="primary" title="Agregar Cliente"
              style="margin: 0px !important;"><i class="fas fa-fingerprint fa-lg"></i></p-button>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :xl="24">
            <el-select class="select-primary" filterable placeholder="Buscar Producto" @change="buscarProducto( $event)"
              v-model="productoInput" no-data-text="No se encontraron resultados.">
              <el-option v-for="item in productoSearch" :key="item.id" :label="item.descripcion" :value="item"
                class="select-primary"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <div class="tableFixHead">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="producto in productosSeleccionados" :key="producto.id">
                  <td>
                    <el-button size="mini" title="Editar" type="warning" style="width: 100%; text-align: left;">
                      {{ producto.descripcion }}
                    </el-button>
                  </td>
                  <td>{{ producto.precioVenta }}</td>
                  <td>
                    <input :value="producto.cantidad" style="width: 80px;" :v-model="cantidadInput"
                      v-on:change="actualizarCantidad($event.target.value, producto)">
                  </td>
                  <td>{{ producto.totalBruto }}</td>
                  <td>
                    <el-button size="mini" title="Eliminar" type="danger" @click="eliminar(producto)"><i
                        class="el-icon-delete"></i></el-button>
                  </td>
                </tr>
                <tr v-if="productosSeleccionados.length == 0">
                  <td colspan="4" class="empty-table"><i class="el-icon-shopping-cart-2"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple">Cantidad Productos:</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">{{ cantidadProducto }} ({{ cantidadArticulos }})</div>
          </el-col>
        </el-row>
        <el-divider />
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple payment-title bold">TOTAL A PAGAR:</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple payment-title bold">{{ totalPagar | currency }}.</div>
          </el-col>
        </el-row>
        <el-divider />
        <el-row :gutter="24">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-button size="big" title="Cancelar" type="danger" v-on:click="modals.mini = true">Cancelar
              <i class="el-icon-circle-close"></i>
            </el-button>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-button size="big" title="Pagar" type="success" :disabled='clienteInput.length === 0 || totalPagar === 0 '
              @click.native="modals.pagar = true">PAGAR <i class="el-icon-money"></i></el-button>
          </el-col>
        </el-row>

      </el-card>
    </el-col>
    <el-col :xs="24" :sm="16">
      <TabArticulos @seleccionarProducto="seleccionarProducto" />
    </el-col>

    <ModalPagar :showPagar.sync="modals.pagar"
      :cliente="this.datosCliente" 
      :productos="this.productosSeleccionados"
      :cantidadProducto="this.cantidadProducto"
      :cantidadArticulos="this.cantidadArticulos" 
      :totalPagar="this.totalPagar" 
      @closeModalPagar="handleCloseModalPagar"
      />

    <ModalCancelar :show.sync="modals.mini" 
      @limpiar="limpiar"></ModalCancelar>
    <!--<ModalCliente :showModalCliente="modals.classic" 
      @closeModalCliente="handleCloseModalCliente">
    </ModalCliente>-->
    <ModalBuscarCliente :show.sync="modals.buscarCliente" :clienteInput.sync="clienteInput" ></ModalBuscarCliente>
    <ModalArticulo :showModal="modals.articulo"
      @closeModal="handleCloseModalArticulo">
    </ModalArticulo>
  </el-row>

</template>

<style>
.item {
  margin-top: 10px;
}

.payment-title {
  color: #000000;
}

.bold {
  font-weight: bold;
  font-size: 1.1rem;
}

.empty-table {
  text-align: center;
  font-size: 2rem;
  color: #aaabad;
}

.empty-size {
  margin-top: 30px;
  text-align: center;
}

.empty-subtitle {
  text-align: center;
}

.tableFixHead {
  overflow: auto;
  height: 530px;
  zoom: 80%;
}

.tableFixHead thead th {
  position: sticky;
  top: 0;
  z-index: 1;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px 16px;
  text-align: center;
  text-transform: none !important;
}

th {
  background: #eee;
}

.col-scroll {
  height: 50rem;
  overflow: auto;
}

.col-scroll1 {
  height: 53.2rem;
  overflow: auto;
}

.description-product {
  padding: 0;
  float: right;
  margin: 5px;
  text-align: center;
  font-size: 12px;
  color: black !important;
}

.image {
  width: 100%;
  display: block;
}

.product-list>.el-card__body {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 5px;
  height: 200px !important;
}

.card-image {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(8, 1fr);
  height: 200px !important;
}


.el-card__body {
  margin: 20px;

}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

/* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ddd;
  background-color: #f1f1f1;
  border-radius: 0.3rem;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ddd;
}
</style>
<script>
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Input,
  Loading,
  Option,
  Row,
  Select,
  Table,
  TableColumn
} from 'element-ui';
import ModalCliente from './ModalCliente.vue';
import ModalArticulo from '../Components/Articulos/ModalArticulo.vue';
import axios from '../../../../util/axios';
import ModalCancelar from '../../../Dashboard/Layout/ModalCancelar.vue';
import ModalPagar from '../../Layout/ModalPagar.vue';
import TabArticulos from "@/components/Dashboard/Views/Components/TabArticulos";
import ModalBuscarCliente from '../../../Dashboard/Views/Components/Clientes/ModalBuscarCliente.vue';

export default {
  components: {
    TabArticulos,
    [Badge.name]: Badge,
    [Card.name]: Card,
    [Col.name]: Col,
    [Row.name]: Row,
    [Select.name]: Select,
    [Option.name]: Option,
    [Input.name]: Input,
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Divider.name]: Divider,
    [Avatar.name]: Avatar,
    ModalCancelar,
    ModalCliente,
    ModalArticulo,
    [Loading.name]: Loading,
    ModalPagar,
    ModalBuscarCliente
  },

  data() {
    return {
      datosCliente: null,
      nombreCliente: null,
      productoSelected: null,
      productoInput: '',
      clienteInput: 1,
      cantidadInput: 0,
      cantidadProducto: 0,
      cantidadArticulos: 0,
      totalPagar: 0,
      clientes: [],
      productoSearch: [],
      productosSeleccionados: [],
      modals: {
        classic: false,
        pagar: false,
        mini: false,
        articulo: false,
        buscarCliente: false
      },
    }
  },
  methods: {
    handleEditarProducto(producto) {
      console.log(producto)
      this.productoSelected = producto;
      this.modals.articulo = true;
    },
    handleCloseModalCliente() {
      this.modals.classic = false;
      this.listarClientes();
    },
    handleCloseModalArticulo() {
      this.modals.articulo = false;
    },
    handleCloseModalPagar(){

    },
    calcularTotalPagar() {
      this.cantidadProducto = this.productosSeleccionados.length;
      this.totalPagar = this.productosSeleccionados.map(item => +item.totalBruto).reduce((prev, monto) => prev + monto);
      this.cantidadArticulos = this.productosSeleccionados.map(item => +item.cantidad).reduce((prev, count) => prev + count);
    },
    seleccionarProducto(producto, updateCantidad) {
      let totalBruto = 0;
      let cantidad = 0;

      if (!this.productosSeleccionados.some(item => item.id === producto.id)) {
        cantidad += 1;
        totalBruto = producto.precioVenta * cantidad;
        this.productosSeleccionados = [...this.productosSeleccionados, { ...producto, cantidad, totalBruto }]
      } else {
        this.productosSeleccionados = this.productosSeleccionados.map(item => {
          let update = { ...item };
          if (item.id == producto.id) {
            if (updateCantidad != null) {
              update.cantidad = updateCantidad;
            } else {
              update.cantidad = +item.cantidad + 1;
            }
            update.totalBruto = item.precioVenta * update.cantidad;
          }
          return update
        })

      }
      this.productoInput = '';
      localStorage.setItem("PRODUCTS", JSON.stringify(this.productosSeleccionados));

      this.calcularTotalPagar();
    },
    actualizarCantidad(value, element) {
      this.seleccionarProducto(element, value);
    },
    setearCliente(e) {
      this.datosCliente = this.clientes.find(c => c.id === e);
      console.log('Cambia cliente: ' + JSON.stringify(this.datosCliente));
      
      localStorage.setItem("CLIENTS", JSON.stringify(e));
      this.nombreCliente = this.datosCliente.nombreCompleto;
    },
    limpiar() {
      this.nombreCliente = null;
      this.clienteInput = 1;
      this.productoInput = '';
      this.cantidadInput = 0;
      this.productosSeleccionados = [];
      this.cantidadArticulos = 0;
      this.cantidadProducto = 0;
      this.totalPagar = 0;
      this.modals.mini = false;
      localStorage.removeItem("CLIENTS");
      localStorage.removeItem("PRODUCTS");
    },
    eliminar(producto) {
      this.productosSeleccionados = this.productosSeleccionados.filter(item => item.id !== producto.id);
      this.calcularTotalPagar();
    },
    buscarProducto(e) {
      this.seleccionarProducto(e, null);
    },
    listarClientes() {
      axios.get('/Personas/listarClientes')
        .then(response => {
          if (!response.data.error) {
            this.clientes = response.data.dato;
            if (localStorage.getItem("CLIENTS") !== null) {
              this.clienteInput = JSON.parse(localStorage.getItem("CLIENTS"));
              this.nombreCliente = JSON.parse(localStorage.getItem("CLIENTS")).nombreCompleto;
            }
          }
        }).catch(error => {
          console.log(JSON.stringify(error));
        });
    },
  },

  mounted() {
    this.$sidebar.toggleMinimize();
    document.getElementById('all-tab').click();
    this.listarClientes();
    axios.get(`/articulos/listararticulos`)
      .then(response => {
        if (!response.data.error) {
          this.productoSearch = response.data.dato;
        }
      }).catch(error => {
        console.log(JSON.stringify(error));
      });
    if (localStorage.getItem("PRODUCTS") !== null) {
      this.productosSeleccionados = JSON.parse(localStorage.getItem("PRODUCTS"));
      this.calcularTotalPagar();
    }
  }
}
</script>

<style>
.item {
  margin-top: 10px;
}

.payment-title {
  color: #000000;
}

.bold {
  font-weight: bold;
  font-size: 1.1rem;
}

.empty-table {
  text-align: center;
  font-size: 2rem;
  color: #aaabad;
}

.empty-size {
  margin-top: 30px;
  text-align: center;
}

.empty-subtitle {
  text-align: center;
}

.tableFixHead {
  overflow: auto;
  height: 550px;
  zoom: 80%;
}

.tableFixHead thead th {
  position: sticky;
  top: 0;
  z-index: 1;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px 16px;
  text-align: center;
  text-transform: none !important;
}

th {
  background: #eee;
}

.col-scroll {
  height: 50rem;
  overflow: auto;
}

.col-scroll1 {
  height: 53.2rem;
  overflow: auto;
}

.description-product {
  padding: 0;
  float: right;
  margin: 5px;
  text-align: center;
  font-size: 12px;
  color: black !important;
}

.image {
  width: 100%;
  display: block;
}

.product-list>.el-card__body {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 5px;
  height: 200px !important;
}

.card-image {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(8, 1fr);
  height: 200px !important;
}


.el-card__body {
  margin: 20px;

}

.el-row {
  margin-bottom: 15px;
}

.el-col {
  border-radius: 4px;
}

/* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ddd;
  background-color: #f1f1f1;
  border-radius: 0.3rem;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ddd;
}
</style>