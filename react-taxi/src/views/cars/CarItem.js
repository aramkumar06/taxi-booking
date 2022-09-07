import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch } from 'react-redux';
import { bookRide, unbookRide } from '../../store/rides.action';

const CarItem = ({ taxiItem = {} }) => {
    const dispatch = useDispatch();

    const bookCar = (carId) => {
        dispatch(bookRide(carId))
    }
    const unbookCar = (carId) => {
        dispatch(unbookRide(carId))
    }
    return (
        <ListGroup.Item>
            Car Number: {taxiItem.name}
            {taxiItem.available ? <button className="bg-primary bg-opacity-75 text-light taxi-book-button" onClick={() => bookCar(taxiItem.id)}>
                Book
            </button> : <button className="bg-danger bg-opacity-75 text-light taxi-book-button" onClick={() => unbookCar(taxiItem.id)}>
                Cancel
            </button>}
        </ListGroup.Item>
    )
};
export default CarItem;