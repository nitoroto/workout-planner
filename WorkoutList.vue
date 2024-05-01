<template>
  <div>
    <h2>Your Workouts</h2>
    <div v-for="workout in workouts" :key="workout.id" class="workout-item">
      <p>{{ workout.name }} - {{ workout.description }}</p>
      <button @click="editWorkout(workout.id)">Edit</button>
      <button @click="deleteWorkout(workout.id)">Delete</button>
    </div>
    <div>
      <input v-model="newWorkout.name" placeholder="Workout name">
      <input v-model="newWorkout.description" placeholder="Description">
      <button @click="addWorkout">Add Workout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workouts: [],
      newWorkout: { name: '', description: '' }
    }
  },
  methods: {
    fetchWorkouts() {
      this.workouts = [
        { id: 1, name: 'Morning Run', description: '5km morning run.' },
        { id: 2, name: 'Evening Yoga', description: '30 minutes of yoga.' }
      ];
    },
    addWorkout() {
      const newId = this.workouts.length ? this.workouts[this.workouts.length - 1].id + 1 : 1;
      this.workouts.push({...this.newWorkout, id: newId});
      this.newWorkout.name = '';
      this.newWorkout.description = '';
    },
    editWorkout(id) {
      console.log(`Editing workout ${id}. Replace this log with your edit logic.`);
    },
    deleteWorkout(id) {
      this.workouts = this.workouts.filter(workout => workout.id !== id);
    }
  },
  mounted() {
    this.fetchWorkouts();
  }
}
</script>

<style>
.workout-item {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>