<script setup lang="ts">
function findColor(name: string) {
  return textColors.find(color => color.name === name)
}

const code = computed(() => {
  const { textColor, backgroundColor } = styleState.value
  const findTextColor = findColor(textColor)
  const findBackgroundColor = findColor(backgroundColor)

  const browerConsoleCode = `color: ${findTextColor?.hex};background-color: ${findBackgroundColor?.hex};`
  const terminalConsoleCode = `\\x1b[${findTextColor?.ansi}m\\x1b[${findBackgroundColor?.bgAnsi}m`
  return {
    browerConsoleCode,
    terminalConsoleCode,
  }
})

function test() {
  // eslint-disable-next-line no-console
  console.log('%c Hello World ', code.value.browerConsoleCode)
}

async function test2() {
  await webcontainerState.value?.fs.writeFile('index.js', `console.log('${code.value.terminalConsoleCode} Hello World \\x1B[49m\\x1B[39m')`)

  webcontainerInputState.value?.write(`node index.js\n`)
}
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col gap-4">
      <UCard
        :ui="{
          base: '',
          background: 'bg-white/0 dark:bg-gray-700',
          ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
          rounded: 'rounded-lg',
          shadow: 'shadow',
        }"
      >
        <UTooltip
          v-for="color in textColors"
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
            :variant="styleState.textColor === color.name ? 'solid' : 'ghost'"
            @click="styleState.textColor = color.name"
          >
            <span class="inline-block w-5 h-5 rounded-full" :style="{ backgroundColor: color.hex }" />
          </UButton>
        </UTooltip>
      </UCard>

      <UCard
        :ui="{
          base: '',
          background: 'bg-white/0 dark:bg-gray-700',
          ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
          rounded: 'rounded-lg',
          shadow: 'shadow',
        }"
      >
        <UTooltip
          v-for="color in textColors"
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
            :variant="styleState.backgroundColor === color.name ? 'solid' : 'ghost'"
            @click="styleState.backgroundColor = color.name"
          >
            <span class="inline-block w-5 h-5 rounded-full" :style="{ backgroundColor: color.hex }" />
          </UButton>
        </UTooltip>
      </UCard>

      <UButton @click="test">
        test on browser
      </UButton>

      <UButton @click="test2">
        test on Terminal
      </UButton>
    </div>
    <div>
      <WebContainer />
    </div>
  </div>
</template>
