// // abc9782@gmail.com, Demo@123

// import { test, expect } from '@playwright/test';
// import { customTest } from '../utils/test-base';

// import { POManager } from '../pageObjects/POManager';

// test('Test 2', async({page, customTest }) => {
    
//     //Login to application.
//     const poManager = new POManager(page);

//     await test.step('Login to application', async () => {
//         await poManager.loginPage.goto();
//         await poManager.loginPage.login(customTest.test, 'Demo@123');   
//     });
 
//     await test.step('Add product to cart', async() => {
//         //Dashboard page
//         await poManager.dashboardPage.printAllProducts();

//         const product = 'ADIDAS ORIGINAL';
//         await poManager.dashboardPage.addProductToCart(product);

//         //Cart Page
//         await poManager.cartPage.gotoCart();
        

//         expect(await poManager.cartPage.verifyProductInCart(product)).toBeTruthy(); 
//     });

//     await test.step('Checkout and verify order', async() => {

//         //Verify checkout
//         await poManager.checkOutPage.goToCheckout();
//         await poManager.checkOutPage.selectCountry('ind');
//         const orderId = await poManager.checkOutPage.placeOrderAndReturnID();


//         //Verify the order id in the orders page.
//         await poManager.orderHistoryPage.gotoOrderHistory();
//         expect(await poManager.orderHistoryPage.isOrderPresent(orderId)).toBeTruthy();
//     });
// });

