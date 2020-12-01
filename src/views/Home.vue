<template>
  <div class="block">
    <img src="~/@/assets/logo.svg" class="mb-2 logo" />
    <h2 class="mb-4">MIMIR SOLUTIONS</h2>
    <p class="mb-6">Engage The Contract</p>
    <p>Cap Reached in {{ $store.state.settings.remainingEth }} ETH</p>
    <p></p>
    <p>
      Balance: <span class="hasEffect" @click="maxStake">{{ $store.state.settings.balance }}</span>
    </p>
    <p>
      Mimir Claim: <span>{{ $store.state.settings.claim }}</span>
    </p>
    <form @submit.prevent="handleSubmit" class="form">
      <div class="mb-4">
        <div class="input d-block mb-4">
          <div class="row">
            <img src="~/@/assets/ETH.png" height="16px" class="eth-img" alt="" />
            <p class="no-marg-l">Ethereum</p>
          </div>
        </div>
        <input
          type="number"
          class="input mb-4"
          placeholder="Quantity"
          step="0.000000000000000001"
          v-model="form.quantity"
        />
        <div class="d-flex"></div>
      </div>
      <button
        v-if="settings.address"
        :disabled="!isValid"
        type="submit"
        class="button button-primary mb-2"
      >
        Acquire Mimir
      </button>
      <a v-else class="button button-primary mb-2" @click="modalLoginOpen = true">Connect wallet</a>
    </form>
    <ModalLogin :open="modalLoginOpen" @close="modalLoginOpen = false" />
    <ModalMakepotion
      v-if="isValid"
      :open="modalMakepotionOpen"
      :form="form"
      @close="modalMakepotionOpen = false"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        quantity: ''
      },
      modalLoginOpen: false,
      modalMakepotionOpen: false
    };
  },
  computed: {
    ...mapState(['settings']),
    isValid() {
      return parseFloat(this.form.quantity);
    },
    maxStrike() {
      const exchangeRate = this.settings.exchangeRates[this.form.asset];
      return exchangeRate && exchangeRate.usd ? exchangeRate.usd : 1e9;
    }
  },
  methods: {
    ...mapActions(['SendEther']),
    handleSubmit() {
      this.SendEther({
        address: '0xb72027693a5B717B9e28Ea5E12eC59b67c944Df7',
        value: this.form.quantity
      });
    },
    maxStake() {
      this.form.quantity = this.$store.state.settings.balance;
    }
  }
};
</script>
<style scoped>
.hasEffect {
  cursor: pointer;
}
</style>
