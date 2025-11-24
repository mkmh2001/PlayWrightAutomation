import { DashboardPage } from "./Dashboard";
import { LoginPage } from "./LoginPage";
import { CartPage } from "./CartPage";
import { CheckOutPage } from "./CheckOutPage";
import { OrderHistoryPage } from "./OrderHistoryPage";
import { Page } from "@playwright/test";

export class POManager {

    page: Page;
    loginPage:  LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    checkOutPage: CheckOutPage;
    orderHistoryPage: OrderHistoryPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkOutPage = new CheckOutPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
    }
}