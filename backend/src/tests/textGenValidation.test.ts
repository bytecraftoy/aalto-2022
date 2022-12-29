import { ZodError } from 'zod';
import { validateApiRequest } from '../services';
import { ApiRequest } from '../types';

const example = {
    contexts: ['context1', 'context2'],
    prompt: 'What is your favorite color?',
    id: '4deafcdc-7207-4c12-8193-59eeb82f1d0f',
};

const validate = async (args: ApiRequest): Promise<ApiRequest> => {
    return await validateApiRequest(JSON.stringify(args));
};

describe('Textgen request validation', () => {
    test('Valid request is parsed succesfully', async () => {
        await expect(validate(example)).resolves.not.toThrow();
    });

    test('Prompt with no text throws exception', async () => {
        const dict1 = { ...example, prompt: '' };
        await expect(validate(dict1)).rejects.toThrow(ZodError);
        const dict2 = { ...example, prompt: '  \n' };
        await expect(validate(dict2)).rejects.toThrow(ZodError);
    });

    test('Missing contexts throws exception', async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { contexts, ...rest } = example;
        await expect(validate(rest as ApiRequest)).rejects.toThrow(ZodError);
    });

    test('Missing prompt throws exception', async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { prompt, ...rest } = example;
        await expect(validate(rest as ApiRequest)).rejects.toThrow(ZodError);
    });

    test('Missing id throws exception', async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = example;
        await expect(validate(rest as ApiRequest)).rejects.toThrow(ZodError);
    });

    test('Bad id throws exception', async () => {
        const dict = { ...example, id: 'BADUID123' };
        await expect(validate(dict)).rejects.toThrow(ZodError);
    });

    test('Null throws exception', async () => {
        await expect(validate(null as unknown as ApiRequest)).rejects.toThrow(
            ZodError
        );
    });

    test('Empty dict throws exception', async () => {
        await expect(validate({} as ApiRequest)).rejects.toThrow(ZodError);
    });

    test('Extra parameters do not throw error', async () => {
        const dict = { extra: 'asd', ...example };
        await expect(validate(dict)).resolves.not.toThrow();
    });

    test('Non-string prompt throws exception', async () => {
        const dict = { ...example, prompt: 2 };
        await expect(validate(dict as unknown as ApiRequest)).rejects.toThrow(
            ZodError
        );
    });

    test('Non-array contexts throws exception', async () => {
        const dict = { ...example, contexts: 'asdlol' };
        await expect(validate(dict as unknown as ApiRequest)).rejects.toThrow(
            ZodError
        );
    });
});
