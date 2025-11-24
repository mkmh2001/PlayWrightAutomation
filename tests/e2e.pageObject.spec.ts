// abc9782@gmail.com, Demo@123

import {  expect } from '@playwright/test';
import { POManager } from '../pageObjects_ts/POManager';
import { customTest  } from '../utils/test-base';

customTest('Test 2', async({page, testDataForOrder}) => {
    
    //Login to application.
    const poManager = new POManager(page);

    await customTest.step('Login to application', async () => {
        await poManager.loginPage.goto();
        await poManager.loginPage.login(testDataForOrder.username, testDataForOrder.password);   
    });
 
    await customTest.step('Add product to cart', async() => {
        //Dashboard page
        await poManager.dashboardPage.printAllProducts();

        const product: string = testDataForOrder.productName;
        await poManager.dashboardPage.addProductToCart(product);

        //Cart Page
        await poManager.cartPage.gotoCart();
        

        expect(await poManager.cartPage.verifyProductInCart(product)).toBeTruthy(); 
    });

    await customTest.step('Checkout and verify order', async() => {

        //Verify checkout
        await poManager.checkOutPage.goToCheckout();
        await poManager.checkOutPage.selectCountry('ind');
        const orderId = await poManager.checkOutPage.placeOrderAndReturnID();


        //Verify the order id in the orders page.
        await poManager.orderHistoryPage.gotoOrderHistory();
        expect(await poManager.orderHistoryPage.isOrderPresent(orderId)).toBeTruthy();
    });
});


