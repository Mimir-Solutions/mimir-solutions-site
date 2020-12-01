<template>
  <div class="block">
    <img src="~/@/assets/logo.svg" class="mb-2 logo" />
    <h1 class="mb-4">Pantheon</h1>
    <p class="mb-6 ta-l">Previously named $CHAINS, $PANTHEON provides a unique asset management service leveraging elastic finance techniques to provide mutual pool functionality. $PANTHEON acts as the wrapper token for assets under management in $PANTHEON. Perpetually selling $PANTHEON as a means of accepting assets for deposit. Normally this would be handled by minting new tokens, as seen in $WETH and $WBTC. $PANTHEON distinguishes itself from other protocols by using elastic finance techniques to dynamically adjust the total supply of $PANTHEON based on the total value of assets managed by $PANTHEON. This provides functionality akin to Curve, Swerve, or mStable. But across all assets managed by $PANTHEON. This asset management process eliminates vaults in the favor of managing assets through exchange listings. This way $PANTHEON can manage assets through DEX pairs generating trading volume and ensuring funds are available to trade, instead sitting static in a vault.</p>
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
