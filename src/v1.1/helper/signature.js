const crypto  = require('crypto');
const queryString = require('query-string');

const encoding = (string) => {
  return encodeURIComponent(string).replace(/[!'()]/g, escape).replace(/\*/g, '%2A');
};
  
const createHash = (string, consumerSecret) => {  
  return crypto.createHmac('sha1', `${consumerSecret}&`).update(string).digest('base64');
};

const paramsToURL = (body) => {
  const bodyArray = [];
  const objectBody = { ...body };
  
  for (const key in objectBody) {
    bodyArray.push(`${key}=${encoding(objectBody[key])}`);
  }
  
  return encoding(bodyArray.sort().join('&'));
};

const buildSignatureRaw = (hitUrl, method, body, queryStringParameters, consumerSecret) => {
  const paramsURL = paramsToURL({...body, ...queryStringParameters});
  const sign = [
    method.toUpperCase(),
    encoding(hitUrl),
    paramsURL
  ];
  
  return createHash(sign.join('&'), consumerSecret);
};

const build = (url, body, secret) => {  
  const method      =  'POST';
    
  const urlSplit = url.split('?');
  let params = { };
    
  if (urlSplit.length > 1) {
    params = queryString.parse(url.split('?')[1]);
  }
    
  return buildSignatureRaw(url, method, body, params, secret);
};

module.exports  = {
  build
};