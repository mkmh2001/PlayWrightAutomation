export class LoginPage {

    constructor(page){
        this.page = page;
        this.userEmail = page.locator('#userEmail');
        this.userPassword = page.locator('#userPassword');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async goto(){
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async login(email, password){
        await this.userEmail.fill(email);
        await this.userPassword.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}