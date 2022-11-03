<template>
  <div class="row" style="justify-content: center;" id="factura">
    <div class="col-xs-6" id="receipt-data">
      <div>
        <h3 style="text-align:center; margin-bottom:10px;">Comedor<br>Eben-Ezer</h3>
        <p>
          <strong>Cliente:</strong> <a v-if="this.cliente">{{this.cliente.nombreCompleto}}</a> <br>
          <strong>Nro. Ticket:</strong> <a v-if="this.dato">{{this.dato.nroComprobante}}</a> <br>
          <strong>Fecha:</strong>   <a>{{this.fecha}}   </a> <br>
          <strong>Usuario:</strong> <a>{{this.username}}</a> <br>
        </p>

        <div style="clear:both;"></div>
        <table class="table table-striped table-condensed custom">
          <thead>
            <tr>
              <th class="text-left" style="width: 65%; border-bottom: 2px solid #ddd; padding: 6px 6px;">
                Descripción
              </th>
              <th class="text-center" style="width: 15%; border-bottom: 2px solid #ddd; padding: 6px 6px;">
                Cant.
              </th>
              <th class="text-right" style="width: 25%; border-bottom: 2px solid #ddd; padding: 6px 6px;">
                Precio
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in productos" :key="producto.id">
              <td class="text-left"   style="padding: 6px 6px;">{{producto.descripcion }}</td>
              <td class="text-center" style="padding: 6px 6px;">{{producto.cantidad    }}</td>
              <td class="text-right"  style="padding: 6px 6px;">{{producto.totalBruto  }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th class="text-left"  colspan="1" style="padding: 6px 6px;">
                Total
              </th>
              <th class="text-right" colspan="2" style="padding: 6px 6px;">
                {{this.totalPagar | currency}}
              </th>
            </tr>
          </tfoot>
        </table>
        <table class="table table-striped table-condensed">
          <thead>
            <tr>
              <th class="text-left"  style="width: 50%; border-bottom: 2px solid #ddd; padding: 6px 6px;">
                Forma de Pago
              </th>
              <th class="text-right" style="width: 36%; border-bottom: 2px solid #ddd; padding: 6px 6px;">
                Importe
              </th>
            </tr>
          </thead>
          <tbody>
            <tr key="producto" style="background: #fff;">
              <td class="text-left" style="padding: 6px 6px;">{{ concepto }}</td>
              <td class="text-right" style="padding: 6px 6px;">{{totalPagar | currency}}</td>
            </tr>
          </tbody>
        </table>

        <div class="well well-sm" style="margin-top:10px;">
          <div style="text-align: center;" v-if="this.dato">Total Acumulado: {{this.dato.totalAcumulado | currency}}</div>
        </div>
      </div>      
      <div style="clear:both;"></div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        username: localStorage.getItem('username')
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
      },
      fecha: {
        type: String,
        default: null
      },
      dato: {
        type: Object,
        default: null
      },
      concepto: {
        type: String,
        default: 0
      },
    },

    mounted() {

    },
    methods: {


    },
  };
</script>
<style>

  @media print {
    .row {
      display: -webkit-box;
      margin-left: -30px;

      width: 260px;
      max-width: 260px;
    }
  }
  
</style>