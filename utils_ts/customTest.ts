import {test as baseTest } from '@playwright/test';

interface TestDataForOrder {
  userEmail: string;
  password: string;
  productName: string;
};

export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
{
  testDataForOrder: {
    userEmail: "roman.g.rodriguez@gmail.com",
    password: "Imking@000",
    productName: "ADIDAS ORIGINAL"
  }
});
