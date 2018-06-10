import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    id: 0,
    activeGroup: 'all',
    newTask: {
      id: null,
      title: null,
      collapsed: true,
      date: null,
      time: null,
      src: null,
      comment: null,
      done: false,
      important: false,
    },
    taskList: [],
    cacheTaskList: []
  },
  getters: {
    filteredTaskList(state) {
      switch(state.activeGroup) {
        case 'ongoing':
          return state.taskList.filter(task => task.done === false)
          break;
        case 'done':
          return state.taskList.filter(task => task.done === true)
          break;
        default:
          return state.taskList;
      }
    },
    ongoingTaskAmount(state) {
      return state.taskList.reduce((total, current) => {
        if(!current.done) {total++}
        return total;
      }, 0)
    }
  },
  mutations: {
    syncStore(state, payload) {
      this.replaceState(payload);
    },

    increaseID(state) {
      state.id++;
    },

    setActiveGroup(state,payload) {
      state.activeGroup = payload;
    },

    openNewTask(state) {
      state.newTask.collapsed = false;
    },

    closeNewTask(state) {
      state.newTask.collapsed = true;
    },

    openTask(state, payload) {
      state.taskList[payload.index].collapsed = false;
    },

    closeTask(state, payload) {
      state.taskList[payload.index].collapsed = true;
    },

    addTask(state) {
      let newTask = {...state.newTask};
      state.taskList.push(newTask);
    },

    cacheAddTask(state) {
      let newTask = {...state.newTask};
      state.cacheTaskList.push(newTask);
    },

    clearNewTask(state) {
      let newTask = {
        id: null,
        title: null,
        collapsed: true,
        date: null,
        time: null,
        src: null,
        comment: null,
        done: false,
        important: false,
      };
      state.newTask = newTask;
    },

    updateNewTask(state, payload) {
      for(let prop in state.newTask) {
        if(typeof payload[prop] !== 'undefined') {
          state.newTask[prop] = payload[prop];
        }
      }
    },

    updateTask(state, payload) {
      for(let prop in state.taskList[payload.index]) {
        if(typeof payload[prop] !== 'undefined') {
          state.taskList[payload.index][prop] = payload[prop];
        }
      }
    },

    cacheUpdateTask(state,payload) {
      let updatedTask = {...state.taskList[payload.index]};
      state.cacheTaskList.splice(payload.index, 1, updatedTask);
    },

    recoverTaskList(state, payload) {
      for(let prop in state.taskList[payload.index]) {
        state.taskList[payload.index][prop] = state.cacheTaskList[payload.index][prop];
      }
    }
  },
  actions: {
    syncWithLocalStorage({state, commit}) {
      if(localStorage.getItem('todo-store')) {
        let newState = Object.assign(JSON.parse(localStorage.getItem('todo-store')));
        commit('syncStore', newState);
        localStorage.removeItem('todo-store');
      }
    }
  }
});

// subscribe to mutation
store.subscribe((mutation, state) => {
  localStorage.setItem('todo-store', JSON.stringify(state));
});