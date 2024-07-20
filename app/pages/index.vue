<template>
  <div class="flex gap-10 flex-col lg:flex-row justify-center">
    <div class="flex flex-col gap-4 flex-shrink-0">
      <ColorPicker type="textColor">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-fluent:color-32-light" class="w-5 h-5" />
            <div class="font-semibold">
              Text Color
            </div>
          </div>
        </template>
      </ColorPicker>

      <ColorPicker type="backgroundColor">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-ion:color-fill-outline" class="w-5 h-5" />
            <div class="font-semibold">
              Background Color
            </div>
          </div>
        </template>
      </ColorPicker>

      <UCard :ui="cardUi">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-arrows-pointing-out" class="w-5 h-5" />
            <div class="font-semibold">
              Padding ({{ styleState.padding }}px)
            </div>
          </div>
        </template>

        <URange v-model="styleState.padding" :max="30" />

        <template #footer>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 text-primary" />
            <span class="text-gray-400">Browser Only.</span>
          </div>
        </template>
      </UCard>

      <UCard :ui="cardUi">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-stop-circle" class="w-5 h-5" />
            <div class="font-semibold">
              Rounded ({{ styleState.rounded }}px)
            </div>
          </div>
        </template>

        <URange v-model="styleState.rounded" :max="30" />

        <template #footer>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 text-primary" />
            <span class="text-gray-400">Browser Only.</span>
          </div>
        </template>
      </UCard>
    </div>
    <div class="flex-1 max-w-3xl flex flex-col gap-4">
      <Terminal />

      <Browser />
    </div>
  </div>
</template>
