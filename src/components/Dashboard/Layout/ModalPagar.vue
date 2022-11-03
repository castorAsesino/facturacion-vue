<template>
  <modal :show.sync="this.showPagar" :show-close="true" class="modal-primary" type="mini"
    headerClasses="justify-content-center" styleModal="width:45%;" @close="closeModalPagar();">
    <div slot="header no-print">
      <h6>PAGO DE FACTURA</h6>
    </div>
    <div v-if="this.pagado">
      <Ticket :productos="this.productos" :dato="this.dato" :concepto="this.cajaConceptoDescripcion"
        :cliente="this.cliente" :cantidadProducto="this.cantidadProducto" :cantidadArticulos="this.cantidadArticulos"
        :totalPagar="this.totalPagar" :fecha="this.getInvoiceFormattedDate()"></Ticket>
    </div>
    <div v-else>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-row :gutter="24">
          <el-col :span="24">
            <span>Fecha: {{ getFormattedDate() }}</span>
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <td style="width: 50%;">
                    <span style="float: left;">Total Productos:</span>
                    <span style="float: right;">{{ cantidadProducto }} ({{
                    cantidadArticulos
                    }})</span>
                  </td>
                  <td>
                    <span style="float: left;">Total a Pagar:</span>
                    <span style="float: right; font-weight: bold; font-size: 1rem;">{{ totalPagar | currency
                    }}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="float: left;  ">Total Cobrado:</span>
                    <span style="float: right; font-weight: bold; ">{{ this.ruleForm.monto | currency }}</span>
                  </td>
                  <td><span style="float: left;     ">Vuelto:</span>
                    <span style="float: right; font-weight: bold; ">{{ vuelto | currency }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :md="12">
            <el-form-item label="Comprobante" prop="tipoComprobanteId">
              <el-select class="select-primary" placeholder="Comprobante" no-data-text="No se encontraron resultados."
                v-model="ruleForm.tipoComprobanteId" default="">
                <el-option label="TICKET" value="1" class="select-primary" default-first-option></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="Concepto" prop="cajaConceptoId">
              <el-select class="select-primary" placeholder="Concepto" no-data-text="No se encontraron resultados."
                v-model="ruleForm.cajaConceptoId" default="" @change="setConcepto($event)">
                <el-option label="EFECTIVO" value="1" class="select-primary" default-first-option></el-option>
                <el-option label="TARJETA CRÉDITO" value="2" class="select-primary"></el-option>
                <el-option label="TARJETA DÉBITO" value="3" class="select-primary"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :md="12">
            <el-form-item label="Nro. Boleta POS" prop="nroBoletaPos">
              <el-input v-model="ruleForm.nroBoletaPos" :disabled="habilitarPOS"></el-input>
            </el-form-item>
          </el-col>

          <el-col :md="4">
            <el-form-item label="Monto" prop="monto">
              <el-input-number v-model="ruleForm.monto" controls-position="right" @input="calcularVuelto()">
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :md="24">
            <el-form-item label="Observación" prop="observacion">
              <el-input type="textarea" :rows="2" placeholder="Observación" v-model="ruleForm.observacion">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <template slot="footer">
      <div class="left-side no-print">
        <p-button type="defaul" link @click="closeModalPagar();">Cancelar</p-button>
      </div>
      <div class="divider no-print"></div>
      <div class="right-side no-print">
        <template v-if="this.pagado">
          <p-button type="primary" link @click="imprimir();">Imprimir</p-button>
        </template>
        <template v-else>
          <p-button type="primary" link @click="submitForm('ruleForm');">Pagar</p-button>
        </template>
      </div>
    </template>
  </modal>
</template>

<style>

</style>
<script>
import { Modal } from 'src/components/UIComponents'
import {
  Button, Form,
  FormItem, Input,
  Select, Option,
  Row, Col, RadioButton,
  RadioGroup, InputNumber
} from "element-ui";
import axios from "@/util/axios";
import Ticket from './Ticket.vue';

export default {
  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Row.name]: Row,
    [Col.name]: Col,
    [RadioButton.name]: RadioButton,
    [RadioGroup.name]: RadioGroup,
    [InputNumber.name]: InputNumber,
    Modal,
    Ticket
  },
  data() {
    return {
      ruleForm: {
        tipoComprobanteId: [],
        observacion: '',
        nroBoletaPos: '',
        cajaConceptoId: [],
        monto: 0,
      },
      cajaConceptoDescripcion: '',
      loadingGuardadoCliente: false,
      pagado: false,
      rules: {
        tipoComprobanteId: [
          { required: true, message: 'Por favor, elija un Tipo de Comprobante', trigger: 'blur' },
        ],
        cajaConceptoId: [
          { required: true, message: 'Por favor, elija un Concepto', trigger: 'blur' },
        ],
        observacion: [],
        nroBoletaPos: [
          { required: false, message: 'Por favor, ingrese el Nro Boleta POS', trigger: 'blur' },
        ],
        monto: [
          { required: false, message: 'El monto debe ser igual o mayor al Total a Pagar.', trigger: 'blur' },
        ]
      },
      habilitarPOS: true,
      vuelto: 0,
      dato: []
    }
  },
  props: {
    showPagar: {
      type: Boolean,
      default: false
    },
    productos: {
      type: Array,
      default: []
    },
    cantidadProducto: {
      type: Number,
      default: 0
    },
    cantidadArticulos: {
      type: Number,
      default: 0
    },
    totalPagar: {
      type: Number,
      default: 0
    },
    cliente: {
      type: Object,
      default: null
    }

  },
  watch: {
    totalPagar(newVal, oldVal) {
      if (newVal) {
        this.ruleForm.monto = newVal;
      }
    }
  },
  methods: {
    imprimir(){
      window.print();
    },
    calcularVuelto() {
      this.vuelto = (this.ruleForm.monto - this.totalPagar) < 0 ? 0 : (this.ruleForm.monto - this.totalPagar);
    },
    setConcepto(value) {
      
      const cajaConceptos = (value) => {
        return value === 1 ? 'Efectivo'
          : value === 2 ? 'Tarjeta Crédito'
          : 'Tarjeta Débito'
      };

      this.cajaConceptoDescripcion = cajaConceptos(value);

      console.log(this.cajaConceptoDescripcion);

      if (+value === 1) {
        this.ruleForm.nroBoletaPos = '';
        this.habilitarPOS = true;
      }
      if (+value > 1) this.habilitarPOS = false;
    },
    closeModalPagar() {
      if (this.pagado) {
        this.pagado = false;
        this.$emit('update:showPagar', false);
        this.resetForm('ruleForm');
        this.habilitarPOS = true;
        this.vuelto = 0;
        this.$emit('limpiar');
      } else {
        this.$emit('update:showPagar', false);
      }

    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('Modelo Valido...');
          this.loadingGuardadoCliente = true;
          axios.post('/ventas/generarFactura',
            this.getBody())
            .then((response) => {
              if (!response.data.error) {
                this.dato = response.data.dato;
                this.$notify({
                  message: response.data.mensaje,
                  type: 'success',
                });
                this.pagado = true;
              }
            })
            .catch((response) => {
              console.log(response);
              this.$notify({
                message: response.data.mensaje,
                type: 'danger',
              });
            }).finally(() => {
              this.loadingGuardadoCliente = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields() 
      });
    },
    getFormattedDate() {
      const today = new Date();
      let month = '' + (today.getMonth() + 1),
        day = '' + today.getDate(),
        year = today.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [day, month, year].join('/');
    },
    getInvoiceFormattedDate() {
      const today = new Date();
      let month = '' + (today.getMonth() + 1),
        day = '' + today.getDate(),
        year = today.getFullYear(),
        hours = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      if (hours.length < 2) hours = '0' + hours;
      if (minutes.length < 2) minutes = '0' + minutes;
      if (seconds.length < 2) seconds = '0' + seconds;

      return [day, month, year].join('/') + ' ' + [hours, minutes, seconds].join(':');
    },
    parseDate() {
      let fecha = this.getFormattedDate();
      fecha = fecha.slice(0, 10).split('/');
      return fecha[2] + '-' + fecha[1] + '-' + fecha[0];
    },
    checkMonto(rule, value, callback) {
      if (value < this.totalPagar) {
        return callback(new Error('El monto debe ser igual o mayor al Total a Pagar.'));
      }
    },
    getBody() {
      return {
        ventaCabecera: {
          personaId: this.cliente.id,
          tipoComprobanteId: parseInt(this.ruleForm.tipoComprobanteId),
          terminalId: 1,
          fecha: this.parseDate(),
          totalBruto: this.totalPagar,
          totalDescuento: 0,
          observacion: this.ruleForm.observacion
        },
        ventaDetalle: this.productos.map((p) => ({
          articuloId: p.id,
          cantidad: p.cantidad,
          precio: p.precioVenta,
          totalBruto: p.totalBruto
        })),
        ventacobro: {
          nroBoletaPos: this.ruleForm.nroBoletaPos,
          cajaConceptoId: parseInt(this.ruleForm.cajaConceptoId),
          cajaAperturaCierreId: 1,
          fecha: this.parseDate(),
          montoEntregado: parseInt(this.ruleForm.monto),
          montoAplicado: parseInt(this.ruleForm.monto)
        }
      }
    }
  },
};
</script>
<style>
@media print {

  .no-print,
  .no-print * {
    display: none !important;
  }
}
</style>