import React, { Component } from "react";
import LodgeDataService from "../services/lodge.service";
import { Link } from "react-router-dom";
//import Lodge from "./ldoge.component";

export default class LodgeList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveLodges = this.retrieveLodges.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLodge = this.setActiveLodge.bind(this);
    this.removeAllLodges = this.removeAllLodges.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      lodges: [],
      currentLodge: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveLodges();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveLodges() {
    LodgeDataService.getAll()
      .then(response => {
        this.setState({
          lodges: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveLodges();
    this.setState({
      currentLodge: null,
      currentIndex: -1
    });
  }

  setActiveLodge(lodge, index) {
    this.setState({
      currentLodge: lodge,
      currentIndex: index
    });
  }

  removeAllLodges() {
    LodgeDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentLodge: null,
      currentIndex: -1
    });

    LodgeDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          lodges: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
      const { searchName, lodges, currentLodge, currentIndex } = this.state;


    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Suche nach Name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Unterkuenfte</h4>

          <ul className="list-group">
            {lodges &&
              lodges.map((lodge, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveLodge(lodge, index)}
                  key={index}
                >
                  {lodge.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllLodges}
          >
            Alle loeschen
          </button>
        </div>
        <div className="col-md-6">
          {currentLodge ? (
            <div>
              <h4>Unterkunft</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                   {currentLodge.name}
              </div>
              <div>
                <label>
                  <strong>Anzahl Betten:</strong>
                </label>{" "}
                {currentLodge.nrOfBeds}
               </div>
               <div>
               <label>
                <strong>Anzahl Personen:</strong>
                   </label>{" "}
                  {currentLodge.nrOfPersons}
                 </div>
                <div>
                   <label>
                       <strong>Free Beds:</strong>
                       </label>{" "}
                   {currentLodge.freeBeds}
                   </div>
                   <div>
                      <label>
                      <strong>Art der Unterkunft:</strong>
                        </label>{" "}
                        {currentLodge.type}
                    </div>
                    <div>
                       <label>
                       <strong>Region:</strong>
                       </label>{" "}
                       {currentLodge.region}
                    </div>
              
              <Link
                to={"/lodges/" + currentLodge.id}
                className="badge badge-warning"
              >
                Bearbeiten
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Klicken Sie auf eine Unterkunft...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
