// abc9782@gmail.com, Demo@123

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { DashboardPage } from '../pageObjects/Dashboard';
import { CartPage } from '../pageObjects/CartPage';
import { CheckOutPage } from '../pageObjects/CheckOutPage';
import { OrderHistoryPage } from '../pageObjects/OrderHistoryPage';

test('Test 2', async({page}) => {
    
    //Login to application.
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('abc9782@gmail.com', 'Demo@123');    

    //Dashboard page
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.printAllProducts();

    const product = 'ADIDAS ORIGINAL';
    await dashboardPage.addProductToCart(product);

    //Cart Page
    const cartPage = new CartPage(page);
    await cartPage.gotoCart();

    expect(await cartPage.verifyProductInCart(product)).toBeTruthy(); 

    //Verify checkout
    const checkOutPage = new CheckOutPage(page);
    await checkOutPage.goToCheckout();
    await checkOutPage.selectCountry('ind');
    const orderId = await checkOutPage.placeOrderAndReturnID();


    //Verify the order id in the orders page.
    const orderHistoryPage = new OrderHistoryPage(page);
    await orderHistoryPage.gotoOrderHistory();
    expect(await orderHistoryPage.isOrderPresent(orderId)).toBeTruthy();
});

