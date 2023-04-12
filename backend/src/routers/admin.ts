import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Adapter, Resource, Database } from '@adminjs/sql';
import { Router } from 'express';
import passwordsFeature from '@adminjs/passwords';
import { checkPassword, hashPassword } from '../services/userService';
import Connect from 'connect-pg-simple';
import session from 'express-session';
import { isProduction } from '../utils/env';
import { selectUserRole } from '../db/queries';

AdminJS.registerAdapter({ Database, Resource });
const rootPath = '/admin/adminjs';

const getDatabaseName = (): string => {
    return process.env.POSTGRES_DB ?? 'postgres';
};

const buildConnectionString = (): string => {
    const user = process.env.POSTGRES_ADMINJS_USER;
    const host = 'localhost';
    const database = getDatabaseName();
    const password = process.env.POSTGRES_ADMINJS_PASSWORD;
    const port = parseInt(process.env.POSTGRES_PORT ?? '5432');
    return `postgres://${user}:${password}@${host}:${port}/${database}`;
};

const authenticate = async (email: string, password: string) => {
    const user = await checkPassword(email, password);
    if (!user.success) {
        return null;
    }

    const role = await selectUserRole(user.message);
    if (role == 'admin' || role == 'superadmin') {
        return Promise.resolve({ email, password });
    }

    return null;
};

const getAdminRouter = async (): Promise<Router> => {
    const connectionString = buildConnectionString();
    const database = getDatabaseName();
    const db = await new Adapter('postgresql', {
        connectionString,
        database,
    }).init();

    const ConnectSession = Connect(session);
    const sessionStore = new ConnectSession({
        conObject: {
            connectionString,
        },
        tableName: 'adminjs_sessions',
        createTableIfMissing: true,
    });

    const admin = new AdminJS({
        rootPath,
        loginPath: `${rootPath}/login`,
        logoutPath: `${rootPath}/logout`,
        resources: [
            {
                resource: db.table('users'),
                options: {
                    properties: {
                        password_hash: { isVisible: false },
                    },
                },
                features: [
                    passwordsFeature({
                        properties: {
                            encryptedPassword: 'password_hash',
                            password: 'newPassword',
                        },
                        hash: hashPassword,
                    }),
                ],
            },
            {
                resource: db.table('projects'),
                options: {},
            },
        ],
    });

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'sessionsecret',
        },
        null,
        {
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
            secret: 'sessionsecret',
            cookie: {
                httpOnly: isProduction,
                secure: isProduction,
            },
            name: 'adminjs',
        }
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    admin.watch();

    return adminRouter;
};

export { getAdminRouter, rootPath };
