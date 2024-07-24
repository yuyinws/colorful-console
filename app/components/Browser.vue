<script setup lang="ts">
function testConole() {
  // eslint-disable-next-line no-eval
  eval(code.value.browerConsoleCode)
}
</script>

<template>
  <UCard :ui="cardUi" class="overflow-auto">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-ant-design:chrome-outlined" class="w-5 h-5" />
        <div class="font-semibold">
          Browser Console
        </div>
      </div>
    </template>
    <Shiki :code="code.browerConsoleCode" />
    <template #footer>
      <div class="flex gap-5 flex-col sm:flex-row">
        <div class="flex gap-5">
          <UButton
            icon="i-heroicons-clipboard"
            size="sm"
            color="primary"
            variant="solid"
            label="Copy"
            :trailing="false"
            @click="() => {
              handleCopy(code.browerConsoleCode)
            }"
          />
          <UButton
            icon="i-heroicons-cog"
            size="sm"
            color="primary"
            variant="solid"
            label="Test"
            :trailing="false"
            @click="testConole"
          />
        </div>

        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 text-primary" />
          <span class="text-gray-500">Please open browser console panel first.</span>
        </div>
      </div>
    </template>
  </UCard>
</template>

<style scoped>
pre {
  overflow: auto;
}
</style>
