<template>
  <nav>
    <div class="bg-topnav">
      <div class="container-lg p-responsive d-flex">
        <div class="flex-auto text-left">
          <router-link :to="{ name: 'home' }">
            <div class="row">
                <img src="~/@/assets/logo.svg" class="logo" />
              <h1 class="py-4">
                $MIMIR
              </h1>
            </div>
          </router-link>
        </div>
        <div class="py-4">
          <a v-if="address" class="button button-info">
            <span class="login-bullet mr-2 ml-n2" />
            {{ name || shorten(address) }}
          </a>
          <a v-else class="circle-button button button-primary" @click="modalLoginOpen = true">
            Connect wallet
          </a>
          <a
            class="button button-info ml-2 d-inline-block hide-sm"
            target="_blank"
            href="https://docs.potion.finance"
          >
            ?
          </a>
        </div>
      </div>
      <div class="pt-4 pb-10">
        <h1 class="mx-auto container-md p-responsive ">Mimir Solutions</h1>
        <div class="countdown-box">
          <div>
            <flip-countdown deadline="2018-12-25 00:00:00"></flip-countdown>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-4 mt-n4">
      <div class="mainnav">
        <router-link :to="{ name: 'home' }" class="button button-secondary">
          Home
        </router-link>
        <router-link :to="{ name: 'about' }" class="button button-secondary">
          About
        </router-link>
        <router-link :to="{ name: 'projects' }" class="button button-secondary">
          Projects
        </router-link>
      </div>
    </div>
    <ModalLogin :open="modalLoginOpen" @close="modalLoginOpen = false" />
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import { shorten } from '@/helpers/utils';
import FlipCountdown from 'vue2-flip-countdown'


export default {
  data() {
    return {
      modalLoginOpen: false
    };
  },
  components: { FlipCountdown },

  computed: mapState({
    name: state => state.settings.name,
    address: state => state.settings.address
  }),
  methods: {
    shorten
  }
};
</script>
