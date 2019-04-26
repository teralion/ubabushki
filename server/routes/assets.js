import fs from 'fs';
import request from 'request';
import mime from 'mime/lite';

function getDevAsset(ctx) {
  if (GLOBALS.DEV_SERVER_PORT) {
    ctx.body = request(
      `http://localhost:${GLOBALS.DEV_SERVER_PORT}${GLOBALS.PUBLIC_PATH}${ctx.filename}`,
    );
  } else {
    /* eslint-disable-next-line no-console */
    console.warn('NO DEV_SERVER_PORT');
  }
}

function getProdAsset(ctx) {
  ctx.body = fs.createReadStream(`build/${ctx.filename}`);
}

function getUnknownAsset(ctx) {
  ctx.body = `No ${GLOBALS.PUBLIC_PATH} found`;
  ctx.status = 404;
}

function getMime(filename) {
  return mime.getType(filename) || 'text/plain';
}

function getAsset(ctx) {
  ctx.set({ 'Content-Type': getMime(ctx.filename) });

  if (process.env.NODE_ENV === 'development') {
    getDevAsset(ctx);
  } else if (process.env.NODE_ENV === 'production') {
    getProdAsset(ctx);
  } else {
    getUnknownAsset(ctx);
  }
}

export default getAsset;
