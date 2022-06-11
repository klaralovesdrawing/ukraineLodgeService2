import React, { Component } from "react";
import PeopleDataService from "../services/people.service";

export default class Person extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
     this.onChangeAge = this.onChangeAge.bind(this);
      this.onChangeAssignedLodge = this.onChangeAssignedLodge.bind(this);
     
    this.getPerson = this.getPerson.bind(this);
    //this.updatePublished = this.updatePublished.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
    this.deletePerson= this.deletePerson.bind(this);

    this.state = {
      currentPerson: {
        id: null,
        name: "",
        age: null,
        assignedLodge: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPerson(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPerson: {
          ...prevState.currentPerson,
          name: name
        }
      };
    });
  }

  onChangeAge(e) {
    const age = e.target.value;
    
    this.setState(prevState => ({
      currentPerson: {
        ...prevState.currentPerson,
        age: age
      }
    }));
    }

    
    onChangeAssignedLodge(e) {
        const assignedLodge = e.target.value;

        this.setState(prevState => ({
            currentAssignedLodge: {
                ...prevState.currentAssignedLodge,
                assignedLodge: assignedLodge
            }
        }));
    }

  getPerson(id) {
    PeopleDataService.get(id)
      .then(response => {
        this.setState({
          currentPerson: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePerson() {
    PeopleDataService.update(
      this.state.currentPerson.id,
      this.state.currentPerson
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The person was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePerson() {    
    PeopleDataService.delete(this.state.currentPerson.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/people')
      })
      .catch(e => {
        console.log(e);
      });
  }

    render() {
        const { currentPerson } = this.state;

        return (
            <div>
                {currentPerson ? (
                    <div className="edit-form">
                        <h4>Person</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentPerson.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Alter</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="age"
                                    value={currentPerson.age}
                                    onChange={this.onChangeAge}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="assignedLodge">Zugewiesene Unterkunft</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="assignedLodge"
                                    value={currentPerson.assignedLodge}
                                    onChange={this.onChangeAssignedLodge}
                                />
                            </div>
                        </form>                                          
                                                
                        <button
                            className="badge badge-danger mr-2"
                            onClick={() => {if (window.confirm("Sollen die Daten gelöscht werden"))  this.deletePerson()}}
                        >
                            L&ouml;schen
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updatePerson}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Person...</p>
                    </div>
                )}
            </div>
        );
    }
}
