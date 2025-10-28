// abc9782@gmail.com, Demo@123

import { test, expect } from '@playwright/test';

test('Test 2', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator(`#userEmail`).fill('abc9782@gmail.com');
    await page.locator(`#userPassword`).fill('Demo@123');

    //Get by role example
    await page.getByRole('button', { name: 'Login' }).click();

    // console.log(await page.locator(`div.card-body b`).nth(0).textContent());
    await page.waitForLoadState('networkidle');
    const allProducts = await page.locator(`div.card-body b`).allTextContents();
    console.log(allProducts);

    const product = 'ADIDAS ORIGINAL';
    const addToProdBtn = page.locator(`//b[contains(text() , '${product}')]/parent::h5/following::button[contains(text(), 'Add To Cart')]`);
    await addToProdBtn.first().click();

    //Click on Cart
    await page.locator(`button[routerlink*= 'cart']`).click();
    expect(await page.locator(`//div[@class='cartSection']//h3[text()='${product}']`).isVisible()).toBe(true);

    //click on checkout
    await page.locator(`//button[contains(text(), 'Checkout')]`).click();

    //Select Country
    await page.locator(`input[placeholder = 'Select Country']`).pressSequentially('indi', {delay: 100});

    //You can also get all elements and loop throgh them, check if extracted text is india and click. (text === ' India')
    await page.locator(`//span[text() = ' India']`).click();

    //click on place order
    await page.locator(`.action__submit`).click();

    expect(await page.locator(`h1.hero-primary`).textContent()).toContain('Thankyou for the order');
    const orderId = await page.locator(`td.em-spacer-1 label.ng-star-inserted`).textContent();
    console.log(orderId);
    const trimedID = orderId.split(' ')[2];
    console.log(`Trimmed ID -> ${trimedID}`);

    //Verify the order id in the orders page.
    
    //clik on Orders.
    await page.locator(`button[routerlink*= 'myorders']`).click();
    await page.locator(`table.table-bordered`).waitFor();

    const orderIds = await page.locator(`tbody tr th`).allTextContents();
    console.log(orderIds);
    // expect(orderIds.includes(orderId)).toBe(true);

    let flag = false;
    // for(let i=0; i< orderIds.length; i++) {
    //     if(orderIds[i].includes(trimedID)) {
    //         flag = true;
    //     }
    // }
    orderIds.filter( id => { if(id.includes(trimedID)) { flag = true;   }});
    expect(flag).toBeTruthy();
});

