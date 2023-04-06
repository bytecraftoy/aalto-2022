import { Router, Response } from 'express';

const statusRouter = Router();

// Express get route which send back the dotenv ENVIRONMENT status to the frontend
statusRouter.get('/', (_, res: Response) => {
    const environment =
        process.env.ENVIRONMENT === 'openai'
            ? 'OpenAI text-davinci-003'
            : 'Dummy service';

    res.json({ environment });
});

export { statusRouter };
