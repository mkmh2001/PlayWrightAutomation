export class APIUtil {

    constructor(apiContext, loginPayload){
        this.apiContext = apiContext,
        this.loginPayload = loginPayload
    }

    async getToken(){
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data: this.loginPayload});
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(`Token -> ${token}`);
        return token;
    }

    async createOrder(orderPayload){
        let response = {};
        const token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderPayload,
                headers:{
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            }
        );

        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        console.log(`Order ID -> ${orderId}`);
        response.orderId = orderId;
        response.token = token;
        return response;
    }
}