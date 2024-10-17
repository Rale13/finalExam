export class Header {
    constructor(page) {
      this.page = page;
      this.loader = "div[class='h-48 w-48']";
      this.gearLocator = page.locator("[src='/images/logo/-white.png']");
    }
  }