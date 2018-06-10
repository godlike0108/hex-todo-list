<template>
  <div id="app">
    <menu-bar></menu-bar>
    <div class="content">
      <div class="add-task">
        <p class="add-tag" :class="{'collapsed': !newTask.collapsed}" @click="openNewTask()">
          <span><i class="fas fa-plus"></i></span>Add Task
        </p>
        <task :task="newTask" :index="null" :class="{'collapsed': newTask.collapsed}"></task>
      </div>
      <ul class="task-list">
        <li v-for="task in taskList">
          <task :task="task" :index="task.id"></task>
        </li>
      </ul>
      <p class="task-status">{{ongoingTaskAmount | taskUnit}}</p>
    </div>
  </div>
</template>

<script>
import MenuBar from './components/MenuBar.vue'
import Task from './components/Task.vue'

export default {
  name: 'app',
  components: {
    MenuBar,
    Task
  },
  beforeCreate() {
    this.$store.dispatch('syncWithLocalStorage');
  },
  data () {
    return {
    }
  },
  computed: {
    newTask() {
      return this.$store.state.newTask;
    },
    taskList() {
      return this.$store.getters.filteredTaskList;
    },
    ongoingTaskAmount() {
      return this.$store.getters.ongoingTaskAmount;
    }
  },
  filters: {
    taskUnit(value) {
      if(value === 1) {
        return `${value} task left.`
      } else {
        return `${value} tasks left.`
      }
    }
  },
  methods: {
    openNewTask() {
      this.$store.commit('openNewTask');
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background: $midlight-gray;
}

.content {
  width: 660px;
  padding: 0 20px;
  margin-left: auto;
  margin-right: auto;
}

.add-task {
  width: 620px;
  .collapsed {
    display: none;
  }
  .add-tag {
    border: 2px solid $mid-gray;
    border-radius: 5px;
    height: 65px;
    padding: 1rem 2rem;
    background: $white;
    color: $mid-gray;
    font-size: $title-size;
    font-weight: $title-weight;
    span {
      margin: 0 10px;
    }
  }
}

.task-list {
  list-style-type: none;
  padding-left: 0;
}

p {
  margin: 0;
  margin-bottom: 1rem;
  color: #000000;
  line-height: 24px;
}

.task-status {
  font-style: italic;
  font-size: 24px;
  color: #C8C8C8;
}
</style>
