/* Ink file picker encoded security policy and its signature with Node.js
 
https://www.inkfilepicker.com/
https://developers.inkfilepicker.com/docs/security/
 
Usage:
 
    ink.encodePolicy({
      handle: 'KW9EJhYtS6y48Whm2S6D',
      expiry: 1508141504
    });
    // -> eyJoYW5kbGUiOiJLVzlFSmhZdFM2eTQ4V2htMlM2RCIsImV4cGlyeSI6MTUwODE0MTUwNH0=
 
    ink.signPolicy({
      handle: 'KW9EJhYtS6y48Whm2S6D',
      expiry: 1508141504
    }, 'Z3IYZSH2UJA7VN3QYFVSVCF7PI');
    // -> 4098f262b9dba23e4766ce127353aaf4f37fde0fd726d164d944e031fd862c18
*/
 
var crypto = require('crypto');
 
var ink = {
  // Take an object or JSON string and encode it to
  // URL-safe Base64 with trailing "="
  encodePolicy: function(policy) {
    var result = policy;
    if (typeof policy !== 'string') {
      result = JSON.stringify(policy);
    }
    result = new Buffer(result || '').toString('base64');
    result = result.replace(/\+/g, '-').replace(/\//g, '_');
    return result;
  },
 
  // Take an object or JSON string, encode it to Base64 
  // and encrypt with a secret using HMAC-SHA256
  signPolicy: function(policy, secret) {
    var result = policy;
    result = this.encodePolicy(policy);
    result = crypto.createHmac('sha256', secret).update(result).digest('hex');
    return result;
  }
};