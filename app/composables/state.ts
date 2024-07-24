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
  bold: boolean
  italic: boolean
  underline: boolean
  strikethrough: boolean
}

export const styleState = useState<StyleState>('style', () => ({
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
}))

function findColor(name: string) {
  return colors.find(color => color.name === name)
}

function formatAnsiCode(ansiCodes: string[]) {
  let str = ' Colorful Console '

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

  const browerConsoleCode = `console.log('%c Colorful Console ', '${browerStyle}')`

  // const terminalConsoleCode = `console.log('${terminalStyle} Colorful Console \\x1B[49m${backgroundColor === 'Transparent' ? '' : '\\x1B[39m'}')`

  return {
    browerConsoleCode,
    terminalConsoleCode,
  }
})
