export class OrderHistoryPage {

    constructor(page){
        this.page = page;
        this.myordersButton = page.locator("button[routerlink*= 'myorders']");
        this.orderTable = page.locator("table.table-bordered");
        this.orderIdColumn = this.orderTable.locator("tbody tr th");
    }

    async gotoOrderHistory(){
        await this.myordersButton.click();
        await this.orderTable.waitFor();
    }

    async isOrderPresent(orderId){
        const orderIds = await this.orderIdColumn.allTextContents();
        let flag = false;
        orderIds.filter( id => { if(id.includes(orderId)) { flag = true;   }});
        return flag;
    }
}