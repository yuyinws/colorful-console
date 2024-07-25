<template>
  <div class="flex gap-10 flex-col lg:flex-row justify-center">
    <div class="flex flex-1 flex-col gap-4 flex-shrink-0">
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

      <UCard :ui="cardUi">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-beaker" class="w-5 h-5" />
            <div class="font-semibold">
              Text Style
            </div>
          </div>
        </template>

        <div class="flex items-center flex-wrap gap-4">
          <div class="flex items-center gap-2 w-[48%]">
            <div class="text-gray-500 font-semibold">
              Bold
            </div>
            <UToggle v-model="styleState.bold" />
          </div>

          <div class="flex items-center gap-2 w-[48%]">
            <div class="text-gray-500 italic">
              Italic
            </div>
            <UToggle v-model="styleState.italic" />
          </div>

          <div class="flex items-center gap-2 w-[48%]">
            <div class="text-gray-500 underline">
              underline
            </div>
            <UToggle v-model="styleState.underline" />
          </div>

          <div class="flex items-center gap-2 w-[48%]">
            <div class="text-gray-500 line-through">
              strikethrough
            </div>
            <UToggle v-model="styleState.strikethrough" />
          </div>
        </div>
      </UCard>

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
            <div class="font-semibold mr-5">
              Box
            </div>
          </div>
        </template>

        <div class="flex items-center gap-2">
          <div class="text-gray-500 w-[10.5rem] text-right">
            Padding ({{ styleState.padding }}px)
          </div>
          <URange v-model="styleState.padding" :max="30" />
        </div>

        <div class="mt-3 flex items-center gap-2">
          <div class="text-gray-500 w-[10.5rem] text-right">
            Rounded ({{ styleState.rounded }}px)
          </div>
          <URange v-model="styleState.rounded" :max="30" />
        </div>

        <template #footer>
          <div class="flex items-center gap-1">
            <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 text-primary" />
            <span class="text-gray-500">Browser Only</span>
          </div>
        </template>
      </UCard>

      <div class="flex justify-center gap-5">
        <UButton
          icon="i-heroicons-x-mark"
          size="sm"
          color="primary"
          variant="solid"
          label="Reset"
          :trailing="false"
          class="mr-5"
          @click="resetStyle"
        />

        <UButton
          icon="i-heroicons-arrow-path"
          size="sm"
          color="primary"
          variant="solid"
          label="Random"
          :trailing="false"
          class="mr-5"
          @click="randomStyle"
        />
      </div>
    </div>
    <div class="w-full lg:w-[40rem] flex flex-col gap-4">
      <Terminal />

      <Browser />
    </div>
  </div>
</template>
