<template>
  <div class="row">
    <div class="col-md-12 card">
      <div class="card-header">
        <h4>Lista de Clientes</h4>
      </div>
      <div class="card-body">
        <div class="row mt-2 space-row">
          <div class="col-lg-4">
            <fg-input class="input-sm" placeholder="Buscar Nombre" v-model="nombre"
              addon-right-icon="nc-icon nc-zoom-split">
            </fg-input>
          </div>
          <div class="col-lg-4">
            <fg-input class="input-sm" placeholder="Buscar Código Legajo" v-model="codigo"
              addon-right-icon="nc-icon nc-zoom-split">
            </fg-input>
          </div>
          <div class="col-lg-4">
            <p-button @click.native="newRow()" class="mt-1" type="primary" style="float: right;"><i
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
            <el-table-column label="Nombre" prop="nombre" sortable />
            <el-table-column label="Apellido" prop="apellido" sortable />
            <el-table-column label="Código Legajo" prop="codigoLegajo" sortable />
            <el-table-column label="Nombre Completo" prop="nombreCompleto" sortable />
            <el-table-column label="Documento" prop="documento" sortable />
            <el-table-column label="Dirección" prop="direccion" sortable />
            <el-table-column fixed="right" class-name="td-actions" label="Acciones" align="center" width="120">
              <template slot-scope="scope">
                <p-button type="success" size="sm" icon @click="editRow(scope.row)">
                  <i class="fas fa-edit"></i>
                </p-button>
                <p-button type="danger" size="sm" icon @click.native.prevent="eliminar(scope.$index,  scope.row)">
                  <i class="fas fa-times"></i>
                </p-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination layout="prev, pager, next" :total="this.clientes.length" @current-change="setPage" />
        </div>
      </div>
    </div>
    <ModalCliente :showModalCliente="modals.classic" @closeModalCliente="handleCloseModalCliente" :clienteId="this.clienteId"></ModalCliente>
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
import swal from "sweetalert2";
import axios from '../../../../util/axios';
import ModalCliente from './ModalCliente.vue';

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
    clientes: [],
    footerTable: ["Nombre", "Apellido", "Código Legajo", "Nombre Completo", "Documento", "Dirección", ""],
    nombre: null,
    codigo: null,
    page: 1,
    pageSize: 10,
    modals: {
      classic: false,
      pagar: false,
      mini: false,
      articulo: false,
    },
    clienteId: null,

  }),

  computed: {
    pagedTableData() {
      return this.clientes.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },



  methods: {
    newRow(){
      this.clienteId = null; 
      this.modals.classic = true;
    },
    editRow(row){
        this.clienteId = row.id;
        this.modals.classic = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCloseModalCliente() {
      this.modals.classic = false;
      this.listarClientes();
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    eliminar(id, row) {
      MessageBox.confirm(`Desea eliminar el registro ?`, 'Eliminar', {
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        type: "danger"
      }).then(() => {
        this.eliminarCliente(row.id);
      }).catch(() => {

      });
    },
    eliminarCliente(id) {
      console.log('llama al metodo de eliminar', id);
      this.$notify({
        type: "success",
        message: "Registro eliminado.",
      });
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
      axios.get('/Personas/listarClientes', { params: { Nombre: this.nombre, CodigoLegajo: this.codigo } })
        .then(response => {
          if (!response.data.error) {
            this.clientes = response.data.dato;
          }
        }).catch(error => {
          console.log(JSON.stringify(error));
        });
    },
    listarClientes() {
      axios.get('/Personas/listarClientes')
        .then(response => {
          if (!response.data.error) {
            this.clientes = response.data.dato;
          }
        }).catch(error => {
          console.log(JSON.stringify(error));
        });
    }
  },
  mounted() {
    this.listarClientes();
  }
}
</script>
