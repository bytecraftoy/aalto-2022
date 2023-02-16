describe('Prompt generation', () => {
    // The output_locator, category_input, and prompt_input variables are used to target specific elements on the page.
    const output_locator = 'textarea[placeholder*="AI generated content"]';
    const category_input = 'category input from cypress';
    const prompt_input = 'prompt input from cypress';

    before(() => {
        cy.visit('http://localhost:3000/');
        cy.location('pathname').should('eq', '/login/');
        cy.wait(100);
        cy.get('button:contains("Sign up")').first().click();
        cy.location('pathname').should('eq', '/register');
        cy.wait(100);
        cy.get('span:contains("Username")')
            .parent()
            .children()
            .filter('input')
            .first()
            .type('testuser', { force: true });
        cy.get('span:contains("Password")')
            .parent()
            .children()
            .filter('input')
            .first()
            .type('salasana', { force: true });
        cy.get('span:contains("Repeat password")')
            .parent()
            .children()
            .filter('input')
            .first()
            .type('salasana', { force: true });
        cy.get('span:contains("Key")')
            .parent()
            .children()
            .filter('input')
            .first()
            .type(Cypress.env('REGISTER_KEY'), { force: true });
        cy.wait(100);
        cy.get('button:contains("Create account")')
            .get('[data-testid="custom-button"]')
            .first()
            .click();
        cy.location('pathname').should('eq', '/');
    });

    let first = true;
    // The tests start by visiting the localhost URL for the application.
    beforeEach(() => {
        if (first) {
            first = false;
            return;
        }
        cy.visit('http://localhost:3000/');
        cy.location('pathname').should('eq', '/login/');
        cy.get('span:contains("Username")')
            .parent()
            .children()
            .filter('input')
            .first()
            .type('testuser', { force: true });
        cy.get('span:contains("Password")')
            .parent()
            .children()
            .filter('input')
            .first()
            .type('salasana', { force: true });
        cy.wait(100);
        cy.get('button:contains("Log in")')
            .get('[data-testid="custom-button"]')
            .first()
            .click();
        cy.location('pathname').should('eq', '/');
    });

    // This test is for checking that the "Generate" button is locked when there is no prompt input.
    // It starts by checking that the output text area is empty, which confirms that there is no prompt input.
    // Next, it asserts that there is no "Generate" button, since there is no prompt input.
    it('should have no generate button without prompt input', () => {
        cy.get(output_locator).invoke('text').should('be.empty');
        cy.get('[data-testid="iobox-Generate"]').should('not.exist');
    });

    it('has IOBox delete button while multiple on screen', () => {
        const deleteSelector = '[data-testid="iobox-Delete"]';
        // Asserts that there is no delete button
        cy.get(deleteSelector).should('not.exist');
        // Clicks the add prompt button
        cy.get('[data-testid="fab-button"]').click();
        // Asserts that there are 2 delete buttons (1 for each IOBox)
        cy.get(deleteSelector).should('have.length', 2);
        // Hovers and clicks the first delete button
        cy.get('[data-testid="hover-area"]').first().realHover();
        // Clicks the first delete button
        cy.get(deleteSelector).first().children().first().click();
        // Asserts that there is no delete button (since the first IOBox was deleted)
        cy.get(deleteSelector).should('not.exist');
    });

    // This test is for checking the prompt generation feature on the application.
    // The test inputs a value for the category and prompt fields and checks that the output text area is empty.
    // Next, it clicks the "Generate" button and asserts that the output text area includes the input category and prompt.
    it('should generate a prompt and get result', () => {
        cy.get('input[placeholder*="category"]').first().type(category_input);
        cy.get('textarea[placeholder*="User input here"]').type(prompt_input);
        cy.get(output_locator).invoke('text').should('be.empty');
        cy.get('[data-testid="hover-area"]').realHover();
        cy.wait(100);
        cy.get('button:contains("Generate")').first().click();
        cy.wait(100);
        cy.get(output_locator).should(
            'include.text',
            `Theme: ${category_input}\\n${prompt_input}`
        );
    });

    it(
        'should generate all boxes with generate all button',
        { defaultCommandTimeout: 10000 },
        () => {
            const numExtra = 3;
            // Inputs a value for category
            //cy.get('input[placeholder*="category"]').type(category_input);
            // Confirms that the output text area is empty
            //cy.get(output_locator).invoke('text').should('be.empty');
            // Confirms that there is 1 prompt
            cy.get('[data-testid="prompt"]').should('have.length', 1);
            for (let i = 1; i <= numExtra; i++) {
                // Clicks the add prompt button to add extra prompts
                cy.get('[data-testid="fab-button"]').click();
            }
            // Confirms that the number of prompts matches the number of extra prompts added
            cy.get('[data-testid="prompt"]').should(
                'have.length',
                1 + numExtra
            );
            cy.get('textarea[placeholder*="User input here"]').each(
                (el, index, _list) => {
                    // Inputs a value for each prompt
                    cy.wrap(el).type(
                        `{selectall}{backspace}${prompt_input} ${index}`
                    );
                }
            );
            // Clicks the generate all button
            cy.wait(100);
            cy.get(
                '[data-testid="custom-button"]:contains("Generate all")'
            ).click();
            cy.wait(100);
            cy.get(output_locator).each((el, index, _list) => {
                // Asserts that each output text area includes the input category and prompt
                cy.wrap(el).should(
                    'include.text',
                    `Theme: ${category_input}\\n${prompt_input} ${index}`
                );
            });
        }
    );
});
