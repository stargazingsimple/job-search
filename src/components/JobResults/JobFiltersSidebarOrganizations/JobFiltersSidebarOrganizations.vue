<script>
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion/CollapsibleAccordion.vue'

export default {
  name: 'JobFiltersSidebarOrganizations',
  components: { CollapsibleAccordion },
}
</script>

<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="h-8 w-1/2">
            <input id="vue" type="checkbox" class="mr-3" />
            <label for="vue">Vue</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
