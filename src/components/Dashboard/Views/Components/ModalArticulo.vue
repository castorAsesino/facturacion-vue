<template>
  <modal :show="this.showModal" headerClasses="justify-content-center"
         v-on:close="closeModal">
    <h4 slot="header" class="title title-up">Creación de Articulo</h4>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">

      <el-row :gutter="12">
        <el-col :md="12">
          <el-form-item label="Deposito" prop="depositoId">
            <el-select class="select-primary"
                       no-data-text="No se encontraron resultados." v-model="ruleForm.depositoId">
              <el-option v-for="item in depositos" :key="item.id" :label="item.descripcion" :value="item.id"
                         class="select-primary"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="Categoria" prop="articuloCategoriaId">
            <el-select class="select-primary"
                       no-data-text="No se encontraron resultados." v-model="ruleForm.articuloCategoriaId">
              <el-option v-for="item in articulosCategoria" :key="item.id" :label="item.descripcion" :value="item.id"
                         class="select-primary"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="Impuesto" prop="impuestoId">
            <el-select class="select-primary"
                       no-data-text="No se encontraron resultados." v-model="ruleForm.impuestoId">
              <el-option v-for="item in impuestos" :key="item.id" :label="item.descripcion" :value="item.id"
                         class="select-primary"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="Unidad de Medida" prop="articuloUndMedidaId">
            <el-select class="select-primary"
                       no-data-text="No se encontraron resultados." v-model="ruleForm.articuloUndMedidaId">
              <el-option v-for="item in articuloUndMedidas" :key="item.id" :label="item.descripcion" :value="item.id"
                         class="select-primary"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="Descripción" prop="descripcion">
            <el-input v-model="ruleForm.descripcion"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="Código Interno" prop="codigoInterno">
            <el-input v-model="ruleForm.codigoInterno"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="Código Barra" prop="codigoBarra">
            <el-input v-model="ruleForm.codigoBarra"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="Código Proveedor" prop="codigoProveedor">
            <el-input v-model="ruleForm.codigoProveedor"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="24">
          <el-form-item label="Observación" prop="observacion">
            <el-input
                type="textarea"
                :rows="2"
                v-model="ruleForm.observacion">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="24">
          <el-form-item label="Estado" prop="estado">
            <el-radio-group v-model="ruleForm.estado">
              <el-radio-button label="ACTIVO">Activo</el-radio-button>
              <el-radio-button label="INACTIVO">Inactivo</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="24">
          <el-form-item label="Tipo Movimiento Existencia" prop="tipoMovimientoExistencia">
            <el-radio-group v-model="ruleForm.tipoMovimientoExistencia">
              <el-radio-button label="UND">Unidad</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="24">
          <el-form-item label="Generar Movimiento de Stock" prop="generarMovimientoStock">
            <el-checkbox v-model="ruleForm.generarMovimientoStock"></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="24">
          <el-form-item label="Controlar Existencia" prop="controlarExistencia">
            <el-checkbox v-model="ruleForm.controlarExistencia"></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="Precio Compra" prop="precioCompra">
            <el-input-number v-model="ruleForm.precioCompra" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="Precio Venta" prop="precioVenta">
            <el-input-number v-model="ruleForm.precioVenta" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="24">
          <el-form-item label="Imagen" prop="imagen">
            <input
                ref="fileInput"
                type="file"
                @input="pickFile">
          </el-form-item>
          <div
              class="imagePreviewWrapper"
              :style="{ 'background-image': `url(${ruleForm.imagen})` }"
              @click="selectImage">
          </div>
        </el-col>
      </el-row>


    </el-form>
    <template slot="footer">
      <div class="left-side">
        <p-button type="default" link @click="closeModal">Cancelar
        </p-button>
      </div>
      <div class="divider"></div>
      <div class="right-side">
        <p-button type="primary" link @click="submitForm('ruleForm');">Guardar</p-button>
      </div>
    </template>
  </modal>
</template>

<script>
import {Modal} from 'src/components/UIComponents'
import {
  Button,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Row,
  Col,
  RadioButton,
  RadioGroup,
  Checkbox,
  InputNumber
} from "element-ui";
import axios from "@/util/axios";

export default {
  name: "ModalArticulo",
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
    [Checkbox.name]: Checkbox,
    [InputNumber.name]: InputNumber,
    Modal,
  },
  data() {
    return {
      loadingDepositos: true,
      loadingCategorias: true,
      loadingImpuestos: true,
      loadingUnidadesMedidas: true,
      loadingGuardadoArticulo: false,
      ruleForm: {
        depositoId: null,
        articuloCategoriaId: null,
        impuestoId: null,
        articuloUndMedidaId: null,
        descripcion: '',
        imagen: '',
        codigoInterno: '',
        codigoBarra: '',
        codigoProveedor: '',
        generarMovimientoStock: false,
        tipoMovimientoExistencia: 'UND',
        controlarExistencia: false,
        estado: 'ACTIVO',
        observacion: '',
        precioCompra: 0,
        precioVenta: 0,
      },
      articulosCategoria: [],
      impuestos: [],
      depositos: [],
      articuloUndMedidas: [],


      rules: {
        depositoId: [],
        articuloCategoriaId: [{required: true, message: 'Por favor, seleccione una Categoria', trigger: 'blur'}],
        impuestoId: [],
        articuloUndMedidaId: [],
        descripcion: [{required: true, message: 'Por favor, introduzca una Descripcion', trigger: 'blur'},],
        imagen: [],
        codigoInterno: [],
        codigoBarra: [],
        codigoProveedor: [],
        generarMovimientoStock: [],
        tipoMovimientoExistencia: [],
        controlarExistencia: [],
        estado: [],
        observacion: [],
        precioCompra: [{required: true, message: 'Por favor, introduzca un Precio', trigger: 'blur'},],
        precioVenta: [{required: true, message: 'Por favor, introduzca un Precio', trigger: 'blur'},],
      }
    }
  },
  mounted() {
    axios.get('/ArticulosCategorias/listarcategoria')
        .then(response => {
          if (!response.data.error) {
            this.articulosCategoria = response.data.dato;
          }
        }).catch(error => {
      console.log(JSON.stringify(error));
    }).finally(() => {
      this.loadingCategorias = false;
    });
    axios.get('/Depositos/listardepositos')
        .then(response => {
          if (!response.data.error) {
            this.depositos = response.data.dato;
          }
        }).catch(error => {
      console.log(JSON.stringify(error));
    }).finally(() => {
      this.loadingDepositos = false;
    });
    axios.get('/Impuestos/listarimpuestos')
        .then(response => {
          if (!response.data.error) {
            this.impuestos = response.data.dato;
          }
        }).catch(error => {
      console.log(JSON.stringify(error));
    }).finally(() => {
      this.loadingImpuestos = false;
    });
    axios.get('/UnidadesMedidas/listar')
        .then(response => {
          if (!response.data.error) {
            this.articuloUndMedidas = response.data.dato;
          }
        }).catch(error => {
      console.log(JSON.stringify(error));
    }).finally(() => {
      this.loadingUnidadesMedidas = false;
    });
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click()
    },
    pickFile() {
      let input = this.$refs.fileInput
      let fileList = input.files
      if (fileList && fileList[0]) {
        let reader = new FileReader();
        reader.readAsDataURL(fileList[0]);
        reader.onload = () => {
          this.ruleForm.imagen = reader.result;
        };
        reader.onerror = (error) => {
          console.log('Error: ', error);
        };
      }
    },

    closeModal() {
      this.resetForm('ruleForm');
      this.$emit('closeModal');
      this.$refs.fileInput.value = '';
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadingGuardadoArticulo = true;
          axios.post('/Articulos/creararticulo', this.ruleForm)
              .then((response) => {
                if (!response.data.error) {
                  this.closeModal();
                  alert("Guardado exitosamente!")
                }
              })
              .catch((error) => {
                console.log(error);
              }).finally(() => {
            this.loadingGuardadoArticulo = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    value: Object,
  },
  watch: {
    value (newVal, oldVal) {
      if (newVal) {
        this.ruleForm.descripcion = newVal.descripcion;
        this.ruleForm.imagen = `data:image/jpeg;base64,${newVal.imagen}`;
        this.ruleForm.precioVenta = newVal.precioVenta;
        this.ruleForm.articuloCategoriaId = newVal.categoria;
      }
    }
  }

}
</script>

<style scoped>

.imagePreviewWrapper {
  width: 20em;
  height: 20em;
  display: block;
  cursor: pointer;
  margin: 0 auto;
  background-size: cover;
  background-position: center center;
}

@media only screen and (max-width: 690px) {
  .imagePreviewWrapper {
    width: 10em;
    height: 10em;
  }
}
</style>