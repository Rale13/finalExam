import { ShippingAPI } from "./shippingApi";
import { ENDPOINTS } from "../../../fixtures/http";

export class CustomersAPI extends ShippingAPI {
  constructor(page, token = "") {
    super(page, token);
    this.endpoint = ENDPOINTS["CUSTOMERS"];
  }

  async getCustomerShippingInfo(id) {
    return await this.getShippingInfo(this.endpoint, id)
  }

  async updateCustomerShippingInfo(id, payload) {
    return await this.updateShippingInfo(this.endpoint, id, payload)
  }
}