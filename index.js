var crypto = require('crypto')
  , q = require('q')
  , request = require('request')
  , baseUrl = 'https://api.onthecity.org/';

module.exports = function CityApi(key, token) {
  var api = {};

  api.call = function(route, method, body) {
    if(method === undefined && body === undefined) {
      method = 'GET';
    }
    var deferred = q.defer()
      , t = new Date()
      , b = JSON.stringify(body)
      , sig = t.getTime() + method + baseUrl + route;

    method = method.toLowerCase();
    if(body) {
      sig += b;
    }

    var hash = crypto.createHmac('sha256', key).update(sig).digest('base64').toString('base64');
    hash = encodeURIComponent(hash);

    request({
      url: baseUrl + route,
      method: method,
      json: true,
      body: body,
      headers: {
        'X-City-Sig': hash,
        'X-City-User-Token': token,
        'X-City-Time': t.getTime(),
        'Accept': 'application/vnd.thecity.admin.v1+json',
        'Content-Type': 'application/json',
        'Content-Length': method !== 'get' ? b.length : 0,
      }
    }, function(err, res, body) {
      if(err) {
        return deferred.reject(err);
      }

      var r = {
        code: res.code,
        body: body,
        throttle: {
          limit: parseInt(res.headers['x-city-ratelimit-limit-by-account']),
          remaining: parseInt(res.headers['x-city-ratelimit-remaining-by-account']),
        }
      };
      deferred.resolve(r);
    });

    return deferred.promise;
  }

  return api;
}
