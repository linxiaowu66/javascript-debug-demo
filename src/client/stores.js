import CommonStore from '../common/stores/common'

// All our actions are listed here
export const stores = (state = {}) => ({
  commonStore: new CommonStore(state)
})

// Initialize actions and state
export default stores({})
