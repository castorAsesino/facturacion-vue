<template>
  <div class="row">
    <div class="col-md-12 card">
      <div class="card-header">
        <h4>Lista de Articulos</h4>
      </div>
      <div class="card-body">
        <div class="row mt-2 space-row">
          <div class="col-lg-2">
            <fg-input class="input-sm" placeholder="Descripcion" v-model="descripcion"
              addon-right-icon="nc-icon nc-zoom-split">
            </fg-input>
          </div>
          <div class="col-lg-2">
            <fg-input class="input-sm" placeholder="Codigo" v-model="codigo" addon-right-icon="nc-icon nc-zoom-split">
            </fg-input>
          </div>
          <el-select class="col-lg-2 select-primary" filterable placeholder="Categoria"
            no-data-text="No se encontraron resultados." v-model="categoriaInput">
            <el-option v-for="item in categorias" :key="item.id" :label="item.descripcion" :value="item.id"
              class="select-primary"></el-option>
          </el-select>
          <el-select class="col-lg-2 select-primary" filterable placeholder="Estado"
            no-data-text="No se encontraron resultados." v-model="estadoInput">
            <el-option v-for="item in estados" :key="item.id" :label="item.value" :value="item.value"
              class="select-primary"></el-option>
          </el-select>
          <div class="col-lg-4">
            <p-button @click="crear()" class="mt-1" type="primary" style="float: right;"><i
                class="nc-icon nc-simple-add"></i> Agregar
            </p-button>
            <p-button @click="buscar()" class="mt-1" type="warning" style="float: right;"> <i
                class="nc-icon nc-zoom-split"></i> Buscar
            </p-button>
          </div>
        </div>

        <div class="col-sm-12 mt-2">
          <el-table class="table-striped" :data="pagedTableData" border @sort-change="sortChange"
            empty-text="No se encontraron resultados.">
            <el-table-column label="Descripcion" prop="descripcion" sortable />
            <el-table-column label="Codigo" prop="codigo" sortable />
            <el-table-column label="Impuesto" prop="impuesto" sortable />
            <el-table-column label="Deposito" prop="deposito" sortable />
            <el-table-column label="Categoria" prop="categoria" sortable />
            <el-table-column label="Precio" prop="precioVenta" sortable />
            <el-table-column label="Estado" prop="estado" sortable />
            <el-table-column fixed="right" class-name="td-actions" label="Acciones" align="center" width="120">
              <template slot-scope="scope">
                <p-button type="success" size="sm" icon @click="editar(scope.$index, scope.row)">
                  <i class="fas fa-edit"></i>
                </p-button>
                <p-button type="danger" size="sm" icon @click.native.prevent="eliminar(scope.$index, scope.row)">
                  <i class="fas fa-times"></i>
                </p-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination layout="prev, pager, next" :total="this.articulos.length" @current-change="setPage" />
        </div>
      </div>
    </div>
    <ModalCliente :showModalCliente="modals.classic" @closeModalCliente="handleCloseModalCliente"></ModalCliente>
  </div>
</template>
<style>
.space-row {
  margin-left: 0px;
  margin-right: 0px;
}
</style>
<script>
import _ from 'lodash';
import { Table, TableColumn, Select, Option, Pagination, MessageBox } from 'element-ui';
import axios from '../../../../../util/axios';
import ModalCliente from '../ModalCliente.vue';
import router from "@/main";

export default {
  components: {
    MessageBox,
    [Pagination.name]: Pagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    ModalCliente,
  },

  data: () => ({
    estados: [],
    estadoInput: null,
    categorias: [],
    categoriaInput: null,
    articulos: [],
    footerTable: ["Descripcion", "Codigo", "Impuesto", "Deposito", "Categoria", "Precio", "Estado", ""],
    descripcion: '',
    codigo: '',
    categoria: 0,
    page: 1,
    pageSize: 10,
    modals: {
      classic: false,
      pagar: false,
      mini: false,
      articulo: false,
    }
  }),


  computed: {
    pagedTableData() {
      return this.articulos.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },

  methods: {
    crear() {
      router.push({ path: '/articulo/crear' })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCloseModalCliente() {
      this.modals.classic = false;
      //this.listarClientes();
    },
    editar(index, row) {
      console.log(index, row);
      router.push({ path: '/articulo/editar/' + row.id })
    },

    eliminar(id, row) {
      MessageBox.confirm(`Desea eliminar el registro ?`, 'Eliminar', {
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        type: "danger"
      }).then(() => {
        this.eliminarArticulo(row.id);
      }).catch(() => {

      });
    },
    eliminarArticulo(id) {
      console.log('llama al metodo de eliminar', id);
      this.$notify({
        type: "success",
        message: "Registro eliminado.",
      });
    },
    handleCloseModalCliente() {
      this.modals.classic = false;
      //this.listarClientes();
    },
    setPage(val) {
      this.page = val
    },
    onProFeature() {
      this.$notify({
        type: "danger",
        message: "Ocurrio un error.",
      });
    },
    sortChange({ prop, order }) {
      if (order === "descending") {
        this.sort = `-${prop}`;
      } else {
        this.sort = `${prop}`;
      }

    },
    buscar() {
      axios.get('/Articulos/listararticulosfiltro', {
        params: {
          CATEGORIA_ID: this.categoriaInput,
          ARTICULO: this.descripcion,
          CODIGO: this.codigo,
          ESTADO: this.estadoInput
        }
      })
        .then(response => {
          if (!response.data.error) {
            this.articulos = response.data.dato;
          }
        }).catch(error => {
          console.log(JSON.stringify(error));
        });
    },
    listarEstados() {
      axios.get('/Articulos/listarEstados')
        .then(response => {
          if (!response.data.error) {
            this.estados = response.data.dato;
          }
        }).catch(error => {
          console.log(JSON.stringify(error));
        });
    },
    listarCategorias() {
      axios.get('/ArticulosCategorias/listarcategoriacombos')
        .then(response => {
          if (!response.data.error) {
            this.categorias = response.data.dato;
          }
        }).catch(error => {
          console.log(JSON.stringify(error));
        });
    }
  },
  mounted() {
    this.listarEstados();
    this.listarCategorias();

    axios.get('/Articulos/listararticulosfiltro')
      .then(response => {
        if (!response.data.error) {
          this.articulos = response.data.dato;
        }
      }).catch(error => {
        console.log(JSON.stringify(error));
      });
  }
}
</script>
  