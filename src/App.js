import React, { Component } from "react";
// import Home from "./components/Home/Home";
// import Form from "./components/form/Form";
import Navbar from "./container/navbar/Navbar";
// import { Route, Switch } from "react-router-dom";
// import Sign_In from "./components/Sign-In/Sign-In";
// import Sign_Up from "./components/Sign-Up/Sign-Up";
// import PickUp from "./components/form/PickUp";
// import Delivery from "./components/form/Delivery";
import Users from "./FakeData/Users/Users";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Users />
        {/* <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sign-in" component={Sign_In} />
          <Route exact path="/sign-up" component={Sign_Up} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/form/delivery" component={Delivery} />
          <Route exact path="/form/pick-up" component={PickUp} />
        </Switch> */}
      </>
    );
  }
}

export default App;
