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
    return http.get(`/lodges?region=${name}`);
  }

  findByRegion(region) {
    console.log("infindregion");
    console.log(region);
    console.log(http.get(`/lodges?region`));
    return http.get(`/lodges?region=${region}`);
  }
}

export default new LodgeDataService();