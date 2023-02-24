import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Adapter, Resource, Database } from '@adminjs/sql';

AdminJS.registerAdapter({ Database, Resource });
const rootPath = '/admin/adminjs';

const db = await new Adapter('postgresql', {
    connectionString: 'postgres://adminjs:adminjs@localhost:5432/adminjs_panel',
    database: 'adminjs_panel',
}).init();

const admin = new AdminJS({ rootPath });
const adminRouter = AdminJSExpress.buildRouter(admin);

admin.watch()

export { adminRouter, rootPath };
