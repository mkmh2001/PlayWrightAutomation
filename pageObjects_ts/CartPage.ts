import { Locator, Page } from "@playwright/test";

export class CartPage {

    page: Page;
    cartButton: Locator;
    

    constructor(page: Page){
        this.page = page;
        this.cartButton = page.locator(`button[routerlink*= 'cart']`);
    }

    async verifyProductInCart(productName: string) {
        return await this.page.locator(`//div[@class='cartSection']//h3[text()='${productName}']`).isVisible();
    }

    async gotoCart(){
        await this.cartButton.click();
    }


}