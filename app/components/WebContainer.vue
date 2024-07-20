<script setup lang="ts">
import { WebContainer } from '@webcontainer/api'
import { Terminal } from '@xterm/xterm'
import '@xterm/xterm/css/xterm.css'
import { FitAddon } from '@xterm/addon-fit'

const terminalEl = ref<HTMLElement | undefined>()
const webcontainerStatus = ref<'init' | 'boot' | 'error'>('init')

defineExpose({
  webcontainerStatus,
})

async function init() {
  try {
    if (!webcontainerState.value && import.meta.client) {
      webcontainerState.value = await WebContainer.boot()
    }

    const fitAddon = new FitAddon()

    terminalState.value = new Terminal({
      convertEol: true,
      cursorStyle: 'bar',
      cursorWidth: 5,
      cursorBlink: true,
      cursorInactiveStyle: 'none',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      theme: {
        background: '#2e3440',
      },
    })
    terminalState.value.loadAddon(fitAddon)
    terminalState.value.open(terminalEl.value!)

    fitAddon.fit()

    const shellProcess = await startShell(terminalState.value)
    webcontainerStatus.value = 'boot'

    window.addEventListener('resize', () => {
      fitAddon.fit()
      shellProcess.resize({
        cols: terminalState.value!.cols,
        rows: terminalState.value!.rows,
      })
    })
  }
  catch (error) {
    console.error(error)
    webcontainerStatus.value = 'error'
  }
}

async function startShell(terminal: Terminal) {
  const shellProcess = await webcontainerState.value!.spawn('node', {
    terminal: {
      cols: terminal.cols,
      rows: terminal.rows,
    },
  })
  shellProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        terminal.write(data)
      },
    }),
  )

  webcontainerInputState.value = shellProcess.input.getWriter()

  const appConfig = useAppConfig()
  if (appConfig.__IS_DEV__) {
    terminal.onData((data) => {
      webcontainerInputState.value!.write(data)
    })
  }

  return shellProcess
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="w-full bg-[#2e3440] border-[#2e3440] rounded-[.5rem] border-[1px] mt-5">
    <div class="bg-[#171717] rounded-[.5rem] flex items-center justify-between">
      <div class="px-5 py-3">
        <div class="flex gap-2">
          <div class="rounded-full h-[.75rem] w-[.75rem] bg-[#ed695e]" />
          <div class="rounded-full h-[.75rem] w-[.75rem] bg-[#f4be4f]" />
          <div class="rounded-full h-[.75rem] w-[.75rem] bg-[#61c454]" />
        </div>
      </div>

      <div v-if="webcontainerStatus === 'init'" class="flex items-center gap-2">
        <UIcon name="line-md:loading-twotone-loop" class="text-[#ffffffbf]" />
        <div class="text-[#ffffffbf] font-medium text-sm">
          Starting up ...
        </div>
      </div>

      <div v-else-if="webcontainerStatus === 'boot'" class="text-[#ffffffbf] text-sm">
        Powered by
        <a href="https://webcontainer.dev" class="font-semibold" target="_blank">
          WebContainer
        </a>
      </div>

      <div v-else-if="webcontainerStatus === 'error'" class="text-[#ffffffbf] text-sm">
        WebContainer startup error
      </div>

      <div class="w-[6rem]" />
    </div>
    <div ref="terminalEl" class="w-full px-4 py-2 h-[15.5rem]" />
  </div>
</template>
