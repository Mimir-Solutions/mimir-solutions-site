<template>
  <div class="block">
    <img src="~/@/assets/logo.svg" class="mb-2 logo" />
    <h1 class="mb-4">NFY</h1>
    <p class="mb-6 ta-l">NFY is a defi protocol that wraps ERC20 compliant defi assets in ERC721 compliant tokens, also called NFTs. This enables holders of ERC20 assets to manage those assets as a bundle. This is a similar premise to services provided by Curve and Cream. The distinction being that the assets bundled using NFY are treated as a block. This facilitates trading these assets with other defi protocols by enabling the management of multiple transactions referenced to a single holder.
<br><br>
For example, if a holder of a NFY NFT asset bundle that contains $DAI wishes to use their assets to transact with another defi protocol using $AMPL and receive the proceeds as $TRIB. The NFY protocol can facilitate the execution of the transactions needed to exchange the bundled assets for the asset needed for the desired transaction and to distribute the proceeds.
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
