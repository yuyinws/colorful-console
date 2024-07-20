<script setup lang="ts">
defineProps<{
  type: 'backgroundColor' | 'textColor'
}>()
</script>

<template>
  <UCard :ui="cardUi">
    <template #header>
      <slot name="header" />
    </template>
    <UTooltip
      v-for="color in colors"
      :key="color.name"
      :text="color.name"
    >
      <UButton
        color="white"
        square
        :ui="{
          color: {
            white: {
              solid: 'ring-0 bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800',
              ghost: 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
            },
          },
        }"
        :variant="styleState[type] === color.name ? 'solid' : 'ghost'"
        @click="styleState[type] = color.name"
      >
        <span class="inline-block w-5 h-5 rounded-full" :style="{ backgroundColor: color.hex }" />
      </UButton>
    </UTooltip>

    <template #footer>
      <div class="flex items-center gap-2">
        <div class="text-gray-500">
          Bright
        </div>
        <UToggle v-model="styleState[type === 'backgroundColor' ? 'textBright' : 'bgBright']" />
      </div>
    </template>
  </UCard>
</template>
