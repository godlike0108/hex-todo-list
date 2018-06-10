<template>
  <form class="task">
    <section class="abstract" :class="{'important': getTask.important, 'bottom-radius': getTask.collapsed}" @click="openTask(index)">
      <label class="done" @click.stop="doNothing()">
        <input name="done" type="checkbox" :checked="getTask.done" @input="editTask(index, $event)">
        <span class="checkmark"></span>
      </label>

      <label class="title" @click.stop="doNothing()">
        <input name="title" type="text" :value="task.title" @input="editTask(index, $event)" placeholder="Type Something Here...">
      </label>

      <label class="toggle-important" @click.stop="doNothing()">
        <input name="important" type="checkbox" :checked="getTask.important" @input="editTask(index, $event)">
        <span class="unstar" v-if="!getTask.important"><font-awesome-icon :icon="['far', 'star']" /></span>
        <span class="starred" v-if="getTask.important"><font-awesome-icon :icon="['fas', 'star']" /></span>
      </label>
      <div class="is-edit">
        <span class="edit" v-if="!getTask.collapsed"><font-awesome-icon :icon="['far', 'edit']" /></span>
        <span class="unedit" v-if="getTask.collapsed"><font-awesome-icon :icon="['fas', 'edit']" /></span>
      </div>
      <div class="status-bar">
        <span v-if="getTask.date" class="icon"><font-awesome-icon :icon="['far', 'calendar-alt']" /></span>
        <span v-if="getTask.file" class="icon"><font-awesome-icon :icon="['far', 'file']" /></span>
        <span v-if="getTask.comment" class="icon"><font-awesome-icon :icon="['far', 'comment-dots']" /></span>
      </div>
    </section>

    <section class="detail" :class="{'collapsed': getTask.collapsed}">
      <div class="indent-area">
        <h2><span class="icon"><font-awesome-icon :icon="['far', 'calendar-alt']" /></span>Deadline</h2>
        <label class="date">
          <input name="date" type="date" :value="getTask.date" @input="editTask(index, $event)" data-placeholder="yyyy/mm/dd" required>
          <input name="time" type="time" :value="getTask.time" @input="editTask(index, $event)" data-placeholder="hh:mm" required>
        </label>

        <h2><span class="icon"><font-awesome-icon :icon="['far', 'file']" /></span>File</h2>
        <label class="file">
          <input name="file" type="file" id="file-id" :value="getTask.src" @input="editTask(index, $event)">
          <span class="upload"><font-awesome-icon :icon="['fas', 'plus-square']" /></span>
        </label>

        <h2><span class="icon"><font-awesome-icon :icon="['far', 'comment-dots']" /></span>Comment</h2>
        <label class="comment">
          <textarea rows="5" name="comment" :value="getTask.comment" @input="editTask(index, $event)" placeholder="Type your memo here..."></textarea>
        </label>
      </div>
      <div class="handle-form">
        <button @click="closeTask(index)" type="button" class="cancel"><span class="icon"><font-awesome-icon :icon="['fas', 'times']" /></span>Cancel</button>
        <button @click.prevent="addTask(index)" type="button" class="submit"><span class="icon"><font-awesome-icon :icon="['fas', 'plus']" /></span>{{submitBtnValue}}</button>
      </div>
    </section>

  </form>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {

  name: 'Task',
  components: {
    FontAwesomeIcon
  },
  props:['task', 'index'],
  data () {
    return {

    }
  },
  computed: {
    submitBtnValue() {
      if(this.index !== null) {
        return 'Save';
      } else {
        return 'Add Task';
      }
    },

    getTask() {
      if(this.index === null) {
        return this.$store.state.newTask;
      } else {
        return this.$store.state.taskList[this.index];
      }
    },

    currentTaskID() {
      return this.$store.state.id;
    }
  },
  methods: {
    doNothing() {

    },
    openTask(index) {
      if(index !== null) {
        this.$store.commit('openTask', {index});
      }
    },
    closeTask(index) {
      if(index !== null) {
        this.$store.commit('recoverTaskList', {index});
        this.$store.commit('closeTask', {index});
      } else {
        this.$store.commit('closeNewTask');
      }
    },
    addTask(index) {
      if(index !== null) {
        this.$store.commit('cacheUpdateTask', {index});
        this.$store.commit('closeTask', {index});
      } else {
        // this.$store.commit('closeNewTask');
        this.$store.commit('addTask');
        this.$store.commit('cacheAddTask');
        this.$store.commit('clearNewTask');
        this.$store.commit('increaseID');
      }
    },
    editTask(index, event) {
      let mutation = (index === null) ? 'updateNewTask' : 'updateTask';
      let typeList = {
        done: 'checked',
        title: 'value',
        important: 'checked',
        date: 'value',
        time: 'value',
        file: 'value',
        comment: 'value'
      };
      for(let name in typeList) {
        if(event.target.name === name) {
          let payload ={};
          payload[name] = event.target[typeList[name]];
          if(mutation === 'updateTask') {
            payload.index = index;
          }
          this.$store.commit(mutation, payload);
        }
      }
      if(mutation === 'updateNewTask') {
        let payload = {};
        payload.id = this.currentTaskID;
        this.$store.commit(mutation, payload);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  margin-bottom: 1rem;
  .collapsed {
    display: none;
  }
}
section {
  background: $light-gray;
}
.abstract {
  width: 100%;
  padding: 24px 32px;
  border-radius: 5px 5px 0 0;
  position: relative;
  border-bottom: 2px solid $mid-gray;
}

.important {
  background: $light-orange;
}

.bottom-radius {
  border-radius: 5px;
}

label.done {
  display: inline-block;
  position: relative;
  width: 24px;
  height: 24px;
  vertical-align: text-bottom;
  cursor: pointer;
  input[name=done] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    &~.checkmark {
      position: absolute;
      top: 0;
      left: 0;
      width: 24px;
      height: 24px;
      background: $white;
      border-radius: 2px;
    }
    &:checked~.checkmark {
      background: $light-blue;
      color: $white;
      &:after {
        content: '✓';
        font-size: $title-size;
      }
    }
  }
}

label.toggle-important {
  display: inline-block;
  position: relative;
  width: 24px;
  height: 24px;
  vertical-align: text-bottom;
  input[name=important] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  span {
    font-size: $title-size;
  }
  .unstar {
    color: $black;
  }
  .starred {
    color: $orange;
  }
}

input[name=title] {
  width: 70%;
  margin-left: 10px;
  border: none;
  background: none;
  font-size: $title-size;
  font-weight: $title-weight;
}

.is-edit {
  display: inline;
  line-height: 22px;
  vertical-align: text-bottom;
  font-size: $title-size;
  padding-left: 5%;
}

.edit {
  color: $light-blue;
}

.unedit {
  color: $black;
}

.indent-area {
  padding: 24px 100px;
  border-radius: 0 0 5px 5px;
  h2 {
    position: relative;
    font-weight: $title-weight;
    font-size: $subtitle-size;
    .icon {
      position: absolute;
      left: -30px;
    } 
  }
}

.status-bar {
  margin-top: 10px;
  padding-left: 40px;
  .icon {
    margin-right: 10px;
    color: $dark-gray;
  }
}

input[type=date] {
  height: 35px;
  font-family: 'sans-serif';
  vertical-align: text-bottom;
  &:before {
    content: attr(data-placeholder);
    width: 100%;
    color: $mid-gray;
    padding-left: 20px;
  }
  &:valid:before, &:focus:before {
    display: none;
  }
}

input[type=time] {
  height: 35px;
  font-family: 'sans-serif';
  vertical-align: text-bottom;
  &:before {
    content: attr(data-placeholder);
    width: 100%;
    color: $mid-gray;
    padding-left: 20px;
  }
  &:valid:before {
    display: none;
  }
  &:focus:before {
    display: none;
  }
}

label.file {
  display: inline-block;
  position: relative;
  width: 36px;
  height: 36px;
  vertical-align: text-bottom;
  input[name=file] {
    position: absolute;
    width: 36px;
    height: 36px;
    opacity: 0;
    cursor: pointer;
  }
  span {
    font-size: 36px;
    &:hover {
      color: $light-blue;
    }
  }
}

textarea {
  padding: 10px;
  width: 100%;
  resize: none;
  border-radius: 2px;
  border: none;
  &::placeholder {
    color: $mid-gray;
  }
}

.handle-form {
  width: 100%;
  display: flex;
  button {
    border: none;
    flex-grow: 1;
    height: 60px;
    font-size: $title-size;
    &.cancel {
      background: $white;
      color: $red;
      border-bottom-left-radius: 5px;
    }
    &.submit {
      color: $white;
      background: $light-blue;
      border-bottom-right-radius: 5px;
      &:hover {
        background: #3982d7;
      }
    }
    .icon {
      margin-right: 20px;
    }
  }
}

</style>