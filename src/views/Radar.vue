<template>
  <div class="block">
    <img src="~/@/assets/logo.svg" class="mb-2 logo" />
    <h1 class="mb-4">Rug RADAR</h1>
    <p class="mb-6 ta-l">Defi is rife with scams. And it’s unreasonable to expect every investor to have the knowledge to completely do their own research. Capitalism thrives on specialization. And if everyone’s a coder so they can invest, who’s going to make all the NFTs?
<br><br>
Rug RADAR started as a Javascript status code analysis tool running in your browser. This has already provided immense value to the community by giving more knowledge to more investors. By being able to apply proven static code analysis technology commonly used in enterprise development implemented in your browser Rug RADAR has only scratched the surface of what’s possible. Companies like Truffle Suite, MythX, and OpenZeppelin provide premium code analysis tools for developers. But these are currently tuned, and packaged for developers. While anyone could download and apply the free open source versions, this typically requires development skills.
<br><br>
By apply proven enterprise technology, with a simple pay per scan tokenization model these products can be made available to the community to execute on demand. By taking advantage of cached results, the cost can be kept very low, and amortized across multiple requests for the same result to allow for a fair price for the service. Combined with a fee split model for liquidity providers and the ability to spend pending rewards on requests a reasonable tokenization model can be defined where a deposit of a reasonable amount of liquidity and average usage of requests an early buyer and staker could easy maintain a life time of use provided the trading volume keep up. And with a pay per request model, trading volume, and additions to liquidity can be maintained with regular resales of paid tokens, and promotions to provide liquidity. Combined with the ability to pay tokens to vote on funding further development of the capabilities of Rug RADAR, advancing from the basic static code analysis in your browser to full simulated test runs with thousands of transactions on the server. Tests that can be provided by developers that when users select their tests, the developer that provided the test can receive a portion of the fee.
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
