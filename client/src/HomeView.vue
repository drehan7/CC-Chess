<script>
export default {
  methods: {
    goToPlay() {
      this.$router.push('/play')
    },
  },
}
</script>

<template>
  <h2>HomeView</h2>
  <button @click="goToPlay">Play CC Chess!</button>
</template>
