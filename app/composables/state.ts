import type { WebContainer } from '@webcontainer/api'
import type { Terminal } from '@xterm/xterm'

export const webcontainerState = useState<WebContainer | undefined>('webcontainer', () => shallowRef())
export const terminalState = useState<Terminal | undefined>('terminal', () => shallowRef())
export const webcontainerInputState = useState<WritableStreamDefaultWriter<string> | undefined>('webcontainerInput', () => undefined)

interface StyleState {
  content: string
  textColor: string
  backgroundColor: string
  textBright: boolean
  bgBright: boolean
  padding: number
  rounded: number
  bold: boolean
  italic: boolean
  underline: boolean
  strikethrough: boolean
}

const defaultStyle: StyleState = {
  content: 'Colorful Console',
  textColor: 'Cyan',
  textBright: false,
  backgroundColor: 'Transparent',
  bgBright: false,
  padding: 0,
  rounded: 0,
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
}

export const styleState = useLocalStorage('style-storage', { ...defaultStyle })

export function resetStyle() {
  styleState.value = { ...defaultStyle }
}

export function randomStyle() {
  styleState.value = {
    content: styleState.value.content,
    textColor: colors[Math.floor(Math.random() * colors.length)].name,
    textBright: Math.random() < 0.5,
    backgroundColor: colors[Math.floor(Math.random() * colors.length)].name,
    bgBright: Math.random() < 0.5,
    padding: Math.floor(Math.random() * 10),
    rounded: Math.floor(Math.random() * 10),
    bold: Math.random() < 0.5,
    italic: Math.random() < 0.5,
    underline: Math.random() < 0.5,
    strikethrough: Math.random() < 0.5,
  }
}

function findColor(name: string) {
  return colors.find(color => color.name === name)
}

function formatAnsiCode(ansiCodes: string[]) {
  let str = `${styleState.value.content}`

  ansiCodes.forEach((code) => {
    const [start, end] = code.split(',')
    str = start + str + end
  })

  return `console.log('${str}')`
}

export const code = computed(() => {
  const { textColor, backgroundColor, textBright, bgBright, bold: _bold, italic: _italic, underline: _underline, strikethrough: _strikethrough } = styleState.value
  const findTextColor = findColor(textColor)
  const findBackgroundColor = findColor(backgroundColor)

  let browerStyle = `color: ${findTextColor?.hex}${styleState.value.rounded ? `;border-radius: ${styleState.value.rounded}px` : ''}${styleState.value.padding ? `;padding: ${styleState.value.padding}px` : ''}`
  if (backgroundColor !== 'Transparent') {
    browerStyle += `;background-color: ${findBackgroundColor?.hex}`
  }

  const ansiCodes: string[] = []

  if (textBright) {
    ansiCodes.push(findTextColor!.brightAnsi)
  }
  else {
    ansiCodes.push(findTextColor!.ansi)
  }

  if (backgroundColor !== 'Transparent') {
    if (bgBright) {
      ansiCodes.push(findBackgroundColor!.bgBrightAnsi)
    }
    else {
      ansiCodes.push(findBackgroundColor!.bgAnsi)
    }
  }

  if (_bold) {
    ansiCodes.push(bold)
    browerStyle += ';font-weight: bold'
  }

  if (_italic) {
    ansiCodes.push(italic)
    browerStyle += ';font-style: italic'
  }

  if (_underline) {
    ansiCodes.push(underline)
    browerStyle += ';text-decoration: underline'
  }

  if (_strikethrough) {
    ansiCodes.push(strikethrough)
    browerStyle += ';text-decoration: line-through'
  }

  const terminalConsoleCode = formatAnsiCode(ansiCodes)

  const browerConsoleCode = `console.log('%c${styleState.value.content}', '${browerStyle}')`

  return {
    browerConsoleCode,
    terminalConsoleCode,
  }
})
