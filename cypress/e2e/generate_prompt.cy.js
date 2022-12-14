describe('Prompt generation', () => {
    // The output_locator, category_input, and prompt_input variables are used to target specific elements on the page.
    const output_locator = 'textarea[placeholder*="AI generated content"]';
    const category_input = 'category input from cypress';
    const prompt_input = 'prompt input from cypress';

    // The tests start by visiting the localhost URL for the application.
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    // This test is for checking the prompt generation feature on the application.
    // The test inputs a value for the category and prompt fields and checks that the output text area is empty.
    // Next, it clicks the "Generate" button and asserts that the output text area includes the input category and prompt.
    it('should generate a prompt and get result', () => {
        cy.get('input[placeholder*="category"]').type(category_input);
        cy.get('textarea[placeholder*="User input here"]').type(prompt_input);
        cy.get(output_locator).invoke('text').should('be.empty');
        cy.get('button:contains("Generate")').first().click();
        cy.get(output_locator).should(
            'include.text',
            `Theme: ${category_input}\\n${prompt_input}`
        );
    });

    // This test is for checking that the "Generate" button is locked when there is no prompt input.
    // It starts by checking that the output text area is empty, which confirms that there is no prompt input.
    // Next, it asserts that the "Generate" button is disabled, which confirms that the button is locked without prompt input.
    it('should have generate button locked without prompt input', () => {
        cy.get(output_locator).invoke('text').should('be.empty');
        cy.get('button:contains("Generate")').first().should('be.disabled');
    });

    it('should generate all boxes with generate all button', () => {
        const numExtra = 3;
        // Inputs a value for category
        cy.get('input[placeholder*="category"]').type(category_input);
        // Confirms that the output text area is empty
        cy.get(output_locator).invoke('text').should('be.empty');
        // Confirms that there is 1 prompt
        cy.get('[data-testid="prompt"]').should('have.length', 1);
        for (let i = 1; i <= numExtra; i++) {
            // Clicks the add prompt button to add extra prompts
            cy.get('[data-testid="fab-button"]').click();
        }
        // Confirms that the number of prompts matches the number of extra prompts added
        cy.get('[data-testid="prompt"]').should('have.length', 1 + numExtra);
        cy.get('textarea[placeholder*="User input here"]').each(
            (el, index, _list) => {
                // Inputs a value for each prompt
                cy.wrap(el).type(`${prompt_input} ${index}`);
            }
        );
        // Clicks the generate all button
        cy.get(
            '[data-testid="custom-button"]:contains("Generate all")'
        ).click();
        cy.get(output_locator).each((el, index, _list) => {
            // Asserts that each output text area includes the input category and prompt
            cy.wrap(el).should(
                'include.text',
                `Theme: ${category_input}\\n${prompt_input} ${index}`
            );
        });
    });

    it('has IOBox delete button while multiple on screen', () => {
        const deleteSelector =
            '[data-testid="custom-button"]:contains("Delete")';
        // Asserts that there is no delete button
        cy.get(deleteSelector).should('not.exist');
        // Clicks the add prompt button
        cy.get('[data-testid="fab-button"]').click();
        // Asserts that there are 2 delete buttons (1 for each IOBox)
        cy.get(deleteSelector).should('have.length', 2);
        // Clicks the first delete button
        cy.get(deleteSelector).first().click();
        // Asserts that there is no delete button (since the first IOBox was deleted)
        cy.get(deleteSelector).should('not.exist');
    });
});
