<template>
  <Transition
    enter-from-class="opacity-0"
    enter-active-class="transition duration-750"
    mode="out-in"
  >
    <slot />
  </Transition>
</template>
