describe('Prompt generation', () => {
    const output_locator = 'textarea[placeholder*="AI generated content"]';
    const category_input = 'category input from cypress';
    const prompt_input = 'prompt input from cypress';
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

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

    it('should have generate button locked without prompt input', () => {
        cy.get(output_locator).invoke('text').should('be.empty');
        cy.get('button:contains("Generate")').first().should('be.disabled');
    });

    it('should generate all boxes with generate all button', () => {
        const numExtra = 3;
        cy.get('input[placeholder*="category"]').type(category_input);
        cy.get(output_locator).invoke('text').should('be.empty');
        cy.get('[data-testid="prompt"]').should('have.length', 1);
        for (let i = 1; i <= numExtra; i++) {
            cy.get('[data-testid="fab-button"]').click();
        }
        cy.get('[data-testid="prompt"]').should('have.length', 1 + numExtra);
        cy.get('textarea[placeholder*="User input here"]').each(
            (el, index, _list) => {
                cy.wrap(el).type(`${prompt_input} ${index}`);
            }
        );
        cy.get(
            '[data-testid="custom-button"]:contains("Generate all")'
        ).click();
        cy.get(output_locator).each((el, index, _list) => {
            cy.wrap(el).should(
                'include.text',
                `Theme: ${category_input}\\n${prompt_input} ${index}`
            );
        });
    });

    it('has IOBox delete button while multiple on screen', () => {
        const deleteSelector =
            '[data-testid="custom-button"]:contains("Delete")';
        cy.get(deleteSelector).should('not.exist');
        cy.get('[data-testid="fab-button"]').click();
        cy.get(deleteSelector).should('have.length', 2);
        cy.get(deleteSelector).first().click();
        cy.get(deleteSelector).should('not.exist');
    });
});
