<template>
  <div class="block">
    <img src="~/@/assets/logo.svg" class="mb-2 logo" />
    <h1 class="mb-4">Ongoing Projects</h1>
    <p class="mb-6">Lorem Ipsum</p>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        potion: ''
      },
      modalWithdrawOpen: false,
      modalLoginOpen: false,
      modalRevitalizeOpen: false,
      potions: this.$store.state.settings.potions
    };
  }
};
</script>
