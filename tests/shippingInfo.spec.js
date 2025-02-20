import { test, expect } from "@playwright/test";
import { LoginAPI } from "../pom/modules/api/loginApi";
import { CustomersAPI } from "../pom/modules/api/customersApi";
import { VALID_LOGIN_PAYLOAD } from "../fixtures/userData";
import { generateRandomString } from "../fixtures/utils";
import { STATUS } from "../fixtures/http";

test.describe("customers API test", () => {
  let loginAPI, customersAPI, userId;

  test.beforeEach("get auth token", async ({ page }) => {
    loginAPI = new LoginAPI(page);
    const loginResponse = await loginAPI.login(VALID_LOGIN_PAYLOAD);
    userId = loginResponse.user.id;
    customersAPI = new CustomersAPI(page, loginResponse.auth.token);
  });

  test("should be able to update customers shipping info", async () => {
    const customerToUpdate = await customersAPI.getCustomerShippingInfo(userId);
    const response = await customersAPI.updateCustomerShippingInfo(userId, {
      first_name: generateRandomString(3),
      last_name: generateRandomString(5),
      email: `${generateRandomString(3)}@gmail.com`,
      street_and_number: "",
      phone_number: "",
      city: "",
      postal_code: 12345,
      country: generateRandomString(4),
    });
    expect(response.status).toBe(STATUS["SUCCESS"]);
    expect(customerToUpdate.shipping_info.first_name).not.toBe(
      response.shipping_info.first_name
    );
  });
});
