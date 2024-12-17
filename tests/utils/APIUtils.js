class APIUtils
{

  constructor(apiContext, email, password){
    this.apiContext = apiContext;
    this.loginPayload = {userEmail: email, userPassword: password};
  }

  async getToken(){
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

  async createOrder(country, productId){
    let response = {}
    response.token = await this.getToken();
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
          'Authorization' : response.token,
          'Content-Type' : 'application/json'
        }
      }
    );
    
    const orderResponseJson = await orderResponse.json();
    
    response.orderId = orderResponseJson.orders[0];
    

    return response;
  }
}

module.exports = { APIUtils };