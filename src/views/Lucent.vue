<template>
  <div class="block">
    <img src="~/@/assets/logo.svg" class="mb-2 logo" />
    <h1 class="mb-4">Lucent</h1>
    <p class="mb-6 ta-l">Lucent is a Bitcoin based blockchain offering a similar store of value functionality. Lucent differentiates itself from Bitcoin by extending the capability to include smart contract functionality.
<br><br>
The benefit Lucent provides is a path for development of cross-chain bridges to extend the functionality of Mimir Solutions projects. The intent is that Lucent can provide the ledger for tracking assets cross-chain to provide tokens with the ability to leverage functionality provided by those other chains. As an example, a telecommunications company offers a tokenized version of their revenue as a regulated security, and a tokenized version of their traffic data. Lucent could provide holders of the tokenized
</p>
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
