const ch = require('child_process');

let timestamp, commit;

ch.exec('git show -s --format=%ci HEAD', (error, stdout, stderr) => {
    console.log(stderr);
    console.log(stdout);
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    timestamp = stdout;
});

ch.exec('git rev-parse --short HEAD', (error, stdout, stderr) => {
    console.log(stderr);
    console.log(stdout);
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    commit = stdout;
});

console.log(timestamp);
console.log(commit);

if (timestamp && commit) {
    ch.exec(
        `${timestamp}-${commit} > ./backend/files/timestamp-commit`,
        (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
        }
    );
}
