export class DashboardPage {

    constructor(page){
        this.page = page
    }

    async printAllProducts(){
        const allProducts = await this.page.locator(`div.card-body b`).allTextContents();
        console.log(allProducts);
    }

    async addProductToCart(productName){
        const addToProdBtn = this.page.locator(`//b[contains(text() , '${productName}')]/parent::h5/following::button[contains(text(), 'Add To Cart')]`);
        await addToProdBtn.first().click();
    }

    
}