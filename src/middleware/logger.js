const logger = store => next => action => {
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        console.group(action.type)
        console.info('dispatching', action)
    }
    let result = next(action)
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        console.log('next state', store.getState())
        console.groupEnd()
    }
    return result
}
  
export default logger