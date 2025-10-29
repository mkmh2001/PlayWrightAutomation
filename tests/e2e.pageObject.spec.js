// abc9782@gmail.com, Demo@123

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { DashboardPage } from '../pageObjects/Dashboard';
import { CartPage } from '../pageObjects/CartPage';
import { CheckOutPage } from '../pageObjects/CheckOutPage';
import { OrderHistoryPage } from '../pageObjects/OrderHistoryPage';
import { POManager } from '../pageObjects/POManager';

test('Test 2', async({page}) => {
    
    //Login to application.
    const poManager = new POManager(page);

    await poManager.loginPage.goto();
    await poManager.loginPage.login('abc9782@gmail.com', 'Demo@123');    

    //Dashboard page
    await poManager.dashboardPage.printAllProducts();

    const product = 'ADIDAS ORIGINAL';
    await poManager.dashboardPage.addProductToCart(product);

    //Cart Page
    await poManager.cartPage.gotoCart();

    expect(await poManager.cartPage.verifyProductInCart(product)).toBeTruthy(); 

    //Verify checkout
    await poManager.checkOutPage.goToCheckout();
    await poManager.checkOutPage.selectCountry('ind');
    const orderId = await poManager.checkOutPage.placeOrderAndReturnID();


    //Verify the order id in the orders page.
    await poManager.orderHistoryPage.gotoOrderHistory();
    expect(await poManager.orderHistoryPage.isOrderPresent(orderId)).toBeTruthy();
});

