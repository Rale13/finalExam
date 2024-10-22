export class Dashboard {
    constructor(page) {
      this.page = page;
      this.filter = page.locator(".layout-menu");
      this.productLocator = page.locator("[test-id='product-card']");
      this.productTitle = page.locator("h5");
      this.productCartBtn = page.locator("button[class='p-button p-component']");
      this.paginationLocator = page.locator(".paginated");
      this.cartLocator = page.locator("button svg.w-8.h-12");
      this.toastNotification = page.locator("div.Toastify__toast-body");
      this.toastButton = page.locator("button.Toastify__close-button svg");
      this.clearButton = page.locator("button:has-text('Clear')");
      this.noItemsMessage = page.locator("div.z-10.text-4xl.font-bold:has-text('No items in cart. Add some!')");
    }
  
    //get data for products on single page
    getProductData = async (dashboard) => {
      const productData = [];
      const productCount = await dashboard.productLocator.count();
  
      for (let j = 0; j < productCount; j++) {
        const cartButton = dashboard.productLocator
          .nth(j)
          .locator(dashboard.productCartBtn);
        const isDisabled = (await cartButton.getAttribute("disabled")) !== null;
  
        productData.push({
          cartButton: {
            cartButton,
            disabled: isDisabled,
          },
        });
      }
      return productData;
    };
  
  }