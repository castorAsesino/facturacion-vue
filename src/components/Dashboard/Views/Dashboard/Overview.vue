<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-6" v-for="stats in statsCards">
        <stats-card :type="stats.type"
                    :icon="stats.icon"
                    :small-title="stats.title"
                    :title="stats.value">
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i>
            {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

  </div>
</template>

<script>
  import CircleChartCard from 'src/components/UIComponents/Cards/CircleChartCard.vue';
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard';

  export default {
    components: {
      CircleChartCard,
      StatsCard
    },

    data() {
      return {
        statsCards: [
            {
              type: 'warning',
              icon: 'nc-icon nc-badge',
              title: 'Clientes',
              value: '1200',
              footerText: 'Total registrados.',
              //footerIcon: 'nc-icon nc-refresh-69'
            },
            {
              type: 'success',
              icon: 'nc-icon nc-money-coins',
              title: 'Ventas diarias',
              value: 'Gs. 650.500',
              footerText: 'Total ventas del dia.',
              //footerIcon: 'nc-icon nc-calendar-60'
            },
            {
              type: 'danger',
              icon: 'fas fa-cubes',
              title: 'Articulos',
              value: '65',
              footerText: 'Cantidad de articulos.',
              //footerIcon: 'nc-icon nc-bell-55'
            },
            {
              type: 'info',
              icon: 'fas fa-diagram-project',
              title: 'Categorias',
              value: '5',
              footerText: 'Cantidad de categorias.',
              //footerIcon: 'nc-icon nc-refresh-69'
            }
          ]
      }
    }
  }

</script>
<style>

</style>
