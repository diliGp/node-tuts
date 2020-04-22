import { createClient } from "redis";
import { cachable } from "../cache";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = createClient(REDIS_PORT);
client.on('error', error => {
  console.error(`Redis ${error}`);
});
/**
 * Checks cache as a middleware and send resposne if cached data is present
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const checkCache = (req, res, next) => {
  const headers = req.headers;
  /**
   * Passing `fresh: true` in header will skip cache check and always uses fresh data.
   */

  if ('fresh' in headers && headers.fresh === 'true') {
    next();
    return;
  }

  const baseUrl = req.path;
  const {
    key
  } = cachable[baseUrl];
  client.get(key, (error, value) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }

    if (value) {
      res.json(JSON.parse(value));
      return;
    }

    next();
  });
};
/**
 * Sets cache in redis.
 * @param {*} cachableInfo 
 * @param {*} value 
 */

export const setCache = (cachableInfo, value) => {
  client.setex(cachableInfo.key, cachableInfo.expiry, value);
};