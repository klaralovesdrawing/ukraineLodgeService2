import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import LodgeList from "./components/lodge-list.component";
import AddLodge from "./components/add-lodge.component";
import Lodge from "./components/ldoge.component";

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
              <Link to={"/add"} className="nav-link">
                Unterkunft anlegen
               </Link>
              </li>
                    <li className="nav-item">
                        <Link to={"/tutorials"} className="nav-link">
                            tutorials
                        </Link>
                    </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
           <Route exact path={["/", "/lodges"]} component={LodgeList} />
            <Route exact path="/add" component={AddLodge} />
            <Route path="/lodges/:id" component={Lodge} />
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/tutorials/:id" component={Tutorial} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
