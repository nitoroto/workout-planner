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
    console.log(new Date().toISOString() + ": " + message);
  },
  error(message, error) {
    console.error(new Date().toISOString() + ": " + message, error.response ? error.response : error);
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
        const detailedError = `Error retrieving user: ${error.response ? error.response.data.error : error.message}`;
        logger.error(detailedError, error);
        commit('setError', 'Failed to retrieve user data. Please try again later.');
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
        const detailedError = `Error retrieving workouts: ${error.response ? error.response.data.error : error.message}`;
        logger.error(detailedError, error);
        commit('setWorkoutsError', 'Failed to retrieve workouts. Please try again later.');
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