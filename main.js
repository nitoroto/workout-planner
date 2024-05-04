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

const logger = {
  log(message) {
    console.log(message);
  },
  error(message) {
    console.error(message);
  }
};

const workoutStore = new Vuex.Store({
  state: {
    currentUser: null,
    availableWorkouts: [],
    error: null,
    workoutsError: null
  },
  mutations: {
    updateCurrentUser(state, user) {
      state.currentUser = user;
    },
    updateAvailableWorkouts(state, workouts) {
      state.availableWorkouts = workouts;
    },
    setError(state, errorMessage) {
      state.error = errorMessage;
    },
    setWorkoutsError(state, errorMessage) {
      state.workoutsError = errorMessage;
    },
    clearErrors(state) {
      state.error = null;
      state.workoutsError = null;
    }
  },
  actions: {
    retrieveCurrentUser({ commit }) {
      axios.get(`${process.env.VUE_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
        }
      }).then(response => {
        logger.log('User data retrieved successfully.');
        commit('updateCurrentUser', response.data);
        commit('clearErrors');
      }).catch(error => {
        logger.error('Error retrieving user: ' + error);
        commit('setError', 'Failed to retrieve user data.');
      });
    },
    retrieveAvailableWorkouts({ commit }) {
      axios.get(`${process.env.VUE_APP_API_URL}/workouts`, {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
        }
      }).then(response => {
        logger.log('Workouts retrieved successfully.');
        commit('updateAvailableWorkouts', response.data);
        commit('clearErrors');
      }).catch(error => {
        logger.error('Error retrieving workouts: ' + error);
        commit('setWorkoutsError', 'Failed to retrieve workouts.');
      });
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