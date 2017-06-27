import { autorun } from 'mobx'

export default function ({ commonStore }) {
  // Update document title whenever it changes
  autorun(() => {
    if (commonStore.title) {
      document.title = commonStore.title
    }
  })
}
