describe('Generate a prompt and check output', () => {
    const output_locator = 'textarea[placeholder*="AI generated content"]';
    const category_input = 'category input from cypress';
    const prompt_input = 'prompt input from cypress';

    it('Opens the page', () => {
        cy.visit('http://localhost:3000/');
    });
    it('Write text in category prompt', () => {
        cy.get('input[placeholder*="category"]').type(category_input);
    });
    it('Write user input for first prompt', () => {
        cy.get('textarea[placeholder*="User input here"]').type(prompt_input);
    });
    it('Output box should be empty', () => {
        cy.get(output_locator).invoke('text').should('be.empty');
    });
    it('Push Generate button', () => {
        cy.get('button:contains("Generate")').first().click();
    });
    it('Output box should have text', () => {
        cy.get(output_locator).should(
            'include.text',
            `Theme: ${category_input}\\n${prompt_input}`
        );
    });
});
