import { extendObservable } from 'mobx'

/**
 * @class Common
 */
export default class CommonStore {

  constructor(_data, state = {}) {
    this._data = _data
    extendObservable(this, {
      title: '加载中...',
    }, state)
  }

  setTitle(newTitle) {
    this.title = newTitle
  }
}

// const commonStore = new CommonStore()
