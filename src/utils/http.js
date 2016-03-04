const log =
  startTime =>
    console.log('request took', (new Date().getTime() - startTime) / 1000, 'seconds');

export const fetch =
  ({ url, method = 'GET' }) =>
    new Promise((resolve, reject) => {
      const requestStart = new Date().getTime();
      console.log('fetching', url, 'method', method);
      const req = new window.XMLHttpRequest();

      req.timeout = 10000;
      req.open(method, url);

      req.onload =
        () =>
          log(requestStart) ||
          req.status === 200
          ? resolve(req)
          : reject(new Error(req.statusText));

      req.onerror =
        () =>
          log(requestStart) ||
          reject(new Error('Network Error'));

      req.ontimeout =
        () =>
          log(requestStart) ||
          reject(new Error('Request timed out'));

      req.send();
    });

export const parseJSONResult =
  res => {
    let parsed = new Error('invalid Response');
    try {
      console.log(res);
      parsed = JSON.parse(res);
    } catch (e) {
      console.log('json parsing error');
      parsed = e;
    }

    return parsed;
  };
