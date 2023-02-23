import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: 'backend/.env' });

const output_locator = 'textarea[placeholder*="AI generated content"]';
const theme_input = 'Sci-fi';
const category_input = 'category input from cypress';
const prompt_input = 'prompt input from cypress';

const uuid = () => Math.random().toString(36).substring(2, 12);
const username = uuid();

let first = true;
test.beforeEach(async ({ page }) => {
    if (first) {
        first = false;

        await page.goto('/');
        await expect(page).toHaveURL('/login/');
        await page.waitForTimeout(100);
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

        await page.waitForTimeout(100);
        await page.click('button:has-text("Create account")');
        await expect(page).toHaveURL('/');
    } else {
        await page.goto('/');
        await expect(page).toHaveURL('/login/');
        await page.fill('span:has-text("Username") >> input', username, {
            force: true,
        });
        await page.fill('span:has-text("Password") >> input', 'salasana', {
            force: true,
        });
        await page.waitForTimeout(100);
        await page.click(
            'button:has-text("Log in") >> [data-testid="custom-button"]'
        );
        await expect(page).toHaveURL('/');
    }
});

// This test is for checking that the "Generate" button is locked when there is no prompt input.
// It starts by checking that the output text area is empty, which confirms that there is no prompt input.
// Next, it asserts that there is no "Generate" button, since there is no prompt input.
test('should have no generate button without prompt input', async ({
    page,
}) => {
    const outputTextArea = page.locator(output_locator);
    const outputText = await outputTextArea?.innerText();
    expect(outputText).toBe('');

    const generateButton = page.locator('[data-testid="iobox-Generate"]');
    expect(generateButton).not.toBeTruthy();
});
