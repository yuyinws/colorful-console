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
    <template
      v-for="color in colors"
      :key="color.name"
    >
      <UTooltip
        v-if="color.name !== 'Transparent' || (color.name === 'Transparent' && type === 'backgroundColor')"
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
          <svg v-if="color.name === 'Transparent'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <rect x="2" y="2" width="16" height="16" fill="none" stroke="black" stroke-width="0.4" />
            <line x1="2" y1="2" x2="18" y2="18" stroke="black" stroke-width="0.4" />
            <line x1="18" y1="2" x2="2" y2="18" stroke="black" stroke-width="0.4" />
          </svg>
          <span v-else class="inline-block w-5 h-5 rounded-full" :style="{ backgroundColor: color.hex }" />
        </UButton>
      </UTooltip>
    </template>

    <template #footer>
      <div class="flex justify-between">
        <div class="flex items-center gap-2">
          <div class="text-gray-500">
            Bright
          </div>
          <UToggle v-model="styleState[type === 'backgroundColor' ? 'textBright' : 'bgBright']" />
        </div>
      </div>
    </template>
  </UCard>
</template>
