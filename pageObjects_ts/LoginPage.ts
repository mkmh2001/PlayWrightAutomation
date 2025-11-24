import { Locator, Page } from "@playwright/test";

export class LoginPage {

    page: Page;
    userEmail: Locator;
    userPassword: Locator;
    loginButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.userEmail = page.locator('#userEmail');
        this.userPassword = page.locator('#userPassword');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async goto(){
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async login(email: string, password: string){
        await this.userEmail.fill(email);
        await this.userPassword.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}