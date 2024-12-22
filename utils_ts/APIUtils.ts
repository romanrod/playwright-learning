import { APIRequestContext } from '@playwright/test';

export class APIUtils{

  apiContext: APIRequestContext
  
  loginPayload: {
    userEmail: string,
    userPassword: string
  }

  response: {
    token: string,
    orderId: string
  }


  constructor(apiContext: any, email: string, password: string){
    this.apiContext = apiContext;
    this.loginPayload = {userEmail: email, userPassword: password};
  }

  async getToken(): Promise<string>{
    // login request to get auth token
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login', 
      {
        data: this.loginPayload
      }
    );
  
    const loginResponseJson = await loginResponse.json();
    console.log('loginResponse:'+loginResponse);
    console.log('loginResponseJson:'+loginResponseJson);
    
    const token = loginResponseJson.token;
    console.log("token: " + token);
    return token;

  }

  async createOrder(country: string, productId: string) {
    const token = await this.getToken();
    const orderPayload = {
      orders:[
        {
          country: country,
          productOrderedId: productId
        }
      ]
    }
    const orderResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order', 
      {
        data: orderPayload,
        headers: {
          'Authorization' : token,
          'Content-Type' : 'application/json'
        }
      }
    );
    
    const orderResponseJson = await orderResponse.json();
    
    const orderId = orderResponseJson.orders[0];
    
    this.response = {
      token: token,
      orderId: orderId
    }

    return this.response;
  }
}