export class CartPage {

    constructor(page){
        this.page = page;
        this.cartButton = page.locator(`button[routerlink*= 'cart']`);
    }

    async verifyProductInCart(productName) {
        return await this.page.locator(`//div[@class='cartSection']//h3[text()='${productName}']`).isVisible();
    }

    async gotoCart(){
        await this.cartButton.click();
    }


}