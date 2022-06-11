import React, { Component } from "react";
import LodgeDataService from "../services/lodge.service";

export default class Lodge extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
     this.onChangeNrOfBeds = this.onChangeNrOfBeds.bind(this);
      this.onChangeNrOfPersons = this.onChangeNrOfPersons.bind(this);
     this.onChangeFreeBeds = this.onChangeFreeBeds.bind(this);
      this.onChangeType = this.onChangeType.bind(this);
      this.onChangeRegion = this.onChangeRegion.bind(this);
    this.getLodge = this.getLodge.bind(this);
    //this.updatePublished = this.updatePublished.bind(this);
    this.updateLodge = this.updateLodge.bind(this);
    this.deleteLodge= this.deleteLodge.bind(this);

    this.state = {
      currentLodge: {
        id: null,
        name: "",
        nrOfBeds: null,
        nrOfPersons: null,
        freeBeds: 0,
        type: "",
        region: ""

      },
      message: ""
    };
  }

  componentDidMount() {
    this.getLodge(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentLodge: {
          ...prevState.currentLodge,
          name: name
        }
      };
    });
  }

  onChangeNrOfBeds(e) {
    const nrOfBeds = e.target.value;
    
    this.setState(prevState => ({
      currentLodge: {
        ...prevState.currentLodge,
        nrOfBeds: nrOfBeds
      }
    }));
    }


    onChangeNrOfPersons(e) {
        const nrOfPersons = e.target.value;

        this.setState(prevState => ({
            currentLodge: {
                ...prevState.currentLodge,
                nrOfPersons: nrOfPersons
            }
        }));
    }

    onChangeFreeBeds(e) {
        const FreeBeds = e.target.value;

        this.setState(prevState => ({
            currentLodge: {
                ...prevState.currentLodge,
                FreeBeds: FreeBeds
            }
        }));
    }

    onChangeType(e) {
        const type = e.target.value;

        this.setState(prevState => ({
            currentLodge: {
                ...prevState.currentLodge,
                type: type
            }
        }));
    }


    onChangeRegion(e) {
        const region = e.target.value;

        this.setState(prevState => ({
            currentLodge: {
                ...prevState.currentLodge,
               region: region
            }
        }));
    }

  getLodge(id) {
    LodgeDataService.get(id)
      .then(response => {
        this.setState({
          currentLodge: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateLodge() {
    LodgeDataService.update(
      this.state.currentLodge.id,
      this.state.currentLodge
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The lodge was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteLodge() {    
    LodgeDataService.delete(this.state.currentLodge.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/lodges')
      })
      .catch(e => {
        console.log(e);
      });
  }

    render() {
        const { currentLodge } = this.state;

        return (
            <div>
                {currentLodge ? (
                    <div className="edit-form">
                        <h4>Unterkunft</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentLodge.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nrOfBeds">nrOfBeds</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="nrOfBeds"
                                    value={currentLodge.nrOfBeds}
                                    onChange={this.onChangeNrOfBeds}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="nrOfPersons">zugewiesene Personen</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="nrOfPersons"
                                    value={currentLodge.nrOfPersons}
                                    onChange={this.onChangeNrOfPersons}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="FreeBeds">Freie Betten</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="FreeBeds"
                                    value={currentLodge.freeBeds}
                                    onChange={this.onChangeFreeBeds}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Type">Art der Unterkunft</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="type"
                                    value={currentLodge.type}
                                    onChange={this.onChangeType}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Region">Region</label>
                                <select id="region"
                                    className="form-control"
                                    value={currentLodge.region}
                                    onChange={this.onChangeRegion}
                                  >
                                    <option value="Wien">Wien</option>
                                    <option value="Niederösterreich">Niederösterreich</option>
                                    <option value="Burgenland">Burgenland</option>
                                    <option value="Oberösterreich">Oberösterreich</option>
                                    <option value="Salzburg">Salzburg</option>
                                    <option value="Steiermark">Steiermark</option>
                                    <option value="Kärten">Kärnten</option>
                                    <option value="Tirol">Tirol</option>
                                    <option value="Vorarlberg">Vorarlberg</option>
                                </select>
                            </div>
                        </form>
                                                              
                        <button
                            className="badge badge-danger mr-2"
                            onClick={() => {if (window.confirm("Sollen die Daten gelöscht werden"))  this.deleteLodge()}}
                        >
                            L&ouml;schen
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateLodge}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Lodge...</p>
                    </div>
                )}
            </div>
        );
    }
}
