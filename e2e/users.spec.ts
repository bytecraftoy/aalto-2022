import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: 'backend/.env' });

const uuid = () => Math.random().toString(36).substring(2, 12);
const username = uuid();

test('Can create an account', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/login/');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByLabel('UsernameChoose your username').click();
    await page.getByLabel('UsernameChoose your username').fill(username);
    await page.getByLabel('PasswordChoose your password').click();
    await page.getByLabel('PasswordChoose your password').fill('123456');
    await page.getByText('Repeat password').click();
    await page
        .getByLabel('Repeat passwordPlease enter your password again')
        .fill('123456');
    await page.getByLabel('KeyEnter the key').click();
    await page.getByLabel('KeyEnter the key').press('CapsLock');
    await page.getByLabel('KeyEnter the key').fill('DEV-123');
    await page.getByLabel('KeyEnter the key').press('CapsLock');
    await page.getByTestId('custom-button').click();
    await page
        .locator('div')
        .filter({
            hasText: `AI-assisted game content creator${username}SettingsLogout`,
        })
        .getByRole('button')
        .nth(1)
        .click();
    await page.getByText(username).click();
});

test('Logout sends back to the login', async ({ page }) => {
    const username = uuid();
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/login/');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByLabel('UsernameChoose your username').click();
    await page.getByLabel('UsernameChoose your username').fill(username);
    await page.getByLabel('PasswordChoose your password').click();
    await page.getByLabel('PasswordChoose your password').fill('123456');
    await page.getByText('Repeat password').click();
    await page
        .getByLabel('Repeat passwordPlease enter your password again')
        .fill('123456');
    await page.getByLabel('KeyEnter the key').click();
    await page.getByLabel('KeyEnter the key').press('CapsLock');
    await page.getByLabel('KeyEnter the key').fill('DEV-123');
    await page.getByLabel('KeyEnter the key').press('CapsLock');
    await page.getByTestId('custom-button').click();
    await page
        .locator('div')
        .filter({
            hasText: `AI-assisted game content creator${username}SettingsLogout`,
        })
        .getByRole('button')
        .nth(1)
        .click();
    await page.getByText('Logout').click();
    await expect(page).toHaveURL('/login/');
});
