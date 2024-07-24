<script setup lang="ts">
import type { WebContainer } from '#build/components'

async function testConsole() {
  webcontainerInputState.value?.write(`${code.value.terminalConsoleCode}\n`)
}

function cleanConsole() {
  webcontainerInputState.value?.write('console.clear()\n')
}

const webcontainerRef = ref<InstanceType<typeof WebContainer> | undefined>()
</script>

<template>
  <UCard :ui="cardUi">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-command-line" class="w-5 h-5" />
        <div class="font-semibold">
          Terminal Console
        </div>
      </div>
    </template>
    <Shiki :code="code.terminalConsoleCode" />
    <template #footer>
      <div class="flex justify-between">
        <div>
          <UButton
            icon="i-heroicons-clipboard"
            size="sm"
            color="primary"
            variant="solid"
            label="Copy"
            :trailing="false"
            class="mr-5"
            @click="() => {
              handleCopy(code.terminalConsoleCode)
            }"
          />

          <UButton
            icon="i-heroicons-cog"
            size="sm"
            color="primary"
            variant="solid"
            label="Test"
            :trailing="false"
            :disabled="webcontainerRef && webcontainerRef.webcontainerStatus !== 'boot'"
            @click="testConsole"
          />
        </div>

        <UButton
          icon="i-heroicons-trash"
          size="sm"
          color="primary"
          variant="solid"
          label="Clean"
          :trailing="false"
          :disabled="webcontainerRef && webcontainerRef.webcontainerStatus !== 'boot'"
          @click="cleanConsole"
        />
      </div>

      <WebContainer ref="webcontainerRef" />
    </template>
  </UCard>
</template>
