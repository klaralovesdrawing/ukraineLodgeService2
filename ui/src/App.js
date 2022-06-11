import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import LodgeList from "./components/lodge-list.component";
import AddLodge from "./components/add-lodge.component";
import Lodge from "./components/lodge.component";
import Person from "./components/person.component";
import AddPerson from "./components/add-person.component";
import PersonList from "./components/person-list.componten";

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
                Unterk&uuml;nfte
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addLodge"} className="nav-link">
                Unterkunft anlegen
               </Link>
             </li>
             <li className="nav-item">
              <Link to={"/person"} className="nav-link">
                Personen
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
            <Route path="/person/:id" component={Person} />
            <Route exact path="/addPerson" component={AddPerson} />
            <Route exact path="/person" component={PersonList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
