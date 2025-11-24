import { expect, Locator, Page } from "@playwright/test";
export class CheckOutPage {

  page: Page;
  checkoutButton: Locator;
  submitButton: Locator;
  countryInput: Locator;
  indiaOption: Locator;
  orderConfirmation: Locator;
  orderId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator(
      `//button[contains(text(), 'Checkout')]`
    );
    this.submitButton = page.locator(".action__submit");
    this.countryInput = page.locator(`input[placeholder = 'Select Country']`);
    this.indiaOption = page.locator(`//span[text() = ' India']`);
    this.orderConfirmation = page.locator(`h1.hero-primary`);
    this.orderId = page.locator(`.em-spacer-1 .ng-star-inserted`);
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async selectCountry(countryName: string) {
    await this.countryInput.pressSequentially(countryName, { delay: 100 });
    await this.indiaOption.click();
  }

  async placeOrder() {
    await this.submitButton.click();
  }

  async placeOrderAndReturnID() {
    await this.submitButton.click();
    expect(await this.orderConfirmation.textContent()).toContain(
      "Thankyou for the order"
    );
    const orderId: any = await this.orderId.textContent();
    console.log(orderId);
    const trimedID = orderId.split(" ")[2];
    console.log(`Trimmed ID -> ${trimedID}`);
    return trimedID;
  }
}
