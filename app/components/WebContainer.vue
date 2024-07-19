<script setup lang="ts">
import { WebContainer } from '@webcontainer/api'
import { Terminal } from '@xterm/xterm'
import '@xterm/xterm/css/xterm.css'
import { FitAddon } from '@xterm/addon-fit'

const terminalEl = ref<HTMLElement | undefined>()

async function init() {
  if (!webcontainerState.value && import.meta.client) {
    webcontainerState.value = await WebContainer.boot()
    webcontainerState.value.mount(files)
  }

  const fitAddon = new FitAddon()

  terminalState.value = new Terminal({
    convertEol: true,
  })
  terminalState.value.loadAddon(fitAddon)
  terminalState.value.open(terminalEl.value!)

  fitAddon.fit()

  const shellProcess = await startShell(terminalState.value)
  window.addEventListener('resize', () => {
    fitAddon.fit()
    shellProcess.resize({
      cols: terminalState.value!.cols,
      rows: terminalState.value!.rows,
    })
  })
}

async function startShell(terminal: Terminal) {
  const shellProcess = await webcontainerState.value!.spawn('jsh', {
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

  // terminal.onData((data) => {
  //   webcontainerInputState.value!.write(data)
  // })

  return shellProcess
}

onMounted(() => {
  init()
})
</script>

<template>
  <div ref="terminalEl" class="w-[20rem]" />
</template>
