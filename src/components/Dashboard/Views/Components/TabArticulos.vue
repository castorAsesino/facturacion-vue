<template>
  <div>
    <div class="tab">
      <button class="tablinks" @click="openCity" value="all" id="all-tab">
        <i class="fas fa-house"></i>
      </button>
      <button v-for="categoria in categorias" :id="`${categoria.id}-tab`" class="tablinks" @click="openCity"
              :value="categoria.id">{{ categoria.descripcion }}
      </button>
    </div>
    <el-card class="col-scroll" :body-style="{ padding:'0px', margin:'10px'}">
      <div id="all-div" class="tabcontent">
        <div class="card-image product-list" :offset="5" style="">
          <div v-for="product in productList" @click="$emit('seleccionarProducto', product, null)"
               style="cursor: pointer;">
            <el-badge :value="product.precioVenta" class="item" type="primary">
              <el-card :body-style="{ padding: '0px', margin:'10px', align:'center'}" :key="product.id" style=" height: 180px !important;">
                <img :src="'data:image/png;base64, '+product.imagen" class="image">
                <span class="description-product">{{ product.descripcion }}.</span>
              </el-card>
            </el-badge>
          </div>
        </div>
        <div v-if="loading" v-loading="true"></div>
        <div v-if="productList.length == '0' && !loading" class="empty-size">
          <i class="nc-icon nc-box"></i>
          <p class="empty-subtitle">No se encontraron resultados.</p>
        </div>
      </div>
      <div v-for="categoria in categorias" :id="`${categoria.id}-div`" class="tabcontent">

        <div class="card-image product-list" :offset="5" style="">
          <div v-for="product in productList" @click="$emit('seleccionarProducto', product, null)"
               style="cursor: pointer;">

            <el-badge :value="product.precioVenta" class="item" type="primary">

              <el-card :body-style="{ padding: '0px' }" :key="product.id" style=" height: 180px !important;">
                <img :src="'data:image/png;base64, '+product.imagen" class="image">
                <span class="description-product">{{ product.descripcion }}.</span>
              </el-card>
            </el-badge>
          </div>
        </div>
        <div v-if="loading" v-loading="true"></div>
        <div v-if="productList.length == '0' && !loading" class="empty-size">
          <i class="nc-icon nc-box"></i>
          <p class="empty-subtitle">No se encontraron resultados.</p>
        </div>

      </div>
    </el-card>
  </div>
</template>
<script>
import axios from "@/util/axios";
import {
  Badge,
  Card,
} from 'element-ui';
export default {
  name: 'TabArticulos',
  components: {
    [Badge.name]: Badge,
    [Card.name]: Card,
  },
  data() {
    return {
      loading: true,
      productList: [],
      categorias: [],
    }
  },
  mounted() {
    axios.get('/ArticulosCategorias/listarcategoria')
        .then(response => {
          if (!response.data.error) {
            this.categorias = response.data.dato;
            if (this.categorias.length > 0) {
              this.idCategoria = null;
              this.getProductosById();
            }
          }
        }).catch(error => {
      console.log(JSON.stringify(error));
    });
  },
  methods: {
    openCity(e) {
      let i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      //Seteamos el valor porque viene nulo.
      e.target.value = (e.target.value != null ? e.target.value : 'all');
      document.getElementById(e.target.value + '-div').style.display = "block";
      e.currentTarget.className += " active";
      this.getCategoriaId(e.target.value)
    },
    getCategoriaId(value) {
      if (value === 'all') {
        this.idCategoria = null;
      } else {
        this.idCategoria = value;
      }
      this.getProductosById();
    },
    getProductosById() {
      this.loading = true;
      this.productList = [];
      let filter = '';
      if (this.idCategoria !== null) filter = `?ArticuloCategoriaId=${this.idCategoria}`
      axios.get(`/articulos/listararticulos${filter}`)
          .then(response => {
            this.loading = false;
            if (!response.data.error) {
              this.productList = response.data.dato;
            }
          }).catch(error => {
        this.loading = false;
        console.log(JSON.stringify(error));
      });
    },
  }
}
</script>
<style>
.item {
  margin-top: 10px;
}
.empty-size {
  margin-top: 30px;
  text-align: center;
}
.empty-subtitle {
  text-align: center;
}
.tableFixHead thead th {
  position: sticky;
  top: 0;
  z-index: 1;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 8px 16px;
  text-align: center;
  text-transform: none !important;
}
th {
  background: #eee;
}
.col-scroll {
  height: 50rem;
  overflow: auto;
}
.description-product {
  padding: 0;
  float: right;
  margin: 5px;
  text-align: center;
  font-size: 12px;
  color: black !important;
}
.image {
  width: 100%;
  display: block;
}
.card-image {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(8, 1fr);
  height: 200px !important;
}
/* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}
/* Style the buttons that are used to open the tab content */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}
/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}
/* Create an active/current tablink class */
/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
}
</style>