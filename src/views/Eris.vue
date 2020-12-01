<template>
  <div class="block">
    <img src="~/@/assets/logo.svg" class="mb-2 logo" />
    <h1 class="mb-4">$ERIS / $AMPL / $VLO / $PRIA</h1>
    <p class="mb-6">$ERIS is the first reserve currency of $PANTHEON. $ERIS offers a unique deflationary mechanism and supply model that enables it to act as a reserve currency to manage the other assets paired with it, while still encouraging trading against those assets on the open market. But applying elastic finance models to managing holders balances $ERIS is able to benefit holders and traders of $ERIS by distributing proceeds using a share model. In addition, coupled with the $ERIS Quadratic Pricing Sales protocol new $ERIS can be minted and sold to acquire more assets to be paired with $ERIS for management under $PANTHEON in a manner that does not dilute current holders and provides unique arbitrage opportunities. Along with other tokens providing similarly specialised economic models like $PRIA, $REFLECT, $PROPHET and $AMPL, $ERIS, through the $PANTHEON asset management protocol can offer a non-dilutionary method to regularly increase liquidity and trading options.by acquiring more assets to pair with $ERIS.</p>
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
