const log =
  startTime =>
    console.log(
      'request took',
      (new Date().getTime() - startTime) / 1000,
      'seconds'
    );

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
      console.log('fetching', { url, method, json });
      const req = new window.XMLHttpRequest();

      req.timeout = 10000;
      req.open(method, url);

      req.onload =
        () => {
          log(requestStart);
          if (req.status === 200) {
            if (json) {
              resolve(parseJSONResult(req));
            } else {
              resolve(req);
            }
            return;
          }

          reject(new Error(req.statusText));
        };

      req.onerror =
        () => {
          log(requestStart);
          reject(new Error('Network Error'));
        };

      req.ontimeout =
        () => {
          log(requestStart);
          reject(new Error('Request timed out'));
        };

      req.send();
    });

export const parseJSONResult =
  res => {
    let parsed = new Error('invalid Response');
    console.log('parseJSON', { res });
    try {
      parsed = JSON.parse(res.response || res.responseText);
    } catch (e) {
      parsed = e;
    }

    return parsed;
  };
