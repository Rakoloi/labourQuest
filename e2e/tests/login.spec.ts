import {test,expect} from '@playwright/test';

test('Login-Test', async({page}) => {
    await page.goto('http://localhost:3000');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByLabel('Email').fill('rakoloimosa@gmail.com');
    await page.getByLabel('Password').fill('Mosa1234');
    
    await page.getByRole('button', { name: 'Login' }).click();
})