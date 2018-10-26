import xhr from 'xhr';

const PREFIX = 'http://localhost:3000';

const ServerAPI = {
  get(uri:string, data:mixed) {
    return promiseXHR('get', uri, data);
  },

  post(uri:string, data:mixed) {
    return promiseXHR('post', uri, data);
  },
};

/**
 * This is a simple wrapper around XHR that let's us use promises. Not very
 * advanced but works with our server's API.
 */
function promiseXHR(method: 'get' | 'post', uri:string, data:any) {
  const query = [];
  if (data) {
    Object.keys(data).forEach(key => {
      query.push(key + '=' + JSON.stringify(data[key]));
    });
  }
  const suffix = query.length > 0
    ? '?' + query.join('&')
    : '';
  return new Promise((resolve, reject) => {
    xhr[method](
      PREFIX + uri + suffix,
      (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(
            '[status: ' + res.statusCode + '] ' + res.body,
          ));
          return;
        }

        // It's fine if the body is empty.
        if (body == null) {
          resolve(undefined);
        }

        // Not okay if the body isn't a string though.
        if (typeof body !== 'string') {
          reject(new Error('Responses from server must be JSON strings.'));
        }

        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error('Responses from server must be JSON strings.'));
        }
      },
    );
  });
}

export default ServerAPI;
