import{test, expect, request} from '@playwright/test';
import { APIUtil } from '../utils/APIUtils';

const loginPayload = {userEmail:"abc9782@gmail.com",userPassword:"Demo@123"};
const orderPayload = {orders:[{country:"India",productOrderedId:"68a961719320a140fe1ca57c"}]};

let token;
let orderId;
test.beforeAll(async({}) => {
    //Login API call to get the token
    const apiContext = await request.newContext();
    // const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data: loginPayload});
    // expect(loginResponse.ok()).toBe(true);
    // const loginResponseJson = await loginResponse.json();
    // token = loginResponseJson.token;
    // console.log(`Token -> ${token}`);

    const apiUtil = new APIUtil(apiContext, loginPayload);

    //Create Order API 
    // const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
    //     {
    //         data: orderPayload,
    //         headers:{
    //             'Authorization': token,
    //             'Content-Type': 'application/json'
    //         }
    //     }
    // );

    // const orderResponseJson = await orderResponse.json();
    // orderId = orderResponseJson.orders[0];
    // console.log(`Order ID -> ${orderId}`);

    const orderResponse = await apiUtil.createOrder(orderPayload);
    token = orderResponse.token;
    orderId = orderResponse.orderId;
    console.log(`Order ID from before all -> ${orderId}`);
});

test('Verify the order id in the orders page.', async({page}) => {
    await page.addInitScript( value => {
        window.localStorage.setItem('token', value)
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');  

   
    //clik on Orders.
    await page.locator(`button[routerlink*= 'myorders']`).click();
    await page.locator(`table.table-bordered`).waitFor();

    const orderIds = await page.locator(`tbody tr th`).allTextContents();
    console.log(orderIds);

    let flag = false;
    orderIds.filter( id => { if(id.includes(orderId)) { flag = true;   }});
    expect(flag).toBeTruthy();
});
