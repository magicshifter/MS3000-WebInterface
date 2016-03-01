export const fetch =
  (url, method = 'GET') =>
    new Promise((resolve, reject) => {
      const req = new window.XMLHttpRequest();

      req.timeout = 3000;
      req.open(method, url);

      req.onload =
        () =>
          req.status === 200
          ? resolve(req)
          : reject(new Error(req.statusText));

      req.onerror =
        () =>
          reject(new Error('Network Error'));

      req.ontimeout =
        () =>
          reject(new Error('Request timed out'));

      try {
        req.send();
      } catch (e) {
        console.log('error', { e });
      }
    });

export const parseJSONResult =
  res => {
    let parsed = new Error('invalid Response');
    try {
      parsed = JSON.parse(res);
    } catch (e) {
      parsed = e;
    }

    return parsed;
  };
