import { Page } from "@playwright/test";

export class DashboardPage {

    page: Page;

    constructor(page: Page){
        this.page = page
    }

    async printAllProducts(){
        const allProducts = await this.page.locator(`div.card-body b`).allTextContents();
        console.log(allProducts);
    }

    async addProductToCart(productName: string){
        const addToProdBtn = this.page.locator(`//b[contains(text() , '${productName}')]/parent::h5/following::button[contains(text(), 'Add To Cart')]`);
        await addToProdBtn.first().click();
    }

    
}