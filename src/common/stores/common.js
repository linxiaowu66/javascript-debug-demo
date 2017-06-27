import { extendObservable } from 'mobx'

/**
 * @class Common
 */
export default class CommonStore {

  constructor(state = {}) {
    extendObservable(this, {
      title: '加载中...',
    }, state)
  }

  setTitle(newTitle) {
    this.title = newTitle
  }
}

// const commonStore = new CommonStore()
