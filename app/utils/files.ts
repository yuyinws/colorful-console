import type { FileSystemTree } from '@webcontainer/api'

export const files: FileSystemTree = {
  'index.js': {
    file: {
      contents: `console.log('\x1B[30m\x1B[106m Client Log \x1B[49m\x1B[39m')`,
    },
  },
}
