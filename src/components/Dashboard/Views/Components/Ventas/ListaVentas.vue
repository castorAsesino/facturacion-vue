<template>
  <div class="row">
    <div class="col-md-12 card">
      <div class="card-header">
        <h4>Historico de Ventas</h4>
      </div>
      <div class="card-body">
        <div class="row mt-2 space-row">
          <div class="col-lg-2">
            <fg-input class="input-sm" placeholder="Nro. Comprobante" v-model="nroComprobante"
              addon-right-icon="nc-icon nc-zoom-split">
            </fg-input>
          </div>
          <div class="col-lg-2">
            <fg-input class="input-sm" placeholder="Nombre Cliente" v-model="nombreCliente"
              addon-right-icon="nc-icon nc-zoom-split">
            </fg-input>
          </div>
          <div class="col-md-3">
            <el-date-picker 
              v-model="rangoFechas" 
              type="daterange" align="right"
              range-separator="/"
              start-placeholder="Desde"
              end-placeholder="Hasta" 
              :clearable="false"
              format="dd-MM-yyyy"
              value-format="dd/MM/yyyy"
              size="large"
              @change="setRangoFecha($event)">
            </el-date-picker>
          </div>          
          <el-select class="col-lg-2 select-primary" style="padding-left:0px;"
            filterable placeholder="Estado"
            no-data-text="No se encontraron resultados." v-model="estadoInput">
            <el-option v-for="item in estados" :key="item.id" :label="item.value" :value="item.id"
              class="select-primary"></el-option>
          </el-select>
          <div class="col-lg-3">
            <p-button class="mt-1" type="primary" style="float: right;"><i
                class="far fa-file-lines"></i> Descargar
            </p-button>
            <p-button @click="buscar()" class="mt-1" type="warning" style="float: right;"> <i
                class="nc-icon nc-zoom-split"></i> Buscar
            </p-button>
          </div>
        </div>

        <div class="col-sm-12 mt-2">
          <el-table class="table-striped" :data="pagedTableData" border @sort-change="sortChange"
            empty-text="No se encontraron resultados.">
            <el-table-column label="Nro. Comprobante" prop="nroComprobante" sortable />
            <el-table-column label="Cliente"          prop="cliente" sortable />
            <el-table-column label="Cod. Legajo"      prop="codLegajo" sortable />
            <el-table-column label="Fecha"            prop="fecha" sortable />
            <el-table-column label="Total Gs."        prop="total" sortable />
            <el-table-column label="Estado"           prop="estado" sortable />
            <el-table-column fixed="right" 
              class-name="td-actions" label="Acciones" align="center" width="120">
              <template slot-scope="scope">
                <!--<p-button type="success" size="sm" icon @click="editar(scope.$index, scope.row)">
                  <i class="fas fa-edit"></i>
                </p-button>-->
                <p-button type="danger" size="sm" icon 
                  @click.native.prevent="anular(scope.$index, scope.row)">
                  <i class="fas fa-ban"></i>
                </p-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination layout="prev, pager, next" :total="this.ventas.length" @current-change="setPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import { Table, 
  TableColumn, Select,
  DatePicker,
  Option, Pagination, MessageBox 
} from 'element-ui';
import axios from '../../../../../util/axios';
import router from "@/main";

export default {
  components: {
    MessageBox,
    [Pagination.name]: Pagination,
    [Select.name]: Select,
    [DatePicker.name]: DatePicker,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    moment: moment,
  },

  data: () => ({
    ventas: [],
    nroComprobante: '',
    nombreCliente: '',
    rangoFechas: [],
    footerTable: ["Nro. Comprobante", "Cliente", "Fecha", "Total Gs.", "Estado", ""],
    estados: [],
    estadoInput: [],
    page: 1,
    pageSize: 10,
  }),

  computed: {
    pagedTableData() {
      return this.ventas.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },

  methods: {
    editar(index, row) {
      console.log(index, row);
      //router.push({ path: '/articulo/editar/' + row.id })
    },

    anular(id, row) {
      MessageBox.confirm(`Desea anular la Venta Nro. ${row.nroComprobante} ?`, 'Anular', {
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        type: "danger"
      }).then(() => {
        this.anularVenta(row.id);
      }).catch(() => {
        console.log('Ocurrio un error al anular la venta!');
      });
    },

    setPage(val) {
      this.page = val
    },
    sortChange({ prop, order }) {
      if (order === "descending") {
        this.sort = `-${prop}`;
      } else {
        this.sort = `${prop}`;
      }

    },
    buscar() {
      axios.get('/ventas/listarVentas',{
        params: {
          NroComprobante: this.nroComprobante,
          NombreCliente:  this.nombreCliente,
          FechaDesde:     this.rangoFechas[0],
          FechaHasta:     this.rangoFechas[1],
          Estado:         this.estadoInput
        }
      }).then(response => {
        if (!response.data.error) {
          this.ventas = response.data.dato;
        }
      }).catch(error => {
        console.log(JSON.stringify(error));
      });
    },

    listarEstados() {
      axios.get('/ventas/listarEstados')
        .then(response => {
          if (!response.data.error) {
            this.estados = response.data.dato;
            console.log(JSON.stringify(this.estados));
          }
        }).catch(error => {
          console.log(JSON.stringify(error));
      });
    },

    setRangoFecha(value) {
      console.log('ChangeEvent: ' + value);
    },

    getPreviousDate() {
      const today = new Date();
      let month = '' + (today.getMonth()),
        day = '' + today.getDate(),
        year = today.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [day, month, year].join('/');
    },
    getCurrentDate() {
      const today = new Date();
      let month = '' + (today.getMonth() + 1),
        day = '' + today.getDate(),
        year = today.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [day, month, year].join('/');
    },

    anularVenta(id) {
      console.log('Llamar al metodo anular: ', id);
      axios.post('/ventas/anularVenta', null, { params: { ventaId: id } })
        .then(response => {
          if (!response.data.error) {
            this.$notify({
              type: "success",
              message: response.data.mensaje,
            });
          }
        }).catch(error => {
          this.$notify({
            type: "danger",
            message: "Ocurrio un error al anular la venta.",
          });
      });
      
    },

  },

  mounted() {
    this.listarEstados();

    this.rangoFechas = [this.getPreviousDate(), this.getCurrentDate()];
    console.log(this.rangoFechas);

    axios.get('/ventas/listarVentas',{
      params: {
        FechaDesde: this.rangoFechas[0],
        FechaHasta: this.rangoFechas[1]
      }
    }).then(response => {
      if (!response.data.error) {
        this.ventas = response.data.dato;
      }
    }).catch(error => {
      console.log(JSON.stringify(error));
    });

  }

}

</script>