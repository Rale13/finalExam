export class LoginPage {
    constructor(page) {
      this.page = page;
      this.heading = page.locator("h1");
      this.emailInput = page.locator("#email");
      this.passwordInput = page.locator("#password");
      this.submitButton = page.locator("button");
      this.errorMessage = page.locator(".text-red-600");
    }
  
    async login(email, password) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.submitButton.click();
    }
  
  }