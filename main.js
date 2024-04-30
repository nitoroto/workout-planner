import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import routes from './routes'; 
import axios from 'axios';

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  mode: 'history',
  routes
});

const store = new Vuex.Store({
  state: {
    user: null,
    workouts: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setWorkouts(state, workouts) {
      state.workouts = workouts;
    }
  },
  actions: {
    fetchUser({ commit }) {
      axios.get(`${process.env.VUE_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
        }
      }).then(response => {
        commit('setUser', response.data);
      }).catch(error => console.error('Error fetching user:', error));
    },
    fetchWorkouts({ commit }) {
      axios.get(`${process.env.VUE_APP_API_URL}/workouts`, {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
        }
      }).then(response => {
        commit('setWorkouts', response.data);
      }).catch(error => console.error('Error fetching workouts:', error));
    }
  }
});

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.VUE_APP_API_TOKEN}`;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');