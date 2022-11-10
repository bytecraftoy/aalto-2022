import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../App';
import { randomInt } from 'crypto';
import { act } from 'react-dom/test-utils';
import { randomUUID } from 'crypto';

//randomUUID isn't normally usable for reac-dom tests, so add it explicitly
Object.defineProperty(global.self, 'crypto', {
    value: {
        randomUUID: () => randomUUID(),
    },
});

test('Should contain a button for adding promptIOBoxes', () => {
    act(() => {
        render(<App />);
    });
    const addButton = screen.queryByText<HTMLButtonElement>('Add box');
    expect(addButton).toBeInTheDocument();
});

test('Button should add arbitrary many promptIOBoxes', () => {
    act(() => {
        render(<App />);
    });
    const addButton = screen.getByText<HTMLButtonElement>('Add box');

    const nClicks = randomInt(3, 18);
    for (let i = 0; i < nClicks; i++) {
        act(() => {
            addButton.click();
        });
    }

    expect(
        screen.getAllByText<HTMLElement>('Prompt').length
    ).toBeGreaterThanOrEqual(nClicks);
    expect(
        screen.getAllByPlaceholderText<HTMLTextAreaElement>('User input here')
            .length
    ).toBeGreaterThanOrEqual(nClicks);
    expect(
        screen.getAllByPlaceholderText<HTMLTextAreaElement>(
            'AI generated content'
        ).length
    ).toBeGreaterThanOrEqual(nClicks);
});

test('PromptIOBoxes should have a remove button', () => {
    act(() => {
        render(<App />);
    });
    const addButton = screen.getByText<HTMLButtonElement>('Add box');

    const nClicks = randomInt(3, 18);
    for (let i = 0; i < nClicks; i++) {
        act(() => {
            addButton.click();
        });
    }

    const removeButtons = screen.getAllByText<HTMLButtonElement>('Delete');
    removeButtons.forEach((b) => expect(b).toBeInTheDocument());
    expect(removeButtons.length).toBeGreaterThanOrEqual(nClicks);
});

test('Remove button should delete the correct promptIOBox', () => {
    act(() => {
        render(<App />);
    });

    const addButton = screen.getByText<HTMLButtonElement>('Add box');

    const nClicks = randomInt(3, 18);
    for (let i = 0; i < nClicks; i++) {
        act(() => {
            addButton.click();
        });
    }

    const inputArea =
        screen.getAllByPlaceholderText<HTMLTextAreaElement>(
            'User input here'
        )[0];
    expect(inputArea).toBeInTheDocument();

    act(() => {
        inputArea.id = 'TestEl';
        inputArea.title = 'TestEl';
    });

    expect(
        screen.getByTitle<HTMLTextAreaElement>('TestEl')
    ).toBeInTheDocument();
    const buttons = inputArea.parentElement?.getElementsByClassName(
        'rounded-lg hover:bg-slate-500 focus:outline-textcolor'
    );
    expect(buttons?.length).toBeGreaterThan(1);
    const delButton = buttons?.[1] as HTMLButtonElement | undefined;

    act(() => {
        delButton?.click();
    });

    expect(document.getElementById('TestEl')).toBeNull();
});

test('PromptIOBoxes should have no remove button if there are only one of them', () => {
    act(() => {
        render(<App />);
    });
    const addButton = screen.getByText<HTMLButtonElement>('Add box');

    act(() => {
        addButton.click();
    });
    act(() => {
        addButton.click();
    });
    act(() => {
        addButton.click();
    });

    expect(
        screen.getAllByText<HTMLElement>('Prompt').length
    ).toBeGreaterThanOrEqual(3);

    expect(screen.getAllByText<HTMLButtonElement>('Delete').length).toBe(3);

    act(() => {
        screen.queryAllByText<HTMLButtonElement>('Delete')[0]?.click();
    });
    act(() => {
        screen.queryAllByText<HTMLButtonElement>('Delete')[0]?.click();
    });
    act(() => {
        screen.queryAllByText<HTMLButtonElement>('Delete')[0]?.click();
    });

    expect(screen.queryByText<HTMLButtonElement>('Delete')).toBeNull();

    expect(
        screen.getAllByPlaceholderText<HTMLTextAreaElement>('User input here')
            .length
    ).toBeGreaterThanOrEqual(1);
});
