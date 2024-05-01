import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import workoutRoutes from './routes';
import axios from 'axios';

Vue.use(VueRouter);
Vue.use(Vuex);

const appRouter = new VueRouter({
  mode: 'history',
  routes: workoutRoutes
});

const workoutStore = new Vuex.Store({
  state: {
    currentUser: null,
    availableWorkouts: []
  },
  mutations: {
    updateCurrentUser(state, user) {
      state.currentUser = user;
    },
    updateAvailableWorkouts(state, workouts) {
      state.availableWorkouts = workouts;
    }
  },
  actions: {
    retrieveCurrentUser({ commit }) {
      axios.get(`${process.env.VUE_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
        }
      }).then(response => {
        commit('updateCurrentUser', response.data);
      }).catch(error => console.error('Error retrieving user:', error));
    },
    retrieveAvailableWorkouts({ commit }) {
      axios.get(`${process.env.VUE_APP_API_URL}/workouts`, {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
        }
      }).then(response => {
        commit('updateAvailableWorkouts', response.data);
      }).catch(error => console.error('Error retrieving workouts:', error));
    }
  }
});

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.VUE_APP_API_TOKEN}`;

new Vue({
  router: appRouter,
  store: workoutStore,
  render: h => h(App)
}).$mount('#app');