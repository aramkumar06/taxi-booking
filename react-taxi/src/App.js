import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useDispatch } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import MapPage from './views/MapPage';
import RideList from './views/RideList';
import { SOCKET_RESPONSE } from './store/socket.reducer';
import { fetchRideList } from './store/rides.action';

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const ws = React.useRef(null);

  const getRideList = () => {
    dispatch(fetchRideList());
  }

  React.useEffect(() => {
    const socket = new W3CWebSocket('ws://localhost:5000');
    getRideList();
    socket.onopen = () => {
      console.log("opened");
    };

    socket.onclose = () => {
      console.log("closed");
    };

    socket.onmessage = (event) => {
      console.log("got message", event.data);
      getRideList();
    };
    dispatch({ type: SOCKET_RESPONSE, payload: socket });

    return () => {
      socket.close();
      dispatch({ type: SOCKET_RESPONSE, payload: null })
    };
  }, []);
  const onSelectChange = (selectedKey) => {
    history.push(selectedKey);
  };
  return (
    <div>
      {/* <Nav
        defaultActiveKey="/"
        activeKey="/"
        onSelect={(selectedKey) => onSelectChange(selectedKey)}
        as="ul"
      >
        <Nav.Item as="li">
          <Nav.Link eventKey="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="/rides">Rides</Nav.Link>
        </Nav.Item>
      </Nav> */}
      <Switch>
        <Route exact path="/" component={MapPage} />
        {/* <Route path="/rides" component={RideList} /> */}
      </Switch>
    </div>
  );
};
export default App;
