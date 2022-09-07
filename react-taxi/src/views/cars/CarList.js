import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import CarItem from './CarItem';

const CarList = ({ taxiList = [] }) => {

  return (
    <ListGroup>
      {taxiList.map((taxi) => <CarItem key={taxi.id} taxiItem={taxi} />)}
    </ListGroup>
  );
};
export default CarList;
