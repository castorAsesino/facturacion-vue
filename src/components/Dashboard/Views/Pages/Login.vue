<template>
  <div class="login-page">
    <app-navbar></app-navbar>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page section-image">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="col-lg-4 col-md-6 ml-auto mr-auto">
              <form @submit.prevent="login">
                <card type="login">
                  <h3 slot="header" class="header text-center">Iniciar Sesión</h3>

                  <fg-input v-model="username" addon-left-icon="nc-icon nc-single-02" placeholder="Username"/>
                  <validation-error :errors="apiValidationErrors.username" />
                  <fg-input v-model="password" addon-left-icon="nc-icon nc-key-25" placeholder="Password" type="password"/>
                  <validation-error :errors="apiValidationErrors.password" />
                  <div slot="footer">
                    <p-button native-type="submit" slot="footer" type="warning" round block class="mb-3">Iniciar Sesión</p-button>
                  </div>
                </card>
              </form>
            </div>
          </div>
        </div>
        <app-footer></app-footer>
        <div class="full-page-background" style="background-image: url(/static/img/background/background-2.jpg) "></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Card, Button } from 'src/components/UIComponents';
  import AppNavbar from './Layout/AppNavbar'
  import AppFooter from './Layout/AppFooter'
  import formMixin from "@/mixins/form-mixin";
  import ValidationError from "src/components/UIComponents/ValidationError.vue";

export default {
  mixins: [formMixin],
  components: {
    Card,
    AppNavbar,
    AppFooter,
    [Button.name]: Button,
    ValidationError
  },
  data() {
    return {
      username: "admin",
      password: "securePassword",
    }
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle('nav-open')
    },
    closeMenu() {
      document.body.classList.remove('nav-open')
      document.body.classList.remove('off-canvas-sidebar')
    },
    async login() {
      const user = {
            username: this.username,
            password: this.password
      }

      const requestOptions = {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        }
      }

      try {
        await this.$store.dispatch("login", {user, requestOptions})
      } catch (e) {
        this.$notify({
          message:'Ocurrió un error con el servidor',
          type: 'danger',
        });
        this.setApiValidation(e.response.data.errors)
      }
    }
  },
  beforeDestroy() {
    this.closeMenu()
  }
}
</script>
<style>
</style>
