<template>
  <modal :show="this.showModalCliente" headerClasses="justify-content-center" v-on:close="closeModalCliente">
    <h4 slot="header" class="title title-up">Agregar Articulo</h4>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">

      <el-row :gutter="24">
        <el-col :md="12">
          <el-form-item label="Nombre" prop="nombre">
            <el-input v-model="ruleForm.nombre"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="Apellido" prop="apellido">
            <el-input v-model="ruleForm.apellido"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :md="12">
          <el-form-item label="Documento" prop="documento">
            <el-input v-model="ruleForm.documento"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="Codigo Huella" prop="codigoHuella">
            <el-input v-model="ruleForm.codigoHuella"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :md="12">
          <el-form-item label="Codigo Legajo" prop="codigoLegajo">
            <el-input v-model="ruleForm.codigoLegajo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="Razon Social" prop="razonSocial">
            <el-input v-model="ruleForm.razonSocial"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :md="12">
          <el-form-item label="Genero" prop="genero">
            <el-select class="select-primary" placeholder="Genero" no-data-text="No se encontraron resultados."
              v-model="ruleForm.genero" default="">
              <el-option label="Masculino" value="HOMBRE" class="select-primary"></el-option>
              <el-option label="Femenino" value="MUJER" class="select-primary"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="Direccion" prop="direccion">
            <el-input v-model="ruleForm.direccion"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :md="12">
          <el-form-item label="Ciudad" prop="ciudadId">
            <el-select class="select-primary" placeholder="Ciudad" no-data-text="No se encontraron resultados."
              v-model="ruleForm.ciudadId">
              <el-option v-for="item in ciudades" :key="item.id" :label="item.descripcion" :value="item.id"
                class="select-primary"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="Empresa" prop="empresaId">
            <el-select class="select-primary" placeholder="Empresa" no-data-text="No se encontraron resultados."
              v-model="ruleForm.empresaId">
              <el-option v-for="item in empresas" :key="item.id" :label="item.descripcion" :value="item.id"
                class="select-primary"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :md="12">
          <el-form-item label="Estado" prop="estado">
            <el-radio-group v-model="ruleForm.estado">
              <el-radio-button label="ACTIVO">Activo</el-radio-button>
              <el-radio-button label="INACTIVO">Inactivo</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :md="12">
        </el-col>
      </el-row>



    </el-form>
    <template slot="footer">
      <div class="left-side">
        <p-button type="defaul" link @click="closeModalCliente">Cancelar</p-button>
      </div>
      <div class="divider"></div>
      <div class="right-side">
        <p-button type="primary" link @click="submitForm('ruleForm');">Guardar</p-button>
      </div>
    </template>
  </modal>
</template>

<script>
import { Modal } from 'src/components/UIComponents'
import { Button, Form, FormItem, Input, Select, Option, Row, Col, RadioButton, RadioGroup } from "element-ui";
import axios from "@/util/axios";

export default {
  name: "ModalCliente",
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
    Modal,
  },
  data() {
    return {
      ruleForm: {
        nombre: '',
        apellido: '',
        genero: '',
        direccion: '',

        codigoLegajo: '',
        codigoHuella: '',
        documento: '',
        razonSocial: '',
        estado: 'ACTIVO',
        empresaId: null,
        ciudadId: null,
      },
      ciudades: [],
      empresas: [],
      loadingCiudades: true,
      loadingEmpresas: true,
      loadingGuardadoCliente: false,
      rules: {
        nombre: [
          { required: true, message: 'Por favor, introduzca un Nombre', trigger: 'blur' },
        ],
        apellido: [
          { required: true, message: 'Por favor, introduzca un Apellido', trigger: 'blur' },
        ],
        documento: [
          { required: true, message: 'Por favor, introduzca un Documento', trigger: 'blur' },
        ],
        codigoLegajo: [
          { required: true, message: 'Por favor, introduzca un Código', trigger: 'blur' },
        ],
        codigoHuella: [],
        razonSocial: [],
        direccion: [
          { required: true, message: 'Por favor, introduzca una Dirección', trigger: 'blur' },
        ],
        estado: [],
        ciudadId: [
          { required: true, message: 'Por favor, seleccione una Ciudad', trigger: 'blur' },
        ],
        empresaId: [
          { required: true, message: 'Por favor, seleccione una Empresa', trigger: 'blur' },
        ],
      }
    }
  },
  mounted() {
    axios.get('/Ciudades/listar')
      .then(response => {
        if (!response.data.error) {
          this.ciudades = response.data.dato;
        }
      }).catch(error => {
        console.log(JSON.stringify(error));
      }).finally(() => {
        this.loadingCiudades = false;
      });
    axios.get('/Empresas/listar')
      .then(response => {
        if (!response.data.error) {
          this.empresas = response.data.dato;
        }
      }).catch(error => {
        console.log(JSON.stringify(error));
      }).finally(() => {
        this.loadingEmpresas = false;
      });
  },
  methods: {
    closeModalCliente() {
      this.resetForm('ruleForm');
      this.$emit('closeModalCliente');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadingGuardadoCliente = true;
          axios.post('/Personas/crearCliente', this.ruleForm)
            .then((response) => {
              if (!response.data.error) {
                this.closeModalCliente();
                this.$notify({
                  message: response.data.mensaje,
                  type: 'success',
                });
                
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
      console.log(this.$refs);
      this.$refs[formName].resetFields();
    }
  },
  props: {
    showModalCliente: {
      type: Boolean,
      default: false
    }
  },

}
</script>

<style scoped>

</style>