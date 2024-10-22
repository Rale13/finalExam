import { test, expect } from "@playwright/test";
import { LoginPage } from "../pom/modules/ui/loginPage";
import { Dashboard } from "../pom/modules/ui/dashboard";
import { Header } from "../pom/modules/ui/header";
import { generateUserCredentials } from "../fixtures/userData";
import { URLS } from "../fixtures/pages";
import { shuffleArray } from "../fixtures/utils";

let dashboard, loginPage, header;
const { registeredEmail, registeredPassword } = generateUserCredentials();

test.describe("products tests", () => {
  test.beforeAll("log in", async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto(URLS["LOGIN"]);
    //instantiate pom's
    loginPage = new LoginPage(page);
    dashboard = new Dashboard(page);
    header = new Header(page);
    //log in
    loginPage.login(registeredEmail, registeredPassword);
    //assert that all elements are loaded
    await page.waitForURL(URLS["DASHBOARD"]);
    await page.waitForSelector(header.loader, { state: "hidden" });
  });

  test("add 3 random products to cart and adjust quantities", async () => {
    const products = await dashboard.getProductData(dashboard);
    const randomProducts = shuffleArray(products, 3);
    const quantities = [3, 5, 7];
    for (let i = 0; i < randomProducts.length; i++) {
      const product = randomProducts[i];
      for (let j = 0; j < quantities[i]; j++) {
        await product.cartButton.cartButton.click();
        await dashboard.toastNotification.waitFor({ state: "visible" }); 
      }
    }

    await expect (dashboard.cartButton).toHaveText('15');
  });

  test.afterAll("clear cart", async () => {
    await dashboard.cartLocator.click();
    await dashboard.clearButton.click();
    await dashboard.noItemsMessage.waitFor({state: "visible"});
  })
});
