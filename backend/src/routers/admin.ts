import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Adapter, Resource, Database } from '@adminjs/sql';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import passwordsFeature from '@adminjs/passwords';

AdminJS.registerAdapter({ Database, Resource });
const rootPath = '/admin/adminjs';

const getAdminRouter = async (): Promise<Router> => {
    const db = await new Adapter('postgresql', {
        connectionString:
            'postgres://adminjs:adminjs@localhost:5432/aalto_backend',
        database: 'aalto_backend',
    }).init();

    const admin = new AdminJS({
        rootPath,
        resources: [
            {
                resource: db.table('users'),
                options: {
                    properties: { password_hash: { isVisible: false } },
                },
                features: [
                    passwordsFeature({
                        properties: {
                            encryptedPassword: 'password_hash',
                            password: 'newPassword',
                        },
                        hash: async (password) => {
                            const saltRounds = 10;
                            const salt = await bcrypt.genSalt(saltRounds);
                            const hash = await bcrypt.hash(password, salt);
                            return hash;
                        },
                    }),
                ],
            },
            { resource: db.table('projects'), options: {} },
        ],
        //databases: [db],
    });
    const adminRouter = AdminJSExpress.buildRouter(admin);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    admin.watch();

    return adminRouter;
};

export { getAdminRouter, rootPath };
