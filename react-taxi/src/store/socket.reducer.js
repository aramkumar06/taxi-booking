export const SOCKET_RESPONSE = 'SOCKET_RESPONSE';

export const socket = (state = null, action) => {
  switch (action.type) {
    case SOCKET_RESPONSE:
      return action.payload;
    default:
      return state;
  }
}