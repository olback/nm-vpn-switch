import { env } from 'process';

const d = () => {}

let log, warn, error;

if (env.NODE_ENV === 'dev') {

    log = console.log;
    warn = console.warn;
    error = console.error;

} else {

    log = d;
    warn = d;
    error = d;
}

export {
    log,
    warn,
    error
}

