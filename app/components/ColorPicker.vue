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
            <circle cx="10" cy="10" r="9" fill="none" stroke="black" stroke-width="0.4" />
            <line x1="4" y1="4" x2="16" y2="16" stroke="black" stroke-width="0.4" />
            <line x1="16" y1="4" x2="4" y2="16" stroke="black" stroke-width="0.4" />
          </svg>
          <span v-else class="inline-block w-5 h-5 rounded-full" :class="color.name === 'White' ? 'border-[1px] border-gray-300' : ''" :style="{ backgroundColor: color.hex }" />
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
