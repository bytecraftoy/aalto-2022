import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../App';

test('Contains a button to generate content', () => {
    render(<App />);
    //const linkElement = screen.getByText(/learn react/i);
    //expect(linkElement).toBeInTheDocument();
    const button = screen.getByText('Generate content');
    expect(button).toBeInTheDocument();
});
