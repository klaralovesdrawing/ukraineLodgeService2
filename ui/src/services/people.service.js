import http from "../http-common";



class PeopleDataService {

    getAll() {
      
    return http.get("/people");
  }

  get(id) {
    return http.get(`/people/${id}`);
  }

  create(data) {
    return http.post("/people", data);
  }

  update(id, data) {
    return http.put(`/people/${id}`, data);
  }

  delete(id) {
    return http.delete(`/people/${id}`);
  }

  deleteAll() {
    return http.delete(`/people`);
  }

  findByName(name) {
    return http.get(`/people?name=${name}`);
  }
}

export default new PeopleDataService();