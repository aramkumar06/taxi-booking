import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api';
export const RIDE_LIST = 'RIDE_LIST';
export const BOOK_TAXI = 'BOOK_TAXI';
export const UNBOOK_TAXI = 'BOOK_TAXI';

export const fetchRideList = () => async (dispatch) => {
  try {
    const response = await axios.get('/rides');
    dispatch({ type: RIDE_LIST, payload: response.data })
  } catch (e) {
    console.log(e.message)
  }
}

export const bookRide = (carId = '') => async (dispatch) => {
  try {
    await axios.put('/book/' + carId);
  } catch (e) {
    console.log(e.message)
  }
}

export const unbookRide = (carId = '') => async (dispatch) => {
  try {
    await axios.put('/unbook/' + carId);
  } catch (e) {
    console.log(e.message)
  }
}