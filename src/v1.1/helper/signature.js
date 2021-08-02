const oauth = require('oauth-sign');

const queryString = require('query-string');

const build = (url, body, secret) => {  
  const method      =  'POST';
    
  const urlSplit = url.split('?');
  let params = { };
    
  if (urlSplit.length > 1) {
    params = queryString.parse(url.split('?')[1]);
  }

  const bodyArray = { ...body, ...params };
    
  return oauth.hmacsign(method, urlSplit[0], bodyArray, secret);
};

module.exports  = {
  build
};