export default function (state = {
  isConnected: null,
  isWorking: null
}, action) {
  switch (action.type) {
    case 'loginResponse':
      if (action && action.payload && action.payload.isConnected === true) {
        return ({isConnected: true, isWorking: false});
      } else {
        return ({isConnected: false, isWorking: false});
      }
    case 'fetching':
      return ({isConnected: state.isConnected, isWorking: true});
    default:
      return state;
  }
}