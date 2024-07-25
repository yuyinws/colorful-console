<script setup lang="ts">
import { codeToHtml } from 'shiki'

const props = defineProps<{
  code: string
}>()

const renderedCode = ref('')

watchEffect(async () => {
  renderedCode.value = await codeToHtml(props.code, {
    lang: 'javascript',
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  })
})
</script>

<template>
  <div v-html="renderedCode" />
</template>

<style>
html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: #171717 !important;
  /* Optional, if you also want font styles */
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}

pre.shiki {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
