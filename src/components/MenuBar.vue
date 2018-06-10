<template>
  <ul class="menu-bar">
    <li @click="setActive('all')" :class="{active: isActive('all')}">My Tasks</li>
    <li @click="setActive('ongoing')" :class="{active: isActive('ongoing')}">In Progress</li>
    <li @click="setActive('done')" :class="{active: isActive('done')}">Completed</li>
  </ul>
</template>

<script>
export default {

  name: 'MenuBar',

  data () {
    return {

    }
  },
  methods: {
    setActive(group) {
      this.$store.commit('setActiveGroup', group);
    },
    isActive(group) {
      return group === this.$store.state.activeGroup;
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-bar {
  margin: 0;
  margin-bottom: 1rem;
  padding-left: 0;
  list-style-type: none;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 76px;
  background: $light-blue;
  color: $dark-blue;
  li {
    font-size: $title-size;
    margin: 0px 20px;
    max-width: 180px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
      border-bottom: 5px solid $dark-blue;
      color: $white;
    }
  }
}
</style>