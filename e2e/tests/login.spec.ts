import {test,expect} from '@playwright/test';

test('Login-Test', async({page}) => {
    await page.goto('http://localhost:3000');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByPlaceholder('example@gmail.com').click();
    await page.getByPlaceholder('example@gmail.com').fill('rakoloimosa@gmail.com');
    await page.getByPlaceholder('••••••••').click();
    await page.getByPlaceholder('••••••••').fill('Mosa1234');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.pause()
})