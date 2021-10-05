import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';

import Home from './pages/Landingpage/Home';
import Login from './pages/Landingpage/Login';
import SignUp from "./pages/Landingpage/SignUp";


function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path={["/", "home"]} component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
