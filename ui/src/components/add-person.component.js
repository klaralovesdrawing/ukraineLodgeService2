import React, { Component } from "react";
import PeopleDataService from "../services/people.service";

export default class AddPerson extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeAssignedLodge = this.onChangeAssignedLodge.bind(this);
    this.savePerson = this.savePerson.bind(this);
    this.newPerson = this.newPerson.bind(this);

    this.state = {
      id: null,
      name: "",
      assignedLodge: "",
      age: null,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  
  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }

  onChangeAssignedLodge(e) {
    this.setState({
      assignedLodge: e.target.value
    });
   }

  savePerson() {
    var data = {
      name: this.state.name,
      age: this.state.age,
      assignedLodge: this.state.assignedLodge
    };

    PeopleDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          age: response.data.age,
          assignedLodge: response.data.assignedLodge,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
          console.log(e);

      });
  }

  newPerson() {
    this.setState({
      id: null,
      name: "",
      age: null,
      assignedLodge: ""
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Die Person wurde erfolgreich übermittelt!</h4>
            <form method="get" action="/">
              <button className= "btn btn-success" type="submit">Zurück zur Übersicht</button>
            </form>
          </div>
        ) : (
          <div> 
            <div className="form-group">
              <label htmlFor="name">Name der Person</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Alter</label>
              <input
                type="number"
                className="form-control"
                id="age"
                required
                value={this.state.age}
                onChange={this.onChangeAge}
                name="age"
              />
            </div>

            <div className="form-group">
              <label htmlFor="assignedLodge">Zugewiesene Unterkunft</label>
              <input
                type="text"
                className="form-control"
                id="assignedLodge"
                required
                value={this.state.assignedLodge}
                onChange={this.onChangeAssignedLodge}
                name="assignedLodge"
              />
            </div>

            <button onClick={this.savePerson} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}