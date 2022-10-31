import http from 'http';
import { app } from './app';

const PORT = process.env.PORT || 3030;

const server = http.createServer(app);

if (process.env.NODE_ENV !== 'test')
    server.listen(PORT, () =>
        console.log(`server running on http://localhost:${PORT}`)
    );

export { server };
