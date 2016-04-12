import { httpRequestTimeout } from 'GLOBALS';

import { isString, isError } from 'utils/types';

const isDebug =
  () =>
    window.__DEBUG__ && window.__DEBUG__.http === true;

const log =
  (...msgs) =>
    isDebug() &&
    console.log(...msgs);

const logRequest =
  startTime =>
    log(
      'request took',
      (new Date().getTime() - startTime) / 1000,
      'seconds'
    );

export const getPort =
  port =>
    parseInt(port, 10) === 80
      ? ''
      : `:${port}`;

export const getHost =
  ({ host, protocol, port, path = '' }) =>
    `${protocol}://${host}${getPort(port)}${path}`;

export const fetchJSON =
  ({ url, method = 'GET' }) =>
    fetch({
      url,
      method,
      json: true,
    });

export const fetch =
  ({ url, method = 'GET', json = false }) =>
    new Promise((resolve, reject) => {
      const requestStart = new Date().getTime();

      log('fetching', { url, method, json });

      const req = new window.XMLHttpRequest();

      req.timeout = httpRequestTimeout;
      req.open(method, url);

      req.onload =
        () => {
          logRequest(requestStart);

          if (req.status === 200) {
            if (!json) {
              return resolve(req);
            }

            const parsed = parseJSONResult(req.response || req.responseText);
            if (isString(parsed)) {
              return reject(parsed);
            }

            if (isError(parsed)) {
              return reject(parsed.message);
            }
            log({ parsed, isError: isError(parsed) });
            return resolve(parsed);
          }
          reject(req.statusText || 'Unkown Error');
        };

      req.onerror =
        () => {
          logRequest(requestStart);
          reject('Network Error');
        };

      req.ontimeout =
        () => {
          logRequest(requestStart);
          reject('Request timed out');
        };

      req.send();
    });

export const parseJSONResult =
  res => {
    let parsed = new Error('Response invalid');
    try {
      parsed = JSON.parse(res);
    } catch (e) {
      console.error('JSON parsing error', { e, res });
    }

    return parsed;
  };
