import { Locator, Page } from "@playwright/test";

export class TestPage{
    page: Page;
    constructor(page: Page){
        this.page = page;
    }
    
    public async addLaptop(laptop : string){
        try {
            let boxes = this.page.locator(`div.card-block`);
            let lenght = await boxes.count();
            let laptopPrice: number;

            for(let i = 0; i < lenght ; i++){
                if(await boxes.nth(i).locator('a').textContent() == laptop){
                    let temp: any = await boxes.nth(i).locator('h5').textContent();
                    temp.replace('$', '');
                    laptopPrice = parseInt(temp);
                    console.log(laptopPrice);

                    await this.page.locator(`//a[contains(text(), "${laptop}")]`).click();
                }
            }

            
            this.page.on('dialog', dialog => dialog.accept());
            await this.page.locator(`//a[text() = 'Add to cart']`).click();
        } catch (error) {
            console.error('errorr is in this ', error);
            throw error;
        }
    }
}

