<template>
  <div class="col-md-12 card">
    <div class="card-header">
      <h4>{{this.$route.params.id ? 'Editar Articulo' : 'Crear Articulo'}}</h4>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="card-body">
      <el-container>
        <el-col :md="20">
          <el-row :gutter="20">
            <el-col :md="8">
              <el-form-item label="Deposito" prop="depositoId">
                <el-select class="select-primary" no-data-text="No se encontraron resultados."
                  v-model="ruleForm.depositoId">
                  <el-option v-for="item in depositos" :key="item.id" :label="item.descripcion" :value="item.id"
                    class="select-primary"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="Categoria" prop="articuloCategoriaId">
                <el-select class="select-primary" no-data-text="No se encontraron resultados."
                  v-model="ruleForm.articuloCategoriaId">
                  <el-option v-for="item in articulosCategoria" :key="item.id" :label="item.descripcion"
                    :value="item.id" class="select-primary"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="4">
              <el-form-item label="Impuesto" prop="impuestoId">
                <el-select class="select-primary" no-data-text="No se encontraron resultados."
                  v-model="ruleForm.impuestoId">
                  <el-option v-for="item in impuestos" :key="item.id" :label="item.descripcion" :value="item.id"
                    class="select-primary"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="4">
              <el-form-item label="Unidad de Medida" prop="articuloUndMedidaId">
                <el-select class="select-primary" no-data-text="No se encontraron resultados."
                  v-model="ruleForm.articuloUndMedidaId">
                  <el-option v-for="item in articuloUndMedidas" :key="item.id" :label="item.descripcion"
                    :value="item.id" class="select-primary"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!--{ Fila 2 }-->
          <el-row :gutter="20">
            <el-col :md="8">
              <el-form-item label="Descripción" prop="descripcion">
                <el-input v-model="ruleForm.descripcion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="Código Interno" prop="codigoInterno">
                <el-input v-model="ruleForm.codigoInterno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item label="Código Barra" prop="codigoBarra">
                <el-input v-model="ruleForm.codigoBarra"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="4">
              <el-form-item label="Código Proveedor" prop="codigoProveedor">
                <el-input v-model="ruleForm.codigoProveedor"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!--{ Fila 3 }-->
          <el-row :gutter="20">
            <el-col :md="4">
              <el-form-item label="Precio Compra" prop="precioCompra">
                <el-input-number v-model="ruleForm.precioCompra" controls-position="right" :min="0">
                </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :md="4">
              <el-form-item label="Precio Venta" prop="precioVenta">
                <el-input-number v-model="ruleForm.precioVenta" controls-position="right" :min="0"></el-input-number>
              </el-form-item>
            </el-col>

            <el-col :md="3">
              <el-form-item label="Tipo Mov. Existencia" prop="tipoMovimientoExistencia">
                <el-radio-group v-model="ruleForm.tipoMovimientoExistencia">
                  <el-select class="select-primary" v-model="ruleForm.tipoMovimientoExistencia" disabled>
                    <el-option v-for="item in tipoMovimientos" :key="item.value" :label="item.label" :value="item.value"
                      class="select-primary">
                    </el-option>
                  </el-select>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :md="3">
              <el-form-item label="Generar Movi." prop="generarMovimientoStock">
                <el-checkbox v-model="ruleForm.generarMovimientoStock" size="large" label="Stock" border />
              </el-form-item>
            </el-col>

            <el-col :md="3">
              <el-form-item label="Controlar Existencia" prop="controlarExistencia">
                <el-checkbox v-model="ruleForm.controlarExistencia" label="Existencia" border />
              </el-form-item>
            </el-col>

            <!--<el-col :md="4">
              <el-form-item label="Estado" prop="estado">
                <el-radio-group v-model="ruleForm.estado">
                  <el-radio-button label="ACTIVO">Activo</el-radio-button>
                  <el-radio-button label="INACTIVO">Inactivo</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>-->
            <el-col :md="3">
              <el-form-item label="Estado" prop="estadoInput">
                <el-select class="select-primary" no-data-text="No se encontraron resultados."
                  v-model="ruleForm.estadoInput">
                  <el-option v-for="item in estados" :key="item.id" :label="item.label" :value="item.id"
                    class="select-primary"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

        </el-col>

        <!--/Imagen del Articulo/-->
        <el-main style="padding-top: 0px;">
          <el-row :gutter="20">
            <el-col :md="24">
              <el-form-item label="Imagen" prop="imagen" style="margin:0;"></el-form-item>
              <div class="dropbox">
                <input ref="fileInput" type="file" @input="pickFile" class="input-file" />
                <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${ruleForm.imagen})` }"
                  @click="selectImage">
                </div>
              </div>
            </el-col>
          </el-row>
        </el-main>

      </el-container>

      <el-row :gutter="20">
        <el-col :md="24">
          <el-form-item label="Observación" prop="observacion">
            <el-input type="textarea" :rows="3" v-model="ruleForm.observacion">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <hr style="margin: 0px" />
    <div class="card-footer">
      <p-button style="float: right;" type="primary" link @click="submitForm('ruleForm');">Guardar</p-button>
      <p-button style="float: right;" type="default" link @click="cancelar">Cancelar</p-button>
    </div>
  </div>
</template>

<script>
import { Modal } from 'src/components/UIComponents'
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
  InputNumber,
  Container,
  Aside,
  Main
} from "element-ui";
import axios from "@/util/axios";

import PictureInput from 'vue-picture-input';

import router from "@/main";

export default {
  name: "CrearArticulo",
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
    [Container.name]: Container,
    [Aside.name]: Aside,
    [Main.name]: Main,
    Modal,
    PictureInput,
  },
  router,
  data() {
    return {
      loadingDepositos: true,
      loadingCategorias: true,
      loadingImpuestos: true,
      loadingUnidadesMedidas: true,
      loadingGuardadoArticulo: false,
      ruleForm: {
        id: null,
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
        estadoInput: 'ACTIVO',
      },
      articulosCategoria: [],
      impuestos: [],
      depositos: [],
      articuloUndMedidas: [],
      tipoMovimientos: [
        {
          value: 'UND',
          label: 'UNIDAD',
        }
      ],
      estados: [
        {
          id: 'ACTIVO',
          label: 'ACTIVO',
        },
        {
          id: 'INACTIVO',
          label: 'INACTIVO',
        }
      ],

      rules: {
        depositoId: [],
        articuloCategoriaId: [{ required: true, message: 'Por favor, seleccione una Categoria', trigger: 'blur' }],
        impuestoId: [],
        articuloUndMedidaId: [],
        descripcion: [{ required: true, message: 'Por favor, introduzca una Descripcion', trigger: 'blur' },],
        imagen: [],
        codigoInterno: [],
        codigoBarra: [],
        codigoProveedor: [],
        generarMovimientoStock: [],
        tipoMovimientoExistencia: [],
        controlarExistencia: [],
        estado: [],
        observacion: [],
        precioCompra: [{ required: true, message: 'Por favor, introduzca un Precio', trigger: 'blur' },],
        precioVenta: [{ required: true, message: 'Por favor, introduzca un Precio', trigger: 'blur' },],
      }
    }
  },
  mounted() {
    console.log(this.$route.params.id);
    if (this.$route.params.id) {
      axios.get('/articulos/getArticulo', { params: { id: this.$route.params.id } })
        .then(response => {
          if (!response.data.error) {
            const data = response.data.dato;
            console.log(JSON.stringify(data));
            this.ruleForm = {
              id:                       data.id,
              depositoId:               data.depositoId,
              articuloCategoriaId:      data.categoria,
              impuestoId:               data.impuestoId,
              articuloUndMedidaId:      data.unidadMedidaId,
              descripcion:              data.descripcion,
              imagen:                   `data:image/jpeg;base64,${data.imagen}`,
              codigoInterno:            data.codigoInterno,
              codigoBarra:              data.codigoBarra,
              codigoProveedor:          data.codigoProveedor,
              generarMovimientoStock:   data.generarMovimientoStock,
              tipoMovimientoExistencia: data.tipoMovimientoExistencia,
              controlarExistencia:      data.controlarExistencia,
              estado:                   data.estado,
              observacion:              data.observacion,
              precioCompra:             data.precioCompra,
              precioVenta:              data.precioVenta,
              estadoInput:              data.estado,
            }
          }
        }).catch(error => {
          console.log(error);
          console.log(JSON.stringify(error));
        });
    }

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
          console.log(reader.result);
          this.ruleForm.imagen = reader.result;
        };
        reader.onerror = (error) => {
          console.log('Error: ', error);
        };
      }
    },

    cancelar() {
      router.push({ path: '/articulo/listar' })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadingGuardadoArticulo = true;
          console.log(this.ruleForm)
          this.ruleForm = { ...this.ruleForm, imagen: this.ruleForm.imagen.split('data:image/jpeg;base64,')[1] };
          console.log(this.ruleForm)
          const operacion = this.$route.params.id ? 'editararticulo' : 'creararticulo';
          axios.post(`/Articulos/${operacion}`, this.ruleForm)
            .then((response) => {
              if (!response.data.error) {
                //this.cancelar();
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
    value(newVal, oldVal) {
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
.dropboxx {
  outline: 1px dashed #dcdfe6;
  /* the dash box */
  /*outline-offset: -10px;*/
  border-radius: 6px;
  /*background: lightcyan;*/
  color: dimgray;
  padding: 10px 10px;
  min-height: 100px;
  /* minimum height */
  position: relative;
  cursor: pointer;
}

.dropbox {
  background-image: url("/img/image-icon.png");
  background-repeat: no-repeat, no-repeat;
  background-position: center;
  background-size: 50%;
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.2s;
}

.input-file {
  opacity: 0;
  /* invisible but it's there! */
  width: 100%;
  height: 100px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  border-color: #409eff;
}

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