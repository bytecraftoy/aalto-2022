const ch = require('child_process');
const fs = require('fs');
const timestamp = ch.execSync('git show -s --format=%ci HEAD');
const commit = ch.execSync('git rev-parse --short HEAD');

if (timestamp && commit) {
    const t = timestamp.toString().trim().split(' ');
    const c = commit.toString().trim();
    const tc = `${t[0]}T${t[1]}${t[2]}-${c}`;
    fs.writeFile(
        './backend/files/timestamp-commit',
        tc,
        { flag: 'w' },
        (err) => {
            if (err) throw err;
            console.log(`timestamp-commit: ${tc}`);
        }
    );
}
