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
  saleAddr: '0xb72027693a5b717b9e28ea5e12ec59b67c944df7',
  loading: false,
  address: null,
  name: '',
  balance: 0,
  claim: 0,
  minimumEth: 0,
  providedEth: 0,
  remainingEth: 0,
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
        await dispatch('calculateRemainingEther');
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
    const crowdSale = await new ethers.Contract(state.saleAddr, mimirTokenSale, provider);
    const signer = provider.getSigner();
    await signer.sendTransaction({
      to: crowdSale.address,
      value: ethers.utils.parseEther(payload.value.toString())
    });
  },
  async calculateRemainingEther({ commit }) {
    const crowdSale = await new ethers.Contract(state.saleAddr, mimirTokenSale, provider);
    const minimumEth = await crowdSale.MINIMAL_PROVIDE_AMOUNT();
    const providedEth = await provider.getBalance(state.saleAddr);
    const remainingEth = minimumEth - providedEth;
    commit('set', {
      remainingEth: ethers.utils.formatEther(remainingEth.toString()),
      minimumEth: ethers.utils.formatEther(minimumEth),
      providedEth: ethers.utils.formatEther(providedEth)
    });
  },
  async calculateClaim({ commit }) {
    const crowdSale = await new ethers.Contract(state.saleAddr, mimirTokenSale, provider);
    const signer = provider.getSigner();
    const totalProvided = await crowdSale.totalProvided();
    const totalDistributeAmount = await crowdSale.TOTAL_DISTRIBUTE_AMOUNT();
    const userProvided = await crowdSale.provided(signer.address);
    const claim = (totalDistributeAmount * totalDistributeAmount) / userProvided;
    commit('set', { claim: ethers.utils.formatEther(claim.toString()) });
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
