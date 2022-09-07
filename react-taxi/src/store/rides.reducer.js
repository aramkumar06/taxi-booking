import { RIDE_LIST, BOOK_TAXI, UNBOOK_TAXI } from './rides.action';

export const rides = (state = [], action) => {
  switch (action.type) {
    case RIDE_LIST:
      return action.payload;
    default:
      return state;
  }
}