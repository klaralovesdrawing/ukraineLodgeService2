import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import LodgeList from "./components/lodge-list.component";
import AddLodge from "./components/add-lodge.component";
import Lodge from "./components/lodge.component";
import Person from "./components/person.component";
import AddPerson from "./components/add-person.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/lodges"} className="navbar-brand">
            UkraineLodgeService
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/lodges"} className="nav-link">
                Unterkuenfte
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addLodge"} className="nav-link">
                Unterkunft anlegen
               </Link>
             </li>
             <li className="nav-item">
              <Link to={"/addPerson"} className="nav-link">
                Person anlegen
               </Link>
              </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
           <Route exact path={["/", "/lodges"]} component={LodgeList} />
            <Route exact path="/addLodge" component={AddLodge} />
            <Route path="/lodges/:id" component={Lodge} />
            <Route path="/lodges/:id" component={Person} />
            <Route exact path="/addPerson" component={AddPerson} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
