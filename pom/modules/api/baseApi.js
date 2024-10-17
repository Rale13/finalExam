export class BaseAPI {
    constructor(page, token = "") {
      this.page = page;
      this.token = token;
    }
  
    async post(endpoint, payload) {
      const response = await this.page.request.post(endpoint, {
        headers: this.getHeaders(),
        data: payload,
      });
  
      const responseJson = await response.json();
      return responseJson;
    }
  
    async get(endpoint, id = "") {
      const response = await this.page.request.get(`${endpoint}/${id}`, {
        headers: this.getHeaders(),
      });
  
      const responseJson = await response.json();
  
      return responseJson;
    }
  
    //getters
    getToken() {
      return this.token;
    }
  
    getHeaders() {
      return {
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      };
    }
  }
  