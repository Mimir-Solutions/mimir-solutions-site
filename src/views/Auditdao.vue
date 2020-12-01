<template>
  <div class="block">
    <img src="~/@/assets/logo.svg" class="mb-2 logo" />
    <h1 class="mb-4">AuditDAO</h1>
    <p class="mb-6 tl-a">
      AuditDAO is a decentralized organization coordinating efforts from a community of software security and finance professionals to maintain technical and process standards in decentralized technology. The aim to provide clear guidance on proven software designs and finance models that ensure the security and legality of decentralized technology implementation.<br><br>
AuditDAO operates as a non-profit DAO, accepting donations from interested parties in exchange for funding tokens that can be used to purpose projects for AuditDAO to oversee the execution. AuditDAO will also maintain a reserve of funding tokens to be used to propose a budget for its own operating costs and as grants for proposals that lack the funding to donate themselves. These project proposals can be voted on by other holders of the AuditDAO governance token to budget donated funds to complete projects. The AuditDAO governance token will only be available from AuditDAO in exchange for the funding token. This separation of proposal ability from funding governance ability helps mitigate malicious manipulation of the governance, and protection against misappropriation of funds. This also serves to provide oversight similar to the compliance models of 501c3 corporations. The proposal process being similar to a grant submission. Which is separate from the grant approval process while still being restricted to management by actual donors.
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
