import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pom/modules/ui/registerPage";
import { URLS } from "../fixtures/pages";
import { HEADINGS } from "../fixtures/headings";
import { generateUserCredentials } from "../fixtures/userData";
import { LoginPage } from "../pom/modules/ui/loginPage";

let registerPage;
let loginPage;

const { username, email, password } = generateUserCredentials(5);
let loginEmail = email;
let loginPassword = password;

test.describe.configure({ mode: "serial" });

test.describe("register test", () => {
  test.beforeEach("visi page and validte", async ({ page }) => {
    //visit page and validate
    await page.goto(URLS["REGISTER"]);
    //Instantiate POM class
    registerPage = new RegisterPage(page);
  });

  test("register user", async ({ page }) => {
    //validate page
    await expect(registerPage.heading).toBeVisible();
    await expect(registerPage.heading).toHaveText(HEADINGS["REGISTER"]);
    //Instantiate POM class
    registerPage.register(username, email, password);
    //wait for and verify redirect
    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page.getByText(HEADINGS["DASHBOARD"])).toBeVisible();
  });

  test.describe("login test", () => {
    test.beforeEach("visi page and validte", async ({ page }) => {
      //visit page and validate
      await page.goto(URLS["LOGIN"]);
      //Instantiate POM class
      loginPage = new LoginPage(page);
    });


    test("login user", async ({ page }) => {
      //visit app and validate
      await expect(loginPage.heading).toBeVisible();
      await expect(loginPage.heading).toHaveText(HEADINGS["LOGIN"]);
      //fill in form and submit
      loginPage.login(loginEmail, loginPassword);
      //wait for and verify redirect
      await page.waitForURL(URLS["DASHBOARD"]);
      await expect(page.getByText(HEADINGS["DASHBOARD"])).toBeVisible();
    });
  });


});
