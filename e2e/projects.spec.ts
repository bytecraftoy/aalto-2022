import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';

// Load env from backend for REGISTER_KEY
dotenv.config({ path: 'backend/.env' });

const uuid = () => Math.random().toString(36).substring(2, 12);

const category_input_locator = 'input[placeholder="Category"]';
const rename_input_locator = 'input[placeholder="New name for the project"]';
const theme_input_locator =
    'div[data-testid="theme-input"] >> input[placeholder="Theme"]';
const new_project_locator = '[data-testid="cog-icon-(new project)"]';
const rename_popup_locator = '[data-testid="rename-popup-(new project)"]';
const rename_button_locator = 'button:has-text("Rename")';

test.beforeEach(async ({ page }) => {
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
        .fill(uuid(), { force: true });
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

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        // Get a unique place for the screenshot.
        const screenshotPath = testInfo.outputPath(`failure.png`);
        // Add it to the report.
        testInfo.attachments.push({
            name: 'screenshot',
            path: screenshotPath,
            contentType: 'image/png',
        });
        // Take the screenshot itself.
        await page.screenshot({ path: screenshotPath, timeout: 5000 });
    }
});

// This test checks that a new user will already have a project when first registered,
// and the ability to rename that project.
test('should be able to rename a project', async ({ page }) => {
    await expect(page.locator('h1:has-text("new project")')).toBeDefined();
    await expect(page.getByTestId('cog-icon-(new project)')).toHaveCount(1);
    await page.click(new_project_locator);
    await expect(page.locator('p', { hasText: /Rename|Clone/ })).toHaveCount(2);
    await expect(page.locator('p:has-text("Rename")')).toHaveCount(1);
    await page.click(rename_button_locator);
    await page.click(rename_input_locator);
    const projectName = uuid();
    await page.fill(rename_input_locator, projectName);
    await page.click('button:has-text("Confirm")');
    await expect(page.locator(`h1:has-text("${projectName}")`)).toBeDefined();
});

// This test checks that the user can create new projects, and their data is correctly saved,
// and loaded when the user changes projects It starts by creating N projects, and filling
// each with sample data, switching between them. It then goes back to check each project
// has the data that was entered
test('should be able to create multiple projects with their own data', async ({
    page,
}) => {
    const numProjects = Math.floor(Math.random() * 3) + 2;
    const projectData = [...Array(numProjects)].map(() => {
        return {
            name: uuid(),
            theme: uuid(),
            category: uuid(),
        };
    });

    // Initial project
    await expect(page.locator('h1:has-text("new project")')).toHaveCount(1);
    await page.locator(new_project_locator).first().click();
    await expect(
        page.locator(new_project_locator).first().locator(rename_button_locator)
    ).toHaveCount(1);
    await page
        .locator(new_project_locator)
        .first()
        .locator(rename_button_locator)
        .click();
    await expect(
        page.locator(rename_popup_locator).locator(rename_input_locator)
    ).toHaveCount(1);
    await page
        .locator(rename_popup_locator)
        .locator(rename_input_locator)
        .fill(projectData[0].name);
    await expect(
        page.locator(rename_popup_locator).locator(rename_input_locator)
    ).toHaveValue(projectData[0].name);
    await page.click('button:has-text("Confirm") >> visible=true');
    await expect(
        page.locator(`h1:has-text("${projectData[0].name}")`)
    ).toBeDefined();

    // Add projects
    for (let i = 1; i < numProjects; i++) {
        await page.click('[data-testid="fab-button"]');
        await expect(page.locator('h1:has-text("new project")')).toHaveCount(1);
        await expect(page.locator(new_project_locator)).toHaveCount(1);
        await page.locator(new_project_locator).click();
        await expect(
            page.locator(new_project_locator).locator(rename_button_locator)
        ).toHaveCount(1);
        await expect(
            page
                .locator(new_project_locator)
                .first()
                .locator(rename_button_locator)
        ).toHaveCount(1);
        await page
            .locator(new_project_locator)
            .first()
            .locator(rename_button_locator)
            .click();
        await expect(
            page.locator(rename_popup_locator).locator(rename_input_locator)
        ).toHaveCount(1);
        await page
            .locator(rename_popup_locator)
            .locator(rename_input_locator)
            .fill(projectData[i].name);
        await expect(
            page.locator(rename_popup_locator).locator(rename_input_locator)
        ).toHaveValue(projectData[i].name);
        await page.click('button:has-text("Confirm") >> visible=true');
        await expect(
            page.locator(`h1:has-text("${projectData[i].name}")`)
        ).toBeDefined();
    }

    for (let i = 0; i < numProjects; i++) {
        await expect(
            page.locator(`h1:has-text("${projectData[i].name}")`)
        ).toBeDefined();
    }

    await expect(page.locator('h1:has-text("new project")')).toHaveCount(0);

    for (let i = 0; i < numProjects; i++) {
        const { name, theme, category } = projectData[i];
        const prompt_input = `Input in project ${name}, with theme ${theme} and category ${category}`;

        await page.locator(`h1:has-text("${name}")`).first().click();
        await expect(page).toHaveURL('/about');

        await page.click(theme_input_locator);
        await page.fill(theme_input_locator, theme);
        await page.locator(theme_input_locator).blur();

        await expect(
            page.locator('div:has-text("Your progress has been saved")')
        ).toBeDefined();
        await expect(
            page.locator('div:has-text("Your progress has been saved")')
        ).toHaveCount(0); //Autosave finished

        await expect(page.locator(theme_input_locator)).toHaveValue(theme);

        await page.locator('[data-testid="navdrawer-button"]').first().click();
        await expect(page.getByRole('link', { name: 'Panel-1' })).toHaveCount(
            1
        );
        await page.getByRole('link', { name: 'Panel-1' }).click();
        await expect(page).toHaveURL(/\/panels\/.*/); // Match path, e.g. /panels/aDk4io9eRts
        await page.click(category_input_locator); // Closes nav drawer

        await page.fill(category_input_locator, category);
        await page.fill(
            'textarea[placeholder="User input here"]',
            prompt_input
        );
        await expect(
            page.locator('textarea[placeholder="AI generated content"]')
        ).toHaveText('');
        await page.hover('[data-testid="hover-area"]');
        await page.click('button:has-text("Generate")');
        await expect(
            page.locator('textarea[placeholder="AI generated content"]')
        ).toContainText(
            `Write a game flavor text for ${prompt_input} which is a ${category} in a ${theme} setting`
        );

        // Save
        await page
            .getByTestId('panel-settings')
            .first()
            .getByTestId('icon-button')
            .click();
        await page.click('button:has-text("Save")');

        await page.locator('[data-testid="navdrawer-button"]').first().click();
        await expect(page.getByRole('link', { name: 'Projects' })).toHaveCount(
            1
        );
        await page.getByRole('link', { name: 'Projects' }).click();

        await expect(page).toHaveURL('/projects');

        // Lose focus from navdrawer
        await page.click('h1:has-text("AI-assisted game content creator")');
    }

    // Check that project data is correctly saved

    for (let i = 0; i < numProjects; i++) {
        await expect(
            page.locator(`h1:has-text("${projectData[i].name}")`)
        ).toBeDefined();

        const { name, theme, category } = projectData[i];
        const prompt_input = `Input in project ${name}, with theme ${theme} and category ${category}`;

        // Go to project
        await page.locator(`h1:has-text("${name}")`).first().click();
        await expect(page).toHaveURL('/about');

        await expect(page.locator(theme_input_locator)).toHaveValue(theme);

        await page.locator('[data-testid="navdrawer-button"]').first().click();
        await expect(page.getByRole('link', { name: category })).toHaveCount(1);
        await page.getByRole('link', { name: category }).click();
        await expect(page).toHaveURL(/\/panels\/.*/); // Match path, e.g. /panels/aDk4io9eRts
        await page.click(category_input_locator); // Closes nav drawer

        await expect(page.locator(category_input_locator)).toHaveValue(
            category
        );
        await expect(
            page.locator('textarea[placeholder="User input here"]')
        ).toHaveText(prompt_input);
        await expect(
            page.locator('textarea[placeholder="AI generated content"]')
        ).toContainText(
            `Write a game flavor text for ${prompt_input} which is a ${category} in a ${theme} setting`
        );

        await page.locator('[data-testid="navdrawer-button"]').first().click();
        await expect(page.getByRole('link', { name: 'Projects' })).toHaveCount(
            1
        );
        await page.getByRole('link', { name: 'Projects' }).click();

        await expect(page).toHaveURL('/projects');

        // Lose focus from navdrawer
        await page.click('h1:has-text("AI-assisted game content creator")');
    }
});

test('should only have delete button if there are multiple projects', async ({
    page,
}) => {
    await expect(page.locator('h1:has-text("new project")')).toHaveCount(1);
    await page.locator(new_project_locator).first().click();
    await expect(page.locator('p', { hasText: /Rename|Clone/ })).toHaveCount(2); // No delete

    await expect(
        page.locator(new_project_locator).first().locator(rename_button_locator)
    ).toHaveCount(1);
    await page
        .locator(new_project_locator)
        .first()
        .locator(rename_button_locator)
        .click();
    await expect(
        page.locator(rename_popup_locator).locator(rename_input_locator)
    ).toHaveCount(1);
    await page
        .locator(rename_popup_locator)
        .locator(rename_input_locator)
        .fill('Project1');
    await expect(
        page.locator(rename_popup_locator).locator(rename_input_locator)
    ).toHaveValue('Project1');
    await page.click('button:has-text("Confirm") >> visible=true');
    await expect(page.locator(`h1:has-text("Project1")`)).toBeDefined();

    // Add a new project

    await page.click('[data-testid="fab-button"]');
    await expect(page.locator('h1:has-text("new project")')).toHaveCount(1);

    await page.locator('[data-testid="cog-icon-(Project1)"]').first().click();
    await expect(
        page
            .locator('[data-testid="cog-icon-(Project1)"]')
            .locator('p', { hasText: /Rename|Clone|Delete/ })
    ).toHaveCount(3);

    // Delete Project1
    await page
        .locator('[data-testid="cog-icon-(Project1)"]')
        .first()
        .locator('button:has-text("Delete")')
        .click();

    await expect(
        page
            .locator('[data-testid="delete-popup-(Project1)"]')
            .locator(
                'p:has-text("This will delete the project and all data in it. This action cannot be undone.")'
            )
    ).toHaveCount(1);

    await page.click('button:has-text("Confirm") >> visible=true');

    await expect(page.locator(`h1:has-text("Project1")`)).toHaveCount(0);

    await expect(page.locator(`h1:has-text("new project")`)).toHaveCount(1);

    await page.locator(new_project_locator).first().click();
    await expect(page.locator('p', { hasText: /Rename|Clone/ })).toHaveCount(2); // No more delete
});

// This test checks that the user can clone existing projects, and they will have their own data
test('should be able to clone projects', async ({ page }) => {
    const name = uuid();
    const theme = uuid();
    const category = uuid();

    // Initial project
    await expect(page.locator('h1:has-text("new project")')).toHaveCount(1);
    await page.locator(new_project_locator).first().click();
    await expect(
        page.locator(new_project_locator).first().locator(rename_button_locator)
    ).toHaveCount(1);
    await page
        .locator(new_project_locator)
        .first()
        .locator(rename_button_locator)
        .click();
    await expect(
        page.locator(rename_popup_locator).locator(rename_input_locator)
    ).toHaveCount(1);
    await page
        .locator(rename_popup_locator)
        .locator(rename_input_locator)
        .fill(name);
    await expect(
        page.locator(rename_popup_locator).locator(rename_input_locator)
    ).toHaveValue(name);
    await page.click('button:has-text("Confirm") >> visible=true');
    await expect(page.locator(`h1:has-text("${name}")`)).toBeDefined();

    // Give the project some data
    const prompt_input = `Input in project ${name}, with theme ${theme} and category ${category}`;

    await page.locator(`h1:has-text("${name}")`).first().click();
    await expect(page).toHaveURL('/about');

    await page.click(theme_input_locator);
    await page.fill(theme_input_locator, theme);
    await page.locator(theme_input_locator).blur();

    await expect(
        page.locator('div:has-text("Your progress has been saved")')
    ).toBeDefined();
    await expect(
        page.locator('div:has-text("Your progress has been saved")')
    ).toHaveCount(0); //Autosave finished

    await expect(page.locator(theme_input_locator)).toHaveValue(theme);

    await page.locator('[data-testid="navdrawer-button"]').first().click();
    await expect(page.getByRole('link', { name: 'Panel-1' })).toHaveCount(1);
    await page.getByRole('link', { name: 'Panel-1' }).click();
    await expect(page).toHaveURL(/\/panels\/.*/); // Match path, e.g. /panels/aDk4io9eRts
    await page.click(category_input_locator); // Closes nav drawer

    await page.fill(category_input_locator, category);
    await page.fill('textarea[placeholder="User input here"]', prompt_input);
    await expect(
        page.locator('textarea[placeholder="AI generated content"]')
    ).toHaveText('');
    await page.hover('[data-testid="hover-area"]');
    await page.click('button:has-text("Generate")');
    await expect(
        page.locator('textarea[placeholder="AI generated content"]')
    ).toContainText(
        `Write a game flavor text for ${prompt_input} which is a ${category} in a ${theme} setting`
    );

    // Save
    await page
        .getByTestId('panel-settings')
        .first()
        .getByTestId('icon-button')
        .click();
    await page.click('button:has-text("Save")');

    await page.locator('[data-testid="navdrawer-button"]').first().click();
    await expect(page.getByRole('link', { name: 'Projects' })).toHaveCount(1);
    await page.getByRole('link', { name: 'Projects' }).click();

    await expect(page).toHaveURL('/projects');

    // Lose focus from navdrawer
    await page.click('h1:has-text("AI-assisted game content creator")');

    // Clone project
    await page.locator(`[data-testid="cog-icon-(${name})"]`).first().click();
    await expect(
        page
            .locator(`[data-testid="cog-icon-(${name})"]`)
            .first()
            .locator('button:has-text("Clone")')
    ).toHaveCount(1);
    await page
        .locator(`[data-testid="cog-icon-(${name})"]`)
        .first()
        .locator('button:has-text("Clone")')
        .click();
    await expect(page.locator(`h1:has-text("${name} clone")`)).toBeDefined();

    // Check that the clone has original data

    // Go to project
    await page.locator(`h1:has-text("${name} clone")`).first().click();
    await expect(page).toHaveURL('/about');

    await expect(page.locator(theme_input_locator)).toHaveValue(theme);

    await page.locator('[data-testid="navdrawer-button"]').first().click();
    await expect(page.getByRole('link', { name: category })).toHaveCount(1);
    await page.getByRole('link', { name: category }).click();
    await expect(page).toHaveURL(/\/panels\/.*/); // Match path, e.g. /panels/aDk4io9eRts
    await page.click(category_input_locator); // Closes nav drawer

    await expect(page.locator(category_input_locator)).toHaveValue(category);
    await expect(
        page.locator('textarea[placeholder="User input here"]')
    ).toHaveText(prompt_input);
    await expect(
        page.locator('textarea[placeholder="AI generated content"]')
    ).toContainText(
        `Write a game flavor text for ${prompt_input} which is a ${category} in a ${theme} setting`
    );

    // Change category, this should not affect the original project

    await page.click(category_input_locator);
    await page.fill(category_input_locator, 'Data that was changed');
    await expect(page.locator(category_input_locator)).toHaveValue(
        'Data that was changed'
    );

    // Save
    await page
        .getByTestId('panel-settings')
        .first()
        .getByTestId('icon-button')
        .click();
    await page.click('button:has-text("Save")');

    await page.locator('[data-testid="navdrawer-button"]').first().click();
    await expect(page.getByRole('link', { name: 'Projects' })).toHaveCount(1);
    await page.getByRole('link', { name: 'Projects' }).click();

    await expect(page).toHaveURL('/projects');

    // Lose focus from navdrawer
    await page.click('h1:has-text("AI-assisted game content creator")');

    // Check back on original project

    await expect(page.locator(`h1:has-text("${name}")`)).toBeDefined();

    // Go to project
    await page.locator(`h1:has-text("${name}")`).first().click();
    await expect(page).toHaveURL('/about');

    await expect(page.locator(theme_input_locator)).toHaveValue(theme);

    await page.locator('[data-testid="navdrawer-button"]').first().click();
    await expect(page.getByRole('link', { name: category })).toHaveCount(1);
    await page.getByRole('link', { name: category }).click();
    await expect(page).toHaveURL(/\/panels\/.*/); // Match path, e.g. /panels/aDk4io9eRts
    await page.click(category_input_locator); // Closes nav drawer

    await expect(page.locator(category_input_locator)).toHaveValue(category);
    await expect(
        page.locator('textarea[placeholder="User input here"]')
    ).toHaveText(prompt_input);
    await expect(
        page.locator('textarea[placeholder="AI generated content"]')
    ).toContainText(
        `Write a game flavor text for ${prompt_input} which is a ${category} in a ${theme} setting`
    );

    await page.locator('[data-testid="navdrawer-button"]').first().click();
    await expect(page.getByRole('link', { name: 'Projects' })).toHaveCount(1);
    await page.getByRole('link', { name: 'Projects' }).click();

    await expect(page).toHaveURL('/projects');
});
