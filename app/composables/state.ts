import type { WebContainer } from '@webcontainer/api'
import type { Terminal } from '@xterm/xterm'

export const webcontainerState = useState<WebContainer | undefined>('webcontainer', () => shallowRef())
export const terminalState = useState<Terminal | undefined>('terminal', () => shallowRef())
export const webcontainerInputState = useState<WritableStreamDefaultWriter<string> | undefined>('webcontainerInput', () => undefined)

interface StyleState {
  textColor: string
  backgroundColor: string
}

export const styleState = useState<StyleState>('style', () => ({
  textColor: 'Cyan',
  backgroundColor: 'White',
}))
