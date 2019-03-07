import React, { Component } from "react";
import store from "./store/store";
import { Provider } from "react-redux";
import Employee from "./component/Employee";
import Header from "./component/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// import {
//   faBeer,
//   faCoffee,
//   faWineGlassAlt,
//   faStroopwafel,
//   faAppleAlt,
//   faCookie
// } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Employee />
        </div>
      </Provider>
    );
  }
}

export default App;
