import Vue from 'vue';
import { ethers } from 'ethers';
import store from '@/store';
import provider from '@/helpers/provider';
import {
  getExchangeRatesFromCoinGecko,
  getPotions,
  getAllowances,
  revitalisePotion,
  withdrawPotion
} from '@/helpers/utils';
import assets from '@/helpers/assets.json';
import { abi as ierc20Abi } from '@/helpers/abi/IERC20.json';
import { abi as mimirTokenSale } from '@/helpers/abi/mimirTokenSale.json';

const parseEther = ethers.utils.parseEther;

const ethereum = window['ethereum'];
if (ethereum) {
  ethereum.on('accountsChanged', () => store.dispatch('init'));
  ethereum.on('networkChanged', network => {
    store.commit('set', { network: ethers.utils.getNetwork(parseInt(network)) });
  });
}

const state = {
  loading: false,
  address: null,
  name: '',
  balance: 0,
  network: {},
  exchangeRates: {},
  allowances: {},
  balances: {}
};

const mutations = {
  set(_state, payload) {
    Object.keys(payload).forEach(key => {
      Vue.set(_state, key, payload[key]);
    });
  }
};

const actions = {
  init: async ({ commit, dispatch }) => {
    commit('set', { loading: true });
    await dispatch('getExchangeRates');
    if (provider) {
      try {
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        if (address) await dispatch('login');
      } catch (e) {
        console.log(e);
      }
    }
    commit('set', { loading: false });
  },
  login: async ({ commit, dispatch }) => {
    if (provider) {
      try {
        await ethereum.enable();
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const name = await provider.lookupAddress(address);
        const balance = await provider.getBalance(address);
        const network = await provider.getNetwork();
        commit('set', { address });
        commit('set', {
          name,
          balance: ethers.utils.formatEther(balance),
          network,
          loading: false
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('This website require MetaMask');
    }
  },
  loading: ({ commit }, payload) => {
    commit('set', { loading: payload });
  },
  async getExchangeRates({ commit }) {
    const exchangeRates = await getExchangeRatesFromCoinGecko();
    commit('set', { exchangeRates });
  },

  async loadAllowances({ commit }) {
    const daiAddress = process.env.VUE_APP_DAI_ADDRESS;
    const addresses = [daiAddress];
    Object.entries(state.potions).forEach(potion => {
      // @ts-ignore
      addresses.push(potion[1].address);
    });
    const allowances = await getAllowances(state.address, addresses);
    console.log('Your allowances', allowances);
    commit('set', { allowances });
  },

  async approve({ commit }) {
    const factoryAddress = process.env.VUE_APP_FACTORY_ADDRESS;
    const address = process.env.VUE_APP_DAI_ADDRESS;
    const signer = provider.getSigner();
    // @ts-ignore
    const erc20 = new ethers.Contract(address, ierc20Abi, provider);
    const erc20WithSigner = erc20.connect(signer);
    const tx = await erc20WithSigner.approve(factoryAddress, parseEther((1e9).toString()));
    console.log(tx.hash);
    await tx.wait();
  },
  async SendEther({ commit }, payload) {
    const crowdSale = await new ethers.Contract(payload.address, mimirTokenSale, provider);
    const signer = provider.getSigner();
    await signer.sendTransaction({to:crowdSale.address, value:ethers.utils.parseEther(payload.value.toString())})
  },

  async loadBalanceIn({ commit }, payload) {
    /*const potionToken = new ethers.Contract(payload, synthAbi, provider);
    const balance = await potionToken.balanceOf(state.address);
    const balances = state.balances;
    balances[payload] = parseFloat(ethers.utils.formatEther(balance));
    commit('set', { balances });*/
  }
};

export default {
  state,
  mutations,
  actions
};
