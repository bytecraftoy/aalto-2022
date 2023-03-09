import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Adapter, Resource, Database } from '@adminjs/sql';
import { Router } from 'express';

AdminJS.registerAdapter({ Database, Resource });
const rootPath = '/admin/adminjs';

const getAdminRouter = async (): Promise<Router> => {
    /*
    const db = await new Adapter('postgresql', {
        connectionString:
            'postgres://adminjs:adminjs@localhost:5432/adminjs_panel',
        database: 'adminjs_panel',
    }).init();
    */

    const admin = new AdminJS({
        rootPath,
        /*resources: [{ resource: db.table('projects'), options: {} }],*/
    });
    const adminRouter = AdminJSExpress.buildRouter(admin);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    admin.watch();

    return adminRouter;
};

export { getAdminRouter, rootPath };
