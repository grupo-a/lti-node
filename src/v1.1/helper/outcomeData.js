const getOutcomeData = (header, body) => {
  const paramsList = header.replace(/\*\s|,\s|,/g, '\n');

  let consumerKey = /(oauth_consumer_key)=([^\s]+)/g.exec(paramsList);
  consumerKey = consumerKey && decodeURIComponent(consumerKey[2]);

  let signatureMethod = /(oauth_signature_method)=([^\s]+)/g.exec(paramsList);
  signatureMethod = signatureMethod && decodeURIComponent(signatureMethod[2]);

  let timestamp = /(oauth_timestamp)=([^\s]+)/g.exec(paramsList);
  timestamp = timestamp && decodeURIComponent(timestamp[2]);

  let nonce = /(oauth_nonce)=([^\s]+)/g.exec(paramsList);
  nonce = nonce && decodeURIComponent(nonce[2]);

  let version = /(oauth_version)=([^\s]+)/g.exec(paramsList);
  version = version && decodeURIComponent(version[2]);

  let bodyHash = /(oauth_body_hash)=([^\s]+)/g.exec(paramsList);
  bodyHash = bodyHash && decodeURIComponent(bodyHash[2]);

  let callback = /(oauth_callback)=([^\s]+)/g.exec(paramsList);
  callback = callback && decodeURIComponent(callback[2]);

  let signature = /(oauth_signature)=([^\s]+)/g.exec(paramsList);
  signature = signature && decodeURIComponent(signature[2]);

  let sourcedId = body.split('<sourcedId>')[1];
  sourcedId = sourcedId && sourcedId.slice(0, sourcedId.indexOf('</sourcedId>'));
  sourcedId = sourcedId && decodeURIComponent(sourcedId); 

  let resultScore = body.split('<resultScore>')[1];
  resultScore = resultScore && resultScore.split('<textString>')[1];
  resultScore = resultScore && resultScore.slice(0, resultScore.indexOf('</textString>'));
  resultScore = resultScore && decodeURIComponent(resultScore);

  let requestType = body.split('<imsx_POXBody>')[1];
  requestType = requestType && requestType.split('<')[1];
  requestType = requestType && requestType.slice(0, requestType.indexOf('ResultRequest>'));

  const params = {
    oauth_consumer_key     : consumerKey,
    oauth_signature_method : signatureMethod,
    oauth_timestamp        : timestamp,
    oauth_nonce            : nonce,
    oauth_version          : version
  };

  if (bodyHash) {
    params.oauth_body_hash = bodyHash;
  }

  if (callback) {
    params.oauth_callback = callback;
  }

  return { params, resultScore, sourcedId, consumerKey, signature, requestType };
};

module.exports = {
  getOutcomeData
};