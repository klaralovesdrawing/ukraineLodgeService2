import http from "../http-common";



class LodgeDataService {

    getAll() {
      
    return http.get("/lodges");
  }

  get(id) {
    return http.get(`/lodges/${id}`);
  }

  create(data) {
    return http.post("/lodges", data);
  }

  update(id, data) {
    return http.put(`/lodges/${id}`, data);
  }

  delete(id) {
    return http.delete(`/lodges/${id}`);
  }

  deleteAll() {
    return http.delete(`/lodges`);
  }

  findByName(name) {
    return http.get(`/lodges?name=${name}`);
  }
}

export default new LodgeDataService();