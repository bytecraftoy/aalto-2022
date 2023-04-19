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

// This test checks that a new user will already have a project when first registered,
// and the ability to rename that project.
test('should be able to rename a project', async ({ page }) => {
    await expect(page.locator('h1:has-text("new project")')).toBeDefined();
    await expect(page.getByTestId('cog-icon').first()).toBeVisible();
    await page.click('[data-testid="cog-icon"]');
    await expect(page.locator('p', { hasText: /Rename|Clone/ })).toHaveCount(2);
    await expect(page.locator('p:has-text("Rename")').first()).toBeVisible();
    await page.locator('div').filter({ hasText: 'Rename' }).first().click();
    await page.click('input[placeholder*="New name for the project"]');
    const projectName = uuid();
    await page.fill(
        'input[placeholder*="New name for the project"]',
        projectName
    );

    await page.click('button:has-text("Confirm")');
    await expect(page.locator(`h1:has-text("${projectName}")`)).toBeDefined();
});

// This test checks that the user can create new projects, and their data is correctly saved,
// and loaded when the user changes projects It starts by creating N projects, and filling
// each with sample data, switching between them. It then goes back to check each project
// has the data that was entered
test('should be able to create new projects', async ({ page }) => {
    const addLocator = '[data-testid="fab-button"]';
});
