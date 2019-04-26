import browser from './config/browser';

/*
* Separated to have different configs for webpack compiler.
* Useful in devServer.
* */
export default browser({ development: true, production: false });
