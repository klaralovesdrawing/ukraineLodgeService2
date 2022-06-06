import React, { Component } from "react";
import LodgeDataService from "../services/lodge.service";

export default class AddLodge extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
      this.onChangeNrOfBeds = this.onChangeNrOfBeds.bind(this);
      //this.onChangeNrOfPersons = this.onChangeNrOfPersons.bind(this);
     // this.onChangeFreeBeds = this.onChangeFreeBeds.bind(this);
      this.onChangeType = this.onChangeType.bind(this);
      this.onChangeRegion = this.onChangeRegion.bind(this);
    this.saveLodge = this.saveLodge.bind(this);
    this.newLodge = this.newLodge.bind(this);

    this.state = {
      id: null,
      name: "",
      nrOfBeds: null, 
      //nrOfPersons: null,
      //freeBeds: nrOfBeds,
      type: "",
      region: "",

       submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeNrOfBeds(e) {
    this.setState({
      nrOfBeds: e.target.value
    });
    }

    /*onChangeNrOfPersons(e) {
        this.setState({
            nrOfPersons: e.target.value
        });
    }*/

    /*onChangeFreeBeds(e) {
        this.setState({
            freeBeds: e.target.value
        });
    }*/

    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }

    onChangeRegion(e) {
        this.setState({
            region: e.target.value
        });
    }

  saveLodge() {
    var data = {
      name: this.state.name,
      nrOfBeds: this.state.nrOfBeds,
        nrOfPersons: this.state.nrOfPersons,
        freeBeds: this.state.nrOfBeds,
        type: this.state.type,
      region: this.state.region
    };

    LodgeDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          nrOfBeds: response.data.nrOfBeds,
            nrOfPersons: response.data.nrOfPersons,
            freeBeds: response.data.nrOfBeds,
            type: response.data.type,
            region: response.data.region,

            submitted: true

        });
        console.log(response.data);
      })
      .catch(e => {
          console.log(e);

      });
  }

  newLodge() {
    this.setState({
      id: null,
      name: "",
      nrOfBeds: null,
      nrOfPersons: null,
        freeBeds: this.onChangeNrOfBeds,
        type: "",
      region: ""

    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newLodge}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name der Unterkunft</label>
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
              <label htmlFor="nrofBeds">Anzahl der Betten</label>
              <input
                type="number"
                className="form-control"
                id="nrOfBeds"
                required
                value={this.state.nrOfBeds}
                onChange={this.onChangeNrOfBeds}
                name="nrOfBeds"
              />
            </div>


             {/*<div className="form-group">*/}
             {/*   <label htmlFor="nrOfPersons">Anzahl zugewiesener Personen</label>*/}
             {/*    <input*/}
             {/*       type="number"*/}
             {/*       className="form-control"*/}
             {/*       id="nrOfPersons"*/}
             {/*       required*/}
             {/*       value={this.state.nrOfPersons}*/}
             {/*       onChange={this.onChangeNrOfPersons}*/}
             {/*       name="nrOfPersons"*/}
             {/*    />*/}
             {/* </div>*/}

              {/*<div className="form-group">*/}
              {/*   <label htmlFor="freeBeds">Freie Betten</label>*/}
              {/*    <input*/}
              {/*       type="number"*/}
              {/*       className="form-control"*/}
              {/*       id="freeBeds"*/}
              {/*       required*/}
              {/*       value={this.state.freeBeds}*/}
              {/*       onChange={this.onChangefreeBeds}*/}
              {/*        name="freeBeds"*/}
              {/*    />*/}
              {/* </div>*/}

              <div className="form-group">
               <label htmlFor="type">Art der Unterkunft</label>
                <input
                 type="text"
                 className="form-control"
                  id="type"
                  required
                  value={this.state.type}
                  onChange={this.onChangeType}
                  name="type"
                      />
               </div>

               <div className="form-group">
                <label htmlFor="region">Region</label>
                   <input
                    type="text"
                     className="form-control"
                      id="region"
                      required
                      value={this.state.region}
                      onChange={this.onChangeRegion}
                      name="region"
                   />
                 </div>


            <button onClick={this.saveLodge} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
