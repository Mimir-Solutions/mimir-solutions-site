<template>
  <div>
    <div id="app" class="overflow-hidden pb-6">
      <VueLoadingIndicator v-if="settings.loading" class="overlay big" />
      <div v-else>
        <Nav />
        <router-view :key="$route.path" />
      </div>
    </div>
    <div class="background-druid"></div>
    <div class="background-second"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['settings'])
  },
  methods: {
    ...mapActions(['init'])
  },
  async created() {
    this.init();
  }
};
</script>
