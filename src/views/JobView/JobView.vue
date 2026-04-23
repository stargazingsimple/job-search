<script>
export default {
  name: 'JobView',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <div>Job Page {{ id }}</div>
</template>
