import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: 'backend/.env' });

const output_locator = 'textarea[placeholder*="AI generated content"]';
const theme_input = 'Sci-fi';
const category_input = 'category input from playwright';
const prompt_input = 'prompt input from playwright';

const uuid = () => Math.random().toString(36).substring(2, 12);
const username = uuid();

let first = true;
test.beforeEach(async ({ page }) => {
    if (first) {
        first = false;

        await page.goto('/');
        await expect(page).toHaveURL('/login/');
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
        await expect(page).toHaveURL('/');
    } else {
        await page.goto('/');
        await expect(page).toHaveURL('/login/');
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
    await expect(generateButton).toHaveCount(0);
});

test('has IOBox delete button while multiple on screen', async ({ page }) => {
    const deleteSelector = page.locator('[data-testid="iobox-Delete"]');
    // Asserts that there is no delete button
    await expect(deleteSelector).toHaveCount(0);
    // Clicks the add prompt button
    await page.click('[data-testid="fab-button"]');
    // Asserts that there are 2 delete buttons (1 for each IOBox)
    await expect(deleteSelector).toHaveCount(2);
    // Hovers and clicks the first delete button
    await page.hover('[data-testid="hover-area"]');
    await deleteSelector.first().click();
    // Asserts that there is no delete button (since the first IOBox was deleted)
    await expect(deleteSelector).toHaveCount(0);
});

// This test is for checking the prompt generation feature on the application.
// The test inputs a value for the category and prompt fields and checks that the output text area is empty.
// Next, it clicks the "Generate" button and asserts that the output text area includes the input category and prompt.
test('should generate a prompt and get result', async ({ page }) => {
    await page.fill('input[placeholder*="category"]', category_input);
    await page.fill('textarea[placeholder*="User input here"]', prompt_input);
    await expect(page.locator(output_locator)).toHaveText('');
    await page.hover('[data-testid="hover-area"]');
    await page.click('button:has-text("Generate")');
    await expect(page.locator(output_locator)).toContainText(
        `Write a game flavor text for ${prompt_input} which is a ${category_input} in a ${theme_input} setting`
    );
});

test('should generate all boxes with generate all button', async ({ page }) => {
    const numExtra = 3;
    await page.fill('input[placeholder*="category"]', category_input);
    await expect(page.locator('[data-testid="prompt"]')).toHaveCount(1);
    for (let i = 1; i <= numExtra; i++) {
        // Clicks the add prompt button to add extra prompts
        await page.click('[data-testid="fab-button"]');
    }
    // Confirms that the number of prompts matches the number of extra prompts added
    await expect(page.locator('[data-testid="prompt"]')).toHaveCount(
        1 + numExtra
    );
    await page
        .locator('textarea[placeholder*="User input here"]')
        .all()
        .then(async (elements) => {
            for (let i = 0; i < elements.length; i++) {
                // Inputs a value for each prompt
                await elements[i].fill(`${prompt_input} ${i}`);
            }
        });
    // Clicks the generate all button
    await page.click('button:has-text("Generate all")');
    // Find all output locators and assert their text content
    const outputAreas = page.locator(output_locator);
    const count = await outputAreas.count();
    for (let i = 0; i < count; i++) {
        await expect(outputAreas.nth(i)).toContainText(
            `Write a game flavor text for ${prompt_input} ${i} which is a ${category_input} in a ${theme_input} setting`
        );
    }
});
