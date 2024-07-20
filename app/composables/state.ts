import type { WebContainer } from '@webcontainer/api'
import type { Terminal } from '@xterm/xterm'

export const webcontainerState = useState<WebContainer | undefined>('webcontainer', () => shallowRef())
export const terminalState = useState<Terminal | undefined>('terminal', () => shallowRef())
export const webcontainerInputState = useState<WritableStreamDefaultWriter<string> | undefined>('webcontainerInput', () => undefined)

interface StyleState {
  textColor: string
  backgroundColor: string
  textBright: boolean
  bgBright: boolean
  padding: number
  rounded: number
}

export const styleState = useState<StyleState>('style', () => ({
  textColor: 'Cyan',
  textBright: false,
  backgroundColor: 'White',
  bgBright: false,
  padding: 0,
  rounded: 0,
}))

function findColor(name: string) {
  return colors.find(color => color.name === name)
}

export const code = computed(() => {
  const { textColor, backgroundColor, textBright, bgBright } = styleState.value
  const findTextColor = findColor(textColor)
  const findBackgroundColor = findColor(backgroundColor)

  const browerStyle = `color: ${findTextColor?.hex};background-color: ${findBackgroundColor?.hex}${styleState.value.rounded ? `;border-radius: ${styleState.value.rounded}px;` : ''}${styleState.value.padding ? `;padding: ${styleState.value.padding}px;` : ''}`
  const browerConsoleCode = `console.log('%c Colorful Console ', '${browerStyle}')`

  const terminalStyle = `\\x1b[${textBright ? findTextColor?.brightAnsi : findTextColor?.ansi}m\\x1b[${bgBright ? findBackgroundColor?.bgBrightAnsi : findBackgroundColor?.bgAnsi}m`
  const terminalConsoleCode = `console.log('${terminalStyle} Colorful Console \\x1B[49m\\x1B[39m')`

  return {
    browerConsoleCode,
    terminalConsoleCode,
  }
})
