import {test, expect} from '@playwright/test'
import { TestPage } from '../pageObjects_ts/testPage';


test('test laptop', async({page})=> {
    const laptop1: string = 'Sony vaio i5';
    const laptop2: string = 'Dell i7 8gb';
    await page.goto('https://www.demoblaze.com');
    await page.waitForLoadState('domcontentloaded');

    await page.locator(`a[onclick = "byCat('notebook')"]`).click();

    const tp: TestPage = new TestPage(page);
    await tp.addLaptop(laptop1);

    // await page.goBack();
    // await tp.addLaptop(laptop2);

    // await page.locator(`#cartur`).click();


    await page.waitForTimeout(5000);
});