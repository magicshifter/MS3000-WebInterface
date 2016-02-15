export const fetch =
  (url, method = 'GET') =>
    new Promise((resolve, reject) => {
      const req = new window.XMLHttpRequest();

      req.timeout = 5000;
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

      req.send();
    });
