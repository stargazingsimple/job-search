<script>
export default {
  name: 'CollapsibleAccordion',
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    caretIcon() {
      return this.isOpen ? 'angle-up' : 'angle-down'
    },
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<template>
  <div class="border-brand-gray-2 border-b border-solid py-5">
    <div
      class="flex cursor-pointer flex-wrap items-center justify-between"
      data-test="header"
      @click="toggleOpen"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <fa-icon :icon="caretIcon" />
    </div>
    <div v-if="isOpen" class="mt-5 w-full">
      <slot>
        <h3>Whoops, somebody forgot to populate me!</h3>
      </slot>
    </div>
  </div>
</template>
