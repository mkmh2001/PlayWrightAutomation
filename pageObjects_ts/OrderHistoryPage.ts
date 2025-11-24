import { Locator, Page } from "@playwright/test";

export class OrderHistoryPage {

    page: Page;
    myordersButton: Locator;
    orderTable: Locator;
    orderIdColumn: Locator;

    constructor(page: Page){
        this.page = page;
        this.myordersButton = page.locator("button[routerlink*= 'myorders']");
        this.orderTable = page.locator("table.table-bordered");
        this.orderIdColumn = this.orderTable.locator("tbody tr th");
    }

    async gotoOrderHistory(){
        await this.myordersButton.click();
        await this.orderTable.waitFor();
    }

    async isOrderPresent(orderId: string){
        const orderIds = await this.orderIdColumn.allTextContents();
        let flag = false;
        orderIds.filter( id => { if(id.includes(orderId)) { flag = true;   }});
        return flag;
    }
}