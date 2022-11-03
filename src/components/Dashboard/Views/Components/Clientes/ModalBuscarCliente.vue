<template>
  <!-- small modal -->
  <modal :show.sync="this.show" class="modal-primary" :show-close="false" headerClasses="justify-content-center"
    type="mini" styleModal="width:20%;">
    <div slot="header" class="modal-profile ml-auto mr-auto">
      <i class="nc-icon nc-zoom-split"></i>
    </div>
    <span v-html="message"></span>
    <template slot="footer">
      <div class="left-side">
        <p-button type="defaul" link @click="$emit('update:show', false);">Buscar</p-button>
      </div>
      <div class="divider"></div>
      <div class="right-side">
        <p-button type="primary" link @click="$emit('');">Aceptar</p-button>
      </div>
    </template>
  </modal>
</template>

<script>
import { Card, Button, Modal } from "src/components/UIComponents";
import axios from '../../../../../util/axios';

export default {
  components: {
    Card,
    Modal,
    [Button.name]: Button,
  },
  data: () => ({
    message: '<i class="fas fa-spinner fa-lg"></i>&nbsp; Buscando Cliente...',
    cliente: null
  }),
  props: {
    show: {
      type: Boolean,
      default: false
    },
    clienteInput:   Number
  },
  methods: {
    notifyVue(verticalAlign, horizontalAlign) {
      const color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        component: NotificationTemplate,
        icon: "nc-icon nc-app",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color],
      });
    },
    getLastMessage() {
      if (this.cliente != null) {
        this.message = `<i class="fas fa-circle-check fa-lg"></i>&nbsp; ${this.cliente.legajo} - ${this.cliente.nombre}`
      } else {
        this.message = '<i class="fas fa-spinner fa-lg"></i>&nbsp; Buscando...'
      }
    },
    buscarCliente() {
      axios.get('/personas/buscarCliente')
        .then(response => {
          if (!response.data.error) {
            console.log('Buscar Cliente: ' + JSON.stringify(response.data.dato));
            this.cliente = response.data.dato;
            this.$emit('update:clienteInput', this.cliente.clienteId)
            this.getLastMessage();
          }
        }).catch(error => {
          console.log(JSON.stringify(error));
        });
    },
  },
  mounted() {
    console.log(this.show);
    this.getLastMessage();
  },
  watch: {
    show(newValue, oldValue) {
      if (newValue) {
        this.buscarCliente();
      }
    }
  },
};
</script>

<style scope>
.card .alert {
  position: relative !important;
  width: 100%;
}
</style>