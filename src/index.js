export default (emitter, successEvents = [], errorEvents = []) => (
  new Promise((resolve, reject) => {
    const removeFns = []
    const removeListeners = (evName, fn) => {
      const listener = (...args) => {
        removeFns.forEach((removeFn) => removeFn())
        fn(...args)
      }
      removeFns.push(() => emitter.removeListener(evName, listener))
      return listener
    }
    successEvents.forEach((evName) => {
      emitter.on(evName, removeListeners(evName, resolve))
    })
    errorEvents.forEach((evName) => {
      emitter.on(evName, removeListeners(evName, reject))
    })
  })
)
