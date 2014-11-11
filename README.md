#The City API Client
This node module provides a client for [The City's](http://onthecity.org) [admin api](http://api.onthecity.org).

##Installation
####npm
`npm install --save thecity-client`
####old-fashion
Download/clone, unzip into project

##Usage
The client provides one method, `call()`, that handles all requests sent to The City. Rather than hard code each method
that the city supports, it's up to the user to call the appropriate endpoint, method, and appropriate data.  This allows maximum flexibility for the api, and ensures that any future method changes made by The City get immediate support via this client.

####Parameters:

- `endpoint` The City api endpoint to call (see The City's [docs](http://api.onthecity.org/admin) for options)
- `method` (optional, defaults to `GET`) Should be one of `GET`, `PUT`, `POST`, or `DELETE`
- `data` (optional) The object to pass for `PUT` & `POST` requests

####Returns
`call()` returns a [promise](https://github.com/kriskowal/q) that will call `.then(success, failure)` upon completion.

##Examples
```
var apikey = 'YOURAPIKEY'
  , usertoken = 'YOURUSERTOKEN'
  , client = require('thecity-admin-client');
  , api = new client(apikey, usertoken);

// Load all users.
api.call('users').then(function(res) {
  console.log('users', res.body); // contains the full response body from the city.
  console.log('code', res.code); // the response code from the city.
  console.log('throttle', res.throttle); // contains throttle info (limit/remaining).
});

// Load als groups (page 2).
api.call('groups?page=2').then(function(res) {
  console.log('users', res.body); // contains the full response body from the city.
  console.log('code', res.code); // the response code from the city.
  console.log('throttle', res.throttle); // contains throttle info (limit/remaining).
});

// Load a single user.
api.call('users/1234').then(function(res) {
  console.log('user', res.body);
});

// Update a user.
var user = {}; // Probably loaded from the city
api.call('users/1234', 'PUT', user).then(function(res) {
  console.log('code', res.code)
});

// This one failed.
// Load a single user.
api.call('users/1234').then(function(res) {
  console.log('user', res.body);
}, function(err) {
  console.log('oops!', err);
});
```

#License
MIT

#Contribute?
Bring it on! I'll toss some tests in eventually (feel free to do so as well)

#Thanks
- Special thanks to the wonderful folks at [The City](http://onthecity.org) for their hard work and decication.
- [The Journey Church](http://thejourney.org) for sponsoring this project.