import { test as base} from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
}

export const customTest = base.extend<{testDataForOrder: TestDataForOrder}>({
    testDataForOrder: async ({}, use) => {
        await use({
            username: 'abc9782@gmail.com',
            password: 'Demo@123',
            productName: 'ADIDAS ORIGINAL',
        });
    }
});