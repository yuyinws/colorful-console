export function handleCopy(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    useToast().add({
      title: 'Copied to clipboard',
    })
  })
}
