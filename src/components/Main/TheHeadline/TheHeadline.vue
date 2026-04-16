<script>
export default {
  name: 'TheHeadline',
  data() {
    return {
      action: 'Build',
      interval: null,
    }
  },
  computed: {
    actionClass() {
      return this.action.toLowerCase()
    },
  },
  created() {
    this.changeTitle()
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ['Build', 'Create', 'Design', 'Code']
        const currentActionIdx = actions.indexOf(this.action)
        const nextActionIdx = (currentActionIdx + 1) % actions.length

        this.action = actions[nextActionIdx]
      }, 3000)
    },
  },
}
</script>

<template>
  <section>
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClass">{{ action }}</span>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Careers</h2>
  </section>
</template>

<style scoped>
.build {
  color: #1a73e8;
}

.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>
