import http from 'http';
import { app } from './app';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 3030;

const server = http.createServer(app);

if (process.env.NODE_ENV !== 'test')
    server.listen(PORT, () =>
        logger.debug(`server running on http://localhost:${PORT}`)
    );

export { server };
