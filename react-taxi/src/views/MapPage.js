import React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import CarList from './cars/CarList';

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function MapComponent({ center, zoom, taxiList }) {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();
  const [markerList, setMarkerList] = React.useState([]);

  const userImage = {
    url: 'https://img.icons8.com/external-flat-icons-inmotus-design/32/000000/external-Pin-map-navigation-elements-flat-icons-inmotus-design-2.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32),
  };
  const carImage = {
    url: 'https://img.icons8.com/color/32/000000/car--v1.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32),
  };

  const shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly',
  };

  React.useEffect(() => {
    if (ref.current && !map) {
      let googleMap;
      googleMap = new google.maps.Map(ref.current, {
        center,
        zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      setMap(googleMap);
    }

    // remove map from window
    // return () => {
    //   if (map) {
    //     console.log(map);
    //   }
    // };
  }, [ref, map]);

  React.useEffect(() => {
    if (map && Array.isArray(taxiList) && taxiList.length > 0) {
      const userMarker = new google.maps.Marker({
        position: center,
        map,
        icon: userImage,
        shape: shape,
        zIndex: taxiList.length + 1,
      });
      const availableList = taxiList.filter((taxi) => taxi.available);
      markerList.forEach((removeMarker) => {
        removeMarker['marker'].setMap(null);
      })
      const taxiMarkers = availableList.map((taxi, index) => {
        return {
          taxiId: taxi.id,
          marker: new google.maps.Marker({
            position: { lat: taxi.lat, lng: taxi.lng },
            map,
            icon: carImage,
            shape: shape,
            zIndex: index + 1,
          }),
        };
      });
      const localList = [{ userId: 1, marker: userMarker }, ...taxiMarkers];
      if (
        !_.isEqual(
          localList.map((localData) => localData.taxiId || localData.userId),
          markerList.map((localData) => localData.taxiId || localData.userId)
        )
      ) {
        setMarkerList([...localList]);
      }

    }
  }, [taxiList, map]);

  return <div className="map-component" ref={ref} id="map" />;
}

const MapPage = () => {
  const { rides = [] } = useSelector((state) => state);

  const user = {
    id: 1,
    name: 'Ram',
    lat: 9.3943079,
    lng: 77.4907737,
  };
  const center = { lat: user.lat, lng: user.lng };
  const zoom = 15;
  return (
    <div className="row">
      <div className="col-md-6 col-sm-12 py-2 map-container">
        <Wrapper
          apiKey="AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg"
          render={render}
        >
          <MapComponent center={center} zoom={zoom} taxiList={rides} />
        </Wrapper>
      </div>
      <div className="col-md-6 col-sm-12 py-2">
        <CarList taxiList={rides} />
      </div>
    </div>
  );
};
export default MapPage;
