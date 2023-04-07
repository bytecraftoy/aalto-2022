'use strict';

/**
 * This script is a cross-platform solution for copying
 * the contents of one folder to another folder recursively.
 */

const fs = require('fs').promises;

/**
 * Wrap a promise inside another promise that will never reject.
 * If the first promise rejects ok will be set to false
 * and the error object will be saved to result.
 * @param {Promise<T>} promise
 * @returns {Promise<{ok: true, result: T} | {ok: false, result: Error}>}
 */
const safePromise = async (promise) => {
    try {
        return { ok: true, result: await promise };
    } catch (e) {
        return { ok: false, result: e };
    }
};

/**
 * Copy the contents of a folder in parallel.
 * Creates the destination folder if it does not exist.
 * Throws an error if the destination folder can not be created.
 * @param {string} from
 * @param {string} to
 */
const copyFolder = async (from, to) => {
    if (!from.endsWith('/')) from += '/';
    if (!to.endsWith('/')) to += '/';
    /**@type {Promise<{ok: true, result: *} | {ok: false, result: Error}>[]} */
    const promises = [];
    //check that the destination directory exists
    try {
        await fs.access(to);
    } catch {
        //try to create the destination directory (this can fail)
        await fs.mkdir(to);
    }
    //start copying the files in parallel
    for (const f of await fs.readdir(from, { withFileTypes: true }))
        promises.push(
            safePromise(
                (f.isDirectory() ? copyFolder : fs.copyFile)(
                    from + f.name,
                    to + f.name
                )
            )
        );
    //wait for the files to be copied
    for (const p of promises) {
        const res = await p;
        if (!res.ok) console.error(res.result);
    }
};

(async () => {
    if (process.argv.length !== 4) {
        console.log('Use:\nnode copyFolder.js <source> <destination>');
        return;
    }
    const from = process.argv[2];
    const to = process.argv[3];
    try {
        await copyFolder(from, to);
    } catch (err) {
        console.error(err);
    }
})();
