export class ShippingAPI {
    constructor(page, token = "") {
      this.page = page;
      this.token = token;
    }
  
    async getShippingInfo(endpoint, id) {
      const response = await this.page.request.get(
        `${endpoint}/${id}/shipping-info`,
        {
          headers: this.getHeaders(),
        }
      );
  
      const responseJson = await response.json();
  
      return responseJson;
    }
  
    async updateShippingInfo(endpoint, id, payload) {
      const response = await this.page.request.put(
        `${endpoint}/${id}/shipping-info`,
        {
          headers: this.getHeaders(),
          data: payload,
        }
      );
  
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
  