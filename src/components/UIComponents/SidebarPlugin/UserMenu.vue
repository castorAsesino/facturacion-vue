<template>
  <div class="user">
    <div class="photo avatar-image" :style="{'background-image': `url('${profileImage}')`,}" />
    <div class="info">
      <a data-toggle="collapse" :aria-expanded="!isClosed" @click="toggleMenu" href="#">
         <span>
           {{ title }}
           <b class="caret"></b>
        </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <collapse-transition>
          <ul class="nav nav-menu" v-show="!isClosed">           
            <li>
              <a href="#" @click="logout">
                <span class="sidebar-mini-icon">CS</span>
                <span class="sidebar-normal">Cerrar Sesión</span>
              </a>
            </li>
          </ul>
        </collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
  import { CollapseTransition } from 'vue2-transitions'

  export default {
    components: {
      CollapseTransition
    },
    computed: {
      profileImage() {
        return this.avatar ? this.avatar : "/img/circle-user.png";
      },
    },
    data() {
      return {
        isClosed: true,
        avatar: null,
        title: ""
      }
    },
    async created() {
      this.$store.watch(
        () => this.$store.getters["profile/me"],
        (me) => {
          this.title = me.originalUserName;
          this.avatar = me.profile_image;
        }
      );
      await this.$store.dispatch("profile/me");
    },
    methods: {
      toggleMenu() {
        this.isClosed = !this.isClosed
      },
      logout() {
        this.$store.dispatch("logout");
      },
      goToProfile() {
        this.$router.push({name: "User Profile"});
      }
    }
  }
</script>
<style scoped>
  .nav.nav-menu {
    margin-top: 0;
  }
</style>
