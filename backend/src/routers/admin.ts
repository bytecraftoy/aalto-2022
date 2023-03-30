import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Adapter, Resource, Database } from '@adminjs/sql';
import { Router } from 'express';
import passwordsFeature from '@adminjs/passwords';
import { hashPassword } from '../services/userService';

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

const getAdminRouter = async (): Promise<Router> => {
    const connectionString = buildConnectionString();
    const database = getDatabaseName();
    const db = await new Adapter('postgresql', {
        connectionString,
        database,
    }).init();

    const admin = new AdminJS({
        rootPath,
        resources: [
            {
                resource: db.table('users'),
                options: {
                    properties: {
                        password_hash: { isVisible: false },
                        settings: { isVisible: false },
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
                options: {
                    properties: { data: { isVisible: false } },
                },
            },
        ],
    });
    const adminRouter = AdminJSExpress.buildRouter(admin);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    admin.watch();

    return adminRouter;
};

export { getAdminRouter, rootPath };
