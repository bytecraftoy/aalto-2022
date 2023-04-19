import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';

// Load env from backend for REGISTER_KEY
dotenv.config({ path: 'backend/.env' });

const output_locator = 'textarea[placeholder*="AI generated content"]';
const theme_input = 'Sci-fi';
const category_input = 'category input from playwright';
const prompt_input = 'prompt input from playwright';

const uuid = () => Math.random().toString(36).substring(2, 12);
const username = uuid();

test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto('/');
    await expect(page).toHaveURL('/login');
    await page.click('button:has-text("Sign up")');
    await expect(page).toHaveURL('/register');
    await page
        .locator('label', {
            has: page.locator('span:has-text("Username")'),
        })
        .locator('input')
        .first()
        .fill(username, { force: true });
    await page
        .locator('label', {
            has: page.locator('span:has-text("Password")'),
        })
        .locator('input')
        .first()
        .fill('salasana', { force: true });
    await page
        .locator('label', {
            has: page.locator('span:has-text("Repeat password")'),
        })
        .locator('input')
        .first()
        .fill('salasana', { force: true });

    await page
        .locator('label', {
            has: page.locator('span:has-text("Key")'),
        })
        .locator('input')
        .first()
        .fill(process.env.REGISTER_KEY!, { force: true });

    await page.click('button:has-text("Create account")');
    await expect(page).toHaveURL('/projects');
});

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/login');
    await page
        .locator('label', {
            has: page.locator('span:has-text("Username")'),
        })
        .locator('input')
        .first()
        .fill(username, { force: true });
    await page
        .locator('label', {
            has: page.locator('span:has-text("Password")'),
        })
        .locator('input')
        .first()
        .fill('salasana', { force: true });
    await page
        .locator('[data-testid="custom-button"]:has-text("Log in")')
        .click();
    await expect(page).toHaveURL('/projects');
});

// This test checks that the user can create new projects, and their data is correctly saved,
// and loaded when the user changes projects It starts by creating N projects, and filling
// each with sample data, switching between them. It then goes back to check each project
// has the data that was entered
test('should be able to create new projects', async ({ page }) => {
    const addLocator = '[data-testid="fab-button"]';
});
