const oauth = require('oauth-sign');
const outcomeDataHelper = require('./helper/outcomeData');

const checkSignature = (url, header, body, secretKey) => {
  const outcomeData = outcomeDataHelper.getOutcomeData(header, body);

  const signature = oauth.hmacsign('POST', url, outcomeData.params, secretKey);

  if (outcomeData.signature === signature ) {
    return outcomeData.requestType === 'replace' 
      ? { resultScore: outcomeData.resultScore, sourcedId: outcomeData.sourcedId }
      : { sourcedId: outcomeData.sourcedId };
  } else {
    return null;
  }
};

module.exports  = {
  checkSignature
};