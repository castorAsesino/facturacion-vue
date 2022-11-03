<template>
  <!-- small modal -->
  <modal 
    :show.sync="this.show" 
    class="modal-primary" 
    :show-close="false" 
    headerClasses="justify-content-center"
    type="pagar"
    styleModal = "width:25%;">
    <div slot="header" class="modal-profile ml-auto mr-auto">
      <i class="nc-icon nc-simple-remove"></i>
    </div>
    <p>Está seguro que desea cancelar la operación?</p>
    <template slot="footer">
      <div class="left-side">
        <p-button type="defaul" link @click="$emit('update:show', false);">Cancelar</p-button>
      </div>
      <div class="divider"></div>
      <div class="right-side">
        <p-button type="primary" link @click="$emit('limpiar');">Aceptar</p-button>
      </div>
    </template>
  </modal>
</template>

<script>
import { Card, Button, Modal } from "src/components/UIComponents";

export default {
  components: {
    Card,
    Modal,
    [Button.name]: Button,

  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
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

  },
};
</script>
<style scope>
.card .alert {
  position: relative !important;
  width: 100%;
}


</style>