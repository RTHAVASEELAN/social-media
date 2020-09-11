import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux'

import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import UserPost from './Component/UsersPost/UsersPost';
import NavBar from './Component/NavBar/NavBar';
import Home from './Component/Home/Home';
import store from './react-redux/store';
import FrientRequest from './Component/frient-request/frient-request';
import RequestMessages from './Component/RequestMessage/RequestMessage';
import DisplayAllFriends from './Component/displayAllFriends/displayAllFriends'
import Chatting from './Component/chatting/chatting';

function App() {
  return (
    <Provider store={store}>
      <div className="App" >
        <Router>
          <NavBar />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/userPost" component={UserPost} />
            <Route exact path="/frient-request" component={FrientRequest} />
            <Route exact path="/request-message" component={RequestMessages} />
            <Route exact path="/display-all-friends" component={DisplayAllFriends} />
            <Route exact path="/chatting" component={Chatting} />
          </Switch>

        </Router>
      </div>
    </Provider>
  );
}

export default App;
