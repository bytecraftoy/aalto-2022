import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../../App';
import { act } from 'react-dom/test-utils';
// For debugging
//import { prettyDOM } from '@testing-library/react';

//Removed crypto, so we don't have crypto.randomInt for tests
//Replacing it with Math.random. It's not cryptographically random
//but does it need to be for tests?
const randomInt = (min: number, max: number) => {
    return Math.floor(min + Math.random() * (max - min));
};

test('Should contain a button for adding promptIOBoxes', () => {
    act(() => {
        render(<App />);
    });
    const addButton = screen.queryByTestId<HTMLButtonElement>('fab-button');
    expect(addButton).toBeInTheDocument();
});

test('Button should add arbitrary many promptIOBoxes', () => {
    act(() => {
        render(<App />);
    });
    const addButton = screen.getByTestId<HTMLButtonElement>('fab-button');

    const nClicks = randomInt(3, 18);
    for (let i = 0; i < nClicks; i++) {
        act(() => {
            addButton.click();
        });
    }

    expect(
        screen.getAllByTestId<HTMLElement>('prompt').length
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
    const addButton = screen.getByTestId<HTMLButtonElement>('fab-button');

    const nClicks = randomInt(3, 18);
    for (let i = 0; i < nClicks; i++) {
        act(() => {
            addButton.click();
        });
    }

    const removeButtons = screen.getAllByTestId<HTMLDivElement>('iobox-Delete');
    removeButtons.forEach((b) => expect(b).toBeInTheDocument());
    expect(removeButtons.length).toBeGreaterThanOrEqual(nClicks);
});

test('Remove button should delete the correct promptIOBox', () => {
    act(() => {
        render(<App />);
    });

    const addButton = screen.getByTestId<HTMLButtonElement>('fab-button');

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

    const buttons =
        inputArea.parentElement?.parentElement?.parentElement?.children[0].getElementsByTagName(
            'button'
        );
    expect(buttons?.length).toBeGreaterThan(0);
    const delButton = buttons?.[buttons?.length - 1] as
        | HTMLButtonElement
        | undefined;

    act(() => {
        delButton?.click();
    });

    expect(document.getElementById('TestEl')).toBeNull();
});

test('PromptIOBoxes should have no remove button if there are only one of them', () => {
    act(() => {
        render(<App />);
    });
    const addButton = screen.getByTestId<HTMLButtonElement>('fab-button');

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
        screen.getAllByTestId<HTMLElement>('prompt').length
    ).toBeGreaterThanOrEqual(3);

    expect(
        screen.getAllByTestId<HTMLButtonElement>('iobox-Delete').length
    ).toBeGreaterThanOrEqual(3);

    //Try to repeatedly remove boxes so there is none left
    for (let i = 0; i < 10; i++) {
        act(() => {
            const button = screen.queryAllByTestId<HTMLButtonElement>(
                'iobox-Delete'
            )[0]?.children[0] as HTMLButtonElement | undefined;
            button?.click();
        });
    }

    expect(screen.queryByTestId<HTMLButtonElement>('iobox-Delete')).toBeNull();

    expect(
        screen.getAllByPlaceholderText<HTMLTextAreaElement>('User input here')
            .length
    ).toBeGreaterThanOrEqual(1);
});
